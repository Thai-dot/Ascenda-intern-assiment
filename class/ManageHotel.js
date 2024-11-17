import SUPPLIERS_URL from '../constant/supplier.js';
import KEY_MAPPING from '../constant/key-mapping.js';

class ManageHotel {
  constructor(supplierAPI, hotelHelper) {
    this.supplierAPI = supplierAPI;
    this.suppliersURL = SUPPLIERS_URL;
    this.keyMapping = KEY_MAPPING;
    this.hotelHelper = hotelHelper;
  }

  async normalizeHotelData() {
    const result = [];
    const idMap = {};

    const fetchPromises = this.suppliersURL.map(url => this.supplierAPI.fetchData(url));
    const results = await Promise.all(fetchPromises);

    // get helper functions
    const resolveKey = this.hotelHelper.resolveKey;
    const pushImages = this.hotelHelper.pushImages;
    const mergeAmenities = this.hotelHelper.mergeAmenities;
    const mapImages = this.hotelHelper.mapImages;

    results.forEach(supplierData => {
      supplierData.forEach(hotel => {
        const id = resolveKey(hotel, this.keyMapping.id);

        if (!idMap[id]) {
          const unifiedHotel = {
            id,
            destination_id: resolveKey(hotel, this.keyMapping.destination_id),
            name: resolveKey(hotel, this.keyMapping.name),
            location: {
              lat: parseFloat(resolveKey(hotel, this.keyMapping.location.lat)) || 0,
              lng: parseFloat(resolveKey(hotel, this.keyMapping.location.lng)) || 0,
              address: resolveKey(hotel, this.keyMapping.location.address),
              city: resolveKey(hotel, this.keyMapping.location.city),
              country: resolveKey(hotel, this.keyMapping.location.country),
            },
            description: resolveKey(hotel, this.keyMapping.description),
            amenities: {
              general: resolveKey(hotel, this.keyMapping.amenities.general) || [],
              room: resolveKey(hotel, this.keyMapping.amenities.room) || [],
            },
            images: mapImages(hotel, this.keyMapping.images, resolveKey),
            booking_conditions: resolveKey(hotel, this.keyMapping.booking_conditions) || [],
          };
          idMap[id] = unifiedHotel;
          result.push(unifiedHotel);
        } else {
          const existingHotel = idMap[id];
          existingHotel.location.lat ||= parseFloat(resolveKey(hotel, this.keyMapping.location.lat)) || 0;
          existingHotel.location.lng ||= parseFloat(resolveKey(hotel, this.keyMapping.location.lng)) || 0;
          existingHotel.location.address ||= resolveKey(hotel, this.keyMapping.location.address);
          existingHotel.description ||= resolveKey(hotel, this.keyMapping.description);
          existingHotel.amenities = mergeAmenities(existingHotel.amenities, {
            general: resolveKey(hotel, this.keyMapping.amenities.general) || [],
            room: resolveKey(hotel, this.keyMapping.amenities.room) || [],
          });
          pushImages(existingHotel.images.rooms, hotel, this.keyMapping.images.rooms, resolveKey);
          pushImages(existingHotel.images.site, hotel, this.keyMapping.images.site, resolveKey);
          pushImages(existingHotel.images.amenities, hotel, this.keyMapping.images.amenities, resolveKey);
          existingHotel.booking_conditions.push(
            ...(resolveKey(hotel, this.keyMapping.booking_conditions) || [])
          );
        }
      });
    });

    return result;
  }


}

export default ManageHotel;
const KEY_MAPPING = {
  id: ["id", "Id", "hotel_id"],
  destination_id: ["DestinationId", "destination", "destination_id"],
  name: ["Name", "name", "hotel_name"],
  location: {
    lat: ["Latitude", "lat"],
    lng: ["Longitude", "lng"],
    address: ["Address", "location.address"],
    city: ["City"],
    country: ["Country", "location.country"],
  },
  description: ["Description", "info", "details"],
  amenities: {
    general: ["Facilities", "amenities.general"],
    room: ["amenities.room"],
  },
  images: {
    rooms: ["images.rooms"],
    site: ["images.site"],
    amenities: ["images.amenities"],
  },
  booking_conditions: ["booking_conditions"],
};

export default KEY_MAPPING;
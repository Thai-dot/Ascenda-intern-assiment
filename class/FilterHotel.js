class FilterHotel {

    constructor(hotelData) {    
        this.hotelData = hotelData;
    }

    filterHotelByID(hotelIDs, destinationIDs) {
        if(hotelIDs.length === 0 && destinationIDs.length === 0) {
            return this.hotelData;
        }
        if(hotelIDs.length > 0 && destinationIDs.length === 0) {
            this.hotelData = this.hotelData.filter(hotel => hotelIDs.includes(hotel.id));
        }
        if(destinationIDs.length > 0 && hotelIDs.length === 0) {
            this.hotelData = this.hotelData.filter(hotel => destinationIDs.includes(hotel.destination_id.toString()));
        }
        return this.hotelData.filter(hotel => hotelIDs.includes(hotel.id) && destinationIDs.includes(hotel.destination_id.toString()));
    }
}

export default FilterHotel;
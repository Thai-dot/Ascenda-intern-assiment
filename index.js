
import ManageHotel from './class/ManageHotel.js';
import SupplierAPI from './class/SupplierAPI.js';
import HotelHelper from './class/HotelHelper.js';
import FilterHotel from './class/FilterHotel.js';

async function main() {
  const { hotelIDs, destinationIDs } = getUserInput();
  
  const manageHotel = new ManageHotel(new SupplierAPI(), new HotelHelper());
  const mergedHotelData = await manageHotel.normalizeHotelData();
  const filterHotel = new FilterHotel(mergedHotelData);
  const filteredHotelData = filterHotel.filterHotelByID(hotelIDs, destinationIDs);
  console.log(JSON.stringify(filteredHotelData));
  return JSON.stringify(filteredHotelData);
}

function getUserInput() {
  let hotelIDs = process.argv.slice(2)[0]?.split(',') ?? [];
  if(hotelIDs[0] === 'none') {
    hotelIDs = [];
  }

  let destinationIDs = process.argv.slice(2)[1]?.split(',') ?? [];
  if(destinationIDs[0] === 'none') {
    destinationIDs = [];
  }

  return { hotelIDs, destinationIDs };
}

main();

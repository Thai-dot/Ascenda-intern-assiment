
import ManageHotel from './class/ManageHotel.js';
import SupplierAPI from './class/SupplierAPI.js';
import HotelHelper from './class/HotelHelper.js';

async function main() {
  const manageHotel = new ManageHotel(new SupplierAPI(), new HotelHelper());
  const mergedHotelData = await manageHotel.normalizeHotelData();
  console.log("Merged Hotel Data:", mergedHotelData);
}

main();

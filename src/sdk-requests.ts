// import { ISearchData } from './SearchData.js'
// import { FlatRentSdk, cloneDate } from './flat-rent-sdk.js'
// import { IPlace } from './Place.js';

// export const sdk = new FlatRentSdk()

// export async function getHotelDataBySDK(searchData: PlaceListResponse): Promise<[]> {
//   return sdk.search({
//     city: searchData.city,
//     checkInDate: cloneDate(new Date(searchData.inData)),
//     checkOutDate: cloneDate(new Date(searchData.outData)),
//     priceLimit: searchData.maxPriceDay
//   })
//     .then((data: []) => {
//       return data
//     })
// }
// export async function getHotelDataByIdFromSDK(id: string): Promise<IPlace> {
//   return sdk.get(id)
//     .then((data: IPlace) => {
//       return data
//     })
// }

// export async function setBookingBySDK(id: string, inData: string, outData: string): Promise<IPlace> {
//   return sdk.book(id, cloneDate(new Date(inData)), cloneDate(new Date(outData)))
//     .then((result) => {
//       return result
//     })
  
// }

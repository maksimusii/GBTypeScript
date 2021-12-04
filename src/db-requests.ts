import { ISearchData } from './SearchData.js'
import { IFaivoriteItem } from './user-data.js'


export async function getHotelsData(searchData: ISearchData): Promise<[]> {
  return fetch(`http://localhost:3030/places/?coordinates=${searchData.coordinates}&checkInDate=${new Date(searchData.inData).getTime()}&checkOutDate=${new Date(searchData.outData).getTime()}&maxPrice=${searchData.maxPriceDay}`)
    .then((response) => {
      return response.text()
    })
    .then((responseText) => {
      return JSON.parse(responseText)
    })
    
}

export async function getItemById(id: number | string): Promise<IFaivoriteItem> {
  return fetch(`http://localhost:3030/places/${id}`)
    .then((response) => {
      return response.text()
    })
    .then((responseText) => {
      return JSON.parse(responseText)
    })
}

export async function setBooking(id: number, inData: string, outData: string): Promise<IFaivoriteItem> {
  return fetch(`http://localhost:3030/places/${id}/?checkInDate=${new Date(inData).getTime()}&checkOutDate=${new Date(outData).getTime()}`,{ method: 'PATCH' })
    .then((response) => {
      return response.text()
    })
    .then((responseText) => {
      return JSON.parse(responseText)
    })
}
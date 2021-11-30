
import { IFaivoriteItem } from './user-data.js'
//import { IPlace } from './search-result-controller.js'
import { ISearchFromData } from './search-form-controller.js'

export async function getHotelsData(searchData: ISearchFromData): Promise<[]> {
  return fetch(`http://localhost:3030/places/?coordinates=${searchData.coordinates}&checkInDate=${new Date(searchData.inData).getTime()}&checkOutDate=${new Date(searchData.outData).getTime()}&maxPrice=${searchData.maxPriceDay}`)
    .then((response) => {
      return response.text()
    })
    .then((responseText) => {
      return JSON.parse(responseText)
    })
    
}

export async function getItemById(id: number): Promise<IFaivoriteItem> {
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
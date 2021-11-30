import { searchHotelData } from './search-result-controller.js'

export interface ISearchFromData {
  city: string
  inData: string
  outData: string
  coordinates: string
  maxPriceDay: number
}

export function getFormData() {
  const form: HTMLFormElement = document.querySelector('#search-form')
  form.onsubmit = (event) => {
    event.preventDefault()
  
    const formData = new FormData(form);

    const searchData : ISearchFromData = {
      city: formData.get('city').toString(),
      inData: formData.get('checkin').toString(),
      outData: formData.get('checkout').toString(),
      coordinates: formData.get('coordinates').toString(),
      maxPriceDay: +formData.get('price')
    }
    searchHotelData(searchData)
    return false;
  }
}

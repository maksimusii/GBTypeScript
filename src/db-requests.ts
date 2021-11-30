
import { IFaivoriteItem } from './user-data.js'

export async function setFaivoriteData(id: number): Promise<IFaivoriteItem> {
  return fetch(`http://localhost:3030/places/${id}`)
    .then((response) => {
      return response.text()
    })
    .then((responseText) => {
      return JSON.parse(responseText)
    })
}

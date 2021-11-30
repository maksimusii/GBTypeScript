import { renderSearchResultsBlock, renderEmptyOrErrorSearchBlock } from './search-results.js'
import { ISearchFromData } from './search-form-controller.js'
import { setFaivoriteData } from './db-requests.js'
import { favoriteInfoItems, IFaivoriteItem } from './user-data.js'
import { getUserData, person } from './user-controller.js'
import { renderUserBlock } from './user.js'

export interface IPlace {
  id: number
  image: string
  name: string
  price: number
  remoteness: number
  description: string
}


export async function getBookingData(searchData: ISearchFromData): Promise<IPlace> {
  return fetch(`http://localhost:3030/places/?coordinates=${searchData.coordinates}&checkInDate=1623761669999&checkOutDate=1623761679999&maxPrice=${searchData.maxPriceDay}`)
    .then((response) => {
      return response.text()
    })
    .then((responseText) => {
      return JSON.parse(responseText)
    })
    .then((data) => {
      if (data.length === 0) {
        renderEmptyOrErrorSearchBlock('There not any hotels for booking.')
        throw Error('There not any hotels for booking.')
      }
      renderSearchResultsBlock(data)
      return data
    })
}

export function toggleFavoriteItem() {
  const faivotiteHearts = document.querySelectorAll('.favorites')
  const currentFaivoriteItems = [] || Object.keys(JSON.parse(localStorage.getItem('favoriteItems')))

  for (let i = 0 ; i < faivotiteHearts.length; i++ ) {
    if (currentFaivoriteItems.length != 0) {
      currentFaivoriteItems.forEach((item) => {
        if (faivotiteHearts[i].getAttribute('data-id') == item) {
          faivotiteHearts[i].classList.add('active')
        }
      })
    }
    faivotiteHearts[i].addEventListener('click', function() {
      if (faivotiteHearts[i].classList.contains('active')) {
        faivotiteHearts[i].classList.remove('active')
        changeData(+faivotiteHearts[i].getAttribute('data-id'), false)
      } else {
        faivotiteHearts[i].classList.add('active')
        changeData(+faivotiteHearts[i].getAttribute('data-id'), true)
      }
    })
  }
} 
function changeData(id: number, hasFavorite: boolean) {
  setFaivoriteData(id)
    .then((data: IFaivoriteItem) => {
      let favoriteInfoItem: IFaivoriteItem 
      if (Object.keys(data).length === 0) {
        throw Error('There is not any hotel for this id.')
      }
      if (hasFavorite) {
        favoriteInfoItem = {'id': data.id, 'name': data.name, 'image': data.image}
        favoriteInfoItems[data.id] = favoriteInfoItem
        regenerateUserData()
      } else {
        delete favoriteInfoItems[data.id]
        regenerateUserData()
      }
    })
}

function regenerateUserData() {
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteInfoItems))
  localStorage.setItem('favoritesAmount', Object.keys(favoriteInfoItems).length.toString())
  getUserData()
  renderUserBlock(person.username, person.avatarUrl, person.favoitAmount)
}
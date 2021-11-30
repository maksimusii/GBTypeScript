import { renderSearchResultsBlock, renderEmptyOrErrorSearchBlock, renderSearchStubBlock } from './search-results.js'
import { ISearchFromData } from './search-form-controller.js'
import { getItemById, setBooking, getHotelsData } from './db-requests.js'
import { favoriteInfoItems, IFaivoriteItem } from './user-data.js'
import { getUserData, person } from './user-controller.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

export interface IPlace {
  id: number
  image: string
  name: string
  price: number
  remoteness: number
  description: string
}
// Переменная для ID 5 минтного интервала для бронирование
let intervalStopID: number

//Функция для получение данных по доступным отелям для бронирования
export function searchHotelData(searchData: ISearchFromData) {
  getHotelsData(searchData)
    .then((data) => {
      if (data.length === 0) {
        renderEmptyOrErrorSearchBlock('There not any hotels for booking.')
        throw Error('There not any hotels for booking.')
      }
      renderSearchResultsBlock(data)
      if (intervalStopID) {
        clearInterval(intervalStopID)
      }
      requestTimeout()
      return data
    })
}

//Функция установки 5-и минутного интервала для бронирования
function requestTimeout() {
  intervalStopID = setTimeout(()=> {
    renderSearchStubBlock()
    renderToast(
      {text: 'Врямя бронирования истекло. Повторите поиск.', type: 'success'},
      {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
    )
  }, 300000)
}

//Функция добавление в избранное
export function toggleFavoriteItem() {
  const faivotiteHearts = document.querySelectorAll('.favorites')
  let currentFaivoriteItems = [{}]

  if (localStorage.getItem('favoriteItems') != null) {
    currentFaivoriteItems = Object.keys(JSON.parse(localStorage.getItem('favoriteItems')))
  } 

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

// Функция для изменения списка избраного у пользователя
function changeData(id: number, hasFavorite: boolean) {
  getItemById(id)
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
// Функция перегенерации данных польователя
function regenerateUserData() {
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteInfoItems))
  localStorage.setItem('favoritesAmount', Object.keys(favoriteInfoItems).length.toString())
  getUserData()
  renderUserBlock(person.username, person.avatarUrl, person.favoitAmount)
}

//Функция обработки нажати якнопки бронирования
export function handleBookingButton() {
  const bookingButton = document.querySelectorAll('#booking-button')
  
  for (let i = 0 ; i < bookingButton.length; i++ ) {
    bookingButton[i].addEventListener('click',function() {
      setBookigData(+bookingButton[i].getAttribute('data-id'))
    })
  }
}

//Функция для бронирования и внесения данных в БД
function setBookigData(id: number) {
  const inData = (<HTMLInputElement>document.getElementById('check-in-date')).value
  const outData = (<HTMLInputElement>document.getElementById('check-out-date')).value
  setBooking(id, inData, outData)
    .then((data) => {
      if (data.name != 'BadRequest') {
        renderToast(
          {text: `Отель ${data.name} успешно забронирован с ${inData} по ${outData}`, type: 'success'},
          {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
        )
      } else {
        renderToast(
          {text: `${data.message}`, type: 'alert'},
          {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
        )
      }
      
    })
  clearInterval(intervalStopID)
  renderSearchStubBlock()
} 

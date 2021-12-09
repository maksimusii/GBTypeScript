//import { PlaceListResponse } from './store/providers/api/response';
import { getItemById, setBooking } from './db-requests.js'
import { favoriteInfoItems, IFaivoriteItem } from './user-data.js'
import { getUserData, person } from './user-controller.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { Place } from './store/domain/place.js'
import { APIProvider } from './store/providers/api/api-provider.js';
import { SearchFilter } from './store/domain/search-filter.js'
import { renderSearchResultsBlock, renderSearchStubBlock } from './search-results.js';

const api = new APIProvider()

export function getDistance(lat2: number, long2: number) {
  const radargs = [59.9386, 30.3141, lat2, long2].map(v => v / 180 * Math.PI)  
  const remotness = Math.acos(Math.sin(radargs[0]) * Math.sin(radargs[2]) +
    Math.cos(radargs[0]) * Math.cos(radargs[2]) * Math.cos(radargs[3] - radargs[1])) * 6371
  return Math.round(remotness * 10) / 10
}

// Переменная для ID 5 минтного интервала для бронирование
let intervalStopID: number

//Функция для получение данных по доступным отелям для бронирования


export function searchHotelData(searchData: SearchFilter) {
  const isHomy = (<HTMLInputElement>document.getElementById('homy')).checked
  const isFlatRent = (<HTMLInputElement>document.getElementById('flat-rent')).checked
  
  if(isHomy && !isFlatRent) {
    api.find(searchData)
      .then((results) => {
        getAPIData(results)
      })
  }
  if(isFlatRent && !isHomy) {
    api.find(searchData)
      .then((results) => {
        getAPIData(results)
      })
  }

  if(isFlatRent && isHomy) {
    api.find(searchData)
      .then((results) => {
        getAPIData(results)
      })
  }
}
//export function getSDKData(searchData: PlaceListResponse) {
// getHotelDataBySDK(searchData)
//   .then((data) => {
//     if (intervalStopID) {
//       clearInterval(intervalStopID)
//     }
//     requestTimeout()
//     if (isFlatRent && isHomy) {
//       getAPIData(searchData)
        
//     } else {
//       renderSearchResultsBlock(data)
//     }
    
//   })
//   .catch((result) => {
//     console.error('serach with check-in in the past', result)
//   })
//}

export function getAPIData(searchedData: Place[]) {
  
  if (intervalStopID) {
    clearInterval(intervalStopID)
  }
  renderSearchResultsBlock(searchedData)
  requestTimeout()
}

//Функция установки 5-и минутного интервала для бронирования
export function requestTimeout() {
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
        changeData(faivotiteHearts[i].getAttribute('data-id'), false)
      } else {
        faivotiteHearts[i].classList.add('active')
        changeData(faivotiteHearts[i].getAttribute('data-id'), true)
      }
    })
  }
} 

// Функции для изменения списка избраного у пользователя
function changeData(id: string, hasFavorite: boolean) {
  if (typeof +id == 'number' && !isNaN(+id)) {
    getItemById(+id)
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
  } else {
    // getHotelDataByIdFromSDK(id)
    //   .then((data)=>{
    //     let favoriteInfoItem: IFaivoriteItem 
    //     if (Object.keys(data).length === 0) {
    //       throw Error('There is not any hotel for this id.')
    //     }
    //     if (hasFavorite) {
    //       favoriteInfoItem = {'id': data.id, 'name': data.title, 'image': data.photos[0]}
    //       favoriteInfoItems[data.id] = favoriteInfoItem
    //     } else {
    //       delete favoriteInfoItems[data.id]
    //     }
    //     regenerateUserData()
    //   })
  }
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
      setBookigData(bookingButton[i].getAttribute('data-id'))
    })
  }
}

//Функции для бронирования и внесения данных в БД
function setBookigData(id: string) {
  const inData = (<HTMLInputElement>document.getElementById('check-in-date')).value
  const outData = (<HTMLInputElement>document.getElementById('check-out-date')).value
  if (typeof +id == 'number' && !isNaN(+id)) {
    setBooking(+id, inData, outData)
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
  } else {
    // setBookingBySDK(id, inData, outData)
    //   .then((result) => {
    //     getHotelDataByIdFromSDK(id).then((data) => {
    //       renderToast(
    //         {text: `Отель ${data.title} успешно забронирован с ${inData} по ${outData}. Номер бронирования ${result}`, type: 'success'},
    //         {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
    //       )
    //     })
    //   })
    //   .catch((error) => {
    //     renderToast(
    //       {text: `${error}`, type: 'alert'},
    //       {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
    //     )
    //   })
  }
  clearInterval(intervalStopID)
  renderSearchStubBlock()
} 

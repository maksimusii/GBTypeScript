import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

//Генерация в данных в LocalStorage
const userInfo = {'username': 'Wade Warren', 'avatarUrl': '/img/avatar.png'} 
localStorage.setItem('user', JSON.stringify(userInfo))
localStorage.setItem('favoritesAmount', '3' )



class User {
  username: string
  avatarUrl: string
  favoitAmount: number
  constructor (username?: string, avatarUrl?: string, favoriteAmount?: number) {
    this.username = username,
    this.avatarUrl = avatarUrl
    this.favoitAmount = favoriteAmount
  }
}

let userData: unknown
let userFavoriteAmount: unknown

let person: User 

function getUserData() {
  if (localStorage.getItem('user') == null) {
    person = new User('annonimous', '/img/empty-user.png', 0)
  } else {
    userData = new User(JSON.parse(localStorage.getItem('user')).username, JSON.parse(localStorage.getItem('user')).avatarUrl, getFavoritesAmount())
  }
  if(userData instanceof User) {
    person = new User(userData.username, userData.avatarUrl, userData.favoitAmount)
    
  }
}

function getFavoritesAmount() {
  if (localStorage.getItem('favoritesAmount') == null) {
    return 0
  } else {
    userFavoriteAmount = +localStorage.getItem('favoritesAmount')
  }
  if(typeof userFavoriteAmount == 'number') {
    return userFavoriteAmount
  }
}

interface ISearchFromData {
  city: string,
  inData: string,
  outData: string,
  maxPriceDay: number
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPlace {

}

function searchRequest () {
  const placeData = []
  if (Math.round(Math.random() * 1)) {
    return Promise.resolve(placeData)
  } else {
    return Promise.reject(placeData)
  } 
}
function searchFunc(data: ISearchFromData, callback?: (error?: Error, placeData?: IPlace) => void): void {
  console.log(data)
  setInterval(() => {
    searchRequest()
      .then ((id) => {
        callback(null, id)
      })
      .catch ((error) => {
        callback(error)
      })
  }, 2000) 
}


window.addEventListener('DOMContentLoaded', () => {
  getUserData()
  renderUserBlock(person.username, person.avatarUrl, person.favoitAmount)
  renderSearchFormBlock(new Date('2021-12-12'), new Date('2021-12-15'))
  renderSearchStubBlock()
  
  const form: HTMLFormElement = document.querySelector('#search-form')
  form.onsubmit = (event) => {
    event.preventDefault()
  
    const formData = new FormData(form);

    const searchData : ISearchFromData = {
      city: formData.get('city').toString(),
      inData: formData.get('checkin').toString(),
      outData: formData.get('checkout').toString(),
      maxPriceDay: +formData.get('price')
    }
    
    searchFunc(searchData, (error?: Error, placeData?: IPlace ) => {
      if (error == null && placeData != []) {
        console.log(placeData)
      } else {
        console.error('Fail')
      }})
    
    
    return false;
  }
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})

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
export let person: User 

export function getUserData() {
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
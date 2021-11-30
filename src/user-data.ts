//Генерация в данных в LocalStorage
export function setUserData() {
  const userInfo = {'username': 'Wade Warren', 'avatarUrl': '/img/avatar.png'} 
  localStorage.setItem('user', JSON.stringify(userInfo))
}

export interface IFaivoriteItem {
  id: number,
  name: string,
  image: string
}

export interface IFaivoriteData {
[key: string]: IFaivoriteItem
}


export const favoriteInfoItems: IFaivoriteData = JSON.parse(localStorage.getItem('favoriteItems')) || {}
import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock, } from './search-results.js'
import { renderUserBlock } from './user.js'
//import { renderToast } from './lib.js'
import { getFormData} from './search-form-controller.js'
import { person, getUserData } from './user-controller.js'
import { setUserData } from './user-data.js'


window.addEventListener('DOMContentLoaded', () => {
  setUserData()
  getUserData()
  renderUserBlock(person.username, person.avatarUrl, person.favoitAmount)
  renderSearchFormBlock(new Date('2021-12-12'), new Date('2021-12-15'))
  renderSearchStubBlock()
  getFormData()
  // renderToast(
  //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
  //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  // )
})

import { Place } from './store/domain/place.js'
import { renderBlock } from './lib.js'
import { toggleFavoriteItem, handleBookingButton} from './search-result-controller.js'


export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}
//функция для определения растояния на основе координат


export function renderSearchResultsBlock(searchData: Place[]) {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
    ${searchData.map((data) => {
    return `
    <li class="result">
      <div class="result-container">
        <div class="result-img-container">
          <div class="favorites" data-id="${data.id}"></div>
          <div  style="width:329px; height:329px;">
          <img class="result-img" src="${data.image}" alt="">
          </div>
        </div>	
        <div class="result-info">
          <div class="result-info--header">
            <p>${data.name}</p>
            <p class="price">${data.price}&#8381;</p>
          </div>
          <div class="result-info--map"><i class="map-icon"></i> ${data.remoteness} км от вас</div>
          <div class="result-info--descr">${data.description}</div>
          <div class="result-info--footer">
            <div>
              <button id="booking-button" data-id="${data.id}">Забронировать</button>
            </div>
          </div>
        </div>
      </div>
    </li>
    `
  }).join('')}
    </ul>`
  )
  toggleFavoriteItem()
  handleBookingButton()
}

import { renderBlock } from './lib.js'
import { toggleFavoriteItem, IPlace } from './search-result-controller.js'


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


export function renderSearchResultsBlock (searchData: []) {
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
    ${searchData.map((data: IPlace, i: number) => {
    return `<span key=${i}
    <li class="result">
      <div class="result-container">
        <div class="result-img-container">
          <div class="favorites" data-id="${data.id}"></div>
          <img class="result-img" src="${data.image}" alt="">
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
              <button>Забронировать</button>
            </div>
          </div>
        </div>
      </div>
    </li>
    </span>`
  }).join('')}
    </ul>`
  )
  toggleFavoriteItem()
}

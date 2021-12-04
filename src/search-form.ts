import { renderBlock } from './lib.js'

export function renderSearchFormBlock (inDate?: Date, outDate?: Date) {
  //Generate Date data
  const curentDate = new Date(Date.now())
  const valueInDate = inDate ? inDate.getFullYear() + '-' + ((inDate.getMonth() > 8) ? (inDate.getMonth() + 1) : ('0' + (inDate.getMonth() + 1))) + '-' + ((inDate.getDate() > 9) ? inDate.getDate() : ('0' + inDate.getDate())): curentDate.getFullYear() + '-' + ((curentDate.getMonth() > 8) ? (curentDate.getMonth() + 1) : ('0' + (curentDate.getMonth() + 1))) + '-' + ((curentDate.getDate() > 8) ? curentDate.getDate() + 1 : ('0' + curentDate.getDate() + 1))
  const valueOutDate = outDate ? outDate.getFullYear() + '-' + ((outDate.getMonth() > 8) ? (outDate.getMonth() + 1) : ('0' + (outDate.getMonth() + 1))) + '-' + ((outDate.getDate() > 9) ? outDate.getDate() : ('0' + outDate.getDate())): curentDate.getFullYear() + '-' + ((curentDate.getMonth() > 8) ? (curentDate.getMonth() + 1) : ('0' + (curentDate.getMonth() + 1))) + '-' + ((curentDate.getDate() > 7) ? curentDate.getDate() + 2: ('0' + curentDate.getDate() + 2))
  const maxDayNextMonth = (new Date(curentDate.getFullYear(), curentDate.getUTCMonth() + 2, 0)).getDate()
  const maxDayValue = curentDate.getFullYear() + '-' + ((curentDate.getMonth() > 8) ? (curentDate.getMonth() + 2) : ('0' + (curentDate.getMonth() + 2))) + '-' + maxDayNextMonth
  const minDayValue = curentDate.getFullYear() + '-' + ((curentDate.getMonth() > 8) ? (curentDate.getMonth() + 1) : ('0' + (curentDate.getMonth() + 1))) + '-' + ((curentDate.getDate() > 9) ? curentDate.getDate() : ('0' + curentDate.getDate()))
  
  
  renderBlock(
    'search-form-block',
    `
    <form id="search-form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" value="Санкт-Петербург" name="city" />
            <input type="hidden" value="59.9386,30.3141" name="coordinates"/>
          </div>
          <div class="providers">
            <label><input  id="homy" type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input id="flat-rent" type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${valueInDate}" min="${minDayValue}" max="${maxDayValue}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${valueOutDate}" min="${minDayValue}" max="${maxDayValue}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" required />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}

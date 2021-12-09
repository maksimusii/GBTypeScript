//import { PlaceListResponse } from './response';
//import { APIProvider } from './api-provider.js';
import { Place } from '../../domain/place.js'
import { Provider } from '../../domain/provider.js'
import { SearchFilter } from '../../domain/search-filter.js'
import { HttpHelper } from '../../utils/http-helper.js'
import { PlaceResponse, PlaceListResponse, Place as APIPlace } from './response.js'

export class APIProvider implements Provider {
  // имя провайдера нужно, чтобы было возможно установить источник того или иного экземпляра книги
  public static provider = 'api'
  // URL API не настоящий, для примера
  private static apiUrl = 'http://localhost:3030/places/?coordinates='

  public async find(filter: SearchFilter): Promise<Place[]> {
    return HttpHelper.fetchAsJson<PlaceListResponse>(
      APIProvider.apiUrl + filter.coordinates +
      // создадим соответствующую строку запроса из объекта фильтра
      '&checkInDate=' + this.convertSearchData(filter)[0] + 
      '&checkOutDate=' + this.convertSearchData(filter)[1] +
      '&maxPrice=' + filter.maxPriceDay
    )
      .then((response) => {
        // проверим, что с ответ корректный
        console.log(response)
        this.assertIsValidResponse(response)
        // сконвертируем JSON-ответ в экземпляры Book
        return this.convertPlaceListResponse(response)
      })
  }

  public async getById(id: string): Promise<Place> {
    return HttpHelper.fetchAsJson<PlaceResponse>(APIProvider.apiUrl + '/book/' + id)
      .then((response) => {
        // проверим, что с ответ корректный
        this.assertIsValidResponse(response)
        // сконвертируем JSON-ответ в экземпляр Book
        return this.convertBookResponse(response.item)
      })
  }

  /**
   * Данный провайдер не использует http коды для ответов
   * В случае ошибки, она содержится в errorMessage
   * Необходимо убедиться, что ответ не является ошибкой
   */
  private assertIsValidResponse(response: PlaceListResponse | PlaceResponse): void {
    if (response.errorMessage != null) {
      throw new Error(response.errorMessage)
    }
  }

  /**
   * Необходимо написать логику преобразования общего фильтра
   * в get-параметры текущего источника
   */
  // private convertFilterToQueryString(filter: SearchFilter): string {
  //   return `search=${filter.name}` +
  //   `&author=${filter.author.firstName} ${filter.author.lastName}`
  // }
  private convertSearchData(filter: SearchFilter): number[] {
    return [new Date(filter.inData).getTime(), new Date(filter.outData).getTime()]
  }
  /**
   * Проходимся по каждому объекту и конвертируем его в экземпляр Book
   */
  private convertPlaceListResponse(response: PlaceListResponse): Place[] {
    return response.map((item) => {
      return this.convertBookResponse(item)
    })
  }

  /**
   * Здесь находится логика преобразования объекта книги из источника
   * в экземпляр Book нашего приложения
   */
  private convertBookResponse(item: APIPlace): Place {
    return new Place(
      APIProvider.provider,
      String(item.id),
      item.image,
      item.name,
      item.bookedDates,
      item.description,
      item.remoteness,
      item.price
    )
  }
  
  
}
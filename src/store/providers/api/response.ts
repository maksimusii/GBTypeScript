/**
 * Ответ с несколькими книгами
 */
export interface PlaceListResponse extends Array<Place>{
  errorMessage?: string
}

/**
 * Ответ с одной книгой
 */
export interface PlaceResponse {
  errorMessage?: string
  item: Place
}

/**
 * Структура самой книги
 */
export interface Place {
  id: number
  bookedDates: Date[]
  image: string
  name: string
  description: string
  remoteness: number
  price: number
}



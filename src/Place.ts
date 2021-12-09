export interface IPlace {
  id: string
  photos: string[]
  title: string
  totalPrice: number
  details: string
  bookedDates: Date[]
  coordinates: number[]
  image: string
  name: string
  description: string
  remoteness: number[] | number
  price: number
}
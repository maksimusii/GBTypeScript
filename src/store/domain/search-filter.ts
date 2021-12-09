
/**
 * Протокол фильтра, с которым должен работать каждый провайдер
 */
export interface SearchFilter {
  coordinates: string
  outData: string
  inData: string
  maxPriceDay: number
}
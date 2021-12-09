import { IPlace } from './Place.js';
import { ISearchData } from './SearchData.js'
 

export function cloneDate(date: Date): Date
export function addDays(date: Date, days: number): Date
export class FlatRentSdk {
  search(parameters: ISearchData): Promise<[]>
  get(id: string): Promise<IPlace>
  book(id:string, inData: Date, outDate: Date): Promise<IPlace>
  private _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void
  private _resetTime(data: Date): void
  private _calculateDifferenceInDays(checkInDate: Date, checkOutDate: Date): number
  private _generateDateRange(from: Date, to: Date): number[]
  private _generateTransactionId(flat: object, DataRange: Date[]): number
  private _areAllDatesAvailable(flat: object, dateRange: number): number[]
  private _formatFlatObject(flat: object, nightNumber: number): object
  private _readDatabase(): object[]
  private _writeDatabase(database: object[]): void
  private _syncDatabase(database: object[]): void
 
}
  
import { IPlace } from './Place.js';
import { ISearchData } from './SearchData.js'
 

export function cloneDate(date: Date): Date
export function addDays(date: Date, days: number): Date
export class FlatRentSdk {
  search(parameters: ISearchData): Promise<[]>
  get(id: string): Promise<IPlace>
  book(id:string, inData: Date, outDate: Date): Promise<IPlace>
}
  
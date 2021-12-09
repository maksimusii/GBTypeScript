export class Place {
  constructor (
  private readonly provider: string,
  public readonly originalId: string,
  public readonly image: string,
  public readonly name: string,
  public readonly bookedDates: Date[],
  public readonly description: string,
  public readonly remoteness: number,
  public readonly price: number
  ) {}

  /**
   * Возможно совпадение ID в разных источниках
   * Поэтому генерируем ID для внутреннего использования
   * Настоящий ID также доступен через originalId
   */
  get id(): string {
    return this.provider + '-' + this.originalId
  }

  /**
   * Этот метод можно использовать для установления источника
   */
  public isProvidedBy(providerName: string): boolean {
    return this.provider === providerName
  }
}
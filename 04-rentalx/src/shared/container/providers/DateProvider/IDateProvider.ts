export interface IDateProvider {
  compareDatesInHours(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  getCurrentDate(): Date;
}

export interface IDateProvider {
  compareDatesInDays(startDate: Date, endDate: Date): number;
  compareDatesInHours(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  getCurrentDate(): Date;
  addDaysToDate(date: Date, days: number): Date;
}

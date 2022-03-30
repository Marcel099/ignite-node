export interface IDateProvider {
  compareDatesInDays(startDate: Date, endDate: Date): number;
  compareDatesInHours(startDate: Date, endDate: Date): number;
  compareIfDatesAreSequentials(firstDate: Date, secondDate: Date): boolean;
  convertToUTC(date: Date): string;
  getCurrentDate(): Date;
  addDaysToDate(date: Date, days: number): Date;
  addHoursToDate(date: Date, hours: number): Date;
}

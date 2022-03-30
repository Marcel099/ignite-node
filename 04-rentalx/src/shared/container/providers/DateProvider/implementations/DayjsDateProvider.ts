import dayjs from "dayjs";

import { IDateProvider } from "../IDateProvider";

export class DayjsDateProvider implements IDateProvider {
  compareDatesInDays(startDate: Date, endDate: Date): number {
    const startDateUtc = this.convertToUTC(startDate);
    const endDateUtc = this.convertToUTC(endDate);

    return dayjs(endDateUtc).diff(startDateUtc, "days");
  }

  compareDatesInHours(startDate: Date, endDate: Date): number {
    const startDateUtc = this.convertToUTC(startDate);
    const endDateUtc = this.convertToUTC(endDate);

    return dayjs(endDateUtc).diff(startDateUtc, "hours");
  }

  compareIfDatesAreSequentials(firstDate: Date, secondDate: Date): boolean {
    return dayjs(firstDate).isBefore(secondDate);
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  getCurrentDate(): Date {
    return dayjs().toDate();
  }

  addDaysToDate(date: Date, days: number): Date {
    return dayjs(date).add(days, "days").toDate();
  }

  addHoursToDate(date: Date, hours: number): Date {
    return dayjs(date).add(hours, "hours").toDate();
  }
}

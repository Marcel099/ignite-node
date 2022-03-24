import dayjs from "dayjs";

import { IDateProvider } from "../IDateProvider";

export class DayjsDateProvider implements IDateProvider {
  compareDatesInHours(startDate: Date, endDate: Date): number {
    const startDateUtc = this.convertToUTC(startDate);
    const endDateUtc = this.convertToUTC(endDate);

    return dayjs(endDateUtc).diff(startDateUtc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  getCurrentDate(): Date {
    return dayjs().toDate();
  }
}

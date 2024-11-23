import moment from 'moment';

export class DateUtil {

  static FRONT_DATETIME_FORMAT: string = 'DD/MM/YYYY hh:mmA';
  static FRONT_DATE_FORMAT = 'DD/MM/YYYY';
  static FRONT_TIME_FORMAT = 'hh:mmA';

  static BACK_DATETIME_FORMAT: string = 'YYYY-MM-DD hh:mmA';
  static BACK_DATE_FORMAT = 'YYYY-MM-DD';
  static BACK_TIME_FORMAT = 'hh:mmA';

  static moment = moment;

  static isZeroHours = (date: moment.Moment): boolean => {
    return date.toDate().getHours() === 0 && date.toDate().getMinutes() === 0 && date.toDate().getSeconds() === 0;
  }

  static combineDateAndTime(dateString: string, timeString: string, format: string): moment.Moment {
    const combinedString = `${dateString} ${timeString}`;
    const combinedMoment = moment(combinedString, format);
    if (!combinedMoment.isValid()) {
      throw new Error('Fecha u hora no válida');
    }
    return combinedMoment;
  }

  static getRange(range: string, format: string, separator: string = ' - '): [moment.Moment, moment.Moment] {
    var [startString, endString] = range.split(separator);

    const startDate = moment(startString, format);
    if (!startDate.isValid()) {
      throw new Error('Fecha u hora no válida');
    }
    const endDate = moment(endString, format);
    if (!endDate.isValid()) {
      throw new Error('Fecha u hora no válida');
    }
    return [startDate, endDate];
  }

  static isSame(start_date: string | Date | moment.Moment, end_date: string | Date | moment.Moment, format: string) {
    return moment(start_date).format(format) === moment(end_date).format(format);
  }

  static getDifference(start: string | Date | moment.Moment, end: string | Date | moment.Moment, field: moment.unitOfTime.Diff) {
    const startMoment = moment.utc(start);
    const endMoment = moment.utc(end);

    return endMoment.diff(startMoment, field);
  }

  static toBackDate(date: string | Date | moment.Moment) {
    return date ? moment(date, DateUtil.FRONT_DATE_FORMAT).format(DateUtil.BACK_DATE_FORMAT) : '';
  }

  static toBackDateTime(datetime: string | Date | moment.Moment) {
    return datetime ? moment(datetime, DateUtil.FRONT_DATETIME_FORMAT).format(DateUtil.BACK_DATETIME_FORMAT) : '';
  }

  static toFrontDate(date: string | Date | moment.Moment) {
    return date ? moment(date, DateUtil.BACK_DATE_FORMAT).format(DateUtil.FRONT_DATE_FORMAT) : '';
  }

  static toFrontDateTime(datetime: string | Date | moment.Moment) {
    return datetime ? moment(datetime, DateUtil.BACK_DATETIME_FORMAT).format(DateUtil.FRONT_DATETIME_FORMAT) : '';
  }

  static toFrontTime(date: string | Date | moment.Moment) {
    return date ? moment(date, DateUtil.BACK_DATETIME_FORMAT).format(DateUtil.FRONT_TIME_FORMAT) : '';
  }

  static startOfDay(date: string | Date | moment.Moment, timezone_offset: number) {
    // Ejemplo de una fecha y hora específica
    return moment(date).utc().subtract(timezone_offset, 'minutes').startOf('day').add(timezone_offset, 'minutes');
  }
}
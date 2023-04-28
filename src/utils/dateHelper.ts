import moment from 'moment';

export class DateHelper {
	public static formatDate(
		date: Date,
		format: string = 'DD/MM/YYYY HH:mm'
	): string {
		return moment(date).format(format);
	}
}

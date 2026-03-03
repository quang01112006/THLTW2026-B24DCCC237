import { TrangThai } from './constants';
module Sach {
	export interface Record {
		id: string;
		name: string;
		author: string;
		category: string;
		year: string;
		quantity: number;
		status: TrangThai;
	}
}

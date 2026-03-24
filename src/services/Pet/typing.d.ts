import { LoaiPet, TrangThaiPet } from './constants';

module Pet {
	export interface Record {
		id: number;
		tenPet: string;
		loai: LoaiPet;
		soLuong: number;
		giaBan: number;
		trangThai: TrangThaiPet;
	}
}

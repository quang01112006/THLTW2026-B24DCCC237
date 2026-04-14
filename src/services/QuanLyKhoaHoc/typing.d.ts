import type { ETrangThai } from './constants';

declare module QuanLyKhoaHoc {
	export interface IKhoaHoc {
		id: string;
		ten: string;
		giangVien: string;
		soLuongHocVien: number;
		trangThai: ETrangThai;
		moTa?: string;
	}
	export interface IGiangVien {
		id: string;
		ten: string;
	}
}

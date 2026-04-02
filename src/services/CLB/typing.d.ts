import type { EGioiTinh, ETrangThaiCLB, ETrangThaiDonDangKi } from './constants';

declare module CLB {
	export interface IRecord {
		id: string;
		ten: string;
		anhDaiDien: string;
		ngayThanhLap: string;
		moTa: string;
		chuNhiem: string;
		dangHoatDong: ETrangThaiCLB;
	}
	export interface IDonDangKi {
		id: string;
		hoTen: string;
		email: string;
		soDienThoai: string;
		gioiTinh: EGioiTinh;
		diaChi: string;
		soTruong: string;
		idCLB: string;
		lyDoDangKi: string;
		trangThai: ETrangThaiDonDangKi;
		ghiChu?: string;
	}
	export interface ILichSuThaoTac {
		id: string;
		idDon: string;
		thoiGian: string;
		noiDung: string;
		hanhDong: ETrangThaiDon;
	}
}

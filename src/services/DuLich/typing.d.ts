import type { ELoaiHinh, EPhanKhucGia } from './constants';

declare module DuLich {
	export interface IChiPhi {
		anUong: number;
		luuTru: number;
		diChuyen: number;
	}
	export interface IDiemDen {
		id: string;
		ten: string;
		hinhAnh: string;
		loaiHinh: ELoaiHinh;
		mucChiPhi: IChiPhi;
		tongChiPhi: number;
		danhGia: number;
		moTa: string;
		thoiGianThamQuan: number;
		phanKhucGia: EPhanKhucGia;
	}

	export interface INgayTrongLichTrinh {
		idNgay: string;
		tenNgay: string;
		diemDenIds: string[];
	}

	export interface ILichTrinh {
		id: string;
		tenChuyenDi: string;
		nganSachToiDa: number;
		cacNgay: INgayTrongLichTrinh[];
	}
}

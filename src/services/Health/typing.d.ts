import type { ELoaiBaiTap, ELoaiMucTieu, EMucDoKho, ETrangThaiBuoiTap, ETrangThaiMucTieu } from './constants';

declare module Health {
	export interface IBuoiTap {
		id: string;
		ngay: string;
		loaiBaiTap: ELoaiBaiTap;
		thoiLuong: number;
		calo: number;
		ghiChu: string;
		trangThai: ETrangThaiBuoiTap;
		baiTapId: string;
	}
	export interface IChiSoSucKhoe {
		id: string;
		ngay: string;
		canNang: number;
		chieuCao: number;
		nhipTim: number;
		gioNgu: number;
	}
	export interface IMucTieu {
		id: string;
		ten: string;
		loai: ELoaiMucTieu;
		giaTriMucTieu: number;
		giaTriHienTai: number;
		trangThai: ETrangThaiMucTieu;
		deadline: string;
	}
	export interface IBaiTap {
		id: string;
		ten: string;
		nhomCoTacDong: string[];
		doKho: EMucDoKho;
		moTaNgan: string;
		caloTrenGio: number;
	}
}

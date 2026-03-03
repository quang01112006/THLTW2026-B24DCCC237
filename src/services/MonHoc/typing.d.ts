module MonHoc {
	export interface Record {
		id: number;
		ten: string;
		mucTieuHangThang: number;
	}
	export interface TienDo {
		id: number;
		idMonHoc: number;
		thoiGianHoc: string;
		thoiLuongHoc: number;
		noiDungDaHoc: string;
		ghiChu: string;
	}
}

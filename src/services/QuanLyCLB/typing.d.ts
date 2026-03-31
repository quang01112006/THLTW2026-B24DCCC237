declare module QuanLyCLB {
	export interface CLB {
		id: string;
		tenCLB: string;
		anhDaiDien: string;
		ngayThanhLap: string;
		moTa: string;
		chuNhiem: string;
		dangHoatDong: boolean;
	}
	export interface DonDangKy {
		id: string;
		hoTen: string;
		email: string;
		soDienThoai: string;
		gioiTinh: 'Nam' | 'Nữ';
		diaChi: string;
		soTruong: string;
		idCLB: string;
		lyDo: string;
		trangThai: 'Pending' | 'Approved' | 'Rejected';
		ghiChuAdmin?: string;
	}
	export interface LichSuThaoTac {
		id: string;
		idDon: string;
		nguoiThucHien: string;
		hanhDong: 'Pending' | 'Approved' | 'Rejected';
		thoiGian: string;
		noiDung: string;
	}
}

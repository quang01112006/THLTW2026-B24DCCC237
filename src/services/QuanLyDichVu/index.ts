module QuanLyDichVu {
	export interface LichLamViec {
		thu: number;
		caBatDau: string;
		caKetThuc: string;
	}
	export interface NhanVien {
		id: number;
		ten: string;
		gioiHanKhach: number;
		lichLamViec: LichLamViec[];
	}
	export interface LichHen {
		id: number;
		tenKhachHang: string;
		soDienThoai: string;
		idNhanVien: number;
		idDichVu: number;
		ngayHen: string;
		gioHen: string;
		trangThai: 'CHO_DUYET' | 'XAC_NHAN' | 'HOAN_THANH' | 'HUY';
	}
	export interface DichVu {
		id: number;
		tenDichVu: string;
		gia: number;
		thoiGianThucHien: number;
		moTa?: string;
	}
	export interface DanhGia {
		id: number;
		idLichHen: number;
		tenKhachHang: string;
		soSao: number;
		binhLuan: string;
		ngayDanhGia: string;
	}
}

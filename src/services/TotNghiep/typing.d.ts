module TotNghiep {
	export interface SoVanBang {
		id: string;
		tenSo: string;
		namHoc: number;
		soVaoSoHienTai: number;
	}
	interface QuyetDinh {
		id: string;
		soQD: string;
		ngayBanHanh: string;
		idSoVanBang: string;
		tongLuotTraCuu: number;
	}
	interface CauHinhTruong {
		id: string;
		tenTruong: string; // Ví dụ Nơi sinh, d tộc, điểm tb các thứ...
		kieuDuLieu: 'String' | 'Number' | 'Date';
	}
	interface VanBang {
		id: string;
		idQuyetDinh: string;
		maSinhVien: string;
		hoTen: string;
		ngaySinh: string;
		soVaoSo: number; // lấy từ SoVanBang.soVaoSoHienTai
		soHieuVanBang: string;
		duLieuCauHinh: Record<string, any>;
	}
}

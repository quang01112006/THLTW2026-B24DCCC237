module QuanLyThi {
	export interface CauHoi {
		id: number;
		maCauHoi: string;
		idMonHoc: number;
		idKhoiKienThuc: number;
		noiDung: string;
		doKho: 'DE' | 'TRUNG_BINH' | 'KHO' | 'RAT_KHO';
	}

	export interface DeThi {
		id: number;
		tenDeThi: string;
		idMonHoc: number;
		dsCauHoi: number[];
		ngayTao: string;
	}
}

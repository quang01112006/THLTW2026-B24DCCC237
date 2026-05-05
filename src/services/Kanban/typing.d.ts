declare module Kanban {
	export interface IRecord {
		id: string;
		tenTask: string;
		moTa?: string;
		deadline: string;
		mucDoUuTien: EMucDoUuTienTask;
		trangThai: ETrangThaiTask;
		tags?: string[];
		createdAt?: string;
		updatedAt?: string;
	}

	export interface IThongKe {
		tongSo: number;
		hoanThanh: number;
		quaHan: number;
	}
}

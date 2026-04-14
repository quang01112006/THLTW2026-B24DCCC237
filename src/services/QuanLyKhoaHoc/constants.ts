export enum ETrangThai {
	DANG_MO = 'Đang mở',
	DA_KET_THUC = 'Đã kết thúc',
	TAM_DUNG = 'Tạm dừng',
}
export const STATUS_MAP = {
	[ETrangThai.DANG_MO]: { color: 'green' },
	[ETrangThai.DA_KET_THUC]: { color: 'red' },
	[ETrangThai.TAM_DUNG]: { color: 'orange' },
};
export const LECTURER_MAP = {
	GV_TuanAnh: 'Tuấn Anh',
	GV_PhuongLinh: 'Phương Linh',
};

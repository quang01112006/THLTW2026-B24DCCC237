export enum ETrangThaiBuoiTap {
	HOAN_THANH = 'Hoàn thành',
	BO_LO = 'Bỏ lỡ',
}
export enum EMucDoKho {
	DE = 'Dễ',
	TRUNG_BINH = 'Trung bình',
	KHO = 'Khó',
}
export enum ELoaiMucTieu {
	GIAM_CAN = 'Giảm cân',
	TANG_CO = 'Tăng cơ',
	TANG_SUC_BEN = 'Tăng sức bền',
	KHAC = 'Khác',
}
export enum ETrangThaiMucTieu {
	DANG_THUC_HIEN = 'Đang thực hiện',
	DA_DAT = 'Đã đạt',
	DA_HUY = 'Đã hủy',
}
export enum ELoaiBaiTap {
	CARDIO = 'Cardio',
	STRENGTH = 'Strength',
	YOGA = 'Yoga',
	HIIT = 'HIIT',
	OTHER = 'Other',
}
export enum ENhomCo {
	CHEST = 'Chest',
	BACK = 'Back',
	LEGS = 'Legs',
	SHOULDERS = 'Shoulders',
	ARMS = 'Arms',
	CORE = 'Core',
	FULL_BODY = 'Full Body',
}
export const ColorDoKho = {
	[EMucDoKho.DE]: 'green',
	[EMucDoKho.TRUNG_BINH]: 'orange',
	[EMucDoKho.KHO]: 'red',
};
export const ColorTrangThaiBaiTap = {
	[ETrangThaiBuoiTap.HOAN_THANH]: 'green',
	[ETrangThaiBuoiTap.BO_LO]: 'red',
};

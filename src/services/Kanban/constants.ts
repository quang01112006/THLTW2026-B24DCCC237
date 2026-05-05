export const ETrangThaiTask = {
	CAN_LAM: 'Cần làm',
	DANG_LAM: 'Đang làm',
	HOAN_THANH: 'Hoàn thành',
} as const;

export const EMucDoUuTienTask = {
	CAO: 'Cao',
	TRUNG_BINH: 'Trung bình',
	THAP: 'Thấp',
} as const;

export type TTrangThaiTask = (typeof ETrangThaiTask)[keyof typeof ETrangThaiTask];
export type TMucDoUuTienTask = (typeof EMucDoUuTienTask)[keyof typeof EMucDoUuTienTask];

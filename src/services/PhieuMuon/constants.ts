export const TrangThai = {
	BORROWING: 'BORROWING',
	RETURNED: 'RETURNED',
	OVERDUE: 'OVERDUE',
};
export const HienThiTrangThai = {
	[TrangThai.BORROWING]: { label: 'Đang mượn', color: 'blue' },
	[TrangThai.RETURNED]: { label: 'Đã trả', color: 'green' },
	[TrangThai.OVERDUE]: { label: 'Quá hạn', color: 'red' },
};
export const OptionTrangThai = Object.keys(HienThiTrangThai).map((key) => ({
	value: key,
	label: HienThiTrangThai[key].label,
}));

export const TrangThai = {
	AVAILABLE: 'AVAILABLE',
	UNAVAILABLE: 'UNAVAILABLE',
};

export const HienThiTrangThai = {
	[TrangThai.AVAILABLE]: { label: 'Sẵn có', color: 'green' },
	[TrangThai.UNAVAILABLE]: { label: 'Đã mượn hết', color: 'grey' },
};
export const OptionTrangThai = Object.keys(HienThiTrangThai).map((key) => ({
	value: key,
	label: HienThiTrangThai[key].label,
}));

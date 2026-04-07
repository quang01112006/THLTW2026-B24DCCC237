export enum ELoaiHinh {
	NUI = 'NUI',
	BIEN = 'BIEN',
	THANH_PHO = 'THANH_PHO',
}
export const TextLoaiHinh = {
	[ELoaiHinh.NUI]: 'Núi',
	[ELoaiHinh.BIEN]: 'Biển',
	[ELoaiHinh.THANH_PHO]: 'Thành phố',
};

export enum EPhanKhucGia {
	GIA_RE = 'GIA_RE',
	PHO_THONG = 'PHO_THONG',
	CAO_CAP = 'CAO_CAP',
}
export const TextPhanKhucGia = {
	[EPhanKhucGia.GIA_RE]: 'Giá rẻ',
	[EPhanKhucGia.PHO_THONG]: 'Phổ thông',
	[EPhanKhucGia.CAO_CAP]: 'Cao cấp',
};
export const PHAN_KHUC_GIA_COLORS = {
	[EPhanKhucGia.GIA_RE]: 'green',
	[EPhanKhucGia.PHO_THONG]: 'blue',
	[EPhanKhucGia.CAO_CAP]: 'gold',
};

export enum TrangThaiPet {
	CON_HANG = 'CON_HANG',
	HET_HANG = 'HET_HANG',
}
export const TextTrangThaiPet = {
	[TrangThaiPet.CON_HANG]: { label: 'Còn hàng', color: 'green' },
	[TrangThaiPet.HET_HANG]: { label: 'Hết hàng', color: 'grey' },
};
export enum LoaiPet {
	CHO = 'CHO',
	MEO = 'MEO',
	CHIM = 'CHIM',
	CHUOT = 'CHUOT',
	CA = 'CA',
}
export const HienThiLoaiPet = {
	[LoaiPet.CHO]: 'Chó',
	[LoaiPet.MEO]: 'Mèo',
	[LoaiPet.CHIM]: 'Chim',
	[LoaiPet.CHUOT]: 'Chuột',
	[LoaiPet.CA]: 'Cá',
};

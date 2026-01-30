export enum TrangThaiDonHang {
	PENDING = 'Chờ xử lý',
	SHIPPING = 'Đang giao',
	SUCCESS = 'Hoàn thành',
	CANCELLED = 'Đã hủy',
}
export const HienThiTrangThaiDonHang = {
	[TrangThaiDonHang.PENDING]: { label: 'Chờ xử lý', color: 'orange' },
	[TrangThaiDonHang.SHIPPING]: { label: 'Đang giao', color: 'blue' },
	[TrangThaiDonHang.SUCCESS]: { label: 'Hoàn thành', color: 'green' },
	[TrangThaiDonHang.CANCELLED]: { label: 'Đã hủy', color: 'grey' },
};

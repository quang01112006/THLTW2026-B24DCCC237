import { TrangThaiDonHang } from '@/services/DonHang/constants';
import { Badge, Card, Col, Progress, Row, Space, Statistic } from 'antd';
import { useModel } from 'umi';

const Dashboard = () => {
	const { donHang } = useModel('donhang');
	const { listSanPham } = useModel('sanpham');

	const totalProducts = listSanPham.length;
	const totalOrders = donHang.length;
	const tongGiaTriTonKho = listSanPham.reduce((sum, sp) => sum + sp.price * sp.quantity, 0);
	const doanhThu = donHang
		.filter((dh) => dh.status === TrangThaiDonHang.SUCCESS)
		.reduce((sum, i) => sum + i.totalAmount, 0);

	const tinhPhanTram = (n: number) => {
		if (totalOrders === 0) return 0;
		return Math.round((n / totalOrders) * 100);
	};
	const choXuLy = donHang.filter((i) => i.status === TrangThaiDonHang.PENDING).length;
	const daHuy = donHang.filter((i) => i.status === TrangThaiDonHang.CANCELLED).length;
	const dangGiao = donHang.filter((i) => i.status === TrangThaiDonHang.SHIPPING).length;
	const thanhCong = donHang.filter((i) => i.status === TrangThaiDonHang.SUCCESS).length;

	const phanTramCho = tinhPhanTram(choXuLy);
	const phanTramHuy = tinhPhanTram(daHuy);
	const phanTramGiao = tinhPhanTram(dangGiao);
	const phanTramThanhCong = tinhPhanTram(thanhCong);

	return (
		<Card title='Dashboard'>
			<Row gutter={[16, 16]}>
				<Col span={6}>
					<Card>
						<Statistic title='Tổng số sản phẩm' value={totalProducts}></Statistic>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title='Tổng số đơn hàng' value={totalOrders}></Statistic>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title='Tổng giá trị tồn kho'
							value={tongGiaTriTonKho}
							valueStyle={{ color: 'green' }}
							suffix='đ'
						></Statistic>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title='Doanh thu' value={doanhThu}></Statistic>
					</Card>
				</Col>
			</Row>

			<Row gutter={[24, 24]} style={{ marginTop: 24 }}>
				<Col span={8}>
					<Card
						title='Tỉ lệ hoàn thành'
						bodyStyle={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '200px',
						}}
					>
						<Progress type='circle' percent={phanTramThanhCong} strokeColor={'green'} />
					</Card>
				</Col>
				<Col span={16}>
					<Space direction='vertical' style={{ width: '100%' }} size={'large'}>
						<div>
							<Space style={{ justifyContent: 'space-between', marginBottom: 5 }}>
								<Badge status='processing' text='Chờ xử lý' />
								<span>
									{choXuLy} đơn ({phanTramCho}%)
								</span>
							</Space>
							<Progress percent={phanTramCho} showInfo={false} status='active' />
						</div>
						<div>
							<Space style={{ justifyContent: 'space-between', marginBottom: 5 }}>
								<Badge status='warning' text='Đang giao' />
								<span>
									{dangGiao} đơn ({phanTramGiao}%)
								</span>
							</Space>
							<Progress percent={phanTramGiao} strokeColor='blue' showInfo={false} />
						</div>
						<div>
							<Space style={{ justifyContent: 'space-between', marginBottom: 5 }}>
								<Badge status='success' text='Hoàn thành' />
								<span>
									{thanhCong} đơn ({phanTramThanhCong}%)
								</span>
							</Space>
							<Progress percent={phanTramThanhCong} strokeColor='green' showInfo={false} />
						</div>

						<div>
							<Space style={{ justifyContent: 'space-between', marginBottom: 5 }}>
								<Badge status='error' text='Đã hủy' />
								<span>
									{daHuy} đơn ({phanTramHuy}%)
								</span>
							</Space>
							<Progress percent={phanTramHuy} strokeColor='red' showInfo={false} />
						</div>
					</Space>
				</Col>
			</Row>
		</Card>
	);
};
export default Dashboard;

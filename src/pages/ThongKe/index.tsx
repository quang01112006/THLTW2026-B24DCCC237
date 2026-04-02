import ColumnChart from '@/components/Chart/ColumnChart';
import { ETrangThaiDonDangKi } from '@/services/CLB/constants';
import { FileSearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { useModel } from 'umi';

const ThongKePage = () => {
	const { dsCLB } = useModel('clb');
	const { dsDon } = useModel('dondangki');

	const tongCLB = dsCLB.length;
	const totalMembers = dsDon.filter((i) => i.trangThai === ETrangThaiDonDangKi.APPROVED).length;
	const pendingDon = dsDon.filter((i) => i.trangThai === ETrangThaiDonDangKi.PENDING).length;

	const tenCacCLB = dsCLB.map((clb) => clb.ten);
	const soLuongThanhVien = dsCLB.map(
		(clb) => dsDon.filter((don) => don.idCLB === clb.id && don.trangThai === ETrangThaiDonDangKi.APPROVED).length,
	);

	return (
		<div style={{ padding: '20px' }}>
			<Row gutter={16}>
				<Col span={8}>
					<Card>
						<Statistic title='Tổng số CLB' value={tongCLB} prefix={<HomeOutlined />} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title='Tổng số Thành viên'
							value={totalMembers}
							prefix={<UserOutlined />}
							valueStyle={{ color: '#3f8600' }}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title='Đơn đang chờ xử lý'
							value={pendingDon}
							prefix={<FileSearchOutlined />}
							valueStyle={{ color: '#cf1322' }}
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={16} style={{ marginTop: '20px' }}>
				<Col span={24}>
					<Card>
						<ColumnChart
							title='Thống kê số lượng Thành viên theo Câu lạc bộ'
							xAxis={tenCacCLB}
							yLabel={['Thành viên chính thức']}
							yAxis={[soLuongThanhVien]}
							height={400}
							colors={['#52c41a']}
							type='bar'
							formatY={(val: number) => `${Math.floor(val)} thành viên`}
							otherOptions={
								{
									yaxis: {
										labels: {
											formatter: (val: number) => Math.floor(val),
										},
										tickAmount: Math.max(...soLuongThanhVien, 1),
									},
								} as any
							}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ThongKePage;

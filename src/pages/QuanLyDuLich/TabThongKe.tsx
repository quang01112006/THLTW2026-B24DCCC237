import { EnvironmentOutlined, ProjectOutlined, TransactionOutlined } from '@ant-design/icons';
import { Card, Col, List, Progress, Row, Space, Statistic, Typography } from 'antd';
import { useModel } from 'umi';

const { Text } = Typography;

const TabThongKe = () => {
	const { dsDiemDen } = useModel('diemden');
	const { dsLichTrinh } = useModel('lichtrinh');

	const tongLichTrinh = dsLichTrinh.length;
	const tongDoanhThu = dsLichTrinh.reduce((sum, lt) => sum + (lt.nganSachToiDa || 0), 0);

	const counts: Record<string, number> = {};
	dsLichTrinh.forEach((lt) => {
		lt.cacNgay.forEach((ngay) => {
			ngay.diemDenIds.forEach((id) => {
				counts[id] = (counts[id] || 0) + 1;
			});
		});
	});

	const hotId = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), '');
	const hotName = dsDiemDen.find((d) => d.id === hotId)?.ten || 'Chưa có';

	const systemBudget = dsLichTrinh.reduce(
		(acc, lt) => {
			lt.cacNgay.forEach((ngay) => {
				ngay.diemDenIds.forEach((id) => {
					const detail = dsDiemDen.find((d) => d.id === id);
					if (detail) {
						acc.anUong += detail.mucChiPhi.anUong;
						acc.luuTru += detail.mucChiPhi.luuTru;
						acc.diChuyen += detail.mucChiPhi.diChuyen;
					}
				});
			});
			return acc;
		},
		{ anUong: 0, luuTru: 0, diChuyen: 0 },
	);

	const totalSystemCost = systemBudget.anUong + systemBudget.luuTru + systemBudget.diChuyen;

	return (
		<div style={{ padding: '10px 0' }}>
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
						<Statistic
							title='Tổng lượt Lịch trình'
							value={tongLichTrinh}
							valueStyle={{ color: '#3f8600' }}
							prefix={<ProjectOutlined />}
							suffix='lượt'
						/>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
						<Statistic
							title='Tổng ngân sách dự kiến'
							value={tongDoanhThu}
							valueStyle={{ color: '#1890ff' }}
							prefix={<TransactionOutlined />}
							suffix='đ'
						/>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
						<Statistic
							title='Địa điểm phổ biến nhất'
							value={hotName}
							valueStyle={{ color: '#cf1322', fontSize: 20 }}
							prefix={<EnvironmentOutlined />}
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
				<Col xs={24} lg={12}>
					<Card title='Top 5 địa điểm được yêu thích' bordered={false}>
						<List
							dataSource={Object.keys(counts)
								.sort((a, b) => counts[b] - counts[a])
								.slice(0, 5)}
							renderItem={(id) => {
								const name = dsDiemDen.find((d) => d.id === id)?.ten;
								const count = counts[id];
								const percent = Math.round((count / tongLichTrinh) * 100);
								return (
									<div style={{ marginBottom: 16 }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
											<Text strong>{name}</Text>
											<Text>{count} lượt chọn</Text>
										</div>
										<Progress percent={percent} status='active' strokeColor='#52c41a' />
									</div>
								);
							}}
						/>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title='Cơ cấu chi tiêu hệ thống' bordered={false}>
						<div style={{ textAlign: 'center', marginBottom: 20 }}>
							<Progress
								type='dashboard'
								percent={100}
								format={() => `${(totalSystemCost / 1000000).toFixed(1)}M`}
								strokeColor='#1890ff'
							/>
							<div style={{ marginTop: -20 }}>
								<Text type='secondary'>Tổng chi phí (VND)</Text>
							</div>
						</div>
						<Space direction='vertical' style={{ width: '100%' }}>
							<div>
								<Text>Ăn uống: {systemBudget.anUong.toLocaleString()}đ</Text>
								<Progress
									percent={totalSystemCost > 0 ? Math.round((systemBudget.anUong / totalSystemCost) * 100) : 0}
									size='small'
								/>
							</div>
							<div>
								<Text>Lưu trú: {systemBudget.luuTru.toLocaleString()}đ</Text>
								<Progress
									percent={totalSystemCost > 0 ? Math.round((systemBudget.luuTru / totalSystemCost) * 100) : 0}
									size='small'
									strokeColor='#722ed1'
								/>
							</div>
							<div>
								<Text> Di chuyển: {systemBudget.diChuyen.toLocaleString()}đ</Text>
								<Progress
									percent={totalSystemCost > 0 ? Math.round((systemBudget.diChuyen / totalSystemCost) * 100) : 0}
									size='small'
									strokeColor='#faad14'
								/>
							</div>
						</Space>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default TabThongKe;

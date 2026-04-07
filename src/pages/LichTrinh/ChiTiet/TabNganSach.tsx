import { Alert, Card, Col, List, Progress, Row, Statistic, Typography } from 'antd';
import { useModel } from 'umi';

const { Text } = Typography;

const TabNganSach = ({ lichTrinh }: { lichTrinh: any }) => {
	const { dsDiemDen } = useModel('diemden');

	const allDiemIds = lichTrinh.cacNgay.flatMap((n: any) => n.diemDenIds);
	const selectedData = allDiemIds.map((id: string) => dsDiemDen.find((d: any) => d.id === id)).filter(Boolean);

	const chiPhi = selectedData.reduce(
		(acc: any, curr: any) => {
			acc.anUong += curr.mucChiPhi.anUong;
			acc.luuTru += curr.mucChiPhi.luuTru;
			acc.diChuyen += curr.mucChiPhi.diChuyen;
			acc.tong += curr.tongChiPhi;
			return acc;
		},
		{ anUong: 0, luuTru: 0, diChuyen: 0, tong: 0 },
	);

	const limit = lichTrinh.nganSachToiDa;
	const isOver = chiPhi.tong > limit;
	const phanTram = limit > 0 ? Math.round((chiPhi.tong / limit) * 100) : 0;

	const details = [
		{ label: 'Ăn uống', value: chiPhi.anUong, color: '#1890ff' },
		{ label: 'Lưu trú', value: chiPhi.luuTru, color: '#722ed1' },
		{ label: 'Di chuyển', value: chiPhi.diChuyen, color: '#faad14' },
	];

	return (
		<div style={{ marginTop: 16 }}>
			{isOver && (
				<Alert
					message='Vượt ngân sách dự kiến!'
					description={`Đã tiêu quá ${(chiPhi.tong - limit).toLocaleString()}đ so với kế hoạch ban đầu.`}
					type='error'
					showIcon
					style={{ marginBottom: 24 }}
				/>
			)}

			<Row gutter={16}>
				<Col xs={24} md={10}>
					<Card title='Tình trạng ngân sách' bordered={false} style={{ textAlign: 'center' }}>
						<Progress
							type='circle'
							percent={phanTram}
							status={isOver ? 'exception' : 'normal'}
							strokeColor={isOver ? '#f5222d' : '#52c41a'}
							width={160}
						/>
						<div style={{ marginTop: 24 }}>
							<Statistic
								title='Đã chi tiêu / Tổng ngân sách'
								value={`${chiPhi.tong.toLocaleString()} / ${limit.toLocaleString()}`}
								suffix='đ'
							/>
						</div>
					</Card>
				</Col>

				<Col xs={24} md={14}>
					<Card title='Chi tiết các hạng mục' bordered={false}>
						<List
							dataSource={details}
							renderItem={(item) => (
								<List.Item style={{ border: 'none', padding: '12px 0' }}>
									<div style={{ width: '100%' }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
											<Text strong>{item.label}</Text>
											<Text>{item.value.toLocaleString()}đ</Text>
										</div>
										<Progress
											percent={chiPhi.tong > 0 ? Math.round((item.value / chiPhi.tong) * 100) : 0}
											strokeColor={item.color}
											status='active'
											showInfo={true}
										/>
									</div>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default TabNganSach;

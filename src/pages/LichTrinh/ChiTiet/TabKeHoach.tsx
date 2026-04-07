import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	ClockCircleOutlined,
	DeleteOutlined,
	EnvironmentOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Empty, List, Select, Space, Tabs, Tag, Typography } from 'antd';
import { useModel } from 'umi';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

const TabKeHoach = ({ lichTrinh }: { lichTrinh: any }) => {
	const { dsDiemDen } = useModel('diemden');
	const { addDiemDenToLichTrinh, removeDiemDenFromLichTrinh, reorderDiemDen, addNgay } = useModel('lichtrinh');

	const renderDayContent = (ngay: any) => {
		const diemDenCuaNgay = ngay.diemDenIds.map((id: string) => dsDiemDen.find((d: any) => d.id === id)).filter(Boolean);

		return (
			<div style={{ padding: '10px 0' }}>
				<div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
					<Select
						showSearch
						placeholder='Thêm nhanh điểm đến vào ngày này...'
						style={{ flex: 1 }}
						optionFilterProp='children'
						onChange={(val) => addDiemDenToLichTrinh(lichTrinh.id, ngay.idNgay, val)}
						value={null}
					>
						{dsDiemDen.map((d) => (
							<Select.Option key={d.id} value={d.id}>
								{d.ten}
							</Select.Option>
						))}
					</Select>
					<Button icon={<EnvironmentOutlined />}>Bản đồ</Button>
				</div>

				<List
					dataSource={diemDenCuaNgay}
					locale={{ emptyText: <Empty description='Ngày này chưa có điểm đến nào' /> }}
					renderItem={(item: any, index: number) => (
						<div key={item.id}>
							<Card size='small' style={{ borderRadius: 8, marginBottom: 0 }}>
								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<Space size='middle'>
										<Avatar shape='square' size={48} src={item.hinhAnh} />
										<div>
											<Text strong>{item.ten}</Text>
											<div style={{ fontSize: 12, color: '#8c8c8c' }}>
												<ClockCircleOutlined /> Tham quan: {item.thoiGianThamQuan}h
											</div>
										</div>
									</Space>

									<Space>
										<Button
											size='small'
											disabled={index === 0}
											icon={<ArrowUpOutlined />}
											onClick={() => reorderDiemDen(lichTrinh.id, ngay.idNgay, index, index - 1)}
										/>
										<Button
											size='small'
											disabled={index === diemDenCuaNgay.length - 1}
											icon={<ArrowDownOutlined />}
											onClick={() => reorderDiemDen(lichTrinh.id, ngay.idNgay, index, index + 1)}
										/>
										<Button
											danger
											type='text'
											icon={<DeleteOutlined />}
											onClick={() => removeDiemDenFromLichTrinh(lichTrinh.id, ngay.idNgay, item.id)}
										/>
									</Space>
								</div>
							</Card>

							{index < diemDenCuaNgay.length - 1 && (
								<div style={{ padding: '10px 60px', borderLeft: '2px dashed #d9d9d9', marginLeft: 24, marginY: 4 }}>
									<Tag color='orange' icon={<ClockCircleOutlined />}>
										Di chuyển: 30 phút
									</Tag>
								</div>
							)}
						</div>
					)}
				/>
			</div>
		);
	};

	return (
		<div style={{ background: '#fff', padding: 20, borderRadius: 8 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
				<Title level={4} style={{ margin: 0 }}>
					Lộ trình chi tiết
				</Title>
				<Button type='dashed' icon={<PlusOutlined />} onClick={() => addNgay(lichTrinh.id)}>
					Thêm Ngày mới
				</Button>
			</div>

			<Tabs tabPosition='left'>
				{lichTrinh.cacNgay.map((ngay: any) => (
					<TabPane tab={ngay.tenNgay} key={ngay.idNgay}>
						{renderDayContent(ngay)}
					</TabPane>
				))}
			</Tabs>
		</div>
	);
};

export default TabKeHoach;

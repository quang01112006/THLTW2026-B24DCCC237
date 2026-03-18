import { Rate, Card, List, Avatar, Typography, Space, Row, Col, Statistic, Tag, Empty } from 'antd';
import { useModel } from 'umi';
import { UserOutlined, StarFilled, MessageOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const PageDanhGia = () => {
	const { dsDanhGia } = useModel('danhgia');
	const { dsNhanVien } = useModel('nhanvien');
	const { dsDichVu } = useModel('dichvu');

	const tongSo = dsDanhGia.length;
	const diemTrungBinh = tongSo > 0 ? (dsDanhGia.reduce((sum, item) => sum + item.soSao, 0) / tongSo).toFixed(1) : 0;

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<Title level={3}>Đánh giá của khách hàng</Title>

			<Row gutter={16} style={{ marginBottom: 24 }}>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic
							title='Điểm hài lòng trung bình'
							value={diemTrungBinh}
							prefix={<StarFilled style={{ color: '#fadb14' }} />}
							suffix='/ 5.0'
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic
							title='Tổng lượt đánh giá'
							value={tongSo}
							prefix={<MessageOutlined style={{ color: '#1890ff' }} />}
						/>
					</Card>
				</Col>
			</Row>

			<List
				dataSource={dsDanhGia}
				locale={{ emptyText: <Empty description='Chưa có đánh giá nào' /> }}
				renderItem={(item) => {
					const nv = dsNhanVien.find((n) => n.id === item.idNhanVien);
					const dv = dsDichVu.find((d) => d.id === item.idDichVu);

					return (
						<Card style={{ marginBottom: 16, borderRadius: 8 }} hoverable>
							<List.Item.Meta
								avatar={<Avatar size='large' icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />}
								title={
									<Space direction='vertical' style={{ width: '100%' }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
											<Text strong style={{ fontSize: 16 }}>
												{item.tenKhachHang}
											</Text>
											<Text type='secondary' style={{ fontSize: 12 }}>
												{item.ngayRating}
											</Text>
										</div>
										<Rate disabled defaultValue={item.soSao} style={{ fontSize: 14 }} />
									</Space>
								}
								description={
									<div style={{ marginTop: 12 }}>
										<Space style={{ marginBottom: 8 }}>
											{dv && <Tag color='orange'>Dịch vụ: {dv.tenDichVu}</Tag>}
											{nv && <Tag color='blue'>Nhân viên: {nv.ten}</Tag>}
										</Space>

										<div
											style={{
												color: '#333',
												fontSize: 15,
												fontStyle: 'italic',
												padding: '10px',
												background: '#f9f9f9',
												borderRadius: '4px',
												borderLeft: '4px solid #d9d9d9',
											}}
										>
											"{item.binhLuan}"
										</div>
									</div>
								}
							/>
						</Card>
					);
				}}
			/>
		</div>
	);
};

export default PageDanhGia;

import { Card, Col, Row, Statistic, Table, Tag, Typography } from 'antd';
import { useModel } from 'umi';
import { UserOutlined, ShoppingCartOutlined, DollarCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
	const { dsLichHen } = useModel('lichhen');
	const { dsDichVu } = useModel('dichvu');

	// 1. Tính toán số liệu
	const tongKhach = dsLichHen.length;
	const lichHoanThanh = dsLichHen.filter((item) => item.trangThai === 'HOAN_THANH');

	// Tính tổng doanh thu: Map qua lịch hoàn thành, tìm giá tiền tương ứng trong dsDichVu
	const tongDoanhThu = lichHoanThanh.reduce((sum, hen) => {
		const dv = dsDichVu.find((d) => d.id === hen.idDichVu);
		return sum + (dv?.gia || 0);
	}, 0);

	const tyLeHoanThanh = tongKhach > 0 ? (lichHoanThanh.length / tongKhach) * 100 : 0;

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<Title level={3} style={{ marginBottom: 24 }}>
				BÁO CÁO KINH DOANH
			</Title>

			<Row gutter={[16, 16]}>
				<Col xs={24} sm={12} md={6}>
					<Card bordered={false}>
						<Statistic
							title='Tổng số lịch đặt'
							value={tongKhach}
							prefix={<ShoppingCartOutlined style={{ color: '#1890ff' }} />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card bordered={false}>
						<Statistic
							title='Doanh thu (Hoàn thành)'
							value={tongDoanhThu}
							suffix='đ'
							groupSeparator='.'
							valueStyle={{ color: '#cf1322' }}
							prefix={<DollarCircleOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card bordered={false}>
						<Statistic
							title='Khách đã phục vụ'
							value={lichHoanThanh.length}
							prefix={<UserOutlined style={{ color: '#52c41a' }} />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card bordered={false}>
						<Statistic
							title='Tỷ lệ thành công'
							value={tyLeHoanThanh}
							precision={1}
							suffix='%'
							prefix={<CheckCircleOutlined style={{ color: '#722ed1' }} />}
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
				<Col span={24}>
					<Card title='Lịch hẹn mới nhất cần xử lý' bordered={false}>
						<Table
							dataSource={dsLichHen.filter((i) => i.trangThai === 'CHO_DUYET').slice(0, 5)}
							pagination={false}
							rowKey='id'
							columns={[
								{ title: 'Khách hàng', dataIndex: 'tenKhachHang' },
								{ title: 'Giờ', dataIndex: 'gioHen' },
								{ title: 'Ngày', dataIndex: 'ngayHen' },
								{
									title: 'Trạng thái',
									render: () => <Tag color='orange'>Chờ duyệt</Tag>,
								},
							]}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;

import { CalendarOutlined, DollarOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, InputNumber, List, Modal, Row, Statistic, Tag, Typography } from 'antd';
import { useState } from 'react';
import { history, useModel } from 'umi';

const { Title, Text } = Typography;

const LichTrinhPage = () => {
	const { dsLichTrinh, addLichTrinh } = useModel('lichtrinh');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const handleCreate = (values: any) => {
		const newId = `LT_${Date.now()}`;
		addLichTrinh({
			id: newId,
			tenChuyenDi: values.ten,
			nganSachToiDa: values.nganSach,

			cacNgay: [{ idNgay: 'day_1', tenNgay: 'Ngày 1', diemDenIds: [] }],
		});
		setIsModalOpen(false);
		form.resetFields();

		history.push(`/lich-trinh/${newId}`);
	};

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<Row justify='space-between' align='middle' style={{ marginBottom: 24 }}>
				<Col>
					<Title level={2} style={{ marginBottom: 0 }}>
						Lịch trình của tôi
					</Title>
					<Text type='secondary'>Quản lý và theo dõi các chuyến đi của bạn</Text>
				</Col>
				<Col>
					<Button
						type='primary'
						icon={<PlusOutlined />}
						size='large'
						onClick={() => setIsModalOpen(true)}
						style={{ borderRadius: '8px' }}
					>
						Tạo chuyến đi mới
					</Button>
				</Col>
			</Row>

			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 2,
					lg: 3,
					xl: 3,
					xxl: 4,
				}}
				dataSource={dsLichTrinh}
				locale={{ emptyText: 'Bạn chưa có lịch trình nào. Hãy tạo chuyến đi đầu tiên!' }}
				renderItem={(item) => (
					<List.Item>
						<Card
							hoverable
							style={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
							onClick={() => history.push(`/lich-trinh/${item.id}`)}
							actions={[
								<div key='go' style={{ color: '#1890ff' }}>
									Chi tiết kế hoạch <RightOutlined />
								</div>,
							]}
						>
							<div style={{ marginBottom: 16 }}>
								<Title level={4} ellipsis={{ rows: 1 }} style={{ marginBottom: 4 }}>
									{item.tenChuyenDi}
								</Title>
								<Tag color='blue' icon={<CalendarOutlined />}>
									{item.cacNgay.length} ngày
								</Tag>
							</div>

							<Row gutter={16}>
								<Col span={24}>
									<Statistic
										title='Ngân sách dự kiến'
										value={item.nganSachToiDa}
										precision={0}
										valueStyle={{ color: '#cf1322', fontSize: '20px' }}
										prefix={<DollarOutlined />}
										suffix='đ'
									/>
								</Col>
							</Row>
						</Card>
					</List.Item>
				)}
			/>

			<Modal
				title='Bắt đầu chuyến hành trình mới'
				visible={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onOk={() => form.submit()}
				okText='Tạo ngay'
				cancelText='Để sau'
				destroyOnClose
			>
				<Form form={form} layout='vertical' onFinish={handleCreate}>
					<Form.Item name='ten' label='Tên chuyến đi'>
						<Input placeholder='VD: Phượt Hà Giang 4N3Đ' size='large' />
					</Form.Item>
					<Form.Item name='nganSach' label='Ngân sách giới hạn (VND)'>
						<InputNumber style={{ width: '100%' }} size='large' min={0} placeholder='VD: 5,000,000' />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default LichTrinhPage;

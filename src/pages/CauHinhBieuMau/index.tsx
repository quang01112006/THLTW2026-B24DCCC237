import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Space, Typography, Divider } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const { Title, Text } = Typography;

const CauHinhBieuMau = () => {
	const { dsCauHinh, luuCauHinh } = useModel('cauhinh');
	const [form] = Form.useForm();

	// Load dữ liệu cũ vào form khi vừa mở trang
	useEffect(() => {
		form.setFieldsValue({ fields: dsCauHinh });
	}, [dsCauHinh]);

	const onFinish = (values: any) => {
		luuCauHinh(values.fields || []);
	};

	return (
		<Card
			title={<Title level={4}>Cấu hình thông tin phụ lục văn bằng</Title>}
			extra={
				<Button type='primary' icon={<SaveOutlined />} onClick={() => form.submit()}>
					Lưu cấu hình
				</Button>
			}
		>
			<div style={{ marginBottom: 20 }}>
				<Text type='secondary'>Các trường mày cấu hình ở đây sẽ tự động hiển thị trong Form nhập liệu Văn bằng.</Text>
			</div>

			<Form form={form} onFinish={onFinish} autoComplete='off' layout='vertical'>
				<Form.List name='fields'>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, fieldKey, ...restField }) => (
								<div key={key}>
									<Space align='baseline' style={{ display: 'flex', marginBottom: 8 }}>
										<Form.Item
											{...restField}
											name={[name, 'tenTruong']}
											fieldKey={[fieldKey as any, 'tenTruong']}
											label={name === 0 ? 'Tên trường thông tin' : ''}
											rules={[{ required: true, message: 'Nhập tên trường' }]}
										>
											<Input placeholder='Ví dụ: Nơi sinh, Dân tộc...' style={{ width: 250 }} />
										</Form.Item>

										<Form.Item
											{...restField}
											name={[name, 'kieuDuLieu']}
											fieldKey={[fieldKey as any, 'kieuDuLieu']}
											label={name === 0 ? 'Kiểu dữ liệu' : ''}
											rules={[{ required: true, message: 'Chọn kiểu' }]}
										>
											<Select placeholder='Chọn kiểu' style={{ width: 150 }}>
												<Select.Option value='String'>Chữ (String)</Select.Option>
												<Select.Option value='Number'>Số (Number)</Select.Option>
												<Select.Option value='Date'>Ngày tháng (Date)</Select.Option>
											</Select>
										</Form.Item>

										<MinusCircleOutlined
											style={{ color: '#ff4d4f', fontSize: 18, marginLeft: 10 }}
											onClick={() => remove(name)}
										/>
									</Space>
								</div>
							))}

							<Form.Item>
								<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} style={{ marginTop: 10 }}>
									Thêm trường dữ liệu mới
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		</Card>
	);
};

export default CauHinhBieuMau;

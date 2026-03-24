import { SearchOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Typography, Alert, Descriptions, Empty, Divider, Tag } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import moment from 'moment';

const { Title, Text } = Typography;

const TraCuu = () => {
	const [form] = Form.useForm();
	const { dsVanBang } = useModel('vanbang');
	const { dsQuyetDinh, tangLuotTraCuu } = useModel('quyetdinh');
	const { dsCauHinh } = useModel('cauhinh');
	const [ketQua, setKetQua] = useState<any>(null);
	const [daBamTim, setDaBamTim] = useState(false);

	const handleSearch = async () => {
		const values = await form.validateFields();
		const count = Object.values(values).filter((val) => val && val.toString().trim() !== '').length;

		if (count < 2) {
			setKetQua('error_count');
			return;
		}

		setDaBamTim(true);

		const result = dsVanBang.find((vb) => {
			return (
				(!values.maSinhVien || vb.maSinhVien === values.maSinhVien) &&
				(!values.hoTen || vb.hoTen.toLowerCase() === values.hoTen.toLowerCase()) &&
				(!values.soHieuVanBang || vb.soHieuVanBang === values.soHieuVanBang) &&
				(!values.soVaoSo || vb.soVaoSo.toString() === values.soVaoSo)
			);
		});

		if (result) {
			setKetQua(result);

			tangLuotTraCuu(result.idQuyetDinh);
		} else {
			setKetQua(null);
		}
	};

	return (
		<div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
			<div style={{ textAlign: 'center', marginBottom: 40 }}>
				<FileSearchOutlined style={{ fontSize: 60 }} />
				<Title level={2}>Tra Cứu Văn Bằng</Title>
				<Text type='secondary'>Vui lòng nhập ít nhất 2 thông tin để thực hiện tra cứu</Text>
			</div>

			<Card>
				<Form form={form} layout='vertical'>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='maSinhVien' label='Mã sinh viên'>
								<Input placeholder='Ví dụ: B24DCCC...' prefix={<SearchOutlined />} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='hoTen' label='Họ và tên'>
								<Input placeholder='Nguyễn Văn A' prefix={<SearchOutlined />} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='soHieuVanBang' label='Số hiệu văn bằng'>
								<Input placeholder='V00123' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='soVaoSo' label='Số vào sổ'>
								<Input placeholder='Nhập số thứ tự' />
							</Form.Item>
						</Col>
					</Row>
					<Button type='primary' block icon={<SearchOutlined />} size='large' onClick={handleSearch}>
						Tìm kiếm văn bằng
					</Button>
				</Form>
			</Card>

			<div style={{ marginTop: 30 }}>
				{ketQua === 'error_count' && (
					<Alert
						message='Lỗi'
						description='Phải nhập ít nhất 2 thông tin để hệ thống có thể xác minh danh tính khi tra cứu.'
						type='error'
						showIcon
					/>
				)}

				{daBamTim && ketQua && typeof ketQua !== 'string' && (
					<Card title='KẾT QUẢ TRA CỨU' headStyle={{ textAlign: 'center', background: '#f6ffed' }}>
						<Descriptions bordered column={1}>
							<Descriptions.Item label='Họ và tên'>
								<Text strong>{ketQua.hoTen}</Text>
							</Descriptions.Item>
							<Descriptions.Item label='Mã sinh viên'>{ketQua.maSinhVien}</Descriptions.Item>
							<Descriptions.Item label='Ngày sinh'>
								{ketQua.ngaySinh ? moment(ketQua.ngaySinh).format('DD/MM/YYYY') : '-'}
							</Descriptions.Item>
							<Descriptions.Item label='Số hiệu văn bằng'>{ketQua.soHieuVanBang}</Descriptions.Item>
							<Descriptions.Item label='Số vào sổ'>{ketQua.soVaoSo}</Descriptions.Item>
							<Descriptions.Item label='Quyết định'>
								{dsQuyetDinh.find((q) => q.id === ketQua.idQuyetDinh)?.soQD}
							</Descriptions.Item>
						</Descriptions>

						{ketQua.phuLuc && (
							<>
								<Divider orientation='left'>Thông tin phụ lục</Divider>
								<Descriptions bordered column={2}>
									{Object.entries(ketQua.phuLuc).map(([key, value]: any) => {
										const cauHinh = dsCauHinh.find((ch) => ch.id === key);
										return (
											<Descriptions.Item key={key} label={cauHinh ? cauHinh.tenTruong : `Trường (${key})`}>
												{cauHinh?.kieuDuLieu === 'Date' ? moment(value).format('DD/MM/YYYY') : value}
											</Descriptions.Item>
										);
									})}
								</Descriptions>
							</>
						)}
					</Card>
				)}

				{daBamTim && !ketQua && <Empty description='Không tìm thấy văn bằng' />}
			</div>
		</div>
	);
};

export default TraCuu;

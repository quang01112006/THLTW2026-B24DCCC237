import rules from '@/utils/rules';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	InputNumber,
	Modal,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Typography,
	Popconfirm,
} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useModel } from 'umi';

const { Title, Text } = Typography;

const VanBang = () => {
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingRecord, setEditingRecord] = useState<any>(null);
	const { dsVanBang, themVanBang, suaVanBang, xoaVanBang } = useModel('vanbang');
	const { dsSo } = useModel('sovanbang');
	const { dsQuyetDinh } = useModel('quyetdinh');
	const { dsCauHinh } = useModel('cauhinh');

	const handleSelectQuyetDinh = (idQD: string) => {
		const qd = dsQuyetDinh.find((q) => q.id === idQD);
		if (qd) {
			const so = dsSo.find((s) => s.id === qd.idSoVanBang);
			if (so) {
				form.setFieldsValue({ soVaoSo: (so.soVaoSoHienTai || 0) + 1 });
			}
		}
	};

	const showModal = (record?: any) => {
		if (record) {
			setEditingRecord(record);
			const initialValues = { ...record };
			if (record.ngaySinh) initialValues.ngaySinh = moment(record.ngaySinh);
			dsCauHinh.forEach((ch) => {
				if (ch.kieuDuLieu === 'Date' && record.phuLuc?.[ch.id]) {
					initialValues.phuLuc[ch.id] = moment(record.phuLuc[ch.id]);
				}
			});
			form.setFieldsValue(initialValues);
		} else {
			setEditingRecord(null);
			form.resetFields();
			if (dsQuyetDinh.length > 0) {
				const firstQD = dsQuyetDinh[0];
				const so = dsSo.find((s) => s.id === firstQD.idSoVanBang);
				form.setFieldsValue({
					idQuyetDinh: firstQD.id,
					soVaoSo: (so?.soVaoSoHienTai || 0) + 1,
				});
			}
		}
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		const values = await form.validateFields();
		const formattedValues = {
			...values,
			ngaySinh: values.ngaySinh ? values.ngaySinh.format('YYYY-MM-DD') : undefined,
		};

		if (values.phuLuc) {
			dsCauHinh.forEach((ch) => {
				if (ch.kieuDuLieu === 'Date' && values.phuLuc[ch.id]) {
					formattedValues.phuLuc[ch.id] = values.phuLuc[ch.id].format('YYYY-MM-DD');
				}
			});
		}

		if (editingRecord) {
			suaVanBang(editingRecord.id, formattedValues);
		} else {
			const qd = dsQuyetDinh.find((q) => q.id === values.idQuyetDinh);
			themVanBang(formattedValues, qd?.idSoVanBang);
		}
		setIsModalVisible(false);
	};

	const columns = [
		{ title: 'MSV', dataIndex: 'maSinhVien', key: 'maSinhVien' },
		{ title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen' },
		{ title: 'Số hiệu', dataIndex: 'soHieuVanBang', key: 'soHieuVanBang' },
		{
			title: 'Số vào sổ',
			dataIndex: 'soVaoSo',
			render: (val: number) => <Tag color='blue'>Số {val}</Tag>,
		},
		{
			title: 'Thao tác',
			render: (_: any, record: any) => (
				<Space>
					<Button type='link' icon={<EditOutlined />} onClick={() => showModal(record)}>
						Sửa
					</Button>
					<Popconfirm title='Xóa văn bằng này?' onConfirm={() => xoaVanBang(record.id)}>
						<Button type='link' danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card
			title={<Title level={4}>Quản lý Thông tin Văn bằng</Title>}
			extra={
				<Button type='primary' icon={<PlusOutlined />} onClick={() => showModal()}>
					Cấp bằng mới
				</Button>
			}
		>
			<Table dataSource={dsVanBang} columns={columns} rowKey='id' />

			<Modal
				title={editingRecord ? 'Sửa thông tin văn bằng' : 'Cấp văn bằng mới'}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={() => setIsModalVisible(false)}
				width={800}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='idQuyetDinh' label='Quyết định tốt nghiệp' rules={[{ required: true }]}>
								<Select placeholder='Chọn quyết định' onChange={handleSelectQuyetDinh} disabled={!!editingRecord}>
									{dsQuyetDinh.map((qd) => (
										<Select.Option key={qd.id} value={qd.id}>
											{qd.soQD}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='soVaoSo' label='Số vào sổ (Tự động)'>
								<InputNumber style={{ width: '100%' }} disabled />
							</Form.Item>
						</Col>
					</Row>

					<Divider orientation='left'>Thông tin cơ bản</Divider>
					<Row gutter={16}>
						<Col span={8}>
							<Form.Item name='maSinhVien' label='MSV' rules={[...rules.required]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={16}>
							<Form.Item name='hoTen' label='Họ và tên' rules={[...rules.required]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item name='ngaySinh' label='Ngày sinh'>
								<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
							</Form.Item>
						</Col>
						<Col span={16}>
							<Form.Item name='soHieuVanBang' label='Số hiệu văn bằng' rules={[...rules.required]}>
								<Input />
							</Form.Item>
						</Col>
					</Row>

					{dsCauHinh.length > 0 && (
						<>
							<Divider orientation='left'>Thông tin phụ lục </Divider>
							<Row gutter={16}>
								{dsCauHinh.map((item: any) => (
									<Col span={12} key={item.id}>
										<Form.Item label={item.tenTruong} name={['phuLuc', item.id]} rules={[...rules.required]}>
											{item.kieuDuLieu === 'Number' ? (
												<InputNumber style={{ width: '100%' }} />
											) : item.kieuDuLieu === 'Date' ? (
												<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
											) : (
												<Input />
											)}
										</Form.Item>
									</Col>
								))}
							</Row>
						</>
					)}
				</Form>
			</Modal>
		</Card>
	);
};

export default VanBang;

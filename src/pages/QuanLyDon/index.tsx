import { CheckCircleOutlined, DeleteOutlined, EditOutlined, HistoryOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Modal,
	Popconfirm,
	Radio,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Tooltip,
} from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

const QuanLyDon = () => {
	const { xoaDon, dsDon, dsLichSu, xuLyDon, setDsDon } = useModel('dondangki');
	const { dsCLB } = useModel('clb');

	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
	const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
	const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
	const [isFormModalVisible, setIsFormModalVisible] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [currentDonId, setCurrentDonId] = useState<string | null>(null);

	const [form] = Form.useForm();
	const [formSua] = Form.useForm();

	const showFormModal = (record?: QuanLyCLB.DonDangKy) => {
		if (record) {
			setEditingId(record.id);
			formSua.setFieldsValue(record);
		} else {
			setEditingId(null);
			formSua.resetFields();
		}
		setIsFormModalVisible(true);
	};

	const handleSaveDon = async () => {
		const values = await formSua.validateFields();
		if (editingId) {
			const moi = dsDon.map((d) => (d.id === editingId ? { ...d, ...values } : d));
			setDsDon(moi);
			localStorage.setItem('dsDon', JSON.stringify(moi));
		} else {
			const newDon = {
				...values,
				id: `don_${Date.now()}`,
				trangThai: 'Pending',
			};
			const moi = [...dsDon, newDon];
			setDsDon(moi);
			localStorage.setItem('dsDon', JSON.stringify(moi));
		}
		setIsFormModalVisible(false);
	};

	const pendingSelectedIds = dsDon
		.filter((d) => selectedRowKeys.includes(d.id) && d.trangThai === 'Pending')
		.map((d) => d.id);

	const columns = [
		{ title: 'Họ tên', dataIndex: 'hoTen', align: 'center' as const },
		{
			title: 'Câu lạc bộ',
			dataIndex: 'idCLB',
			align: 'center' as const,
			render: (id: string) => dsCLB.find((c: any) => c.id === id)?.tenCLB || 'N/A',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			align: 'center' as const,
			render: (status: string) => {
				const colors = { Pending: 'orange', Approved: 'green', Rejected: 'red' };
				return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			align: 'center' as const,
			render: (_: any, record: QuanLyCLB.DonDangKy) => (
				<Space>
					<Tooltip title='Lịch sử'>
						<Button
							type='text'
							icon={<HistoryOutlined />}
							onClick={() => {
								setCurrentDonId(record.id);
								setIsHistoryModalVisible(true);
							}}
						/>
					</Tooltip>
					<Tooltip title='Chỉnh sửa'>
						<Button type='text' icon={<EditOutlined />} onClick={() => showFormModal(record)} />
					</Tooltip>
					<Popconfirm title='Xóa đơn này?' onConfirm={() => xoaDon(record.id)}>
						<Button type='text' danger icon={<DeleteOutlined />} />
					</Popconfirm>
					{record.trangThai === 'Pending' && (
						<Popconfirm title='Duyệt đơn này?' onConfirm={() => xuLyDon([record.id], 'Approved')}>
							<Button type='link' icon={<CheckCircleOutlined />}>
								Duyệt
							</Button>
						</Popconfirm>
					)}
				</Space>
			),
		},
	];

	return (
		<Card
			title='Quản lý Đơn đăng ký'
			extra={
				<Button type='primary' icon={<PlusOutlined />} onClick={() => showFormModal()}>
					Thêm đơn mới
				</Button>
			}
		>
			<Space style={{ marginBottom: 16 }}>
				<Button
					type='primary'
					disabled={pendingSelectedIds.length === 0}
					onClick={() => {
						xuLyDon(pendingSelectedIds, 'Approved');
						setSelectedRowKeys([]);
					}}
				>
					Duyệt {pendingSelectedIds.length} đơn
				</Button>
				<Button danger disabled={pendingSelectedIds.length === 0} onClick={() => setIsRejectModalVisible(true)}>
					Từ chối {pendingSelectedIds.length} đơn
				</Button>
			</Space>

			<Table
				rowSelection={{
					selectedRowKeys,
					onChange: (keys) => setSelectedRowKeys(keys as string[]),
					getCheckboxProps: (record: QuanLyCLB.DonDangKy) => ({
						disabled: record.trangThai !== 'Pending',
					}),
				}}
				columns={columns}
				dataSource={dsDon}
				rowKey='id'
			/>

			<Modal
				title={editingId ? 'Chỉnh sửa đơn' : 'Thêm đơn đăng ký mới'}
				visible={isFormModalVisible}
				onOk={handleSaveDon}
				onCancel={() => setIsFormModalVisible(false)}
				width={800}
			>
				<Form form={formSua} layout='vertical'>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='hoTen' label='Họ và tên' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='idCLB' label='Câu lạc bộ' rules={[{ required: true }]}>
								<Select>
									{dsCLB.map((c) => (
										<Select.Option key={c.id} value={c.id}>
											{c.tenCLB}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='email' label='Email' rules={[{ type: 'email' }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='soDienThoai' label='Số điện thoại'>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='gioiTinh' label='Giới tính' initialValue='Nam'>
								<Radio.Group>
									<Radio value='Nam'>Nam</Radio>
									<Radio value='Nữ'>Nữ</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='diaChi' label='Địa chỉ'>
								<Input />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name='lyDo' label='Lý do đăng ký'>
								<Input.TextArea rows={3} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>

			<Modal
				title='Lý do từ chối'
				visible={isRejectModalVisible}
				onOk={async () => {
					const { lyDo } = await form.validateFields();
					xuLyDon(pendingSelectedIds, 'Rejected', lyDo);
					setIsRejectModalVisible(false);
					setSelectedRowKeys([]);
					form.resetFields();
				}}
				onCancel={() => setIsRejectModalVisible(false)}
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='lyDo' label='Nhập lý do từ chối' rules={[{ required: true }]}>
						<Input.TextArea rows={4} />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title='Lịch sử thao tác'
				visible={isHistoryModalVisible}
				onCancel={() => setIsHistoryModalVisible(false)}
				footer={null}
				width={800}
			>
				<Table
					dataSource={dsLichSu.filter((ls) => ls.idDon === currentDonId)}
					rowKey='id'
					columns={[
						{ title: 'Thời gian', dataIndex: 'thoiGian' },
						{
							title: 'Hành động',
							dataIndex: 'hanhDong',
							render: (h) => <Tag color={h === 'Approved' ? 'green' : 'red'}>{h}</Tag>,
						},
						{ title: 'Nội dung', dataIndex: 'noiDung' },
					]}
				/>
			</Modal>
		</Card>
	);
};

export default QuanLyDon;

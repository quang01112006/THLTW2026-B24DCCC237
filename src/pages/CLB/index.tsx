import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, DatePicker, Form, Input, Modal, Popconfirm, Space, Switch, Table, Tag } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { history, useModel } from 'umi';

const CLBPage = () => {
	const [form] = Form.useForm();
	const { dsCLB, themCLB, suaCLB, xoaCLB } = useModel('clb');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	const showModal = (record?: any) => {
		if (record) {
			setEditingId(record.id);
			form.setFieldsValue({
				...record,
				ngayThanhLap: record.ngayThanhLap ? moment(record.ngayThanhLap) : null,
			});
		} else {
			setEditingId(null);
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		const values = await form.validateFields();
		const formattedValues = {
			...values,
			ngayThanhLap: values.ngayThanhLap?.format('YYYY-MM-DD'),
		};

		if (editingId) {
			suaCLB(editingId, formattedValues);
		} else {
			themCLB(formattedValues);
		}
		setIsModalVisible(false);
	};

	const columns = [
		{
			title: 'Ảnh',
			dataIndex: 'anhDaiDien',
			align: 'center',
			render: (url: string) => <Avatar src={url} icon={<UserOutlined />} size='large' />,
		},
		{
			title: 'Tên CLB',
			dataIndex: 'tenCLB',
			align: 'center',
			sorter: (a: any, b: any) => a.tenCLB.localeCompare(b.tenCLB),
		},
		{
			title: 'Chủ nhiệm',
			dataIndex: 'chuNhiem',
			align: 'center',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'dangHoatDong',
			align: 'center',
			render: (active: boolean) => (
				<Tag color={active ? 'green' : 'red'}>{active ? 'Đang hoạt động' : 'Ngừng nghỉ'}</Tag>
			),
		},
		{
			title: 'Thao tác',
			align: 'center',
			render: (_: any, record: any) => (
				<Space>
					<Button type='link' icon={<EditOutlined />} onClick={() => showModal(record)}>
						Sửa
					</Button>
					<Button type='link' onClick={() => history.push(`/don-dang-ky?clbId=${record.id}`)}>
						Thành viên
					</Button>
					<Popconfirm title='Xóa CLB này?' onConfirm={() => xoaCLB(record.id)}>
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
			title='Danh sách Câu lạc bộ'
			extra={
				<Button type='primary' icon={<PlusOutlined />} onClick={() => showModal()}>
					Thêm CLB
				</Button>
			}
		>
			<Table dataSource={dsCLB} columns={columns} rowKey='id' />

			<Modal
				title={editingId ? 'Cập nhật CLB' : 'Thêm Câu lạc bộ mới'}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={() => setIsModalVisible(false)}
				width={600}
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='tenCLB' label='Tên Câu lạc bộ' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='anhDaiDien' label='Link ảnh đại diện'>
						<Input placeholder='https://...' />
					</Form.Item>
					<Form.Item name='chuNhiem' label='Chủ nhiệm' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='ngayThanhLap' label='Ngày thành lập'>
						<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
					</Form.Item>
					<Form.Item name='dangHoatDong' label='Đang hoạt động' valuePropName='checked' initialValue={true}>
						<Switch />
					</Form.Item>
					<Form.Item name='moTa' label='Mô tả'>
						<Input.TextArea rows={4} placeholder='Nhập nội dung mô tả (Hỗ trợ HTML)...' />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default CLBPage;

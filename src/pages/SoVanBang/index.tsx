import rules from '@/utils/rules';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, Modal, Space, Table, Popconfirm, Typography } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

const { Text } = Typography;

const SoVanBang = () => {
	const { dsSo, themSo, xoaSo, suaSo } = useModel('sovanbang');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingRecord, setEditingRecord] = useState<any>(null);
	const [form] = Form.useForm();

	const showModal = (record?: any) => {
		if (record) {
			setEditingRecord(record);
			form.setFieldsValue(record);
		} else {
			setEditingRecord(null);
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			if (editingRecord) {
				suaSo(editingRecord.id, values);
			} else {
				themSo(values);
			}
			setIsModalVisible(false);
		} catch (error) {
			console.log('Validate Failed:', error);
		}
	};

	const columns = [
		{
			title: 'Tên sổ văn bằng',
			dataIndex: 'tenSo',
			align: 'center',
		},
		{
			title: 'Năm học',
			dataIndex: 'namHoc',
			align: 'center',
		},
		{
			title: 'Số vào sổ hiện tại',
			dataIndex: 'soVaoSoHienTai',
			align: 'center',
		},
		{
			title: 'Thao tác',
			key: 'action',
			align: 'center',
			render: (_: any, record: any) => (
				<Space>
					<Button type='link' icon={<EditOutlined />} onClick={() => showModal(record)}>
						Sửa
					</Button>
					<Popconfirm title='Xác nhận xóa sổ này?' onConfirm={() => xoaSo(record.id)}>
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
			title='Quản lý Sổ Văn Bằng'
			extra={
				<Button type='primary' icon={<PlusOutlined />} onClick={() => showModal()}>
					Mở sổ mới
				</Button>
			}
		>
			<Table dataSource={dsSo} columns={columns} pagination={{ pageSize: 10 }} />

			<Modal
				title={editingRecord ? 'Cập nhật thông tin sổ' : 'Thêm sổ văn bằng mới'}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={() => setIsModalVisible(false)}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='tenSo' label='Tên sổ văn bằng' rules={[...rules.required]}>
						<Input placeholder='Ví dụ: Sổ tốt nghiệp năm 2026' />
					</Form.Item>
					<Form.Item name='namHoc' label='Năm học' rules={[...rules.required]}>
						<InputNumber style={{ width: '100%' }} placeholder='2026' min={2000} />
					</Form.Item>
					{!editingRecord && <Text type='secondary'>Lưu ý: Sổ mới sẽ bắt đầu với Số vào sổ là 0.</Text>}
				</Form>
			</Modal>
		</Card>
	);
};

export default SoVanBang;

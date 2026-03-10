import rules from '@/utils/rules';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Table, Select, Tag, Popconfirm } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

const KhoiKienThuc = () => {
	const { monHoc } = useModel('monhoc');
	const { khoiKienThuc, addKhoiKienThuc, delKhoiKienThuc } = useModel('khoikienthuc');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const columns: any[] = [
		{ title: 'id', dataIndex: 'id', align: 'center', width: 80 },
		{ title: 'Tên khối kiến thức', dataIndex: 'ten', align: 'left' },
		{
			title: 'Thuộc môn học',
			dataIndex: 'idMonHoc',
			align: 'center',
			render: (idMon: number) => {
				const mon = monHoc.find((m) => m.id === idMon);
				return mon ? <Tag color='blue'>{mon.ten}</Tag> : <Tag color='default'>N/A</Tag>;
			},
		},
		{
			title: 'Thao tác',
			align: 'center',
			render: (record: any) => (
				<Popconfirm title='Xóa khối kiến thức này?' onConfirm={() => delKhoiKienThuc(record.id)}>
					<Button type='link' danger icon={<DeleteOutlined />}>
						Xóa
					</Button>
				</Popconfirm>
			),
		},
	];

	const onFinish = (values: any) => {
		addKhoiKienThuc(values);
		setIsModalOpen(false);
		form.resetFields();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	return (
		<>
			<Button type='primary' icon={<PlusOutlined />} style={{ marginBottom: 16 }} onClick={() => setIsModalOpen(true)}>
				Thêm khối kiến thức
			</Button>

			<Modal
				title='Thêm khối kiến thức'
				onCancel={() => {
					setIsModalOpen(false);
					form.resetFields();
				}}
				visible={isModalOpen}
				footer={null}
			>
				<Form form={form} layout='vertical' onFinish={onFinish}>
					<Form.Item name='idMonHoc' label='Chọn môn học' rules={[...rules.required]}>
						<Select placeholder='Chọn môn học tương ứng'>
							{monHoc.map((item: any) => (
								<Select.Option key={item.id} value={item.id}>
									{item.ten} ({item.maMon})
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item name='ten' label='Tên khối kiến thức' rules={[...rules.required]}>
						<Input placeholder='Ví dụ: Tổng quan về React' />
					</Form.Item>

					<Form.Item name='moTa' label='Mô tả'>
						<Input.TextArea rows={2} placeholder='Nhập mô tả ngắn' />
					</Form.Item>

					<Space style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
						<Button onClick={handleCancel}>Hủy</Button>
						<Button htmlType='submit' type='primary'>
							OK
						</Button>
					</Space>
				</Form>
			</Modal>

			<Table columns={columns} dataSource={khoiKienThuc} />
		</>
	);
};

export default KhoiKienThuc;

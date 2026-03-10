import rules from '@/utils/rules';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

const MonHoc = () => {
	const { monHoc, addMonHoc, delMonHoc } = useModel('monhoc');
	const columns: any[] = [
		{ title: 'id', dataIndex: 'id', align: 'center' },
		{ title: 'Mã môn', dataIndex: 'maMon', align: 'center' },
		{ title: 'Tên môn học', dataIndex: 'ten', align: 'center' },
		{ title: 'Số tín chỉ', dataIndex: 'soTinChi', align: 'center' },
		{
			title: 'Thao tác',
			render: (val, record) => (
				<Popconfirm title='Xóa môn học này?' onConfirm={() => delMonHoc(record.id)}>
					<Button type='link' icon={<DeleteOutlined />}>
						Xóa
					</Button>
				</Popconfirm>
			),
			align: 'center',
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	return (
		<>
			<Button type='primary' icon={<PlusOutlined />} style={{ marginBottom: 16 }} onClick={() => setIsModalOpen(true)}>
				Thêm môn học mới
			</Button>

			<Modal
				title='THÊM MÔN HỌC MỚI'
				onCancel={() => {
					setIsModalOpen(false);
					form.resetFields();
				}}
				visible={isModalOpen}
				footer={null}
			>
				<Form
					form={form}
					layout='vertical'
					onFinish={(val) => {
						addMonHoc(val);
						setIsModalOpen(false);
						form.resetFields();
					}}
				>
					<Form.Item name='maMon' label='Mã môn học' rules={[...rules.required]}>
						<Input placeholder='Nhập mã môn' />
					</Form.Item>

					<Form.Item name='ten' label='Tên môn học' rules={[...rules.required]}>
						<Input placeholder='Ví dụ: Lập trình Web' />
					</Form.Item>

					<Form.Item name='soTinChi' label='Số tín chỉ' rules={[...rules.required]} initialValue={3}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
					<Space style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							onClick={() => {
								setIsModalOpen(false);
								form.resetFields();
							}}
						>
							Hủy
						</Button>
						<Button htmlType='submit' type='primary'>
							OK
						</Button>
					</Space>
				</Form>
			</Modal>
			<Table columns={columns} dataSource={monHoc} />
		</>
	);
};
export default MonHoc;

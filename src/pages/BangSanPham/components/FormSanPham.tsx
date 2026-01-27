import { Form, Input, InputNumber, Modal } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

export default function FormSanPhan({ isModalOpen, setIsModalOpen, record }) {
	const { handleAdd, handleEdit } = useModel('sanpham');
	const [form] = Form.useForm();
	const onOk = async () => {
		const data = await form.validateFields();
		if (record) {
			handleEdit({ ...data, id: record.id });
		} else {
			handleAdd(data);
		}
		form.resetFields();
		setIsModalOpen(false);
	};
	useEffect(() => {
		if (record) {
			form.setFieldsValue(record);
		} else {
			form.resetFields();
		}
	}, [record, isModalOpen]);
	return (
		<Modal title='Thêm sản phẩm mới' visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={onOk}>
			<Form form={form} layout='vertical'>
				<Form.Item name='name' label='Tên sản phẩm' rules={[{ required: true, message: 'Cần nhập tên sản phẩm' }]}>
					<Input placeholder='Nhập tên sản phẩm...' />
				</Form.Item>
				<Form.Item
					name='quantity'
					label='Số lượng sản phẩm'
					rules={[
						{ required: true, message: 'Cần nhập số lượng sản phẩm' },
						{ type: 'number', min: 1, message: 'Số lượng cần lớn hơn 0' },
					]}
				>
					<InputNumber style={{ width: '100%' }} placeholder='Nhập số lượng sản phẩm...' />
				</Form.Item>
				<Form.Item
					name='price'
					label='Giá sản phẩm'
					rules={[
						{ required: true, message: 'Cần nhập giá sản phẩm' },
						{ type: 'number', min: 1, message: 'Giá cần lớn hơn 0' },
					]}
				>
					<InputNumber style={{ width: '100%' }} placeholder='Nhập số lượng sản phẩm...' />
				</Form.Item>
			</Form>
		</Modal>
	);
}

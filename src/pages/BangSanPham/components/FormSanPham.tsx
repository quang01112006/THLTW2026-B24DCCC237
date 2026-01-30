import { DanhMucSanPham } from '@/services/SanPham/constants';
import rules from '@/utils/rules';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
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
				<Form.Item name='name' label='Tên sản phẩm' rules={[...rules.required]}>
					<Input placeholder='Nhập tên sản phẩm...' />
				</Form.Item>
				<Form.Item name='category' label='Danh mục' rules={[...rules.required]}>
					<Select options={DanhMucSanPham} placeholder='Chọn danh mục ' />
				</Form.Item>
				<Form.Item
					name='quantity'
					label='Số lượng sản phẩm'
					rules={[...rules.required, ...rules.number(999999, 0, false)]}
				>
					<InputNumber style={{ width: '100%' }} placeholder='Nhập số lượng sản phẩm...' />
				</Form.Item>
				<Form.Item name='price' label='Giá sản phẩm' rules={[...rules.required, ...rules.float(9999999999, 0, 0)]}>
					<InputNumber style={{ width: '100%' }} placeholder='Nhập giá sản phẩm...' />
				</Form.Item>
			</Form>
		</Modal>
	);
}

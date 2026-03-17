import rules from '@/utils/rules';
import { Button, Form, Input, InputNumber, Modal, Space, Divider } from 'antd';
import { useEffect } from 'react';

interface Props {
	visible: boolean;
	record: QuanLyDichVu.DichVu | null;
	setVisible: (v: boolean) => void;
	onSave: (values: any) => void;
}
const ModalDichVu = ({ visible, record, setVisible, onSave }: Props) => {
	const [form] = Form.useForm();
	useEffect(() => {
		if (visible) {
			if (record) {
				form.setFieldsValue(record);
			} else {
				form.resetFields();
			}
		}
	}, [visible, record, form]);

	const onFinish = (values: any) => {
		onSave({
			...values,
			id: record?.id,
		});
		setVisible(false);
	};

	return (
		<Modal
			footer={null}
			title={record ? 'CẬP NHẬT DỊCH VỤ' : 'THÊM DỊCH VỤ MỚI'}
			visible={visible}
			onCancel={() => setVisible(false)}
			width={500}
		>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item name='tenDichVu' label='Tên dịch vụ' rules={[...rules.required]}>
					<Input placeholder='Ví dụ: Cắt tóc nam, Gội đầu...' />
				</Form.Item>

				<Form.Item name='gia' label='Giá tiền (VNĐ)' rules={[...rules.required]}>
					<InputNumber style={{ width: '100%' }} min={0} step={10000} placeholder='Ví dụ: 100,000' />
				</Form.Item>

				<Form.Item name='thoiGianThucHien' label='Thời gian thực hiện (Phút)' rules={[...rules.required]}>
					<InputNumber style={{ width: '100%' }} min={5} placeholder='Ví dụ: 30, 60...' addonAfter='phút' />
				</Form.Item>

				<Divider />

				<Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
					<Space>
						<Button onClick={() => setVisible(false)}>Hủy bỏ</Button>
						<Button type='primary' htmlType='submit'>
							Lưu dịch vụ
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalDichVu;

import { Modal, Form, Rate, Input, message } from 'antd';

interface Props {
	visible: boolean;
	setVisible: (v: boolean) => void;
	record: any;
	onSave: (values: any, record: any) => void;
}

const RatingModal = ({ visible, setVisible, record, onSave }: Props) => {
	const [form] = Form.useForm();

	const handleOk = () => {
		form.validateFields().then((values) => {
			onSave(values, record);
			setVisible(false);
			form.resetFields();
			message.success('Cảm ơn bạn đã đánh giá!');
		});
	};

	return (
		<Modal
			title={`Đánh giá dịch vụ: ${record?.tenKhachHang}`}
			visible={visible}
			onOk={handleOk}
			onCancel={() => setVisible(false)}
			okText='Gửi đánh giá'
			cancelText='Hủy'
		>
			<Form form={form} layout='vertical'>
				<Form.Item name='soSao' label='Mức độ hài lòng' rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}>
					<Rate />
				</Form.Item>
				<Form.Item
					name='binhLuan'
					label='Cảm nghĩ của bạn'
					rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}
				>
					<Input.TextArea rows={4} placeholder='Dịch vụ rất tốt, nhân viên thân thiện...' />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RatingModal;

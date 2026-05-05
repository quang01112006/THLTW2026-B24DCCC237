import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { EMucDoUuTienTask, ETrangThaiTask } from '@/services/Kanban/constants';

interface TaskFormProps {
	visible: boolean;
	onClose: () => void;
	initialValues?: any;
	onSubmit: (values: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ visible, onClose, initialValues, onSubmit }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (visible && initialValues) {
			form.setFieldsValue({
				...initialValues,
				deadline: initialValues.deadline ? moment(initialValues.deadline) : undefined,
			});
		} else {
			form.resetFields();
		}
	}, [visible, initialValues, form]);

	const handleFinish = (values: any) => {
		onSubmit({
			...values,
			deadline: values.deadline ? values.deadline.toISOString() : undefined,
		});
	};

	return (
		<Modal
			title={initialValues ? 'Chỉnh sửa Task' : 'Thêm Task mới'}
			visible={visible}
			onCancel={onClose}
			onOk={() => form.submit()}
			okText="Lưu"
			cancelText="Hủy"
		>
			<Form form={form} layout="vertical" onFinish={handleFinish}>
				<Form.Item name="tenTask" label="Tên Task" rules={[{ required: true, message: 'Vui lòng nhập tên task' }]}>
					<Input placeholder="Nhập tên task" />
				</Form.Item>
				<Form.Item name="moTa" label="Mô tả">
					<Input.TextArea placeholder="Nhập mô tả chi tiết" rows={3} />
				</Form.Item>
				<Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: 'Vui lòng chọn deadline' }]}>
					<DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
				</Form.Item>
				<Form.Item name="mucDoUuTien" label="Mức độ ưu tiên" rules={[{ required: true, message: 'Vui lòng chọn ưu tiên' }]}>
					<Select placeholder="Chọn mức độ ưu tiên">
						{Object.values(EMucDoUuTienTask).map((val) => (
							<Select.Option key={val} value={val}>{val}</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name="trangThai" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
					<Select placeholder="Chọn trạng thái">
						{Object.values(ETrangThaiTask).map((val) => (
							<Select.Option key={val} value={val}>{val}</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name="tags" label="Tags">
					<Select mode="tags" placeholder="Thêm tags (ví dụ: UI, API)" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default TaskForm;

import { ELoaiMucTieu, ETrangThaiMucTieu } from '@/services/Health/constants';
import type { Health } from '@/services/Health/typing';
import rules from '@/utils/rules';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

interface IProps {
	record: Health.IMucTieu | null;
	onFinish: (values: any) => void;
	onCancel: () => void;
}

const FormMucTieu = (props: IProps) => {
	const [form] = Form.useForm();
	const { record, onFinish, onCancel } = props;

	useEffect(() => {
		if (record) {
			form.setFieldsValue({
				...record,
				deadline: record.deadline ? moment(record.deadline) : null,
			});
		} else {
			form.resetFields();
		}
	}, [record, form]);

	const handleFinish = (values: any) => {
		onFinish({
			...values,
			deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : undefined,
		});
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleFinish}>
			<Form.Item label='Tên mục tiêu' name='ten' rules={[...rules.required]}>
				<Input placeholder='Ví dụ: Giảm 5kg cân nặng...' />
			</Form.Item>

			<Form.Item label='Loại mục tiêu' name='loai' rules={[...rules.required]}>
				<Select options={Object.values(ELoaiMucTieu).map((v) => ({ label: v, value: v }))} />
			</Form.Item>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label='Giá trị mục tiêu' name='giaTriMucTieu' rules={[...rules.required]}>
						<InputNumber style={{ width: '100%' }} min={0} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label='Giá trị hiện tại' name='giaTriHienTai' rules={[...rules.required]}>
						<InputNumber style={{ width: '100%' }} min={0} />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item label='Hạn chót (Deadline)' name='deadline' rules={[...rules.required]}>
				<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
			</Form.Item>

			<Form.Item label='Trạng thái' name='trangThai' rules={[...rules.required]}>
				<Select options={Object.values(ETrangThaiMucTieu).map((v) => ({ label: v, value: v }))} />
			</Form.Item>

			<Row justify='center' style={{ marginTop: 24 }}>
				<Space>
					<Button onClick={onCancel}>Hủy bỏ</Button>
					<Button type='primary' htmlType='submit'>
						{record ? 'Cập nhật' : 'Thêm mới'}
					</Button>
				</Space>
			</Row>
		</Form>
	);
};

export default FormMucTieu;

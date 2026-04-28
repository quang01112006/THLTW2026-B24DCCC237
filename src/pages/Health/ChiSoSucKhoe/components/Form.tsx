import type { Health } from '@/services/Health/typing';
import rules from '@/utils/rules';
import { Button, Col, DatePicker, Form, InputNumber, Row, Space } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

interface IProps {
	record: Health.IChiSoSucKhoe | null;
	onFinish: (values: any) => void;
	onCancel: () => void;
}

const FormChiSoSucKhoe = (props: IProps) => {
	const [form] = Form.useForm();
	const { record, onFinish, onCancel } = props;

	useEffect(() => {
		if (record) {
			form.setFieldsValue({
				...record,
				ngay: record.ngay ? moment(record.ngay) : null,
			});
		} else {
			form.resetFields();
		}
	}, [record, form]);

	const handleFinish = (values: any) => {
		onFinish({
			...values,
			ngay: values.ngay ? values.ngay.format('YYYY-MM-DD') : undefined,
		});
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleFinish}>
			<Form.Item label='Ngày ghi nhận' name='ngay' rules={[...rules.required]}>
				<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
			</Form.Item>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label='Cân nặng (kg)' name='canNang' rules={[...rules.required]}>
						<InputNumber style={{ width: '100%' }} min={1} placeholder='Ví dụ: 65' addonAfter='kg' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label='Chiều cao (cm)' name='chieuCao' rules={[...rules.required]}>
						<InputNumber style={{ width: '100%' }} min={1} placeholder='Ví dụ: 170' addonAfter='cm' />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label='Nhịp tim (bpm)' name='nhipTim' rules={[...rules.required]}>
						<InputNumber style={{ width: '100%' }} min={1} placeholder='Ví dụ: 75' addonAfter='bpm' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label='Giờ ngủ' name='gioNgu' rules={[...rules.required]}>
						<InputNumber style={{ width: '100%' }} min={0} max={24} placeholder='Ví dụ: 8' addonAfter='giờ' />
					</Form.Item>
				</Col>
			</Row>

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

export default FormChiSoSucKhoe;

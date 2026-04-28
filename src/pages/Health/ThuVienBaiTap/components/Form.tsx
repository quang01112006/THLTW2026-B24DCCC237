import { EMucDoKho, ENhomCo } from '@/services/Health/constants';
import type { Health } from '@/services/Health/typing';
import rules from '@/utils/rules';
import { Button, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;
interface IProps {
	record: Health.IBaiTap | null;
	onFinish: (values: any) => void;
	onCancel: () => void;
}
const FormBaiTap = (props: IProps) => {
	const [form] = Form.useForm();
	const { record, onFinish, onCancel } = props;

	useEffect(() => {
		if (record) {
			form.setFieldsValue(record);
		} else {
			form.resetFields();
		}
	}, [record, form]);

	return (
		<Form form={form} layout='vertical' onFinish={onFinish}>
			<Form.Item label='Tên bài tập' name='ten' rules={[...rules.ten, ...rules.required]}>
				<Input placeholder='Ví dụ: Archer push up, Squat...' />
			</Form.Item>

			<Form.Item label='Nhóm cơ tác động' name='nhomCoTacDong' rules={[...rules.required]}>
				<Select
					mode='multiple'
					placeholder='Chọn các nhóm cơ (ví dụ: Chest, Arms...)'
					options={Object.values(ENhomCo).map((val) => ({ label: val, value: val }))}
					allowClear
				/>
			</Form.Item>

			<Form.Item label='Mức độ khó' name='doKho' rules={[...rules.required]}>
				<Select
					placeholder='Chọn độ khó'
					options={Object.values(EMucDoKho).map((val) => ({ label: val, value: val }))}
				/>
			</Form.Item>

			<Form.Item label='Calo tiêu thụ (mỗi giờ)' name='caloTrenGio' rules={[...rules.required]}>
				<InputNumber style={{ width: '100%' }} placeholder='Ví dụ: 300' min={0} addonAfter='calo/h' />
			</Form.Item>

			<Form.Item label='Mô tả ngắn' name='moTaNgan' rules={[...rules.required]}>
				<TextArea rows={3} placeholder='Nhập mô tả ngắn gọn về bài tập...' maxLength={200} showCount />
			</Form.Item>

			<Row justify='center' style={{ marginTop: 24 }}>
				<Space size='middle'>
					<Button onClick={onCancel}>Hủy bỏ</Button>
					<Button type='primary' htmlType='submit'>
						{record ? 'Cập nhật' : 'Thêm mới'}
					</Button>
				</Space>
			</Row>
		</Form>
	);
};

export default FormBaiTap;

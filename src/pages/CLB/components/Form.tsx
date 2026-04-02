import { ETrangThaiCLB } from '@/services/CLB/constants';
import type { CLB } from '@/services/CLB/typing';
import rules from '@/utils/rules';
import { Button, DatePicker, Form, Input, Radio, Space } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

interface IProps {
	isEdit: boolean;
	initialValues?: CLB.IRecord | null;
	onCancel: () => void;
	onSave: (values: CLB.IRecord) => void;
	loading?: boolean;
}
const FormCLB = (props: IProps) => {
	const { isEdit, onCancel, onSave, initialValues, loading } = props;

	const [form] = Form.useForm();

	useEffect(() => {
		if (isEdit && initialValues) {
			form.setFieldsValue(initialValues);
		} else {
			form.resetFields();
		}
	}, [initialValues, isEdit]);

	return (
		<Form
			layout='vertical'
			form={form}
			onFinish={(values) => onSave(values)}
			initialValues={{ dangHoatDong: ETrangThaiCLB.ACTIVE }}
		>
			<Form.Item name='ten' label='Tên Câu lạc bộ' rules={[...rules.required]}>
				<Input placeholder='Nhập tên CLB...' />
			</Form.Item>
			<Space style={{ display: 'flex', width: '100%' }} align='baseline'>
				<Form.Item name='chuNhiem' label='Chủ nhiệm' rules={[...rules.required]}>
					<Input placeholder='Tên chủ nhiệm' />
				</Form.Item>
				<Form.Item
					name='ngayThanhLap'
					label='Ngày thành lập'
					rules={[...rules.required]}
					getValueProps={(value) => ({
						value: value ? moment(value) : undefined,
					})}
					getValueFromEvent={(date) => (date ? date.format('YYYY-MM-DD') : undefined)}
				>
					<DatePicker placeholder='Chọn ngày' style={{ width: '100%' }} format='DD/MM/YYYY' />
				</Form.Item>
			</Space>

			<Form.Item name='anhDaiDien' label='Link ảnh đại diện'>
				<Input placeholder='https://...' />
			</Form.Item>

			<Form.Item name='dangHoatDong' label='Trạng thái'>
				<Radio.Group optionType='button' buttonStyle='solid'>
					<Space>
						<Radio.Button value={ETrangThaiCLB.ACTIVE}>{ETrangThaiCLB.ACTIVE}</Radio.Button>
						<Radio.Button value={ETrangThaiCLB.INACTIVE}>{ETrangThaiCLB.INACTIVE}</Radio.Button>
					</Space>
				</Radio.Group>
			</Form.Item>

			<Form.Item name='moTa' label='Mô tả'>
				<Input.TextArea rows={3} />
			</Form.Item>

			<Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
				<Space>
					<Button onClick={onCancel}>Hủy</Button>
					<Button type='primary' htmlType='submit' loading={loading}>
						{isEdit ? 'Cập nhật' : 'Thêm mới'}
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default FormCLB;

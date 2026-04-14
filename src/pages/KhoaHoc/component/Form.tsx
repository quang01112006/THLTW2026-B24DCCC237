import { ETrangThai } from '@/services/QuanLyKhoaHoc/constants';
import rules from '@/utils/rules';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Radio, Select, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect } from 'react';
interface Props {
	onFinish: (values: any) => void;
	onCancel: () => void;
	initialValues?: any;
}
const FormKhoaHoc = (props: Props) => {
	const { onFinish, onCancel, initialValues } = props;
	const [form] = Form.useForm();
	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue(initialValues);
		} else {
			form.resetFields();
		}
	}, [initialValues, form]);
	const dsGiangVien = [
		{ value: 'GV_TuanAnh', label: 'Tuấn Anh' },
		{ value: 'GV_PhuongLinh', label: 'Phương Linh' },
	];
	return (
		<Form form={form} layout='vertical' onFinish={onFinish} initialValues={{ soLuongHocVien: 0, trangThai: 'DANG_MO' }}>
			<Form.Item name='ten' label='Tên khóa học' rules={[...rules.required, ...rules.length(100)]}>
				<Input placeholder='Nhập tên khóa học...' />
			</Form.Item>
			<Form.Item name='giangVien' label='Giảng viên' rules={[...rules.required]}>
				<Select placeholder='Chọn giảng viên' options={dsGiangVien} />
			</Form.Item>
			<Form.Item
				name='soLuongHocVien'
				label='Số lượng học viên'
				rules={[...rules.required, ...rules.number(999999, 0, false)]}
			>
				<InputNumber style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name='trangThai' label='Trạng thái khóa học' rules={rules.required}>
				<Radio.Group
					options={Object.values(ETrangThai).map((val) => ({
						label: val,
						value: val,
					}))}
				/>
			</Form.Item>
			<Form.Item name='moTa' label='Mô tả khóa học (HTML)' rules={[...rules.required]}>
				<TextArea rows={4} placeholder='Nhập mã HTML mô tả...' />
			</Form.Item>
			<Space style={{ display: 'flex', justifyContent: 'center' }}>
				<Button icon={<CloseOutlined />} onClick={onCancel}>
					Hủy
				</Button>
				<Button icon={<SaveOutlined />} type='primary' htmlType='submit'>
					Lưu
				</Button>
			</Space>
		</Form>
	);
};
export default FormKhoaHoc;

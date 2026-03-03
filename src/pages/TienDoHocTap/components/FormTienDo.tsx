import rules from '@/utils/rules';
import { Button, Form, Input, InputNumber, Modal, Space, Select, DatePicker } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import moment from 'moment'; //

const FormTienDo = ({ isVisibleForm, edit, record, setIsVisibleForm }: any) => {
	const { addTienDo, editTienDo } = useModel('tiendohoctap');
	const { monHoc } = useModel('monhoc');
	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();

		if (isVisibleForm) {
			if (edit && record) {
				form.setFieldsValue({
					...record,
					thoiGianHoc: record.thoiGianHoc ? moment(record.thoiGianHoc) : null,
				});
			}
		}
	}, [isVisibleForm, edit, record]);

	const onFinish = (values: any) => {
		const dataSave = {
			...values,
			thoiGianHoc: values.thoiGianHoc.format('YYYY-MM-DD HH:mm'),
		};

		if (edit && record) {
			editTienDo(record.id, dataSave);
		} else {
			addTienDo(dataSave);
		}
		setIsVisibleForm(false);
	};

	return (
		<Modal
			destroyOnClose
			onCancel={() => setIsVisibleForm(false)}
			visible={isVisibleForm}
			title={edit ? 'Sửa nhật ký học tập' : 'Ghi nhận tiến độ mới'}
			footer={null}
			width={600}
		>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item name='idMonHoc' label='Chọn môn học' rules={[...rules.required]}>
					<Select placeholder='Chọn môn học đã khai báo'>
						{monHoc.map((item: any) => (
							<Select.Option key={item.id} value={item.id}>
								{item.ten}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Space style={{ display: 'flex' }} align='baseline'>
					<Form.Item name='thoiGianHoc' label='Thời gian học' rules={[...rules.required]}>
						<DatePicker showTime format='YYYY-MM-DD HH:mm' />
					</Form.Item>

					<Form.Item name='thoiLuongHoc' label='Thời lượng (Phút)' rules={[...rules.required]}>
						<InputNumber min={1} style={{ width: 150 }} placeholder='Ví dụ: 90' />
					</Form.Item>
				</Space>

				<Form.Item name='noiDungDaHoc' label='Nội dung đã học' rules={[...rules.required]}>
					<Input.TextArea rows={3} placeholder='Nhập nội dung ...' />
				</Form.Item>

				<Form.Item name='ghiChu' label='Ghi chú (Nếu có)'>
					<Input placeholder='Ghi chú thêm...' />
				</Form.Item>

				<Space style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
					<Button onClick={() => setIsVisibleForm(false)}>Hủy</Button>
					<Button type='primary' htmlType='submit'>
						Lưu
					</Button>
				</Space>
			</Form>
		</Modal>
	);
};

export default FormTienDo;

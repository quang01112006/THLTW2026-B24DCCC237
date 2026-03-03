import rules from '@/utils/rules';
import { Button, Form, Input, InputNumber, Modal, Space } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormMonHoc = ({ isVisibleForm, record, edit, setIsVisibleForm }: any) => {
	const { addMonHoc, editMonHoc } = useModel('monhoc');
	const [form] = Form.useForm();
	useEffect(() => {
		if (isVisibleForm) {
			if (edit && record) {
				form.setFieldsValue(record);
			} else {
				form.resetFields();
			}
		}
	}, [record, isVisibleForm]);
	return (
		<Modal
			destroyOnClose
			onCancel={() => setIsVisibleForm(false)}
			visible={isVisibleForm}
			title={edit ? 'Sửa môn học' : 'Thêm môn học mới'}
			footer={null}
		>
			<Form
				form={form}
				layout='vertical'
				onFinish={(val) => {
					if (edit && record) {
						editMonHoc(record.id, val);
					} else {
						addMonHoc(val);
					}
					setIsVisibleForm(false);
				}}
			>
				<Form.Item name='ten' label='Tên môn học' rules={[...rules.required]}>
					<Input placeholder='Nhập tên môn' />
				</Form.Item>
				<Form.Item name='mucTieuHangThang' label='Mục tiêu học tập (Phút/Tháng)' rules={[...rules.required]}>
					<InputNumber min={1} style={{ width: '100%' }} placeholder='Nhập thời gian học/tháng' />
				</Form.Item>
				<Space style={{ display: 'flex', justifyContent: 'center' }}>
					<Button danger onClick={() => setIsVisibleForm(false)}>
						Cancel
					</Button>
					<Button type='primary' htmlType='submit'>
						OK
					</Button>
				</Space>
			</Form>
		</Modal>
	);
};
export default FormMonHoc;

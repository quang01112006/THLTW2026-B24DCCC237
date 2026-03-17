import rules from '@/utils/rules';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Modal, Select, Space, TimePicker } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useModel } from 'umi';
interface Props {
	visible: boolean;
	record: QuanLyDichVu.NhanVien | null;
	setVisible: (v: boolean) => void;
}
const ModalNhanVien = ({ visible, record, setVisible }: Props) => {
	const [form] = Form.useForm();
	const { saveNhanVien } = useModel('nhanvien');
	useEffect(() => {
		if (visible) {
			if (record) {
				const formattedLich = record.lichLamViec?.map((item) => ({
					...item,

					timeRange: [moment(item.caBatDau, 'HH:mm'), moment(item.caKetThuc, 'HH:mm')],
				}));
				form.setFieldsValue({
					...record,
					dsLichLamViec: formattedLich,
				});
			} else {
				form.resetFields();
			}
		}
	}, [visible, record, form]);
	const onFinish = (values: any) => {
		const dataToSave = {
			...values,
			id: record?.id,
			dsLichLamViec:
				values.dsLichLamViec?.map((l: any) => ({
					thu: l.thu,
					caBatDau: l.timeRange[0].format('HH:mm'),
					caKetThuc: l.timeRange[1].format('HH:mm'),
				})) || [],
		};
		saveNhanVien(dataToSave);
		setVisible(false);
	};
	return (
		<Modal
			footer={null}
			title={record ? 'Sửa nhân viên' : 'Thêm nhân viên mới'}
			visible={visible}
			onCancel={() => setVisible(false)}
			width={600}
		>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item name='ten' label='Họ và tên' rules={[...rules.required]}>
					<Input placeholder='Ví dụ: Nguyễn Văn A' />
				</Form.Item>

				<Form.Item name='gioiHanKhach' label='Giới hạn khách/ngày' rules={[...rules.required]}>
					<InputNumber min={1} style={{ width: '100%' }} />
				</Form.Item>

				<Divider>Lịch làm việc</Divider>

				<Form.List name='dsLichLamViec'>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
									<Form.Item {...restField} name={[name, 'thu']} rules={[...rules.required]}>
										<Select placeholder='Thứ' style={{ width: 120 }}>
											<Select.Option value={1}>Thứ 2</Select.Option>
											<Select.Option value={2}>Thứ 3</Select.Option>
											<Select.Option value={3}>Thứ 4</Select.Option>
											<Select.Option value={4}>Thứ 5</Select.Option>
											<Select.Option value={5}>Thứ 6</Select.Option>
											<Select.Option value={6}>Thứ 7</Select.Option>
											<Select.Option value={0}>Chủ nhật</Select.Option>
										</Select>
									</Form.Item>

									<Form.Item rules={[...rules.required]} {...restField} name={[name, 'timeRange']}>
										<TimePicker.RangePicker format='HH:mm' placeholder={['Bắt đầu', 'Kết thúc']} />
									</Form.Item>

									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
								Thêm ca làm việc
							</Button>
						</>
					)}
				</Form.List>
				<Form.Item style={{ margin: 20, textAlign: 'center' }}>
					<Space>
						<Button onClick={() => setVisible(false)}>Hủy </Button>
						<Button type='primary' htmlType='submit'>
							Lưu
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default ModalNhanVien;

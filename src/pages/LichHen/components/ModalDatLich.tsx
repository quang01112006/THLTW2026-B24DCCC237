import rules from '@/utils/rules';
import { Button, DatePicker, Form, Input, Modal, Select, Space, TimePicker, Divider, message } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

interface Props {
	visible: boolean;
	setVisible: (v: boolean) => void;
}

const ModalDatLich = ({ visible, setVisible }: Props) => {
	const [form] = Form.useForm();

	const { saveLichHen, checkTrungLich } = useModel('lichhen');
	const { dsNhanVien, checkLichLamViec } = useModel('nhanvien');
	const { dsDichVu } = useModel('dichvu');

	const onFinish = (values: any) => {
		const ngayHen = values.ngayHen.format('YYYY-MM-DD');
		const gioHen = values.gioHen.format('HH:mm');

		const dichVuChon = dsDichVu.find((dv) => dv.id === values.idDichVu);
		const thoiGianPhut = dichVuChon?.thoiGianThucHien || 60;

		const biTrung = checkTrungLich(values.idNhanVien, ngayHen, gioHen, thoiGianPhut);

		if (biTrung) {
			message.error('Nhân viên này đang bận vào khung giờ đó! Chọn giờ khác đi.');
			return;
		}

		const dataToSave = {
			...values,
			ngayHen,
			gioHen,
			trangThai: 'CHO_DUYET',
		};

		saveLichHen(dataToSave);
		setVisible(false);
		form.resetFields();
	};

	return (
		<Modal title='ĐẶT LỊCH HẸN MỚI' visible={visible} onCancel={() => setVisible(false)} footer={null} width={550}>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item name='tenKhachHang' label='Tên khách hàng' rules={[...rules.required]}>
					<Input placeholder='Nhập tên khách' />
				</Form.Item>

				<Form.Item name='soDienThoai' label='Số điện thoại' rules={[...rules.required]}>
					<Input placeholder='Nhập số điện thoại' />
				</Form.Item>

				<Space style={{ display: 'flex' }} align='baseline'>
					<Form.Item name='ngayHen' label='Ngày hẹn' rules={[...rules.required]}>
						<DatePicker format='DD-MM-YYYY' disabledDate={(current) => current && current < moment().startOf('day')} />
					</Form.Item>

					<Form.Item name='gioHen' label='Giờ hẹn' rules={[...rules.required]}>
						<TimePicker format='HH:mm' minuteStep={15} />
					</Form.Item>
				</Space>

				<Form.Item name='idDichVu' label='Dịch vụ' rules={[...rules.required]}>
					<Select placeholder='Chọn dịch vụ làm đẹp'>
						{dsDichVu.map((dv) => (
							<Select.Option key={dv.id} value={dv.id}>
								{dv.tenDichVu} - ({dv.gia.toLocaleString()} đ)
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.ngayHen !== currentValues.ngayHen}>
					{({ getFieldValue }) => {
						const ngayChon = getFieldValue('ngayHen');
						const ngayString = ngayChon ? ngayChon.format('YYYY-MM-DD') : null;

						const nhanVienFilter = dsNhanVien.filter((nv) => (ngayString ? checkLichLamViec(nv.id, ngayString) : true));

						return (
							<Form.Item name='idNhanVien' label='Nhân viên phục vụ' rules={[...rules.required]}>
								<Select placeholder={ngayChon ? 'Chọn nhân viên rảnh' : 'Vui lòng chọn ngày trước'}>
									{nhanVienFilter.map((nv) => (
										<Select.Option key={nv.id} value={nv.id}>
											{nv.ten}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						);
					}}
				</Form.Item>

				<Divider />

				<Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
					<Space>
						<Button onClick={() => setVisible(false)}>Hủy</Button>
						<Button type='primary' htmlType='submit'>
							Xác nhận đặt lịch
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalDatLich;

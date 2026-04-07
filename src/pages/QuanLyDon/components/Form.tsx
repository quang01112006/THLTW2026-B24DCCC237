import { EGioiTinh } from '@/services/CLB/constants';
import type { CLB } from '@/services/CLB/typing';
import rules from '@/utils/rules';
import { Button, Col, Form, Input, Radio, Row, Select, Space } from 'antd';

interface IProps {
	dsCLB: CLB.IRecord[];
	onSave: (values: CLB.IDonDangKi) => void;
	loading?: boolean;
	setIsModalVisible: (v: boolean) => void;
}

const FormDangKi = (props: IProps) => {
	const { dsCLB, onSave, loading, setIsModalVisible } = props;
	const [form] = Form.useForm();

	return (
		<Form
			layout='vertical'
			form={form}
			onFinish={(values) => {
				onSave(values);
				form.resetFields();
			}}
		>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item name='hoTen' label='Họ và tên' rules={[...rules.required]}>
						<Input placeholder='Nhập họ tên sinh viên...' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='email' label='Email sinh viên' rules={[...rules.required, ...rules.email]}>
						<Input placeholder='example@student.ptit.edu.vn' />
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item name='soDienThoai' label='Số điện thoại'>
						<Input placeholder='09xxx...' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='gioiTinh' label='Giới tính' rules={[...rules.required]}>
						<Radio.Group
							options={[
								{ label: EGioiTinh.NAM, value: EGioiTinh.NAM },
								{ label: EGioiTinh.NU, value: EGioiTinh.NU },
							]}
						/>
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item name='diaChi' label='Địa chỉ hiện tại' rules={[...rules.required]}>
						<Input placeholder='Ký túc xá hoặc địa chỉ tạm trú...' />
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item name='idCLB' label='Đăng ký vào Câu lạc bộ' rules={[...rules.required]}>
						<Select placeholder='Chọn CLB muốn tham gia'>
							{dsCLB.map((clb) => (
								<Select.Option key={clb.id} value={clb.id}>
									{clb.ten}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='soTruong' label='Sở trường bản thân'>
						<Input placeholder='Vd: Hát, múa, code, thuyết trình...' />
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item name='lyDoDangKi' label='Lý do muốn gia nhập' rules={[...rules.required]}>
						<Input.TextArea rows={4} placeholder='Chia sẻ mong muốn của bạn khi vào CLB...' />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
				<Space>
					<Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
					<Button type='primary' htmlType='submit' loading={loading}>
						Gửi đơn đăng ký
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default FormDangKi;

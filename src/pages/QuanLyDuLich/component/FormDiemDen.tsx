import { ELoaiHinh, EPhanKhucGia, TextLoaiHinh, TextPhanKhucGia } from '@/services/DuLich/constants';
import { DuLich } from '@/services/DuLich/typing';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Rate, Row, Select, Space } from 'antd';
import { useEffect } from 'react';

interface Props {
	record?: DuLich.IDiemDen;
	onFinish: (values: DuLich.IDiemDen) => void;
	onCancel: () => void;
}

const FormDiemDen = ({ record, onFinish, onCancel }: Props) => {
	const [form] = Form.useForm();
	useEffect(() => {
		form.resetFields();
		if (record) {
			form.setFieldsValue(record);
		}
	}, [record, form]);

	const handleValuesChange = (_: any, allValues: any) => {
		const { anUong = 0, luuTru = 0, diChuyen = 0 } = allValues.mucChiPhi || {};
		const tong = Number(anUong) + Number(luuTru) + Number(diChuyen);
		form.setFieldsValue({ tongChiPhi: tong });
	};

	return (
		<Form
			form={form}
			layout='vertical'
			onFinish={onFinish}
			onValuesChange={handleValuesChange}
			initialValues={{
				danhGia: 0,
				loaiHinh: ELoaiHinh.BIEN,
				phanKhucGia: EPhanKhucGia.PHO_THONG,
				mucChiPhi: { anUong: 0, luuTru: 0, diChuyen: 0 },
				tongChiPhi: 0,
			}}
		>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item name='ten' label='Tên điểm đến' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
						<Input placeholder='VD: Vịnh Hạ Long' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='loaiHinh' label='Loại hình'>
						<Select options={Object.values(ELoaiHinh).map((v) => ({ value: v, label: TextLoaiHinh[v] }))} />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item name='phanKhucGia' label='Phân khúc giá'>
						<Select
							options={Object.keys(TextPhanKhucGia).map((k) => ({
								value: k,
								label: TextPhanKhucGia[k as EPhanKhucGia],
							}))}
						/>
					</Form.Item>{' '}
				</Col>
				<Col span={12}>
					<Form.Item name='thoiGianThamQuan' label='Thời gian tham quan (giờ)'>
						<InputNumber style={{ width: '100%' }} min={0.5} step={0.5} />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={8}>
					<Form.Item name={['mucChiPhi', 'anUong']} label='Tiền ăn'>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item name={['mucChiPhi', 'luuTru']} label='Tiền ngủ'>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item name={['mucChiPhi', 'diChuyen']} label='Tiền đi lại'>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item name='tongChiPhi' label='Tổng chi phí ước tính'>
						<InputNumber style={{ width: '100%', fontWeight: 'bold', backgroundColor: '#f5f5f5' }} disabled />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='danhGia' label='Đánh giá'>
						<Rate allowHalf />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item name='hinhAnh' label='Link hình ảnh'>
				<Input placeholder='https://...' />
			</Form.Item>

			<Form.Item name='moTa' label='Mô tả'>
				<Input.TextArea rows={3} placeholder='Nhập mô tả chi tiết...' />
			</Form.Item>

			<Space style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
				<Button onClick={onCancel}>Hủy</Button>
				<Button type='primary' htmlType='submit' icon={<SaveOutlined />}>
					{record ? 'Lưu' : 'Thêm mới'}
				</Button>
			</Space>
		</Form>
	);
};

export default FormDiemDen;

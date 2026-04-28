import { ELoaiBaiTap, ETrangThaiBuoiTap } from '@/services/Health/constants';
import type { Health } from '@/services/Health/typing';
import rules from '@/utils/rules';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useModel } from 'umi';

const { TextArea } = Input;

interface IProps {
	record: Health.IBuoiTap | null;
	onFinish: (values: any) => void;
	onCancel: () => void;
}

const FormBuoiTap = (props: IProps) => {
	const [form] = Form.useForm();
	const { record, onFinish, onCancel } = props;
	const { dsBaiTap } = useModel('baitap');

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

	const updateCalo = (baiTapId: string, thoiLuong: number) => {
		const baiTap = dsBaiTap.find((b) => b.id === baiTapId);
		if (baiTap && thoiLuong) {
			const tinhCalo = Math.round((thoiLuong / 60) * baiTap.caloTrenGio);
			form.setFieldsValue({ calo: tinhCalo });
		}
	};

	const handleFinish = (values: any) => {
		const formattedValues = {
			...values,
			ngay: values.ngay ? values.ngay.format('YYYY-MM-DD') : undefined,
		};
		onFinish(formattedValues);
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleFinish}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label='Ngày tập' name='ngay' rules={[...rules.required]}>
						<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label='Trạng thái' name='trangThai' rules={[...rules.required]}>
						<Select options={Object.values(ETrangThaiBuoiTap).map((val) => ({ label: val, value: val }))} />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item label='Chọn bài tập' name='baiTapId' rules={[...rules.required]}>
				<Select
					showSearch
					placeholder='Chọn từ thư viện...'
					optionFilterProp='children'
					filterOption={(input, option) => (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())}
					onChange={(id) => updateCalo(id, form.getFieldValue('thoiLuong'))}
					options={dsBaiTap.map((bt) => ({ label: bt.ten, value: bt.id }))}
				/>
			</Form.Item>

			<Form.Item label='Loại bài tập' name='loaiBaiTap' rules={[...rules.required]}>
				<Select options={Object.values(ELoaiBaiTap).map((val) => ({ label: val, value: val }))} />
			</Form.Item>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label='Thời lượng (phút)' name='thoiLuong' rules={[...rules.required]}>
						<InputNumber
							style={{ width: '100%' }}
							min={1}
							addonAfter='phút'
							onChange={(val) => updateCalo(form.getFieldValue('baiTapId'), val as number)}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label='Calo tiêu thụ' name='calo' rules={[...rules.required]}>
						<InputNumber style={{ width: '100%' }} min={0} addonAfter='kcal' />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item label='Ghi chú' name='ghiChu'>
				<TextArea rows={3} maxLength={200} showCount />
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

export default FormBuoiTap;

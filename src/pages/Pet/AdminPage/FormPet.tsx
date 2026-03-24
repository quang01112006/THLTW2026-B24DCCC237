import { HienThiLoaiPet } from '@/services/Pet/constants';
import { Pet } from '@/services/Pet/typing';
import rules from '@/utils/rules';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
interface Props {
	record: Pet.Record | null;
	setVisibleForm: (v: boolean) => void;
}
const FormPet = ({ setVisibleForm, record }: Props) => {
	const { addPet, editPet } = useModel('pet');
	const [form] = Form.useForm();
	useEffect(() => {
		if (record) form.setFieldsValue(record);
		else form.resetFields();
	}, [record]);
	const onFinish = (val: any) => {
		if (record) {
			editPet({ ...record, ...val });
		} else {
			addPet(val);
		}
		setVisibleForm(false);
	};
	return (
		<>
			<Form layout='vertical' form={form} onFinish={onFinish}>
				<Form.Item name='tenPet' label='Name' rules={[...rules.required]}>
					<Input placeholder="enter your pet's name" />
				</Form.Item>
				<Form.Item name='loai' label='Category' rules={[...rules.required]}>
					<Select
						placeholder='pick your pet category'
						allowClear
						options={Object.keys(HienThiLoaiPet).map((i) => ({
							label: HienThiLoaiPet[i as keyof typeof HienThiLoaiPet],
							value: i,
						}))}
					></Select>
				</Form.Item>
				<Form.Item name='soLuong' label='Quantity' rules={[...rules.required]}>
					<InputNumber style={{ width: '100%' }} placeholder='Number of pets' />
				</Form.Item>
				<Form.Item name='giaBan' label='Price' rules={[...rules.required]}>
					<InputNumber style={{ width: '100%' }} placeholder='Price of pet' />
				</Form.Item>
				<Space style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={() => setVisibleForm(false)}>Cancel</Button>
					<Button type='primary' htmlType='submit'>
						OK
					</Button>
				</Space>
			</Form>
		</>
	);
};
export default FormPet;

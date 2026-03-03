import { HienThiTrangThai, TrangThai } from '@/services/Sach/constants';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Space } from 'antd';
import { useModel } from 'umi';
interface FormProps {
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
}
const BookForm = ({ isModalOpen, setIsModalOpen }: FormProps) => {
	const { addBook } = useModel('sach');
	return (
		<Modal title='Add books' visible={isModalOpen} footer={null}>
			<Form
				layout='vertical'
				onFinish={(val) => {
					const data = {
						...val,
						year: val.year ? val.year.year() : undefined,
						status: val > 0 ? TrangThai.AVAILABLE : TrangThai.UNAVAILABLE,
					};
					addBook(data);
				}}
			>
				<Form.Item name='name' label='Name'>
					<Input placeholder='enter your book name' />
				</Form.Item>
				<Form.Item name='category' label='Category'>
					<Input placeholder='enter book category' />
				</Form.Item>
				<Form.Item name='quantity' label='Quantity'>
					<InputNumber />
				</Form.Item>
				<Form.Item name='year' label='Year'>
					<DatePicker picker='year'></DatePicker>
				</Form.Item>
				<Space style={{ display: 'flex', justifyContent: 'center' }}>
					<Button danger onClick={() => setIsModalOpen(false)}>
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
export default BookForm;

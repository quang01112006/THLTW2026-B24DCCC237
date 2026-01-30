import { IColumn } from '@/components/Table/typing';
import { TrangThaiDonHang } from '@/services/DonHang/constants';
import rules from '@/utils/rules';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Select, Space, Table } from 'antd';
import { useModel } from 'umi';

const FormDonHang = () => {
	const { setIsModalOpen, isModalOpen, handleAdd } = useModel('donhang');
	const { listSanPham } = useModel('sanpham');
	const [form] = Form.useForm();
	const selectedId = Form.useWatch('selectedProducts', form) || [];
	const cartValues = Form.useWatch('cart', form) || {};
	const tableData = selectedId.map((i: number) => listSanPham.find((sp) => sp.id === i));
	const columns: IColumn<SanPham.Record>[] = [
		{
			title: <div style={{ textAlign: 'left' }}>Tên sản phẩm</div>,
			dataIndex: 'name',
			width: 200,
		},
		{
			title: 'Tồn kho',
			dataIndex: 'quantity',
			width: 80,
			align: 'center',
		},
		{
			title: 'Số lượng đặt',
			width: 80,
			align: 'center',
			render: (val, record) => (
				<Form.Item
					name={['cart', record.id]}
					initialValue={1}
					rules={[...rules.required, ...rules.number(record.quantity, 1, false)]}
				>
					<InputNumber></InputNumber>
				</Form.Item>
			),
		},
		{
			title: '',
			width: 50,
			render: (val, record) => (
				<DeleteOutlined
					style={{ color: 'red' }}
					onClick={() => {
						const newIds = selectedId.filter((id: number) => id !== record.id);
						form.setFieldsValue({ selectedProducts: newIds });
					}}
				/>
			),
		},
	];
	return (
		<Modal
			title='Tạo đơn hàng mới'
			visible={isModalOpen}
			onCancel={() => setIsModalOpen(false)}
			width={600}
			footer={null}
		>
			<Form
				layout='vertical'
				form={form}
				onFinish={(values) => {
					const sp = tableData.map((i: SanPham.Record) => ({
						productId: i.id,
						productName: i.name,
						price: i.price,
						quantity: values.cart?.[i.id] || 1,
					}));
					const tongTien = sp.reduce((sum: number, curr: SanPham.Record) => sum + curr.price * curr.quantity, 0);
					const donHangMoi = {
						...values,
						products: sp,
						totalAmount: tongTien,
						status: TrangThaiDonHang.PENDING,
						createdAt: new Date().toISOString(),
					};
					handleAdd(donHangMoi);
					setIsModalOpen(false), form.resetFields();
				}}
			>
				<Form.Item name='id' label='Mã đơn hàng' rules={[...rules.required, ...rules.dacbiet]}>
					<Input></Input>
				</Form.Item>
				<Form.Item name='customerName' label='Tên khách hàng' rules={[...rules.required, ...rules.ten]}>
					<Input></Input>
				</Form.Item>
				<Form.Item name='phone' label='Số điện thoại' rules={[...rules.required, ...rules.soDienThoai]}>
					<Input></Input>
				</Form.Item>
				<Form.Item name='address' label='Địa chỉ' rules={[...rules.required]}>
					<Input></Input>
				</Form.Item>
				<Form.Item name='selectedProducts' label='Chọn sản phẩm' rules={[...rules.required]}>
					<Select
						mode='multiple'
						options={listSanPham.map((sp) => ({
							label: `${sp.name} - ${sp.quantity > 0 ? `Còn ${sp.quantity}` : 'Hết hàng'}`,
							value: sp.id,
							disabled: sp.quantity === 0,
						}))}
						showSearch
						optionFilterProp='label'
						allowClear
						maxTagCount={'responsive'}
					></Select>
				</Form.Item>

				{selectedId.length > 0 && (
					<Table
						dataSource={tableData}
						columns={columns}
						pagination={false}
						rowKey='id'
						locale={{ emptyText: 'Chưa chọn sản phẩm nào' }}
						summary={() => {
							const tong = tableData.reduce((sum: number, i: SanPham.Record) => {
								const soLuong = cartValues[i.id] || 1;
								return sum + i.price * soLuong;
							}, 0);
							return (
								<Table.Summary.Row>
									<Table.Summary.Cell index={0} colSpan={3} align='right'>
										<div>Tổng cộng:</div>
									</Table.Summary.Cell>
									<Table.Summary.Cell index={3} colSpan={1} align='right'>
										<div style={{ color: 'red' }}>{tong.toLocaleString('vi-VN')} đ</div>
									</Table.Summary.Cell>
								</Table.Summary.Row>
							);
						}}
					/>
				)}
				<Space style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
					<Button type='primary' htmlType='submit'>
						OK
					</Button>
				</Space>
			</Form>
		</Modal>
	);
};
export default FormDonHang;

import { IColumn } from '@/components/Table/typing';

import { HienThiTrangThaiDonHang, TrangThaiDonHang } from '@/services/DonHang/constants';
import { DonHang } from '@/services/DonHang/typing';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Divider, Input, Modal, Popconfirm, Select, Space, Table, Tag } from 'antd';
import { useModel } from 'umi';
import FormDonHang from './components/FormDonHang';
import { useState } from 'react';

const BangDonHang = () => {
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const [record, setRecord] = useState<DonHang.Record | null>(null);
	const { handleSearch, xuLyStatus, setIsModalOpen, handleDelete, text, setText } = useModel('donhang');
	const statusOptions = Object.values(TrangThaiDonHang).map((status) => ({
		label: <Tag color={HienThiTrangThaiDonHang[status].color}>{HienThiTrangThaiDonHang[status].label}</Tag>,
		value: status,
	}));
	const columns: IColumn<DonHang.Record>[] = [
		{
			title: 'Mã đơn hàng',
			width: 100,
			dataIndex: 'id',
			align: 'center',
		},
		{
			title: 'Tên khách hàng',
			width: 200,
			dataIndex: 'customerName',
			align: 'center',
		},
		{
			title: 'Số sản phẩm',
			width: 100,
			align: 'center',
			dataIndex: 'products',
			render: (val: DonHang.Product[], record) => {
				const soLuong = val.reduce((acc, curr) => acc + curr.quantity, 0);
				return <div>{soLuong}</div>;
			},
		},
		{
			title: 'Tổng tiền',
			width: 100,
			dataIndex: 'totalAmount',
			align: 'center',
		},
		{
			title: 'Trạng thái',
			width: 150,
			dataIndex: 'status',
			align: 'center',
			render: (val, record) => (
				<Select
					value={val}
					options={statusOptions}
					bordered={false}
					onChange={(newStatus) => xuLyStatus(record.id, newStatus)}
				/>
			),
		},
		{
			title: 'Thao tác',
			width: 150,
			align: 'center',
			render: (val, record) => (
				<Space>
					<Button
						icon={<EyeOutlined />}
						onClick={() => {
							setRecord(record);
							setIsDetailOpen(true);
						}}
					></Button>
					<Button icon={<EditOutlined />} onClick={() => setIsModalOpen(true)}></Button>
					<Popconfirm title='Xác nhận xóa đơn hàng?' onConfirm={() => handleDelete(record.id)}>
						<Button icon={<DeleteOutlined />} danger></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	return (
		<Card title='Quản lý đơn hàng'>
			<Space>
				<Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
					Tạo đơn hàng mới
				</Button>
				<Input.Search
					allowClear
					placeholder='Tìm đơn hàng...'
					value={text}
					onChange={(e) => setText(e.target.value)}
				></Input.Search>
			</Space>
			<Table columns={columns} dataSource={handleSearch}></Table>
			<FormDonHang />
			<Modal
				title='Chi tiết đơn hàng'
				visible={isDetailOpen}
				onCancel={() => setIsDetailOpen(false)}
				footer={[
					<Button key='close' onClick={() => setIsDetailOpen(false)}>
						Đóng
					</Button>,
				]}
				width={700}
			>
				{record && (
					<>
						<Descriptions bordered column={2}>
							<Descriptions.Item label='Khách hàng'>{record.customerName}</Descriptions.Item>
							<Descriptions.Item label='Mã đơn hàng'>{record.id}</Descriptions.Item>
							<Descriptions.Item label='Số điện thoại'>{record.phone}</Descriptions.Item>
							<Descriptions.Item label='Trạng thái'>
								<Tag color={HienThiTrangThaiDonHang[record.status].color}>
									{HienThiTrangThaiDonHang[record.status].label}
								</Tag>
							</Descriptions.Item>

							<Descriptions.Item label='Địa chỉ' span={2}>
								{record.address}
							</Descriptions.Item>
							<Descriptions.Item label='Ngày tạo'>{record.createdAt}</Descriptions.Item>
							<Descriptions.Item label='Tổng tiền'>
								<b style={{ color: 'red' }}>{record.totalAmount.toLocaleString()} đ</b>
							</Descriptions.Item>
						</Descriptions>

						<Divider orientation='left'>Danh sách sản phẩm</Divider>

						<Table
							dataSource={record.products}
							pagination={false}
							columns={[
								{ title: 'Tên sản phẩm', dataIndex: 'productName', align: 'center' },
								{ title: 'Số lượng', dataIndex: 'quantity', align: 'center' },
								{
									title: 'Đơn giá',
									dataIndex: 'price',
									render: (v) => `${v.toLocaleString()} đ`,
									align: 'center',
								},
								{
									title: 'Thành tiền',
									render: (val, rec) => `${(rec.price * rec.quantity).toLocaleString()} đ`,
									align: 'center',
								},
							]}
						/>
					</>
				)}
			</Modal>
		</Card>
	);
};
export default BangDonHang;

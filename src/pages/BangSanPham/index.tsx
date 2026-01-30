import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Input, Tag } from 'antd';
import { useModel } from 'umi';
import FormSanPhan from './components/FormSanPham';
import { useState } from 'react';
import { DanhMucSanPham, TrangThaiSanPham } from '@/services/SanPham/constants';

import { IColumn } from '@/components/Table/typing';

export default function BangSanPham() {
	const { listSanPham, handleDelete, handleAdd, searchList, searchText, setSearchText } = useModel('sanpham');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [record, setRecord] = useState<SanPham.Record | null>(null);
	const columns: IColumn<SanPham.Record>[] = [
		{
			title: 'STT',
			dataIndex: 'id',
			align: 'center',
			width: 60,
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name',
			align: 'center',
			width: 200,
		},
		{
			title: 'Danh mục',
			dataIndex: 'category',
			align: 'center',
			filters: DanhMucSanPham.map((i) => ({ text: i.label, value: i.value })),
			onFilter: (val, record) => record.category === val,
			width: 150,
		},
		{ title: 'Số Lượng', dataIndex: 'quantity', align: 'center', width: 100 },
		{
			title: 'Giá',
			dataIndex: 'price',
			align: 'center',
			render: (val, record) => `${val.toLocaleString()} VND`,
			width: 150,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'quantity',
			align: 'center',
			render: (val, record) => {
				let trangThai = TrangThaiSanPham.outOfStock;
				if (val > 10) trangThai = TrangThaiSanPham.available;
				else if (val > 1) trangThai = TrangThaiSanPham.lowStock;
				return <Tag color={trangThai.color}>{trangThai.label}</Tag>;
			},
			filters: Object.keys(TrangThaiSanPham).map((key) => ({
				text: TrangThaiSanPham[key as keyof typeof TrangThaiSanPham].label,
				value: key,
			})),
			onFilter: (val, record) => {
				const soLuong = record.quantity;
				if (val === 'available') return soLuong > 10;
				if (val === 'lowStock') return soLuong > 0 && soLuong <= 10;
				if (val === 'outOfStock') return soLuong === 0;
				return false;
			},
			width: 150,
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 200,
			render: (val, record) => (
				<Space>
					{console.log(val)}
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setRecord(record), setIsModalOpen(true);
						}}
					>
						Sửa
					</Button>
					<Popconfirm title='Xóa sản phẩm này?' onConfirm={() => handleDelete(record.id)}>
						<Button icon={<DeleteOutlined />} danger>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	return (
		<Card title='Quản lý sản phẩm'>
			<Space style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ display: 'flex', gap: 10 }}>
					<Button
						type='primary'
						onClick={() => {
							setRecord(null), setIsModalOpen(true);
						}}
					>
						Thêm sản phẩm
					</Button>
					<Input.Search
						placeholder='Tìm sản phẩm...'
						allowClear
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					></Input.Search>
				</div>
			</Space>
			<Table columns={columns} dataSource={searchList} pagination={{ pageSize: 5 }}></Table>
			<FormSanPhan isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} record={record}></FormSanPhan>
		</Card>
	);
}

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Input, Typography } from 'antd';
import { useModel } from 'umi';
import FormSanPhan from './components/FormSanPham';
import { useState } from 'react';

export default function BangSanPham() {
	const { listSanPham, handleDelete, handleAdd, searchList, searchText, setSearchText } = useModel('sanpham');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const columns: any[] = [
		{
			title: 'STT',
			render: (val, record, index) => index + 1,
			align: 'center',
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name',
			align: 'center',
		},
		{ title: 'Số Lượng', dataIndex: 'quantity', align: 'center' },
		{
			title: 'Giá',
			dataIndex: 'price',
			align: 'center',
			render: (val, record) => `${val.toLocaleString()} VND`,
		},
		{
			title: 'Thao tác',
			align: 'center',
			render: (val, record) => (
				<Space>
					{console.log(val)}
					<Button icon={<EditOutlined />}>Sửa</Button>
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
					<Button type='primary' onClick={() => setIsModalOpen(true)}>
						Thêm sản phẩm
					</Button>
					<Input.Search
						placeholder='Tìm sản phẩm...'
						allowClear
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					></Input.Search>
				</div>
				<div style={{ fontSize: 18 }}>
					<b>Tổng: </b>
					{searchList.length}
				</div>
			</Space>
			<Table columns={columns} dataSource={searchList}></Table>
			<FormSanPhan isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></FormSanPhan>
		</Card>
	);
}

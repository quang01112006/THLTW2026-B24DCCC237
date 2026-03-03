import { IColumn } from '@/components/Table/typing';
import { HienThiTrangThai } from '@/services/Sach/constants';
import { Sach } from '@/services/Sach/typing';
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Tag } from 'antd';
import { useModel } from 'umi';
import BookForm from './components/BookForm';
import { useState } from 'react';

const Books = () => {
	const { dataSach } = useModel('sach');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const column: IColumn<Sach.Record>[] = [
		{
			title: 'ID',
			width: 50,
			dataIndex: 'id',
		},
		{
			title: 'Name',
			width: 200,
			dataIndex: 'name',
		},
		{
			title: 'Category',
			width: 100,
			dataIndex: 'category',
		},
		{
			title: 'Quantity',
			width: 100,
			dataIndex: 'quantity',
		},
		{
			title: 'Year',
			width: 100,
			dataIndex: 'year',
		},
		{
			title: 'Status',
			width: 100,
			dataIndex: 'status',
			render: (val, record) => <Tag color={HienThiTrangThai[val].color}>{HienThiTrangThai[val].label}</Tag>,
		},
		{
			title: 'action',
			width: 200,
			render: (val, record) => (
				<Space>
					<Button icon={<EditOutlined />}></Button>
					<Popconfirm title='Are u sure?'>
						<Button icon={<DeleteOutlined />} type='primary'></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	return (
		<Card title='Manage Books'>
			<Button icon={<PlusCircleFilled />} type='primary' onClick={() => setIsModalOpen(true)}>
				Add Book
			</Button>
			<Table columns={column} dataSource={dataSach}></Table>
			<BookForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</Card>
	);
};
export default Books;

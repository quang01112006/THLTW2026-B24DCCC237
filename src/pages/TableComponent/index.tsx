import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

export default function TableComponent() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [record, setRecord] = useState(null);
	const { data } = useModel('datatable');
	const showModal = (record: any) => {
		setIsModalOpen(true), setRecord(record);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};

	const columns: any[] = [
		{
			title: 'Tên',
			width: 200,
			dataIndex: 'ten',
			align: 'center',
		},
		{
			title: 'Lớp',
			width: 100,
			dataIndex: 'lop',
			align: 'center',
		},
		{
			title: 'Thao tác',
			width: 100,
			align: 'center',
			render: () => (
				<Space>
					<Button icon={<EditOutlined />}></Button>
					<Popconfirm title='Delete?' onConfirm={() => console.log('hi')}>
						<Button icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card title='Bảng antd'>
			<Button type='primary' icon={<UserAddOutlined />}>
				Add
			</Button>

			<Table dataSource={data} columns={columns}></Table>
		</Card>
	);
}

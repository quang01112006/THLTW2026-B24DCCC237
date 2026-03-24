import { IColumn } from '@/components/Table/typing';
import { HienThiLoaiPet, TextTrangThaiPet } from '@/services/Pet/constants';
import { Pet } from '@/services/Pet/typing';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Popconfirm, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import FormPet from './FormPet';

const AdminPage = () => {
	const [visibleForm, setVisibleForm] = useState(false);
	const { addPet, dsPet, deletePet, editPet } = useModel('pet');
	const [record, setRecord] = useState<Pet.Record | null>(null);
	const columns: IColumn<Pet.Record>[] = [
		{
			title: 'id',
			width: 100,
			render: (_, record, index) => <div>{index + 1}</div>,
		},
		{
			title: 'Tên',
			width: 200,
			dataIndex: 'tenPet',
		},
		{
			title: 'Loại',
			width: 200,
			dataIndex: 'loai',
			render: (val, record) => <div>{HienThiLoaiPet[val as keyof typeof HienThiLoaiPet]}</div>,
		},
		{
			title: 'Số lượng',
			width: 100,
			dataIndex: 'soLuong',
		},
		{
			title: 'Giá bán',
			width: 200,
			dataIndex: 'giaBan',
			render: (val, record) => <div>{val.toLocaleString('vi-VN')}</div>,
		},
		{
			title: 'Trạng thái',
			width: 200,
			dataIndex: 'trangThai',
			align: 'center',
			render: (val, record) => {
				const hienThi = TextTrangThaiPet[val as keyof typeof TextTrangThaiPet];
				return <Tag color={hienThi.color}>{hienThi.label}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			width: 200,
			render: (val, record) => (
				<Space>
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setRecord(record), setVisibleForm(true);
						}}
					></Button>
					<Popconfirm title='R u sure?' onConfirm={() => deletePet(record.id)}>
						<Button icon={<DeleteOutlined />} type='primary'></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	return (
		<Card title='Quản lý pet'>
			<Button
				icon={<PlusCircleOutlined />}
				type='primary'
				onClick={() => {
					setRecord(null), setVisibleForm(true);
				}}
			>
				Add pet
			</Button>
			<Table dataSource={dsPet} columns={columns}></Table>
			<Modal
				visible={visibleForm}
				title={record ? 'Edit pet' : 'Add pet'}
				footer={null}
				onCancel={() => setVisibleForm(false)}
			>
				<FormPet setVisibleForm={setVisibleForm} record={record} />
			</Modal>
		</Card>
	);
};
export default AdminPage;

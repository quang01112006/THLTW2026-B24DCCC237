import { Button, Table, Space, Popconfirm, Card } from 'antd';
import { useModel } from 'umi';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import FormTienDo from './components/FormTienDo';
import { IColumn } from '@/components/Table/typing';

const TienDoHocTap = () => {
	const { listTienDo, delTienDo } = useModel('tiendohoctap');
	const { monHoc } = useModel('monhoc');

	const [isVisibleForm, setIsVisibleForm] = useState(false);
	const [edit, setEdit] = useState(false);
	const [recordEdit, setRecordEdit] = useState<any>(null);
	const columns: IColumn<MonHoc.TienDo>[] = [
		{
			title: 'STT',
			render: (val, record, index) => index + 1,
			width: 50,
			align: 'center',
		},
		{
			title: 'Môn học',
			width: 100,
			dataIndex: 'idMonHoc',
			align: 'center',
			render: (id: number) => {
				const mon = monHoc.find((m) => m.id === id);
				return mon?.ten;
			},
		},
		{
			title: 'Thời gian học',
			dataIndex: 'thoiGianHoc',
			align: 'center',
			width: 100,
		},
		{
			title: 'Thời lượng',
			dataIndex: 'thoiLuongHoc',
			render: (val) => `${val} phút`,
			align: 'center',
			width: 100,
		},
		{
			title: 'Nội dung',
			dataIndex: 'noiDungDaHoc',
			align: 'center',
			width: 100,
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 200,
			render: (val, record) => (
				<Space>
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setEdit(true);
							setRecordEdit(record);
							setIsVisibleForm(true);
						}}
					>
						Sửa
					</Button>
					<Popconfirm title='Xóa dòng này?' onConfirm={() => delTienDo(record.id)}>
						<Button type='primary' icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card title='Tiến độ học tập '>
			<Button
				type='primary'
				icon={<PlusOutlined />}
				style={{ marginBottom: 16 }}
				onClick={() => {
					setIsVisibleForm(true), setRecordEdit(null);
				}}
			>
				Thêm lịch học
			</Button>
			<Table dataSource={listTienDo} columns={columns} />
			<FormTienDo isVisibleForm={isVisibleForm} edit={edit} record={recordEdit} setIsVisibleForm={setIsVisibleForm} />
		</Card>
	);
};

export default TienDoHocTap;

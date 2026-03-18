import { Table, Button, Space, Typography, Popconfirm, Tag } from 'antd';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ModalDichVu from './components/ModalDichVu';

const { Text } = Typography;

const TableDichVu = () => {
	const [visible, setVisible] = useState(false);
	const [record, setRecord] = useState<QuanLyDichVu.DichVu | null>(null);
	const { dsDichVu, deleteDichVu, saveDichVu } = useModel('dichvu');

	const columns: any = [
		{
			title: 'Tên dịch vụ',
			dataIndex: 'tenDichVu',
		},
		{
			title: 'Giá tiền',
			dataIndex: 'gia',
			key: 'gia',
			align: 'right',
			render: (val: number) => (
				<Text type='danger' strong>
					{val.toLocaleString('vi-VN')} đ
				</Text>
			),
		},
		{
			title: 'Thời gian thực hiện',
			dataIndex: 'thoiGianThucHien',
			key: 'thoiGianThucHien',
			align: 'center',
			render: (phut: number) => (
				<Tag icon={<ClockCircleOutlined />} color='orange'>
					{phut} phút
				</Tag>
			),
		},
		{
			title: 'Thao tác',
			align: 'center',
			render: (_: any, entity: QuanLyDichVu.DichVu) => (
				<Space>
					<Button
						type='primary'
						ghost
						icon={<EditOutlined />}
						onClick={() => {
							setRecord(entity);
							setVisible(true);
						}}
					>
						Sửa
					</Button>
					<Popconfirm
						title='Xóa dịch vụ này khỏi menu?'
						onConfirm={() => deleteDichVu(entity.id)}
						okText='Xóa luôn'
						cancelText='Thôi'
					>
						<Button danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<div style={{ marginBottom: 16 }}>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					onClick={() => {
						setRecord(null);
						setVisible(true);
					}}
				>
					Thêm dịch vụ mới
				</Button>
			</div>

			<Table columns={columns} dataSource={dsDichVu} rowKey='id' bordered pagination={{ pageSize: 8 }} />

			<ModalDichVu visible={visible} setVisible={setVisible} record={record} onSave={saveDichVu} />
		</>
	);
};

export default TableDichVu;

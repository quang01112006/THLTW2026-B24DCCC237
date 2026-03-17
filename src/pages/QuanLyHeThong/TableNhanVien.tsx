import { Table, Button, Space, Typography, Popconfirm, Popover } from 'antd';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalNhanVien from './components/ModalNhanVien';

const { Text } = Typography;
const TableNhanVien = () => {
	const [visible, setVisible] = useState(false);
	const [record, setRecord] = useState<QuanLyDichVu.NhanVien | null>(null);

	const { dsNhanVien, deleteNhanVien } = useModel('nhanvien');
	const renderThu = (thu: number) => {
		const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
		return days[thu];
	};
	const columns: any = [
		{
			title: 'Họ và tên',
			dataIndex: 'ten',
			align: 'center',
			render: (text: string) => <Text strong>{text}</Text>,
		},
		{
			title: 'Giới hạn khách/ngày',
			dataIndex: 'gioiHanKhach',
			align: 'center',
		},
		{
			title: 'Lịch làm việc trong tuần',
			dataIndex: 'lichLamViec',
			align: 'center',
			render: (lich: QuanLyDichVu.LichLamViec[]) => {
				const content = (
					<div style={{ maxWidth: 200 }}>
						{lich.map((item, index) => (
							<div key={index}>
								{renderThu(item.thu)}: {item.caBatDau}-{item.caKetThuc}
							</div>
						))}
					</div>
				);

				return (
					<Popover content={content} title='Chi tiết lịch làm việc'>
						<Text underline style={{ cursor: 'pointer', color: 'red' }}>
							{lich.length} ngày / tuần
						</Text>
					</Popover>
				);
			},
		},
		{
			title: 'Thao tác',
			align: 'center',
			render: (_: any, record: QuanLyDichVu.NhanVien) => (
				<Space>
					<Button
						type='primary'
						icon={<EditOutlined />}
						onClick={() => {
							setVisible(true), setRecord(record);
						}}
					>
						Sửa
					</Button>
					<Popconfirm title='Xóa nhân viên này?' onConfirm={() => deleteNhanVien(record.id)}>
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
				<Button type='primary' icon={<PlusOutlined />} onClick={() => setVisible(true)}>
					Thêm nhân viên mới
				</Button>
			</div>
			<Table columns={columns} dataSource={dsNhanVien} bordered pagination={{ pageSize: 5 }} />
			<ModalNhanVien visible={visible} setVisible={setVisible} record={record}></ModalNhanVien>
		</>
	);
};

export default TableNhanVien;

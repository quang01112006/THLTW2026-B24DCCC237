import type { IColumn } from '@/components/Table/typing';
import { ETrangThaiCLB, ETrangThaiDonDangKi } from '@/services/CLB/constants';
import type { CLB } from '@/services/CLB/typing';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Popconfirm, Space, Table, Tag, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import FormCLB from './components/Form';

const CLBPage = () => {
	const { dsCLB, addOrEdit, deleteCLB, loading } = useModel('clb');
	const { dsDon } = useModel('dondangki');

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [currentRecord, setCurrentRecord] = useState<CLB.IRecord | null>(null);

	const [isMemberModalVisible, setIsMemberModalVisible] = useState<boolean>(false);
	const [selectedCLB, setSelectedCLB] = useState<CLB.IRecord | null>(null);

	const showModal = (recordItem?: CLB.IRecord) => {
		setCurrentRecord(recordItem || null);
		setIsModalVisible(true);
	};

	const handleSave = (values: CLB.IRecord) => {
		addOrEdit(values, currentRecord?.id);
		setIsModalVisible(false);
	};

	const showMembers = (record: CLB.IRecord) => {
		setSelectedCLB(record);
		setIsMemberModalVisible(true);
	};

	const listThanhVien = dsDon.filter(
		(item) => item.idCLB === selectedCLB?.id && item.trangThai === ETrangThaiDonDangKi.APPROVED,
	);

	const columns: IColumn<CLB.IRecord>[] = [
		{
			title: 'STT',
			width: 50,
			align: 'center',
			render: (_, __, idx) => idx + 1,
		},
		{
			title: 'Ảnh',
			dataIndex: 'anhDaiDien',
			width: 70,
			align: 'center',
			render: (url: string) => (
				<img src={url} alt='avatar' style={{ width: 40, height: 40, borderRadius: '4px', objectFit: 'cover' }} />
			),
		},
		{
			title: 'Tên Câu lạc bộ',
			dataIndex: 'ten',
			width: 180,
			render: (text) => <b>{text}</b>,
		},
		{
			title: 'Chủ nhiệm',
			dataIndex: 'chuNhiem',
			width: 120,
			align: 'center',
		},
		{
			title: 'Mô tả',
			dataIndex: 'moTa',
			width: 250,
			render: (text: string) => (
				<Typography.Paragraph ellipsis={{ rows: 2, tooltip: text }} style={{ marginBottom: 0 }}>
					{text}
				</Typography.Paragraph>
			),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'dangHoatDong',
			width: 100,
			align: 'center',
			render: (status: ETrangThaiCLB) => <Tag color={status === ETrangThaiCLB.ACTIVE ? 'green' : 'red'}>{status}</Tag>,
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 120,
			render: (_, record) => (
				<Space size='middle'>
					<Tooltip title='Danh sách thành viên'>
						<Button type='text' icon={<UserOutlined />} onClick={() => showMembers(record)} />
					</Tooltip>
					<Tooltip title='Chỉnh sửa'>
						<Button type='text' icon={<EditOutlined />} onClick={() => showModal(record)} />
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm
							title='Xác nhận xóa CLB này?'
							onConfirm={() => deleteCLB(record.id)}
							okText='Xóa'
							cancelText='Hủy'
						>
							<Button type='text' danger icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<Card title='Quản Lý Câu Lạc Bộ'>
			<Button icon={<PlusOutlined />} type='primary' onClick={() => showModal()} style={{ marginBottom: 16 }}>
				Thêm CLB mới
			</Button>

			<Table columns={columns as any} dataSource={dsCLB} rowKey='id' loading={loading} bordered />

			<Modal
				title={currentRecord ? 'Chỉnh sửa Câu lạc bộ' : 'Thêm Câu lạc bộ mới'}
				visible={isModalVisible}
				footer={null}
				onCancel={() => setIsModalVisible(false)}
				destroyOnClose
			>
				<FormCLB
					initialValues={currentRecord}
					onCancel={() => setIsModalVisible(false)}
					loading={loading}
					isEdit={!!currentRecord}
					onSave={handleSave}
				/>
			</Modal>

			<Modal
				title={
					<span>
						Danh sách thành viên: <b>{selectedCLB?.ten}</b>
					</span>
				}
				visible={isMemberModalVisible}
				onCancel={() => setIsMemberModalVisible(false)}
				footer={[
					<Button key='close' onClick={() => setIsMemberModalVisible(false)}>
						Đóng
					</Button>,
				]}
				width={800}
				destroyOnClose
			>
				<Table
					dataSource={listThanhVien}
					rowKey='id'
					pagination={{ pageSize: 5 }}
					columns={[
						{ title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen', render: (t) => <b>{t}</b> },
						{ title: 'Email', dataIndex: 'email', key: 'email' },
						{ title: 'SĐT', dataIndex: 'soDienThoai', key: 'soDienThoai' },
						{
							title: 'Giới tính',
							dataIndex: 'gioiTinh',
							key: 'gioiTinh',
							render: (g) => <Tag color={g === 'Nam' ? 'blue' : 'magenta'}>{g}</Tag>,
						},
					]}
				/>
			</Modal>
		</Card>
	);
};

export default CLBPage;

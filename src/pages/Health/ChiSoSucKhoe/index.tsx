import { Health } from '@/services/Health/typing';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Popconfirm, Space, Table, Tag } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useModel } from 'umi';
import FormChiSoSucKhoe from './components/Form';

const ChiSoSucKhoe = () => {
	const { dsChiSo, addChiSo, deleteChiSo, editChiSo } = useModel('suckhoe');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingRecord, setEditingRecord] = useState<Health.IChiSoSucKhoe | null>(null);

	const openModal = (record: Health.IChiSoSucKhoe | null = null) => {
		setEditingRecord(record);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingRecord(null);
	};

	const getBMITag = (bmi: number) => {
		if (bmi < 18.5) return <Tag color='blue'>Thiếu cân</Tag>;
		if (bmi >= 18.5 && bmi <= 24.9) return <Tag color='green'>Bình thường</Tag>;
		if (bmi >= 25 && bmi <= 29.9) return <Tag color='orange'>Thừa cân</Tag>;
		return <Tag color='red'>Béo phì</Tag>;
	};

	const columns = [
		{
			title: 'Ngày',
			dataIndex: 'ngay',
			key: 'ngay',
			width: 120,
			align: 'center' as const,
			render: (text: string) => moment(text).format('DD/MM/YYYY'),
			sorter: (a: any, b: any) => moment(a.ngay).unix() - moment(b.ngay).unix(),
		},
		{
			title: 'Cân nặng (kg)',
			dataIndex: 'canNang',
			width: 130,
			align: 'center' as const,
			render: (val: number) => <b>{val} kg</b>,
		},
		{
			title: 'Chiều cao (cm)',
			dataIndex: 'chieuCao',
			width: 130,
			align: 'center' as const,
			render: (val: number) => `${val} cm`,
		},
		{
			title: 'BMI',
			key: 'bmi',
			width: 180,
			align: 'center' as const,
			render: (record: Health.IChiSoSucKhoe) => {
				const chieuCaoMet = record.chieuCao / 100;
				const bmi = Number((record.canNang / (chieuCaoMet * chieuCaoMet)).toFixed(1));
				return (
					<Space>
						<span>{bmi}</span>
						{getBMITag(bmi)}
					</Space>
				);
			},
		},
		{
			title: 'Nhịp tim',
			dataIndex: 'nhipTim',
			width: 120,
			align: 'center' as const,
			render: (val: number) => `${val} bpm`,
		},
		{
			title: 'Giờ ngủ',
			dataIndex: 'gioNgu',
			width: 120,
			align: 'center' as const,
			render: (val: number) => `${val} giờ`,
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 150,
			align: 'center' as const,
			fixed: 'right' as const,
			render: (record: Health.IChiSoSucKhoe) => (
				<Space size='middle'>
					<Button type='link' icon={<EditOutlined />} onClick={() => openModal(record)}>
						Sửa
					</Button>
					<Popconfirm title='Xóa bản ghi này?' onConfirm={() => deleteChiSo(record.id)}>
						<Button type='link' danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card
			title='Nhật ký chỉ số sức khỏe'
			extra={
				<Button type='primary' icon={<PlusOutlined />} onClick={() => openModal()}>
					Thêm chỉ số
				</Button>
			}
		>
			<Table columns={columns as any} dataSource={dsChiSo} rowKey='id' scroll={{ x: 1000 }} bordered />

			<Modal
				title={editingRecord ? 'Cập nhật chỉ số' : 'Ghi nhận chỉ số mới'}
				visible={isModalOpen}
				onCancel={closeModal}
				footer={null}
				destroyOnClose
			>
				<FormChiSoSucKhoe
					record={editingRecord}
					onCancel={closeModal}
					onFinish={(values: Health.IChiSoSucKhoe) => {
						if (editingRecord) {
							editChiSo(editingRecord.id, values);
						} else {
							addChiSo(values);
						}
						closeModal();
					}}
				/>
			</Modal>
		</Card>
	);
};

export default ChiSoSucKhoe;

import { ColorTrangThaiBaiTap, ELoaiBaiTap } from '@/services/Health/constants';
import { Health } from '@/services/Health/typing';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Modal, Popconfirm, Select, Space, Table, Tag } from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useModel } from 'umi';
import FormBuoiTap from './components/Form';

const { RangePicker } = DatePicker;

const NhatKiTapLuyen = () => {
	const { dsBuoiTap, addBuoiTap, deleteBuoiTap, editBuoiTap } = useModel('buoitap');
	const { dsBaiTap } = useModel('baitap');
	const [searchText, setSearchText] = useState('');
	const [filterLoai, setFilterLoai] = useState<ELoaiBaiTap | undefined>(undefined);
	const [filterTime, setFilterTime] = useState<[moment.Moment, moment.Moment] | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingRecord, setEditingRecord] = useState<Health.IBuoiTap | null>(null);

	const openModal = (record: Health.IBuoiTap | null = null) => {
		setEditingRecord(record);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingRecord(null);
	};

	const dsHienThi = useMemo(() => {
		return dsBuoiTap.filter((item: Health.IBuoiTap) => {
			const baiTap = dsBaiTap.find((b) => b.id === item.baiTapId);
			const tenBaiTap = baiTap?.ten.toLowerCase() || '';
			const matchSearch = tenBaiTap.includes(searchText.toLowerCase());
			const matchLoai = filterLoai ? item.loaiBaiTap === filterLoai : true;

			let matchTime = true;
			if (filterTime && filterTime[0] && filterTime[1]) {
				const itemDate = moment(item.ngay);
				matchTime = itemDate.isBetween(filterTime[0], filterTime[1], 'day', '[]');
			}

			return matchSearch && matchLoai && matchTime;
		});
	}, [dsBuoiTap, dsBaiTap, searchText, filterLoai, filterTime]);

	const columns = [
		{
			title: 'STT',
			width: 60,
			align: 'center' as const,
			fixed: 'left' as const,
			render: (_: any, __: any, index: number) => index + 1,
		},
		{
			title: 'Ngày',
			dataIndex: 'ngay',
			key: 'ngay',
			width: 120,
			align: 'center' as const,
			render: (text: string) => moment(text).format('DD/MM/YYYY'),
			sorter: (a: Health.IBuoiTap, b: Health.IBuoiTap) => moment(a.ngay).unix() - moment(b.ngay).unix(),
		},
		{
			title: 'Bài tập',
			dataIndex: 'baiTapId',
			key: 'baiTapId',
			width: 200,
			render: (id: string) => {
				const baiTap = dsBaiTap.find((b) => b.id === id);
				return <b>{baiTap?.ten || 'Không xác định'}</b>;
			},
		},
		{
			title: 'Loại',
			dataIndex: 'loaiBaiTap',
			key: 'loaiBaiTap',
			width: 120,
			align: 'center' as const,
			render: (loai: string) => <Tag color='blue'>{loai}</Tag>,
		},
		{
			title: 'Thời lượng',
			dataIndex: 'thoiLuong',
			key: 'thoiLuong',
			width: 120,
			align: 'center' as const,
			render: (phut: number) => <span>{phut} phút</span>,
		},
		{
			title: 'Calo tiêu thụ',
			dataIndex: 'calo',
			key: 'calo',
			width: 130,
			align: 'center' as const,
			sorter: (a: Health.IBuoiTap, b: Health.IBuoiTap) => a.calo - b.calo,
			render: (val: number) => <div style={{ color: '#fa541c' }}>{val} kcal</div>,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: 140,
			align: 'center' as const,
			render: (status: any) => (
				<Tag color={ColorTrangThaiBaiTap[status as keyof typeof ColorTrangThaiBaiTap]}>{status}</Tag>
			),
		},
		{
			title: 'Ghi chú',
			dataIndex: 'ghiChu',
			key: 'ghiChu',
			width: 300,
			ellipsis: true,
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 150,
			align: 'center' as const,
			fixed: 'right' as const,
			render: (record: Health.IBuoiTap) => (
				<Space size='middle'>
					<Button type='link' icon={<EditOutlined />} onClick={() => openModal(record)}>
						Sửa
					</Button>
					<Popconfirm title='Xóa bản ghi này?' onConfirm={() => deleteBuoiTap(record.id)}>
						<Button type='link' danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card title='Nhật kí tập luyện'>
			<Space wrap style={{ marginBottom: 16 }}>
				<Button type='primary' icon={<PlusOutlined />} onClick={() => openModal()}>
					Thêm buổi tập
				</Button>
				<Input.Search
					style={{ width: 250 }}
					placeholder='Tìm theo tên bài tập...'
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					allowClear
				/>
				<Select
					style={{ width: 150 }}
					placeholder='Lọc theo loại'
					allowClear
					value={filterLoai}
					onChange={setFilterLoai}
					options={Object.values(ELoaiBaiTap).map((val) => ({ label: val, value: val }))}
				/>
				<RangePicker format='DD/MM/YYYY' value={filterTime} onChange={(values) => setFilterTime(values as any)} />
			</Space>

			<Table columns={columns as any} dataSource={dsHienThi} rowKey='id' scroll={{ x: 1340 }} bordered />

			<Modal
				visible={isModalOpen}
				onCancel={closeModal}
				footer={null}
				destroyOnClose
				title={editingRecord ? 'Chỉnh sửa buổi tập' : 'Thêm mới buổi tập'}
			>
				<FormBuoiTap
					record={editingRecord}
					onCancel={closeModal}
					onFinish={(values: Health.IBuoiTap) => {
						if (editingRecord) {
							editBuoiTap(editingRecord.id, values);
						} else {
							addBuoiTap(values);
						}
						closeModal();
					}}
				/>
			</Modal>
		</Card>
	);
};

export default NhatKiTapLuyen;

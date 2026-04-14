import { type IColumn } from '@/components/Table/typing';
import { ETrangThai, LECTURER_MAP, STATUS_MAP } from '@/services/QuanLyKhoaHoc/constants';
import { type QuanLyKhoaHoc } from '@/services/QuanLyKhoaHoc/typing';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Divider, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import FormKhoaHoc from './component/Form';

const KhoaHocPage = () => {
	const { deleteKhoaHoc, dsKhoaHoc, addKhoaHoc, updateKhoaHoc } = useModel('khoahoc');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingRecord, setEditingRecord] = useState<QuanLyKhoaHoc.IKhoaHoc | null>(null);
	const [searchText, setSearchText] = useState('');
	const [isViewModalVisible, setIsViewModalVisible] = useState(false);
	const [viewData, setViewData] = useState<QuanLyKhoaHoc.IKhoaHoc | null>(null);
	const showViewModal = (record: QuanLyKhoaHoc.IKhoaHoc) => {
		setViewData(record);
		setIsViewModalVisible(true);
	};

	const showModal = (record?: QuanLyKhoaHoc.IKhoaHoc) => {
		setEditingRecord(record || null);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setEditingRecord(null);
	};

	const onFinish = (values: any) => {
		if (editingRecord) {
			updateKhoaHoc(editingRecord.id, values);
		} else {
			addKhoaHoc(values);
		}
		setIsModalVisible(false);
	};
	const columns: IColumn<QuanLyKhoaHoc.IKhoaHoc>[] = [
		{
			title: 'ID',
			dataIndex: 'id',
			width: 80,
			align: 'center',
		},
		{
			title: 'Tên khóa học',
			dataIndex: 'ten',
			width: 200,
			align: 'center',
		},
		{
			title: 'Giảng viên',
			dataIndex: 'giangVien',
			width: 100,
			align: 'center',
			render: (val: string) => {
				return LECTURER_MAP[val as keyof typeof LECTURER_MAP] || val;
			},
			filters: [
				{ text: 'Tuấn Anh', value: 'GV_TuanAnh' },
				{ text: 'Phương Linh', value: 'GV_PhuongLinh' },
			],
			onFilter: (value: any, record) => record.giangVien === value,
		},
		{
			title: 'Học viên',
			dataIndex: 'soLuongHocVien',
			width: 80,
			align: 'center',
			sorter: (a, b) => a.soLuongHocVien - b.soLuongHocVien,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			width: 120,
			align: 'center',
			render: (val: any) => {
				const config = STATUS_MAP[val as keyof typeof STATUS_MAP];
				return <Tag color={config?.color}>{val}</Tag>;
			},

			filters: Object.entries(ETrangThai).map(([key, value]) => ({
				text: value,
				value: key,
			})),
			onFilter: (value: any, record) => record.trangThai === value,
		},
		{
			title: 'Hành động',
			width: 150,
			align: 'center',
			render: (_: any, record: any) => (
				<Space>
					<Tooltip title='Xem mô tả'>
						<Button icon={<EyeOutlined />} type='link' onClick={() => showViewModal(record)} />
					</Tooltip>
					<Tooltip title='Chỉnh sửa khóa học'>
						<Button icon={<EditOutlined />} type='link' onClick={() => showModal(record)} />
					</Tooltip>

					<Popconfirm
						title='Xác nhận xóa khóa học này?'
						onConfirm={() => {
							deleteKhoaHoc(record.id);
						}}
						disabled={record.soLuongHocVien > 0}
					>
						<Tooltip title='Xóa khóa học'>
							<Button type='primary' icon={<DeleteOutlined />} disabled={record.soLuongHocVien > 0} />
						</Tooltip>
					</Popconfirm>
				</Space>
			),
		},
	];
	const filteredData = dsKhoaHoc.filter((item) => item.ten.toLowerCase().includes(searchText.toLowerCase()));
	return (
		<Card title='Quản lý khóa học'>
			<Space>
				<Button type='primary' icon={<PlusOutlined />} onClick={() => showModal()}>
					Thêm khóa học
				</Button>

				<Input.Search
					placeholder='Tìm kiếm theo tên khóa học...'
					allowClear
					onSearch={(value) => setSearchText(value)}
					onChange={(e) => setSearchText(e.target.value)}
					style={{ width: 400 }}
					enterButton={<Button icon={<SearchOutlined style={{ color: 'red' }} />} />}
				/>
			</Space>
			<Table columns={columns} dataSource={filteredData} />
			<Modal
				title={editingRecord ? 'Chỉnh sửa khóa học' : 'Thêm mới khóa học'}
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
				destroyOnClose
			>
				<FormKhoaHoc initialValues={editingRecord} onCancel={handleCancel} onFinish={onFinish} />
			</Modal>
			<Modal
				title='Chi tiết khóa học'
				visible={isViewModalVisible}
				onCancel={() => setIsViewModalVisible(false)}
				footer={[
					<Button key='close' onClick={() => setIsViewModalVisible(false)}>
						Đóng
					</Button>,
				]}
				width={600}
			>
				{viewData && (
					<>
						<Descriptions bordered column={1} size='small'>
							<Descriptions.Item label='Tên khóa học'>{viewData.ten}</Descriptions.Item>
							<Descriptions.Item label='Giảng viên'>
								{LECTURER_MAP[viewData.giangVien as keyof typeof LECTURER_MAP] || viewData.giangVien}
							</Descriptions.Item>
							<Descriptions.Item label='Số lượng'>{viewData.soLuongHocVien} học viên</Descriptions.Item>
							<Descriptions.Item label='Trạng thái'>
								<Tag color={STATUS_MAP[viewData.trangThai as keyof typeof STATUS_MAP]?.color}>{viewData.trangThai}</Tag>
							</Descriptions.Item>
						</Descriptions>

						<Divider orientation='left'>Mô tả</Divider>

						<div
							style={{ marginTop: 10 }}
							dangerouslySetInnerHTML={{
								__html: viewData?.moTa || '<i>Chưa có mô tả.</i>',
							}}
						/>
					</>
				)}
			</Modal>
		</Card>
	);
};
export default KhoaHocPage;

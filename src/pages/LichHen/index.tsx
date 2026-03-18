import { Table, Button, Space, Tag, Popconfirm, message, Typography } from 'antd';
import { useModel } from 'umi';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ModalDatLich from './components/ModalDatLich';
import RatingModal from '../DanhGia/RatingModal';
const { Text } = Typography;

const LichHen = () => {
	const [visible, setVisible] = useState(false);
	const { dsLichHen, setDsLichHen } = useModel('lichhen');
	const { dsNhanVien } = useModel('nhanvien');
	const { dsDichVu } = useModel('dichvu');
	const { addDanhGia, dsDanhGia } = useModel('danhgia');
	const [ratingVisible, setRatingVisible] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState<any>(null);
	const updateStatus = (id: number, status: string) => {
		setDsLichHen((prev: any) => prev.map((item: any) => (item.id === id ? { ...item, trangThai: status } : item)));
		message.success('Cập nhật trạng thái thành công!');
	};

	const columns = [
		{
			title: 'Khách hàng',
			dataIndex: 'tenKhachHang',
			render: (text: string, record: any) => (
				<Space direction='vertical' size={0}>
					<Text strong>{text}</Text>
					<Text type='secondary' style={{ fontSize: 12 }}>
						{record.soDienThoai}
					</Text>
				</Space>
			),
		},
		{
			title: 'Thời gian',
			render: (record: any) => (
				<Tag color='blue'>
					{record.gioHen} - {record.ngayHen}
				</Tag>
			),
		},
		{
			title: 'Nhân viên',
			dataIndex: 'idNhanVien',
			render: (id: number) => dsNhanVien.find((nv) => nv.id === id)?.ten || 'N/A',
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'idDichVu',
			render: (id: number) => {
				const dv = dsDichVu.find((d) => d.id === id);
				return dv ? <Tag color='orange'>{dv.tenDichVu}</Tag> : 'N/A';
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			align: 'center',
			render: (status: string) => {
				const config = {
					CHO_DUYET: { color: 'warning', text: 'Chờ duyệt' },
					DA_XAC_NHAN: { color: 'processing', text: 'Đã xác nhận' },
					HOAN_THANH: { color: 'success', text: 'Hoàn thành' },
					HUY: { color: 'error', text: 'Đã hủy' },
				};
				const { color, text } = config[status as keyof typeof config];
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			align: 'center',
			render: (_: any, record: any) => {
				const daDanhGia = dsDanhGia.find((dg) => dg.idLichHen === record.id);
				return (
					<Space>
						{record.trangThai === 'CHO_DUYET' && (
							<Button type='link' icon={<CheckCircleOutlined />} onClick={() => updateStatus(record.id, 'DA_XAC_NHAN')}>
								Duyệt
							</Button>
						)}

						{record.trangThai === 'DA_XAC_NHAN' && (
							<Button
								type='link'
								style={{ color: '#52c41a' }}
								icon={<CheckCircleOutlined />}
								onClick={() => updateStatus(record.id, 'HOAN_THANH')}
							>
								Hoàn thành
							</Button>
						)}
						{record.trangThai === 'HOAN_THANH' && (
							<Button
								type='link'
								icon={<StarOutlined />}
								disabled={daDanhGia}
								style={{ color: '#faad14' }}
								onClick={() => {
									setSelectedRecord(record);
									setRatingVisible(true);
								}}
							>
								{daDanhGia ? 'Đã đánh giá' : 'Đánh giá'}
							</Button>
						)}
						{record.trangThai !== 'HUY' && record.trangThai !== 'HOAN_THANH' && (
							<Popconfirm title='Hủy lịch này ?' onConfirm={() => updateStatus(record.id, 'HUY')}>
								<Button type='link' danger icon={<CloseCircleOutlined />}>
									Hủy
								</Button>
							</Popconfirm>
						)}
					</Space>
				);
			},
		},
	];

	return (
		<div style={{ padding: 20 }}>
			<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
				<Typography.Title level={4}>QUẢN LÝ LỊCH HẸN</Typography.Title>
				<Button type='primary' icon={<PlusOutlined />} onClick={() => setVisible(true)}>
					Đặt lịch mới
				</Button>
			</div>

			<Table dataSource={dsLichHen} columns={columns} rowKey='id' bordered pagination={{ pageSize: 10 }} />

			<ModalDatLich visible={visible} setVisible={setVisible} />
			<RatingModal visible={ratingVisible} setVisible={setRatingVisible} record={selectedRecord} onSave={addDanhGia} />
		</div>
	);
};

export default LichHen;

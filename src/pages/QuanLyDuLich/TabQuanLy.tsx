import type { IColumn } from '@/components/Table/typing';
import { PHAN_KHUC_GIA_COLORS, TextLoaiHinh, TextPhanKhucGia, type EPhanKhucGia } from '@/services/DuLich/constants';
import type { DuLich } from '@/services/DuLich/typing';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Popconfirm, Rate, Table, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import FormDiemDen from './component/FormDiemDen';

const TabDiemDen = () => {
	const { dsDiemDen, deleteDiemDen, editDiemDen, addDiemDen } = useModel('diemden');
	const [recordEdit, setRecordEdit] = useState<DuLich.IDiemDen | undefined>(undefined);
	const [visibleForm, setVisibleForm] = useState<boolean>(false);
	const handleCancel = () => {
		setVisibleForm(false);
		setRecordEdit(undefined);
	};
	const onFinish = (values: DuLich.IDiemDen) => {
		if (recordEdit) {
			editDiemDen({ ...recordEdit, ...values });
		} else {
			addDiemDen(values);
		}
		setVisibleForm(false);
		setRecordEdit(undefined);
	};
	const columns: IColumn<DuLich.IDiemDen>[] = [
		{
			title: 'STT',
			width: 60,
			align: 'center',
			render: (val, _, index) => index + 1,
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'hinhAnh',
			width: 90,
			align: 'center',
			render: (url: string) => <Avatar shape='square' size='large' src={url} alt='img' />,
		},
		{
			title: 'Tên Điểm Đến',
			dataIndex: 'ten',
			width: 200,
			align: 'center',
		},
		{
			title: 'Mô tả',
			dataIndex: 'moTa',
			width: 250,
			ellipsis: true,
			render: (text: string) => <Tooltip title={text}>{text}</Tooltip>,
		},
		{
			title: 'Loại hình',
			dataIndex: 'loaiHinh',
			width: 100,
			align: 'center',
			render: (val) => <div>{TextLoaiHinh[val as keyof typeof TextLoaiHinh]}</div>,
		},
		{
			title: 'Thời gian',
			dataIndex: 'thoiGianThamQuan',
			width: 110,
			align: 'center',
			render: (gio: number) => <div>{gio} giờ</div>,
		},
		{
			title: 'Chi tiết chi phí',
			dataIndex: 'mucChiPhi',
			width: 180,
			align: 'center',
			render: (mucChiPhi: DuLich.IChiPhi) => (
				<div style={{ fontSize: '13px', lineHeight: '20px' }}>
					<div> Ăn uống: {mucChiPhi.anUong.toLocaleString('vi-VN')}đ</div>
					<div> Lưu trú: {mucChiPhi.luuTru.toLocaleString('vi-VN')}đ</div>
					<div>Di chuyển: {mucChiPhi.diChuyen.toLocaleString('vi-VN')}đ</div>
				</div>
			),
		},
		{
			title: 'Phân khúc',
			dataIndex: 'phanKhucGia',
			width: 120,
			align: 'center',
			render: (val: EPhanKhucGia) => <Tag color={PHAN_KHUC_GIA_COLORS[val]}>{TextPhanKhucGia[val]}</Tag>,
		},
		{
			title: 'Đánh giá',
			dataIndex: 'danhGia',
			width: 140,
			align: 'center',
			render: (rating: number) => <Rate allowHalf disabled value={rating} style={{ fontSize: 14 }} />,
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 90,
			fixed: 'right',
			render: (record: DuLich.IDiemDen) => (
				<>
					<Tooltip title='Chỉnh sửa'>
						<Button
							type='link'
							icon={<EditOutlined />}
							onClick={() => {
								setVisibleForm(true);
								setRecordEdit(record);
							}}
						/>
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm
							title={`Xóa "${record.ten}"?`}
							placement='topLeft'
							onConfirm={() => deleteDiemDen(record.id)}
							okText='Xóa'
							cancelText='Hủy'
						>
							<Button danger type='link' icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<>
			<Button icon={<PlusOutlined />} type='primary' onClick={() => setVisibleForm(true)}>
				Thêm điểm đến mới
			</Button>
			<Table columns={columns as any} dataSource={dsDiemDen} rowKey='id' scroll={{ x: 'max-content' }} />
			<Modal
				title={recordEdit ? 'Chỉnh sửa điểm đến' : 'Thêm điểm đến mới'}
				onCancel={handleCancel}
				visible={visibleForm}
				footer={null}
			>
				<FormDiemDen onFinish={onFinish} onCancel={handleCancel} record={recordEdit} />
			</Modal>
		</>
	);
};

export default TabDiemDen;

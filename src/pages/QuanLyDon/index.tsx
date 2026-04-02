import { type IColumn } from '@/components/Table/typing';
import { ETrangThaiDonDangKi } from '@/services/CLB/constants';
import { type CLB } from '@/services/CLB/typing';
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	HistoryOutlined,
	MessageOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Drawer, Input, message, Modal, Popconfirm, Space, Table, Tag, Timeline, Tooltip } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import FormDangKi from './components/Form';

const QuanLyDon = () => {
	const { dsDon, addDon, pheDuyetDon, lsThaoTac } = useModel('dondangki');
	const { dsCLB } = useModel('clb');

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isRejectModalVisible, setIsRejectModalVisible] = useState<boolean>(false);
	const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);

	const [rejectReason, setRejectReason] = useState<string>('');
	const [pendingIds, setPendingIds] = useState<string[]>([]);

	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
		getCheckboxProps: (record: CLB.IDonDangKi) => ({
			disabled: record.trangThai !== ETrangThaiDonDangKi.PENDING,
		}),
	};

	const handleApprove = (ids: string[]) => {
		pheDuyetDon(ids, ETrangThaiDonDangKi.APPROVED);
		setSelectedRowKeys([]);
	};

	const handleReject = () => {
		if (!rejectReason.trim()) {
			message.error('Bắt buộc nhập lý do từ chối');
			return;
		}
		pheDuyetDon(pendingIds, ETrangThaiDonDangKi.REJECTED, rejectReason);
		setIsRejectModalVisible(false);
		setRejectReason('');
		setSelectedRowKeys([]);
	};

	const columns: IColumn<CLB.IDonDangKi>[] = [
		{ title: 'STT', render: (_, __, idx) => idx + 1, align: 'center', width: 50, fixed: 'left' },
		{ title: 'Tên', dataIndex: 'hoTen', width: 150, fixed: 'left' },
		{ title: 'Giới tính', dataIndex: 'gioiTinh', width: 80, align: 'center' },
		{ title: 'Email', dataIndex: 'email', width: 200 },
		{
			title: 'CLB',
			width: 150,
			dataIndex: 'idCLB',
			render: (val) => {
				const clb = dsCLB.find((i) => i.id === val);
				return <Tag color='blue'>{clb?.ten || val}</Tag>;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			width: 120,
			align: 'center',
			render: (status: ETrangThaiDonDangKi) => {
				const config = {
					[ETrangThaiDonDangKi.PENDING]: { color: 'orange', text: 'Đang chờ' },
					[ETrangThaiDonDangKi.APPROVED]: { color: 'green', text: 'Đã duyệt' },
					[ETrangThaiDonDangKi.REJECTED]: { color: 'red', text: 'Đã từ chối' },
				};
				return <Tag color={config[status]?.color}>{config[status]?.text}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			key: 'action',
			align: 'center',
			width: 120,
			fixed: 'right',
			render: (_, record) => (
				<Space size='small'>
					{record.trangThai === ETrangThaiDonDangKi.PENDING ? (
						<>
							<Popconfirm title='Duyệt đơn này?' onConfirm={() => handleApprove([record.id])}>
								<Tooltip title='Duyệt'>
									<Button type='text' shape='circle' style={{ color: '#52c41a' }} icon={<CheckCircleOutlined />} />
								</Tooltip>
							</Popconfirm>
							<Tooltip title='Từ chối'>
								<Button
									type='text'
									shape='circle'
									danger
									icon={<CloseCircleOutlined />}
									onClick={() => {
										setPendingIds([record.id]);
										setIsRejectModalVisible(true);
									}}
								/>
							</Tooltip>
						</>
					) : record.trangThai === ETrangThaiDonDangKi.REJECTED && record.ghiChu ? (
						<Tooltip title={`Lý do từ chối: ${record.ghiChu}`}>
							<Button
								type='text'
								shape='circle'
								icon={<MessageOutlined />}
								onClick={() => Modal.info({ title: 'Lý do từ chối', content: record.ghiChu })}
							/>
						</Tooltip>
					) : null}
				</Space>
			),
		},
	];

	return (
		<Card
			title='Quản lý đơn đăng ký'
			extra={
				<Button icon={<HistoryOutlined />} onClick={() => setIsHistoryVisible(true)}>
					Lịch sử thao tác
				</Button>
			}
		>
			<Space style={{ marginBottom: 16 }}>
				<Button icon={<PlusOutlined />} type='primary' onClick={() => setIsModalVisible(true)}>
					Thêm Đơn Mới
				</Button>
				{selectedRowKeys.length > 0 && (
					<Space>
						<Button
							type='primary'
							ghost
							icon={<CheckCircleOutlined />}
							onClick={() => handleApprove(selectedRowKeys as string[])}
						>
							Duyệt {selectedRowKeys.length} đơn
						</Button>
						<Button
							danger
							ghost
							icon={<CloseCircleOutlined />}
							onClick={() => {
								setPendingIds(selectedRowKeys as string[]);
								setIsRejectModalVisible(true);
							}}
						>
							Từ chối {selectedRowKeys.length} đơn
						</Button>
					</Space>
				)}
			</Space>

			<Table
				columns={columns as any}
				dataSource={dsDon}
				rowSelection={rowSelection}
				rowKey='id'
				scroll={{ x: 1600 }}
				bordered
			/>

			<Modal
				title='Thêm đơn mới'
				visible={isModalVisible}
				footer={null}
				onCancel={() => setIsModalVisible(false)}
				destroyOnClose
				width={800}
			>
				<FormDangKi
					dsCLB={dsCLB}
					setIsModalVisible={setIsModalVisible}
					onSave={(v) => {
						addDon(v);
						setIsModalVisible(false);
					}}
				/>
			</Modal>

			<Modal
				title='Lý do từ chối'
				visible={isRejectModalVisible}
				onOk={handleReject}
				onCancel={() => setIsRejectModalVisible(false)}
				okText='Xác nhận'
				okButtonProps={{ danger: true }}
				destroyOnClose
			>
				<Input.TextArea
					rows={4}
					placeholder='Nhập lý do từ chối...'
					value={rejectReason}
					onChange={(e) => setRejectReason(e.target.value)}
				/>
			</Modal>

			<Drawer
				title='Lịch sử thao tác hệ thống'
				width={500}
				onClose={() => setIsHistoryVisible(false)}
				visible={isHistoryVisible}
			>
				<Timeline mode='left'>
					{lsThaoTac.map((log) => (
						<Timeline.Item
							key={log.id}
							color={log.hanhDong === ETrangThaiDonDangKi.APPROVED ? 'green' : 'red'}
							label={log.thoiGian}
						>
							{log.noiDung}
						</Timeline.Item>
					))}
				</Timeline>
			</Drawer>
		</Card>
	);
};

export default QuanLyDon;

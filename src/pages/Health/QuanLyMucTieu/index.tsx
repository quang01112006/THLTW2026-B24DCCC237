import { ETrangThaiMucTieu } from '@/services/Health/constants';
import { Health } from '@/services/Health/typing';
import { DeleteOutlined, EditOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Drawer,
	InputNumber,
	Popconfirm,
	Progress,
	Row,
	Segmented,
	Space,
	Tag,
	Typography,
} from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useModel } from 'umi';
import FormMucTieu from './components/Form';

const { Text } = Typography;

const ColorTrangThai = {
	[ETrangThaiMucTieu.DANG_THUC_HIEN]: 'blue',
	[ETrangThaiMucTieu.DA_DAT]: 'green',
	[ETrangThaiMucTieu.DA_HUY]: 'default',
};

const QuanLyMucTieu = () => {
	const { dsMucTieu, addMucTieu, deleteMucTieu, editMucTieu } = useModel('muctieu');
	const [filterStatus, setFilterStatus] = useState<string>('Tất cả');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [editingRecord, setEditingRecord] = useState<Health.IMucTieu | null>(null);

	const dsHienThi = useMemo(() => {
		if (filterStatus === 'Tất cả') return dsMucTieu;
		return dsMucTieu.filter((item) => item.trangThai === filterStatus);
	}, [dsMucTieu, filterStatus]);

	const openDrawer = (record: Health.IMucTieu | null = null) => {
		setEditingRecord(record);
		setIsDrawerOpen(true);
	};

	const closeDrawer = () => {
		setIsDrawerOpen(false);
		setEditingRecord(null);
	};

	return (
		<Card title='Quản lý mục tiêu'>
			<Row justify='space-between' align='middle' style={{ marginBottom: 24 }}>
				<Col>
					<Segmented
						value={filterStatus}
						onChange={(val) => setFilterStatus(val as string)}
						options={['Tất cả', ...Object.values(ETrangThaiMucTieu)]}
					/>
				</Col>
				<Col>
					<Button type='primary' icon={<PlusOutlined />} onClick={() => openDrawer()}>
						Thêm mục tiêu
					</Button>
				</Col>
			</Row>

			<Row gutter={[20, 20]}>
				{dsHienThi.map((item) => {
					const phanTram = Math.round((item.giaTriHienTai / item.giaTriMucTieu) * 100);
					const isHuy = item.trangThai === ETrangThaiMucTieu.DA_HUY;
					const isDat = item.trangThai === ETrangThaiMucTieu.DA_DAT;

					return (
						<Col span={8} key={item.id}>
							<Card
								title={item.ten}
								style={{
									opacity: isHuy ? 0.6 : 1,
									backgroundColor: isHuy ? '#fafafa' : '#fff',
									border: isDat ? '1px solid #b7eb8f' : undefined,
								}}
								extra={<Tag color={ColorTrangThai[item.trangThai]}>{item.trangThai}</Tag>}
								actions={[
									<EditOutlined key='edit' onClick={() => openDrawer(item)} />,
									<Popconfirm
										key='stop'
										title='Mày chắc chắn muốn hủy mục tiêu này?'
										onConfirm={() => editMucTieu(item.id, { trangThai: ETrangThaiMucTieu.DA_HUY })}
										disabled={isHuy || isDat}
									>
										<StopOutlined key='stop' style={{ color: isHuy || isDat ? '#ccc' : '#faad14' }} />
									</Popconfirm>,
									<Popconfirm title='Xóa vĩnh viễn mục tiêu này?' onConfirm={() => deleteMucTieu(item.id)} key='delete'>
										<DeleteOutlined key='delete' style={{ color: '#ff4d4f' }} />
									</Popconfirm>,
								]}
							>
								<Space direction='vertical' style={{ width: '100%' }} size='middle'>
									<Row justify='space-between'>
										<Text type='secondary'>{item.loai}</Text>
										<Text strong>Hạn: {moment(item.deadline).format('DD/MM/YYYY')}</Text>
									</Row>

									<Progress
										percent={phanTram > 100 ? 100 : phanTram}
										status={isHuy ? 'normal' : isDat ? 'success' : 'active'}
										strokeColor={isHuy ? '#bfbfbf' : undefined}
									/>

									<Row align='middle' justify='space-between'>
										<Text>
											Tiến độ: <b>{item.giaTriHienTai}</b> / {item.giaTriMucTieu}
										</Text>
										<Space>
											<Text type='secondary'>Cập nhật:</Text>
											<InputNumber
												size='small'
												style={{ width: 70 }}
												value={item.giaTriHienTai}
												disabled={isHuy}
												min={0}
												onChange={(val) => editMucTieu(item.id, { giaTriHienTai: val || 0 })}
											/>
										</Space>
									</Row>
								</Space>
							</Card>
						</Col>
					);
				})}
			</Row>

			<Drawer
				title={editingRecord ? 'Cập nhật mục tiêu' : 'Thêm mục tiêu mới'}
				width={400}
				visible={isDrawerOpen}
				onClose={closeDrawer}
				destroyOnClose
			>
				<FormMucTieu
					record={editingRecord}
					onCancel={closeDrawer}
					onFinish={(values) => {
						if (editingRecord) {
							editMucTieu(editingRecord.id, values);
						} else {
							addMucTieu(values);
						}
						closeDrawer();
					}}
				/>
			</Drawer>
		</Card>
	);
};

export default QuanLyMucTieu;

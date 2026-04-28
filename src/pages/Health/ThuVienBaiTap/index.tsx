import { ColorDoKho, ENhomCo } from '@/services/Health/constants';
import { Health } from '@/services/Health/typing';
import { DeleteOutlined, EditOutlined, EyeOutlined, FireOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Modal, Popconfirm, Row, Select, Space, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useModel } from 'umi';
import FormBaiTap from './components/Form';
import ModalView from './components/ModalView';

const ThuVienBaiTap = () => {
	const { dsBaiTap, addBaiTap, deleteBaiTap, editBaiTap } = useModel('baitap');
	const [searchText, setSearchText] = useState('');
	const [selectedNhomCo, setSelectedNhomCo] = useState<string[]>([]);
	const { Text, Paragraph } = Typography;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingRecord, setEditingRecord] = useState<Health.IBaiTap | null>(null);
	const [isDetailVisible, setIsDetailVisible] = useState(false);
	const [viewingRecord, setViewingRecord] = useState<Health.IBaiTap | null>(null);

	const openDetail = (record: Health.IBaiTap) => {
		setViewingRecord(record);
		setIsDetailVisible(true);
	};
	const openModal = (record: Health.IBaiTap | null = null) => {
		setEditingRecord(record);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingRecord(null);
	};

	const dsHienThi = useMemo(() => {
		return dsBaiTap.filter((bt) => {
			const matchSearch = bt.ten.toLowerCase().includes(searchText.toLowerCase());
			const matchNhomCo =
				selectedNhomCo.length === 0 ? true : selectedNhomCo.some((nhomCo) => bt.nhomCoTacDong.includes(nhomCo));
			return matchSearch && matchNhomCo;
		});
	}, [dsBaiTap, searchText, selectedNhomCo]);
	return (
		<Card title='Thư viện bài tập'>
			<Space wrap>
				<Button type='primary' icon={<PlusOutlined />} onClick={() => openModal()}>
					Thêm bài tập mới
				</Button>
				<Input.Search
					style={{ width: 300 }}
					placeholder='Tìm kiếm theo tên bài tập...'
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					allowClear
				/>
				<Select
					style={{ width: 200 }}
					placeholder='Lọc theo nhóm cơ'
					value={selectedNhomCo}
					onChange={setSelectedNhomCo}
					options={Object.values(ENhomCo).map((nhom) => ({
						label: nhom,
						value: nhom,
					}))}
					allowClear
					mode='multiple'
					maxTagCount='responsive'
				/>
			</Space>

			<Row gutter={[24, 24]} style={{ marginTop: 16 }}>
				{dsHienThi.map((bt) => (
					<Col span={8} key={bt.id}>
						<Card
							onClick={() => openDetail(bt)}
							title={bt.ten}
							extra={<Tag color={ColorDoKho[bt.doKho]}>{bt.doKho}</Tag>}
							hoverable
							actions={[
								<Button
									type='link'
									key='view'
									icon={<EyeOutlined />}
									onClick={(e) => {
										e.stopPropagation();
										openDetail(bt);
									}}
								>
									Xem chi tiết
								</Button>,
								<Button
									type='link'
									key='edit'
									icon={<EditOutlined />}
									onClick={(e) => {
										e.stopPropagation();
										openModal(bt);
									}}
								>
									Chỉnh sửa
								</Button>,
								<Popconfirm
									title='Bạn có chắc chắn muốn xóa không?'
									onCancel={(e) => e?.stopPropagation()}
									onConfirm={() => deleteBaiTap(bt.id)}
									key='delete'
								>
									<Button type='link' icon={<DeleteOutlined />} onClick={(e) => e.stopPropagation()}>
										Xóa
									</Button>
								</Popconfirm>,
							]}
						>
							<div style={{ height: 120 }}>
								<Paragraph ellipsis={{ rows: 2 }} type='secondary'>
									{bt.moTaNgan}
								</Paragraph>

								<div style={{ marginBottom: 12 }}>
									<Space size={[0, 4]} wrap>
										{bt.nhomCoTacDong.map((nhom) => (
											<Tag key={nhom} color='blue'>
												{nhom}
											</Tag>
										))}
									</Space>
								</div>

								<Text strong>
									<FireOutlined /> {bt.caloTrenGio} calo/giờ
								</Text>
							</div>
						</Card>
					</Col>
				))}
			</Row>
			<Modal
				visible={isModalOpen}
				onCancel={closeModal}
				footer={null}
				destroyOnClose
				title={editingRecord ? 'Chỉnh sửa bài tập' : 'Thêm mới bài tập'}
			>
				<FormBaiTap
					record={editingRecord}
					onCancel={closeModal}
					onFinish={(values) => {
						if (editingRecord) {
							editBaiTap(editingRecord.id, values);
						} else {
							addBaiTap(values);
						}
						closeModal();
					}}
				/>
			</Modal>
			<ModalView visible={isDetailVisible} record={viewingRecord} onCancel={() => setIsDetailVisible(false)} />
		</Card>
	);
};
export default ThuVienBaiTap;

import {
	ELoaiHinh,
	type EPhanKhucGia,
	type PHAN_KHUC_GIA_COLORS,
	TextLoaiHinh,
	TextPhanKhucGia,
} from '@/services/DuLich/constants';
import type { DuLich } from '@/services/DuLich/typing';
import {
	CarOutlined,
	ClockCircleOutlined,
	CoffeeOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Divider,
	Input,
	List,
	message,
	Popover,
	Rate,
	Row,
	Select,
	Space,
	Tag,
	Typography,
} from 'antd';
import { useMemo, useState } from 'react';
import { useModel } from 'umi';

const { Title, Text, Paragraph } = Typography;

const KhamPhaPage = () => {
	const { dsDiemDen } = useModel('diemden');
	const { dsLichTrinh, addDiemDenToLichTrinh } = useModel('lichtrinh');

	const [searchText, setSearchText] = useState('');
	const [filterLoaiHinh, setFilterLoaiHinh] = useState<ELoaiHinh | undefined>(undefined);
	const [filterPhanKhuc, setFilterPhanKhuc] = useState<EPhanKhucGia | undefined>(undefined);
	const [sortBy, setSortBy] = useState<string | undefined>(undefined);

	const listHienThi = useMemo(() => {
		let result = dsDiemDen || [];
		if (searchText) {
			result = result.filter((item) => item.ten.toLowerCase().includes(searchText.toLowerCase()));
		}
		if (filterLoaiHinh) {
			result = result.filter((item) => item.loaiHinh === filterLoaiHinh);
		}
		if (filterPhanKhuc) {
			result = result.filter((item) => item.phanKhucGia === filterPhanKhuc);
		}

		if (sortBy) {
			result = [...result].sort((a, b) => {
				if (sortBy === 'gia_tang') return a.tongChiPhi - b.tongChiPhi;
				if (sortBy === 'gia_giam') return b.tongChiPhi - a.tongChiPhi;
				if (sortBy === 'rating_giam') return (b.danhGia || 0) - (a.danhGia || 0);
				return 0;
			});
		}

		return result;
	}, [dsDiemDen, searchText, filterLoaiHinh, filterPhanKhuc, sortBy]);

	return (
		<div style={{ padding: 24, minHeight: '100vh', background: '#f5f7fa' }}>
			<Title level={2} style={{ marginBottom: 24 }}>
				Khám phá điểm đến
			</Title>

			<div
				style={{
					marginBottom: 32,
					padding: 20,
					background: '#fff',
					borderRadius: 12,
					boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
				}}
			>
				<Space wrap size='middle' style={{ width: '100%' }}>
					<Input
						placeholder='Tìm kiếm địa điểm...'
						prefix={<SearchOutlined />}
						style={{ width: 280 }}
						allowClear
						onChange={(e) => setSearchText(e.target.value)}
					/>

					<Select placeholder='Loại hình' allowClear style={{ width: 160 }} onChange={setFilterLoaiHinh}>
						{Object.values(ELoaiHinh).map((v) => (
							<Select.Option key={v} value={v}>
								{TextLoaiHinh[v]}
							</Select.Option>
						))}
					</Select>

					<Select placeholder='Phân khúc giá' allowClear style={{ width: 160 }} onChange={setFilterPhanKhuc}>
						{Object.keys(TextPhanKhucGia).map((k) => (
							<Select.Option key={k} value={k}>
								{TextPhanKhucGia[k as EPhanKhucGia]}
							</Select.Option>
						))}
					</Select>

					<Select placeholder='Sắp xếp theo' allowClear style={{ width: 200 }} onChange={setSortBy}>
						<Select.Option value='gia_tang'>Giá Thấp đến Cao</Select.Option>
						<Select.Option value='gia_giam'>Giá Cao xuống Thấp</Select.Option>
						<Select.Option value='rating_giam'>Đánh giá: Cao nhất</Select.Option>
					</Select>
				</Space>
			</div>

			<List
				grid={{
					gutter: 24,
					xs: 1,
					sm: 2,
					md: 2,
					lg: 3,
					xl: 3,
					xxl: 4,
				}}
				dataSource={listHienThi}
				renderItem={(item: DuLich.IDiemDen) => (
					<List.Item>
						<Card
							hoverable
							style={{
								borderRadius: 12,
								overflow: 'hidden',
								height: '100%',
								border: 'none',
								boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
							}}
							cover={
								<div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
									<img
										alt={item.ten}
										src={item.hinhAnh}
										style={{ width: '100%', height: '100%', objectFit: 'cover' }}
									/>
									<div style={{ position: 'absolute', top: 12, right: 12 }}>
										<Tag color='rgba(0,0,0,0.6)' style={{ border: 'none', borderRadius: 4, margin: 0 }}>
											<Space size={4}>
												<ClockCircleOutlined /> {item.thoiGianThamQuan} giờ
											</Space>
										</Tag>
									</div>
								</div>
							}
							actions={[
								<Popover
									key='add'
									trigger='click'
									placement='bottom'
									title={<Text strong>Chọn lịch trình</Text>}
									content={
										<List
											size='small'
											dataSource={dsLichTrinh}
											locale={{ emptyText: 'Chưa có lịch trình nào' }}
											renderItem={(lt: any) => (
												<List.Item
													style={{ cursor: 'pointer', padding: '12px 16px' }}
													onClick={() => {
														addDiemDenToLichTrinh(lt.id, 'day_1', item.id);
														message.success(`Đã thêm ${item.ten} vào ${lt.tenChuyenDi}`);
													}}
												>
													<Text>{lt.tenChuyenDi}</Text>
												</List.Item>
											)}
										/>
									}
								>
									<Button type='primary' block icon={<PlusOutlined />} style={{ borderRadius: 0, height: 45 }}>
										Lên kế hoạch ngay
									</Button>
								</Popover>,
							]}
						>
							<div style={{ marginBottom: 12 }}>
								<Space size={4} direction='vertical' style={{ width: '100%' }}>
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
										<Title level={4} style={{ margin: 0, fontSize: 19 }}>
											{item.ten}
										</Title>
										<InfoCircleOutlined style={{ color: '#bfbfbf', marginTop: 4 }} />
									</div>
									<Rate disabled allowHalf value={item.danhGia} style={{ fontSize: 13 }} />
								</Space>
							</div>

							<Paragraph ellipsis={{ rows: 2 }} type='secondary' style={{ fontSize: 13, marginBottom: 16 }}>
								{item.moTa}
							</Paragraph>

							<div style={{ marginBottom: 16 }}>
								<Space size={8}>
									<Tag color='cyan' style={{ borderRadius: 4 }}>
										{TextLoaiHinh[item.loaiHinh]}
									</Tag>
									<Tag color={PHAN_KHUC_GIA_COLORS[item.phanKhucGia]} style={{ borderRadius: 4 }}>
										{TextPhanKhucGia[item.phanKhucGia]}
									</Tag>
								</Space>
							</div>

							<Divider style={{ margin: '12px 0' }} />

							<div style={{ background: '#fafafa', padding: '12px', borderRadius: 8, marginBottom: 16 }}>
								<Row gutter={[8, 8]}>
									<Col span={12}>
										<Space size={8} style={{ fontSize: 12 }}>
											<CoffeeOutlined style={{ color: '#fa8c16' }} />
											<Text type='secondary'>Ăn uống:</Text>
										</Space>
									</Col>
									<Col span={12} style={{ textAlign: 'right' }}>
										<Text strong style={{ fontSize: 13 }}>
											{item.mucChiPhi.anUong.toLocaleString('vi-VN')}đ
										</Text>
									</Col>
									<Col span={12}>
										<Space size={8} style={{ fontSize: 12 }}>
											<HomeOutlined style={{ color: '#1890ff' }} />
											<Text type='secondary'>Lưu trú:</Text>
										</Space>
									</Col>
									<Col span={12} style={{ textAlign: 'right' }}>
										<Text strong style={{ fontSize: 13 }}>
											{item.mucChiPhi.luuTru.toLocaleString('vi-VN')}đ
										</Text>
									</Col>
									<Col span={12}>
										<Space size={8} style={{ fontSize: 12 }}>
											<CarOutlined style={{ color: '#52c41a' }} />
											<Text type='secondary'>Di chuyển:</Text>
										</Space>
									</Col>
									<Col span={12} style={{ textAlign: 'right' }}>
										<Text strong style={{ fontSize: 13 }}>
											{item.mucChiPhi.diChuyen.toLocaleString('vi-VN')}đ
										</Text>
									</Col>
								</Row>
							</div>

							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<Text type='secondary' style={{ fontSize: 12 }}>
									Tổng cộng:
								</Text>
								<Text strong style={{ fontSize: 20, color: '#f5222d' }}>
									{item.tongChiPhi.toLocaleString('vi-VN')}đ
								</Text>
							</div>
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default KhamPhaPage;

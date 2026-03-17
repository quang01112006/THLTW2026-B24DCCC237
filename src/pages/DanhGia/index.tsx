import { Table, Rate, Card, List, Avatar, Typography, Space } from 'antd';
import { useModel } from 'umi';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const PageDanhGia = () => {
	const { dsDanhGia } = useModel('danhgia');

	return (
		<div style={{ padding: 24 }}>
			<Typography.Title level={3}>KHÁCH HÀNG PHẢN HỒI</Typography.Title>

			<List
				itemLayout='horizontal'
				dataSource={dsDanhGia}
				renderItem={(item) => (
					<Card style={{ marginBottom: 16 }}>
						<List.Item.Meta
							avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />}
							title={
								<Space>
									<Text strong>{item.tenKhachHang}</Text>
									<Rate disabled defaultValue={item.soSao} style={{ fontSize: 14 }} />
								</Space>
							}
							description={
								<div>
									<div style={{ color: '#333', marginTop: 8 }}>{item.binhLuan}</div>
									<div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Ngày: {item.ngayDanhGia}</div>
								</div>
							}
						/>
					</Card>
				)}
			/>
		</div>
	);
};

export default PageDanhGia;

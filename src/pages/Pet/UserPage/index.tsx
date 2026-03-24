import { ShopOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List, Slider, Space, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useModel } from 'umi';

const UserPage = () => {
	const { dsPet } = useModel('pet');
	const { Text } = Typography;
	const [range, setRange] = useState([0, 20000000]);

	const dsHienThi = useMemo(() => {
		return dsPet.filter((i) => i.giaBan >= range[0] && i.giaBan <= range[1]);
	}, [range, dsPet]);
	return (
		<>
			<Slider
				range
				min={0}
				max={100000000}
				step={10000}
				defaultValue={[0, 100000]}
				tipFormatter={(value: any) => {
					return `${value.toLocaleString('vi-VN')} đ`;
				}}
				onAfterChange={(val) => setRange(val)}
			></Slider>
			<List
				grid={{ column: 2, gutter: 16 }}
				dataSource={dsHienThi}
				renderItem={(item) => (
					<List.Item>
						<Card
							title='j'
							hoverable
							actions={[
								<Button disabled={item.soLuong === 0} icon={<ShopOutlined />}>
									{item.soLuong > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
								</Button>,
							]}
						>
							<Card.Meta
								avatar={<Avatar src='https://link-logo-shop.com' />}
								title={item.tenPet}
								description={
									<Space direction='vertical'>
										<Tag color='green'>{item.loai}</Tag>
										<Text type='danger' strong>
											{item.giaBan.toLocaleString()} đ
										</Text>
									</Space>
								}
							/>
						</Card>
					</List.Item>
				)}
			></List>
		</>
	);
};
export default UserPage;

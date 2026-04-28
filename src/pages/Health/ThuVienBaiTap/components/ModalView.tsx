import { ColorDoKho } from '@/services/Health/constants';
import { Health } from '@/services/Health/typing';
import { FireOutlined } from '@ant-design/icons';
import { Descriptions, Divider, Modal, Space, Tag, Typography } from 'antd';

const { Title, Text } = Typography;

interface IProps {
	visible: boolean;
	record: Health.IBaiTap | null;
	onCancel: () => void;
}

const ModalView = ({ visible, record, onCancel }: IProps) => {
	if (!record) return null;

	return (
		<Modal title={'Chi tiết bài tập'} visible={visible} onCancel={onCancel} footer={null} width={700} destroyOnClose>
			<div style={{ padding: '10px 0' }}>
				<Title level={3} style={{ marginBottom: 20 }}>
					{record.ten}
				</Title>

				<Descriptions bordered column={1} layout='horizontal'>
					<Descriptions.Item label='Mức độ khó'>
						<Tag color={ColorDoKho[record.doKho]}>{record.doKho}</Tag>
					</Descriptions.Item>

					<Descriptions.Item label='Nhóm cơ tác động'>
						<Space size={[0, 8]} wrap>
							{record.nhomCoTacDong.map((nhom) => (
								<Tag key={nhom} color='blue'>
									{nhom}
								</Tag>
							))}
						</Space>
					</Descriptions.Item>

					<Descriptions.Item label='Năng lượng tiêu thụ'>
						<Text strong style={{ color: '#fa541c' }}>
							<FireOutlined /> {record.caloTrenGio} calo/giờ
						</Text>
					</Descriptions.Item>
				</Descriptions>

				<Divider orientation='left'>Mô tả bài tập</Divider>

				<div
					style={{
						padding: '16px',
						background: '#fafafa',
						border: '1px solid #f0f0f0',
						borderRadius: '4px',
						lineHeight: '1.6',
					}}
				>
					<Text type='secondary'>{record.moTaNgan || 'Chưa có mô tả cụ thể.'}</Text>
				</div>
			</div>
		</Modal>
	);
};

export default ModalView;

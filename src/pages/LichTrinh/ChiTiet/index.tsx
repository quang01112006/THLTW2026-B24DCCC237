import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tabs, Typography } from 'antd';
import { history, useModel } from 'umi';
import TabKeHoach from './TabKeHoach';
import TabNganSach from './TabNganSach';

const { TabPane } = Tabs;
const { Title } = Typography;

const ChiTietLichTrinh = (props: any) => {
	const { id } = props.match.params;
	const { dsLichTrinh } = useModel('lichtrinh');
	const data = dsLichTrinh.find((item) => item.id === id);

	if (!data) return null;

	return (
		<div style={{ padding: 24 }}>
			<Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()} style={{ marginBottom: 16 }}>
				Quay lại
			</Button>
			<Title level={3}>{data.tenChuyenDi}</Title>

			<Tabs defaultActiveKey='1' destroyInactiveTabPane>
				<TabPane tab='Lập kế hoạch' key='1'>
					<TabKeHoach lichTrinh={data} />
				</TabPane>
				<TabPane tab='Quản lý ngân sách' key='2'>
					<TabNganSach lichTrinh={data} />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default ChiTietLichTrinh;

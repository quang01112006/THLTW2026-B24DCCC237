import { Tabs } from 'antd';
import TabDiemDen from './TabQuanLy';
import TabThongKe from './TabThongKe';
const { TabPane } = Tabs;

const QuanLyDuLich = () => {
	return (
		<div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
			<Tabs defaultActiveKey='1' destroyInactiveTabPane>
				<TabPane tab='Quản lý Điểm đến' key='1'>
					<TabDiemDen />
				</TabPane>
				<TabPane tab='Thống kê & Báo cáo' key='2'>
					<TabThongKe />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default QuanLyDuLich;

import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Tabs } from 'antd';
import TableNhanVien from './TableNhanVien';
import TableDichVu from './TableDichVu';

const QuanLyHeThong = () => {
	const { TabPane } = Tabs;
	return (
		<Card title='Quản lý nhân viên & dịch vụ'>
			<Tabs defaultActiveKey='nhanvien' type='card'>
				<TabPane
					tab={
						<span>
							<UserOutlined />
							Nhân viên
						</span>
					}
					key='nhanvien'
				>
					<TableNhanVien />
				</TabPane>

				<TabPane
					tab={
						<span>
							<AppstoreOutlined />
							Dịch vụ
						</span>
					}
					key='dichvu'
				>
					<TableDichVu />
				</TabPane>
			</Tabs>
		</Card>
	);
};
export default QuanLyHeThong;

import { Card, Tabs } from 'antd';
import KhoiKienThuc from './KhoiKienThuc';
import MonHoc from './MonHoc';

const QuanLyDanhMuc = () => {
	return (
		<Card>
			<Tabs defaultActiveKey='1'>
				<Tabs.TabPane tab='Danh mục môn học' key='1'>
					<MonHoc />
				</Tabs.TabPane>
				<Tabs.TabPane tab='Khối kiến thức' key='2'>
					<KhoiKienThuc />
				</Tabs.TabPane>
			</Tabs>
		</Card>
	);
};
export default QuanLyDanhMuc;

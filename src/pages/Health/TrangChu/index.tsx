import ColumnChart from '@/components/Chart/ColumnChart';
import LineChart from '@/components/Chart/LineChart';
import { FireOutlined, HistoryOutlined, RocketOutlined, TrophyOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Timeline, Typography } from 'antd';
import moment from 'moment';
import { useMemo } from 'react';
import { useModel } from 'umi';

const { Title, Text } = Typography;

const TrangChu = () => {
	const { dsBuoiTap } = useModel('buoitap');
	const { dsChiSo } = useModel('suckhoe');
	const { dsMucTieu } = useModel('muctieu');
	const { dsBaiTap } = useModel('baitap');

	const stats = useMemo(() => {
		const now = moment();
		const currentMonth = now.month();
		const currentYear = now.year();

		const monthWorkouts = dsBuoiTap.filter((b) => {
			const d = moment(b.ngay);
			return d.month() === currentMonth && d.year() === currentYear;
		});

		const totalCalo = monthWorkouts.reduce((sum, b) => sum + (b.calo || 0), 0);

		let streak = 0;
		const sortedDates = [...new Set(dsBuoiTap.map((b) => b.ngay))].sort((a, b) => moment(b).diff(moment(a)));
		let checkDate = moment().startOf('day');

		if (!sortedDates.includes(checkDate.format('YYYY-MM-DD'))) {
			checkDate = checkDate.subtract(1, 'day');
		}

		for (let i = 0; i < sortedDates.length; i++) {
			if (sortedDates.includes(checkDate.format('YYYY-MM-DD'))) {
				streak++;
				checkDate = checkDate.subtract(1, 'day');
			} else {
				break;
			}
		}

		const totalGoals = dsMucTieu.length;
		const completedGoals = dsMucTieu.filter((m) => m.trangThai === 'Đã đạt').length;
		const goalPercent = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

		return { monthWorkouts: monthWorkouts.length, totalCalo, streak, goalPercent };
	}, [dsBuoiTap, dsMucTieu]);

	const workoutChartData = useMemo(() => {
		const weeks = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'];
		const counts = [0, 0, 0, 0, 0];
		const now = moment();

		dsBuoiTap.forEach((b) => {
			const date = moment(b.ngay);
			if (date.month() === now.month() && date.year() === now.year()) {
				const weekNum = Math.ceil(date.date() / 7) - 1;
				if (counts[weekNum] !== undefined) counts[weekNum]++;
			}
		});

		return { xAxis: weeks, yAxis: [counts] };
	}, [dsBuoiTap]);

	const weightChartData = useMemo(() => {
		const sortedHealth = [...dsChiSo].sort((a, b) => moment(a.ngay).diff(moment(b.ngay)));
		return {
			xAxis: sortedHealth.map((h) => moment(h.ngay).format('DD/MM')),
			yAxis: [sortedHealth.map((h) => h.canNang)],
		};
	}, [dsChiSo]);

	const recentWorkouts = useMemo(() => {
		return [...dsBuoiTap].sort((a, b) => moment(b.ngay).diff(moment(a.ngay))).slice(0, 5);
	}, [dsBuoiTap]);

	return (
		<div style={{ padding: '24px' }}>
			<Title level={3}>Dashboard</Title>

			<Row gutter={[16, 16]}>
				<Col span={6}>
					<Card>
						<Statistic
							title='Buổi tập tháng này'
							value={stats.monthWorkouts}
							prefix={<HistoryOutlined />}
							valueStyle={{ color: '#1890ff' }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title='Calo đã đốt'
							value={stats.totalCalo}
							suffix='kcal'
							prefix={<FireOutlined />}
							valueStyle={{ color: '#cf1322' }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title='Chuỗi ngày tập (Streak)'
							value={stats.streak}
							suffix='ngày'
							prefix={<RocketOutlined />}
							valueStyle={{ color: '#d46b08' }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title='Mục tiêu hoàn thành'
							value={stats.goalPercent}
							suffix='%'
							prefix={<TrophyOutlined />}
							valueStyle={{ color: '#3f8600' }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Biểu đồ */}
			<Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
				<Col span={12}>
					<Card title='Số buổi tập theo tuần (Tháng này)'>
						<ColumnChart
							xAxis={workoutChartData.xAxis}
							yAxis={workoutChartData.yAxis}
							yLabel={['Số buổi']}
							height={300}
							formatY={(val) => `${val} buổi`}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card title='Biến động cân nặng (kg)'>
						<LineChart
							xAxis={weightChartData.xAxis}
							yAxis={weightChartData.yAxis}
							yLabel={['Cân nặng']}
							colors={['#52c41a']}
							height={300}
							formatY={(val) => `${val} kg`}
						/>
					</Card>
				</Col>
			</Row>

			<Row style={{ marginTop: '24px' }}>
				<Col span={24}>
					<Card title='Hoạt động gần nhất'>
						<Timeline mode='left'>
							{recentWorkouts.map((item) => {
								const baiTap = dsBaiTap.find((b) => b.id === item.baiTapId);
								return (
									<Timeline.Item
										key={item.id}
										label={moment(item.ngay).format('DD/MM/YYYY')}
										color={item.trangThai === 'Hoàn thành' ? 'green' : 'red'}
									>
										<Text strong>{baiTap?.ten || item.loaiBaiTap}</Text> - {item.thoiLuong} phút ({item.calo} kcal)
										<br />
										<Text type='secondary'>{item.ghiChu}</Text>
									</Timeline.Item>
								);
							})}
						</Timeline>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default TrangChu;

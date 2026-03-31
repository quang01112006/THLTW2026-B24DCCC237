import ColumnChart from '@/components/Chart/ColumnChart';
import { CheckCircleOutlined, CloseCircleOutlined, HourglassOutlined, TeamOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { useMemo } from 'react';
import { useModel } from 'umi';

const { Title } = Typography;

const ThongKePage = () => {
	const { dsDon } = useModel('dondangki');
	const { dsCLB } = useModel('clb');
	const stats = useMemo(() => {
		return {
			tongCLB: dsCLB.length,
			pending: dsDon.filter((d) => d.trangThai === 'Pending').length,
			approved: dsDon.filter((d) => d.trangThai === 'Approved').length,
			rejected: dsDon.filter((d) => d.trangThai === 'Rejected').length,
		};
	}, [dsDon, dsCLB]);

	const chartData = useMemo(() => {
		const xAxis = dsCLB.map((clb) => clb.tenCLB);
		const pendingData = dsCLB.map((clb) => dsDon.filter((d) => d.idCLB === clb.id && d.trangThai === 'Pending').length);
		const approvedData = dsCLB.map(
			(clb) => dsDon.filter((d) => d.idCLB === clb.id && d.trangThai === 'Approved').length,
		);
		const rejectedData = dsCLB.map(
			(clb) => dsDon.filter((d) => d.idCLB === clb.id && d.trangThai === 'Rejected').length,
		);

		return {
			xAxis,
			yAxis: [pendingData, approvedData, rejectedData],
			yLabel: ['Đang chờ (Pending)', 'Đã duyệt (Approved)', 'Từ chối (Rejected)'],
			colors: ['#faad14', '#52c41a', '#ff4d4f'],
		};
	}, [dsDon, dsCLB]);

	return (
		<div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
			<Title level={3} style={{ marginBottom: 24 }}>
				Thống kê hoạt động Câu lạc bộ
			</Title>

			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col xs={24} sm={12} lg={6}>
					<Card bordered={false}>
						<Statistic
							title='Câu lạc bộ'
							value={stats.tongCLB}
							prefix={<TeamOutlined />}
							valueStyle={{ color: '#1890ff' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card bordered={false}>
						<Statistic
							title='Đang chờ'
							value={stats.pending}
							prefix={<HourglassOutlined />}
							valueStyle={{ color: '#faad14' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card bordered={false}>
						<Statistic
							title='Thành viên mới'
							value={stats.approved}
							prefix={<CheckCircleOutlined />}
							valueStyle={{ color: '#52c41a' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card bordered={false}>
						<Statistic
							title='Đã từ chối'
							value={stats.rejected}
							prefix={<CloseCircleOutlined />}
							valueStyle={{ color: '#ff4d4f' }}
						/>
					</Card>
				</Col>
			</Row>

			<Card title='Phân tích đơn đăng ký theo từng Câu lạc bộ'>
				<ColumnChart
					title='Số lượng đơn đăng ký'
					xAxis={chartData.xAxis}
					yAxis={chartData.yAxis}
					yLabel={chartData.yLabel}
					colors={chartData.colors}
					height={400}
					formatY={(val: number) => `${val} đơn`}
					otherOptions={{
						yaxis: {
							tickAmount: Math.max(...chartData.yAxis.flat()) < 5 ? Math.max(...chartData.yAxis.flat()) : undefined,
							labels: {
								formatter: (val: number) => `${Math.floor(val)} đơn`,
							},
						},
					}}
				/>
			</Card>
		</div>
	);
};

export default ThongKePage;

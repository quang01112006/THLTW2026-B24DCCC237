import { ETrangThaiTask } from '@/services/Kanban/constants';
import { CheckCircleOutlined, ClockCircleOutlined, ProjectOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import moment from 'moment';
import React from 'react';
import { useModel } from 'umi';

const Dashboard: React.FC = () => {
	const { dsTask } = useModel('task');

	const tongSoTask = dsTask.length;

	const soTaskHoanThanh = dsTask.filter((task) => task.trangThai === ETrangThaiTask.HOAN_THANH).length;

	const soTaskQuaHan = dsTask.filter(
		(task) => task.trangThai !== ETrangThaiTask.HOAN_THANH && moment(task.deadline).isBefore(moment()),
	).length;

	return (
		<div style={{ padding: 24 }}>
			<h2 style={{ marginBottom: 24 }}>Dashboard - Thống kê công việc</h2>
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
						<Statistic
							title={<span style={{ fontSize: 16, fontWeight: 500 }}>Tổng số Task</span>}
							value={tongSoTask}
							valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
							prefix={<ProjectOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
						<Statistic
							title={<span style={{ fontSize: 16, fontWeight: 500 }}>Task Hoàn thành</span>}
							value={soTaskHoanThanh}
							valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
							prefix={<CheckCircleOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
						<Statistic
							title={<span style={{ fontSize: 16, fontWeight: 500 }}>Task Quá hạn</span>}
							value={soTaskQuaHan}
							valueStyle={{ color: '#ff4d4f', fontWeight: 'bold' }}
							prefix={<ClockCircleOutlined />}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;

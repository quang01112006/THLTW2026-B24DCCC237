import { Card, Button, Space, Tag, Divider, Row, Col, Statistic, Table, message } from 'antd';
import { useState } from 'react';
import { TrophyOutlined, CloseCircleOutlined, SwapOutlined } from '@ant-design/icons';

type Choice = 'ROCK' | 'PAPER' | 'SCISSORS';
type ResultStatus = 'win' | 'lose' | 'draw';

const Bai1 = () => {
	const [userChoice, setUserChoice] = useState<Choice | null>(null);
	const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
	const [result, setResult] = useState<ResultStatus | null>(null);
	const [lichSu, setLichSu] = useState<any[]>([]);
	const TextHienThi = {
		SCISSORS: 'Kéo',
		ROCK: 'Búa',
		PAPER: 'Bao',
	};
	const HienThiKq = {
		win: 'Thắng',
		lose: 'Thua',
		draw: 'Hòa',
	};
	const choices: Choice[] = ['ROCK', 'PAPER', 'SCISSORS'];
	const rules: Record<Choice, Choice> = {
		ROCK: 'SCISSORS',
		PAPER: 'ROCK',
		SCISSORS: 'PAPER',
	};
	const handlePlay = (user: Choice) => {
		const computer = choices[Math.floor(Math.random() * 3)];
		let res: ResultStatus = 'draw';
		if (user !== computer) {
			res = rules[user] === computer ? 'win' : 'lose';
		}
		setUserChoice(user);
		setComputerChoice(computer);
		setResult(res);
		setLichSu([
			{
				key: Date.now(),
				user,
				bot: computer,
				status: res,
				time: new Date().toLocaleTimeString(),
			},
			...lichSu,
		]);

		if (res === 'win') message.success('Thắng r');
		if (res === 'lose') message.error('Thua r');
	};

	const stats = {
		win: lichSu.filter((h) => h.status === 'win').length,
		lose: lichSu.filter((h) => h.status === 'lose').length,
		draw: lichSu.filter((h) => h.status === 'draw').length,
	};

	return (
		<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
			<Row gutter={16} style={{ marginBottom: 20 }}>
				<Col span={8}>
					<Card>
						<Statistic title='Thắng' prefix={<TrophyOutlined />} value={stats.win} valueStyle={{ color: 'green' }} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic title='Thua' prefix={<CloseCircleOutlined />} valueStyle={{ color: 'red' }} value={stats.lose} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic title='Hòa' value={stats.draw} prefix={<SwapOutlined />} />
					</Card>
				</Col>
			</Row>

			<Card title='Bài 1 - Oẳn Tù Tì' style={{ textAlign: 'center' }}>
				<Space>
					<Button type='primary' onClick={() => handlePlay('SCISSORS')}>
						Kéo
					</Button>
					<Button type='primary' onClick={() => handlePlay('ROCK')}>
						Búa
					</Button>
					<Button type='primary' onClick={() => handlePlay('PAPER')}>
						Bao
					</Button>
				</Space>

				<Divider>Kết quả </Divider>

				{userChoice ? (
					<div style={{ padding: '15px', background: '#f5f5f5', borderRadius: '8px', marginBottom: 20 }}>
						<div style={{ fontSize: '16px' }}>
							<Row>
								<Col span={8}>
									<b>Bạn:</b> {TextHienThi[userChoice]}
								</Col>
								<Col span={8}>
									<Tag
										color={result === 'win' ? 'green' : result === 'lose' ? 'red' : 'orange'}
										style={{ fontSize: '18px' }}
									>
										{HienThiKq?.[result as keyof typeof HienThiKq]?.toUpperCase()}
									</Tag>
								</Col>
								<Col span={8}>
									<b>Máy:</b> {TextHienThi?.[computerChoice as keyof typeof TextHienThi]}
								</Col>
							</Row>
						</div>
					</div>
				) : (
					<div style={{ marginBottom: 20, color: '#bfbfbf' }}></div>
				)}

				<Divider orientation='left'>Lịch sử đấu</Divider>

				<Table
					dataSource={lichSu}
					pagination={{ pageSize: 5 }}
					size='small'
					columns={[
						{ title: 'Giờ', dataIndex: 'time', align: 'center' },
						{
							title: 'Bạn',
							align: 'center',
							dataIndex: 'user',
							render: (val, record) => <div>{TextHienThi?.[val as keyof typeof TextHienThi]}</div>,
						},
						{
							title: 'Máy',
							dataIndex: 'bot',
							render: (val, record) => <div>{TextHienThi?.[val as keyof typeof TextHienThi]}</div>,
							align: 'center',
						},
						{
							title: 'Kết quả',
							dataIndex: 'status',
							align: 'center',
							render: (val, record) => (
								<Tag color={val === 'win' ? 'green' : val === 'lose' ? 'red' : 'orange'}>
									{HienThiKq?.[val as keyof typeof HienThiKq]}
								</Tag>
							),
						},
					]}
				/>
			</Card>
		</div>
	);
};

export default Bai1;

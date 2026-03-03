import { useState, useEffect } from 'react';
import { Card, Input, Button, List, Typography, message, Result } from 'antd';
import { ReloadOutlined, QuestionOutlined, QuestionCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

const Bai1 = () => {
	const [targetNumber, setTargetNumber] = useState<number>(0);
	const [input, setInput] = useState<number | string>('');
	const [history, setHistory] = useState<{ value: number; hint: string }[]>([]);
	const [gameOver, setGameOver] = useState<'win' | 'lose' | null>(null);

	const initGame = () => {
		const randomNum = Math.floor(Math.random() * 100) + 1;
		setTargetNumber(randomNum);
		setHistory([]);
		setInput('');
		setGameOver(null);
		message.info('Hãy chọn một số từ 1 đến 100.');
	};

	useEffect(() => {
		initGame();
	}, []);

	const handleGuess = () => {
		const num = Number(input);
		if (isNaN(num) || num < 1 || num > 100) {
			message.warning('Nhập số từ 1 đến 100 thôi');
			return;
		}

		let hint = '';
		if (num < targetNumber) {
			hint = 'Bạn đoán quá thấp!';
		} else if (num > targetNumber) {
			hint = 'Bạn đoán quá cao!';
		} else {
			setGameOver('win');
			hint = 'Chúc mừng! Bạn đã đoán đúng!';
		}

		const newHistory = [{ value: num, hint }, ...history];
		setHistory(newHistory);
		setInput('');

		if (newHistory.length >= 10 && num !== targetNumber) {
			setGameOver('lose');
		}
	};

	return (
		<Card title='Trò chơi Đoán số (1-100)' style={{ maxWidth: 600, margin: '20px auto' }}>
			{gameOver === 'win' && <Result status='success' title='Chuẩn r!' subTitle={`Số đúng là ${targetNumber}`} />}
			{gameOver === 'lose' && (
				<Result status='error' title='Sai!' subTitle={`Bạn đã hết lượt! Số đúng là ${targetNumber}`} />
			)}

			{!gameOver && (
				<Input.Group compact style={{ width: '100%', marginBottom: 20, display: 'flex' }}>
					<Input
						type='number'
						placeholder='Nhập số...'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onPressEnter={handleGuess}
						style={{ flex: 1 }}
					/>
					<Button type='primary' icon={<QuestionCircleFilled />} onClick={handleGuess}>
						Đoán
					</Button>
				</Input.Group>
			)}

			{(gameOver || history.length > 0) && (
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<Button icon={<ReloadOutlined />} onClick={initGame}>
						Chơi lại
					</Button>
				</div>
			)}

			<List
				header={<div>Lịch sử đoán (Còn {10 - history.length} lượt)</div>}
				bordered
				dataSource={history}
				renderItem={(item, index) => (
					<List.Item>
						<Text strong>Lượt {history.length - index}:</Text> {item.value}
						<Text type={item.hint.includes('đúng') ? 'success' : 'secondary'} style={{ marginLeft: 10 }}>
							- {item.hint}
						</Text>
					</List.Item>
				)}
			/>
		</Card>
	);
};

export default Bai1;

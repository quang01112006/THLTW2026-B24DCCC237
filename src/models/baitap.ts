import { EMucDoKho, ENhomCo } from '@/services/Health/constants';
import type { Health } from '@/services/Health/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const MOCK_BAI_TAP: Health.IBaiTap[] = [
		{
			id: 'BT1',
			ten: 'Hít đất (Push-up)',
			nhomCoTacDong: [ENhomCo.CHEST, ENhomCo.ARMS, ENhomCo.CORE],
			doKho: EMucDoKho.DE,
			moTaNgan: 'Bài tập cơ bản giúp phát triển cơ ngực, bắp tay sau và giữ ổn định vùng lõi.',
			caloTrenGio: 300,
		},
		{
			id: 'BT2',
			ten: 'Squat cơ bản',
			nhomCoTacDong: [ENhomCo.LEGS, ENhomCo.CORE],
			doKho: EMucDoKho.DE,
			moTaNgan: 'Vua của các bài tập chân, giúp săn chắc mông đùi và cải thiện sức mạnh tổng thể.',
			caloTrenGio: 400,
		},
		{
			id: 'BT3',
			ten: 'Plank',
			nhomCoTacDong: [ENhomCo.CORE, ENhomCo.SHOULDERS],
			doKho: EMucDoKho.DE,
			moTaNgan: 'Bài tập tĩnh giúp xây dựng cơ bụng bền bỉ và cải thiện tư thế.',
			caloTrenGio: 150,
		},
		{
			id: 'BT4',
			ten: 'Hít xà đơn (Pull-up)',
			nhomCoTacDong: [ENhomCo.BACK, ENhomCo.ARMS],
			doKho: EMucDoKho.KHO,
			moTaNgan: 'Bài tập nâng cao giúp phát triển chiều rộng lưng và sức mạnh bắp tay.',
			caloTrenGio: 450,
		},
		{
			id: 'BT5',
			ten: 'Burpees',
			nhomCoTacDong: [ENhomCo.FULL_BODY],
			doKho: EMucDoKho.KHO,
			moTaNgan: 'Bài tập phối hợp cường độ cao, đốt tay, đốt cháy calo cực mạnh và tăng sức bền tim mạch.',
			caloTrenGio: 600,
		},
		{
			id: 'BT6',
			ten: 'Lunge (Chùng chân)',
			nhomCoTacDong: [ENhomCo.LEGS],
			doKho: EMucDoKho.TRUNG_BINH,
			moTaNgan: 'Tăng cường sự cân bằng và định hình cơ đùi trước, đùi sau.',
			caloTrenGio: 350,
		},
		{
			id: 'BT7',
			ten: 'Mountain Climber',
			nhomCoTacDong: [ENhomCo.CORE, ENhomCo.FULL_BODY],
			doKho: EMucDoKho.TRUNG_BINH,
			moTaNgan: 'Mô phỏng tư thế leo núi, giúp đốt bì bụng và tăng sự linh hoạt.',
			caloTrenGio: 500,
		},
		{
			id: 'BT8',
			ten: 'Đẩy vai với tạ đơn (Shoulder Press)',
			nhomCoTacDong: [ENhomCo.SHOULDERS, ENhomCo.ARMS],
			doKho: EMucDoKho.TRUNG_BINH,
			moTaNgan: 'Xây dựng bờ vai rộng và khỏe khoán.',
			caloTrenGio: 300,
		},
		{
			id: 'BT9',
			ten: 'Gập bụng (Crunch)',
			nhomCoTacDong: [ENhomCo.CORE],
			doKho: EMucDoKho.DE,
			moTaNgan: 'Tập trung cô lập nhóm cơ bụng trên.',
			caloTrenGio: 200,
		},
		{
			id: 'BT10',
			ten: 'Deadlift',
			nhomCoTacDong: [ENhomCo.BACK, ENhomCo.LEGS, ENhomCo.CORE],
			doKho: EMucDoKho.KHO,
			moTaNgan: 'Bài tập phức hợp huy động gần như toàn bộ các nhóm cơ trên cơ thể.',
			caloTrenGio: 500,
		},
	];

	const [dsBaiTap, setDsBaiTap] = useState<Health.IBaiTap[]>(() => {
		const saved = localStorage.getItem('dsBaiTap');
		return saved ? JSON.parse(saved) : MOCK_BAI_TAP;
	});
	const save = (newList: Health.IBaiTap[]) => {
		setDsBaiTap(newList);
		localStorage.setItem('dsBaiTap', JSON.stringify(newList));
	};

	const addBaiTap = (value: Health.IBaiTap) => {
		const newBT = {
			...value,
			id: `BT${Date.now()}`,
		};
		const newList = [...dsBaiTap, newBT];
		save(newList);
		message.success('Thêm bài tập mới thành công');
	};

	const deleteBaiTap = (id: string) => {
		const newList = dsBaiTap.filter((bt) => bt.id !== id);
		save(newList);
		message.success('Xóa bài tập thành công');
	};

	const editBaiTap = (id: string, value: Partial<Health.IBaiTap>) => {
		const newList = dsBaiTap.map((bt) => (bt.id === id ? { ...bt, ...value } : bt));
		save(newList);
		message.success('Sửa bài tập thành công');
	};

	return { dsBaiTap, addBaiTap, deleteBaiTap, editBaiTap };
};

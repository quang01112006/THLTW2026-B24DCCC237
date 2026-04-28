import { ELoaiBaiTap, ETrangThaiBuoiTap } from '@/services/Health/constants';
import type { Health } from '@/services/Health/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const MOCK_BUOI_TAP: Health.IBuoiTap[] = [
		{
			id: 'T1',
			ngay: '2026-04-25',
			baiTapId: 'BT1',
			loaiBaiTap: ELoaiBaiTap.STRENGTH,
			thoiLuong: 45,
			calo: 350,
			trangThai: ETrangThaiBuoiTap.HOAN_THANH,
			ghiChu: 'Tập ngực và tay sau, cảm thấy rất sung sức.',
		},
		{
			id: 'T2',
			ngay: '2026-04-26',
			baiTapId: 'BT7',
			loaiBaiTap: ELoaiBaiTap.CARDIO,
			thoiLuong: 30,
			calo: 500,
			trangThai: ETrangThaiBuoiTap.HOAN_THANH,
			ghiChu: 'Chạy bộ ngoài trời, nhịp tim trung bình 150.',
		},
		{
			id: 'T3',
			ngay: '2026-04-27',
			baiTapId: 'BT3',
			loaiBaiTap: ELoaiBaiTap.YOGA,
			thoiLuong: 60,
			calo: 200,
			trangThai: ETrangThaiBuoiTap.BO_LO,
			ghiChu: 'Tập các bài giãn cơ và hít thở.',
		},
		{
			id: 'T4',
			ngay: '2026-04-28',
			baiTapId: 'BT5',
			loaiBaiTap: ELoaiBaiTap.HIIT,
			thoiLuong: 20,
			calo: 400,
			trangThai: ETrangThaiBuoiTap.HOAN_THANH,
			ghiChu: 'Bài tập cường độ cao, mệt thở không ra hơi.',
		},
	];

	const [dsBuoiTap, setDsBuoiTap] = useState<Health.IBuoiTap[]>(() => {
		const saved = localStorage.getItem('dsBuoiTap');
		return saved ? JSON.parse(saved) : MOCK_BUOI_TAP;
	});

	const save = (newList: Health.IBuoiTap[]) => {
		setDsBuoiTap(newList);
		localStorage.setItem('dsBuoiTap', JSON.stringify(newList));
	};

	const addBuoiTap = (value: Health.IBuoiTap) => {
		const newRecord = {
			...value,
			id: `T${Date.now()}`,
		};
		const newList = [newRecord, ...dsBuoiTap];
		save(newList);
		message.success('Thêm buổi tập thành công');
	};

	const deleteBuoiTap = (id: string) => {
		const newList = dsBuoiTap.filter((item) => item.id !== id);
		save(newList);
		message.success('Xóa buổi tập thành công');
	};

	const editBuoiTap = (id: string, value: Partial<Health.IBuoiTap>) => {
		const newList = dsBuoiTap.map((item) => (item.id === id ? { ...item, ...value } : item));
		save(newList);
		message.success('Cập nhật buổi tập thành công');
	};

	return {
		dsBuoiTap,
		addBuoiTap,
		deleteBuoiTap,
		editBuoiTap,
	};
};

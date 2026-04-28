import type { Health } from '@/services/Health/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const MOCK_CHI_SO: Health.IChiSoSucKhoe[] = [
		{
			id: 'CS1',
			ngay: '2026-04-20',
			canNang: 65,
			chieuCao: 170,
			nhipTim: 75,
			gioNgu: 7,
		},
		{
			id: 'CS2',
			ngay: '2026-04-21',
			canNang: 64.5,
			chieuCao: 170,
			nhipTim: 72,
			gioNgu: 8,
		},
	];

	const [dsChiSo, setDsChiSo] = useState<Health.IChiSoSucKhoe[]>(() => {
		const saved = localStorage.getItem('dsChiSo');
		return saved ? JSON.parse(saved) : MOCK_CHI_SO;
	});

	const save = (newList: Health.IChiSoSucKhoe[]) => {
		setDsChiSo(newList);
		localStorage.setItem('dsChiSo', JSON.stringify(newList));
	};

	const addChiSo = (value: Health.IChiSoSucKhoe) => {
		const newCS = { ...value, id: `CS${Date.now()}` };
		save([newCS, ...dsChiSo]);
		message.success('Thêm chỉ số sức khỏe thành công');
	};

	const deleteChiSo = (id: string) => {
		save(dsChiSo.filter((item) => item.id !== id));
		message.success('Xóa chỉ số thành công');
	};

	const editChiSo = (id: string, value: Partial<Health.IChiSoSucKhoe>) => {
		save(dsChiSo.map((item) => (item.id === id ? { ...item, ...value } : item)));
		message.success('Cập nhật chỉ số thành công');
	};

	return { dsChiSo, addChiSo, deleteChiSo, editChiSo };
};

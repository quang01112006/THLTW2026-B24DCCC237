import { ELoaiMucTieu, ETrangThaiMucTieu } from '@/services/Health/constants';
import type { Health } from '@/services/Health/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const MOCK_MUC_TIEU: Health.IMucTieu[] = [
		{
			id: 'MT1',
			ten: 'Giảm cân đón Tết',
			loai: ELoaiMucTieu.GIAM_CAN,
			giaTriMucTieu: 70,
			giaTriHienTai: 75,
			trangThai: ETrangThaiMucTieu.DA_DAT,
			deadline: '2026-12-31',
		},
		{
			id: 'MT2',
			ten: 'Chạy bộ 100km',
			loai: ELoaiMucTieu.TANG_SUC_BEN,
			giaTriMucTieu: 100,
			giaTriHienTai: 45,
			trangThai: ETrangThaiMucTieu.DANG_THUC_HIEN,
			deadline: '2026-06-30',
		},
	];

	const [dsMucTieu, setDsMucTieu] = useState<Health.IMucTieu[]>(() => {
		const saved = localStorage.getItem('dsMucTieu');
		return saved ? JSON.parse(saved) : MOCK_MUC_TIEU;
	});

	const save = (newList: Health.IMucTieu[]) => {
		setDsMucTieu(newList);
		localStorage.setItem('dsMucTieu', JSON.stringify(newList));
	};

	const addMucTieu = (value: Health.IMucTieu) => {
		const newMT = {
			...value,
			id: `MT${Date.now()}`,
			trangThai:
				value.giaTriHienTai >= value.giaTriMucTieu ? ETrangThaiMucTieu.DA_DAT : ETrangThaiMucTieu.DANG_THUC_HIEN,
		};
		save([newMT, ...dsMucTieu]);
		message.success('Thêm mục tiêu thành công');
	};

	const deleteMucTieu = (id: string) => {
		save(dsMucTieu.filter((item) => item.id !== id));
		message.success('Xóa mục tiêu thành công');
	};

	const editMucTieu = (id: string, value: Partial<Health.IMucTieu>) => {
		const newList = dsMucTieu.map((item) => {
			if (item.id === id) {
				const newItem = { ...item, ...value };
				if (newItem.trangThai !== ETrangThaiMucTieu.DA_HUY) {
					if (newItem.giaTriHienTai >= newItem.giaTriMucTieu) {
						newItem.trangThai = ETrangThaiMucTieu.DA_DAT;
					} else {
						newItem.trangThai = ETrangThaiMucTieu.DANG_THUC_HIEN;
					}
				}
				return newItem;
			}
			return item;
		});
		save(newList);
	};

	return { dsMucTieu, addMucTieu, deleteMucTieu, editMucTieu };
};

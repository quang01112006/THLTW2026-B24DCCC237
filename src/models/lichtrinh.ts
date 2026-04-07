import { DuLich } from '@/services/DuLich/typing';
import { useState } from 'react';

export default () => {
	const [dsLichTrinh, setDsLichTrinh] = useState<DuLich.ILichTrinh[]>(() => {
		const saved = localStorage.getItem('dsLichTrinh');
		return saved ? JSON.parse(saved) : [];
	});

	const saveAndSync = (data: DuLich.ILichTrinh[]) => {
		setDsLichTrinh(data);
		localStorage.setItem('dsLichTrinh', JSON.stringify(data));
	};

	const addLichTrinh = (data: Partial<DuLich.ILichTrinh>) => {
		const newLichTrinh: DuLich.ILichTrinh = {
			id: `LT_${Date.now()}`,
			tenChuyenDi: data.tenChuyenDi || 'Chuyến đi abc',
			nganSachToiDa: data.nganSachToiDa || 0,
			cacNgay: [{ idNgay: 'day_1', tenNgay: 'Ngày 1', diemDenIds: [] }],
			...data,
		};
		saveAndSync([...dsLichTrinh, newLichTrinh]);
	};

	const addDiemDenToLichTrinh = (lichTrinhId: string, ngayId: string, diemDenId: string) => {
		const newList = dsLichTrinh.map((lt) => {
			if (lt.id === lichTrinhId) {
				const newCacNgay = lt.cacNgay.map((ngay) => {
					if (ngay.idNgay === ngayId) {
						if (!ngay.diemDenIds.includes(diemDenId)) {
							return { ...ngay, diemDenIds: [...ngay.diemDenIds, diemDenId] };
						}
					}
					return ngay;
				});
				return { ...lt, cacNgay: newCacNgay };
			}
			return lt;
		});
		saveAndSync(newList);
	};

	const removeDiemDenFromLichTrinh = (ltId: string, ngayId: string, diemId: string) => {
		const newList = dsLichTrinh.map((lt) => {
			if (lt.id === ltId) {
				const newCacNgay = lt.cacNgay.map((ngay) => {
					if (ngay.idNgay === ngayId) {
						return { ...ngay, diemDenIds: ngay.diemDenIds.filter((id) => id !== diemId) };
					}
					return ngay;
				});
				return { ...lt, cacNgay: newCacNgay };
			}
			return lt;
		});
		saveAndSync(newList);
	};
	const addNgay = (ltId: string) => {
		const newList = dsLichTrinh.map((lt) => {
			if (lt.id === ltId) {
				const nextDayNum = lt.cacNgay.length + 1;
				const newNgay = {
					idNgay: `day_${Date.now()}`,
					tenNgay: `Ngày ${nextDayNum}`,
					diemDenIds: [],
				};
				return { ...lt, cacNgay: [...lt.cacNgay, newNgay] };
			}
			return lt;
		});
		saveAndSync(newList);
	};

	const reorderDiemDen = (ltId: string, ngayId: string, fromIndex: number, toIndex: number) => {
		const newList = dsLichTrinh.map((lt) => {
			if (lt.id === ltId) {
				const newCacNgay = lt.cacNgay.map((ngay) => {
					if (ngay.idNgay === ngayId) {
						const newIds = [...ngay.diemDenIds];
						const [removed] = newIds.splice(fromIndex, 1);
						newIds.splice(toIndex, 0, removed);
						return { ...ngay, diemDenIds: newIds };
					}
					return ngay;
				});
				return { ...lt, cacNgay: newCacNgay };
			}
			return lt;
		});
		saveAndSync(newList);
	};

	return {
		dsLichTrinh,
		addLichTrinh,
		addDiemDenToLichTrinh,
		removeDiemDenFromLichTrinh,
		reorderDiemDen,
		addNgay,
	};
};

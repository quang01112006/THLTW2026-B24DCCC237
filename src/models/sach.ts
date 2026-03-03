import { TrangThai } from '@/services/Sach/constants';
import { Sach } from '@/services/Sach/typing';
import { useState } from 'react';

export default () => {
	const [dataSach, setDataSach] = useState<Sach.Record[]>(() => {
		const saved = localStorage.getItem('listSach');
		return saved
			? JSON.parse(saved)
			: [
					{
						id: 'B001',
						name: 'Clean Code',
						author: 'Robert C. Martin',
						category: 'IT',
						quantity: 5,
						year: 2008,
						status: TrangThai.AVAILABLE,
					},
					{
						id: 'B002',
						name: 'Dế Mèn Phiêu Lưu Ký',
						author: 'Tô Hoài',
						category: 'Văn học',
						quantity: 10,
						year: 1941,
						status: TrangThai.UNAVAILABLE,
					},
			  ];
	});
	const generateId = () => {
		if (dataSach.length === 0) return 'B001';
		const ids = dataSach.map((i) => {
			const num = i.id.replace('B', '');
			return parseInt(num, 10);
		});
		const maxId = Math.max(...ids);
		const nextNumber = maxId + 1;
		const formattedNumber = nextNumber.toString().padStart(3, '0');
		return `B${formattedNumber}`;
	};
	const addBook = (val: Sach.Record) => {
		const nextId = generateId();
		const newBook = { ...val, id: nextId };
		const newList = [...dataSach, newBook];
		setDataSach(newList);
		localStorage.setItem('listSach', JSON.stringify(newList));
	};
	return { dataSach, addBook };
};

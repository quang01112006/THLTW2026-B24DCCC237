import { TrangThaiPet } from '@/services/Pet/constants';
import { Pet } from '@/services/Pet/typing';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
	const [dsPet, setDsPet] = useState<Pet.Record[]>(() => {
		const saved = localStorage.getItem('dsPetLocal');
		return saved
			? JSON.parse(saved)
			: [
					{ id: 1, tenPet: 'Golden Retriever', loai: 'Chó', soLuong: 5, giaBan: 15000000, trangThai: 'CON_HANG' },
					{ id: 2, tenPet: 'Mèo Ba Tư', loai: 'Mèo', soLuong: 0, giaBan: 8000000, trangThai: 'HET_HANG' },
					{ id: 3, tenPet: 'Hamster Bear', loai: 'Chuột', soLuong: 20, giaBan: 150000, trangThai: 'CON_HANG' },
			  ];
	});
	const addPet = (newRecord: Pet.Record) => {
		setDsPet((prev) => {
			const maxId = prev.length > 0 ? Math.max(...prev.map((i) => i.id)) : 0;
			const nextId = maxId + 1;
			return [...prev, { ...newRecord, id: nextId, trangThai: TrangThaiPet.CON_HANG }];
		}),
			message.success('Thêm pet thành công!');
	};
	const deletePet = (id: number) => {
		setDsPet((prev) => {
			const newList = prev.filter((i) => i.id !== id);
			return newList;
		});
		message.success('Xóa pet thành công!');
	};
	const editPet = (record: Pet.Record) => {
		setDsPet((prev) =>
			prev.map((i) => {
				if (record.id === i.id) {
					const updatePet = { ...i, ...record };

					updatePet.trangThai = updatePet.soLuong === 0 ? TrangThaiPet.HET_HANG : TrangThaiPet.CON_HANG;
					return updatePet;
				}
				return i;
			}),
		);
		message.success('Cập nhật thông tin pet thành công');
	};
	useEffect(() => {
		localStorage.setItem('dsPetLocal', JSON.stringify(dsPet));
	}, [dsPet]);
	return { addPet, deletePet, dsPet, editPet };
};

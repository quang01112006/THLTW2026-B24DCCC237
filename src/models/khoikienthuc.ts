import { message } from 'antd';
import { useState, useEffect } from 'react';

export default () => {
	const [khoiKienThuc, setKhoiKienThuc] = useState<KhoiKienThuc.Record[]>(() => {
		const saved = localStorage.getItem('listKhoiKienThuc');
		return saved
			? JSON.parse(saved)
			: [
					{ id: 1, idMonHoc: 1, ten: 'Tổng quan về React', moTa: 'Cơ bản về Component' },
					{ id: 2, idMonHoc: 1, ten: 'UmiJS & Ant Design', moTa: 'Framework và UI Kit' },
			  ];
	});

	useEffect(() => {
		localStorage.setItem('listKhoiKienThuc', JSON.stringify(khoiKienThuc));
	}, [khoiKienThuc]);

	const addKhoiKienThuc = (newItem: KhoiKienThuc.Record) => {
		setKhoiKienThuc((prev) => {
			const maxId = prev.length > 0 ? Math.max(...prev.map((i) => i.id)) : 0;
			const newId = maxId + 1;
			return [...prev, { ...newItem, id: newId }];
		});
		message.success('Thêm khối kiến thức thành công');
	};

	const delKhoiKienThuc = (id: number) => {
		setKhoiKienThuc((prev) => prev.filter((item) => item.id !== id));
		message.success('Đã xóa khối kiến thức');
	};

	const editKhoiKienThuc = (id: number, newVal: any) => {
		setKhoiKienThuc((prev) => prev.map((item) => (item.id === id ? { ...newVal, id } : item)));
		message.success('Cập nhật thành công');
	};

	return {
		khoiKienThuc,
		addKhoiKienThuc,
		delKhoiKienThuc,
		editKhoiKienThuc,
	};
};

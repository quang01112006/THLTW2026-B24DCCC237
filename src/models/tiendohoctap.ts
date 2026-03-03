import { message } from 'antd';
import { useState, useEffect } from 'react';

export default () => {
	const [listTienDo, setListTienDo] = useState<MonHoc.TienDo[]>(() => {
		const saved = localStorage.getItem('listTienDo');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('listTienDo', JSON.stringify(listTienDo));
	}, [listTienDo]);

	const addTienDo = (newItem: any) => {
		setListTienDo((prev) => {
			const maxId = prev.length > 0 ? Math.max(...prev.map((i) => Number(i.id))) : 0;
			return [...prev, { ...newItem, id: maxId + 1 }];
		});
		message.success('Thêm thành công');
	};

	const delTienDo = (id: number) => {
		setListTienDo((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
		message.success('Đã xóa ');
	};

	const editTienDo = (id: number, val: any) => {
		setListTienDo((prev) => prev.map((i) => (Number(i.id) === Number(id) ? { ...val, id } : i)));
		message.success('Cập nhật thành công');
	};

	return { listTienDo, addTienDo, delTienDo, editTienDo };
};

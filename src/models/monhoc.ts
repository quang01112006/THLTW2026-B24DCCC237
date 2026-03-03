import { message } from 'antd';
import { useState, useEffect } from 'react';

export default () => {
	const [monHoc, setMonHoc] = useState<MonHoc.Record[]>(() => {
		const saved = localStorage.getItem('listMonHoc');
		return saved
			? JSON.parse(saved)
			: [
					{ id: 1, ten: 'Toán', mucTieuHangThang: 20 },
					{ id: 2, ten: 'Lý', mucTieuHangThang: 60 },
			  ];
	});

	useEffect(() => {
		localStorage.setItem('listMonHoc', JSON.stringify(monHoc));
	}, [monHoc]);

	const addMonHoc = (newItem: MonHoc.Record) => {
		setMonHoc((prev) => {
			const maxId = prev.length > 0 ? Math.max(...prev.map((i) => i.id)) : 0;
			const newId = maxId + 1;
			return [...prev, { ...newItem, id: newId }];
		});
		message.success('Thêm môn học thành công');
	};

	const delMonHoc = (id: number) => {
		setMonHoc((prev) => prev.filter((item) => item.id !== id));
		message.success('Đã xóa môn học');
	};

	const editMonHoc = (id: number, newVal: any) => {
		setMonHoc((prev) =>
			prev.map((item) =>
				item.id === id ? { ...newVal, id } : item,
			),
		);
		message.success('Cập nhật thành công');
	};

	return {
		monHoc,
		addMonHoc,
		delMonHoc,
		editMonHoc,
	};
};

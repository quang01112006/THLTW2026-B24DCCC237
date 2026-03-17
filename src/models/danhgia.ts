import { useState, useEffect } from 'react';

export default () => {
	const [dsDanhGia, setDsDanhGia] = useState<QuanLyDichVu.DanhGia[]>(() => {
		const saved = localStorage.getItem('dsDanhGia_Master');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('dsDanhGia_Master', JSON.stringify(dsDanhGia));
	}, [dsDanhGia]);

	const addDanhGia = (record: QuanLyDichVu.DanhGia) => {
		setDsDanhGia((prev) => [{ ...record, id: Date.now() }, ...prev]);
	};

	return { dsDanhGia, addDanhGia };
};

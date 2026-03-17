import { useState, useEffect } from 'react';
import { message } from 'antd';
import moment from 'moment';

export default () => {
	const [dsLichHen, setDsLichHen] = useState<QuanLyDichVu.LichHen[]>(() => {
		const saved = localStorage.getItem('dsLichHen_Master');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('dsLichHen_Master', JSON.stringify(dsLichHen));
	}, [dsLichHen]);

	const checkTrungLich = (idNhanVien: number, ngayHen: string, gioBatDau: string, thoiGianDichVu: number) => {
		const lichCuaNhanVien = dsLichHen.filter(
			(item) => item.idNhanVien === idNhanVien && item.ngayHen === ngayHen && item.trangThai !== 'HUY',
		);

		const startMoi = moment(`${ngayHen} ${gioBatDau}`, 'YYYY-MM-DD HH:mm');
		const endMoi = moment(startMoi).add(thoiGianDichVu, 'minutes');

		const biTrung = lichCuaNhanVien.some((lichCu) => {
			const startCu = moment(`${lichCu.ngayHen} ${lichCu.gioHen}`, 'YYYY-MM-DD HH:mm');
			const endCu = moment(startCu).add(60, 'minutes');

			return startMoi.isBefore(endCu) && endMoi.isAfter(startCu);
		});

		return biTrung;
	};

	const saveLichHen = (record: QuanLyDichVu.LichHen) => {
		setDsLichHen((prev) => {
			if (record.id) {
				return prev.map((item) => (item.id === record.id ? record : item));
			}
			return [{ ...record, id: Date.now(), trangThai: 'CHO_DUYET' }, ...prev];
		});
	};

	const xoaLichHen = (id: number) => {
		setDsLichHen((prev) => prev.filter((item) => item.id !== id));
	};

	return { dsLichHen, saveLichHen, xoaLichHen, checkTrungLich, setDsLichHen };
};

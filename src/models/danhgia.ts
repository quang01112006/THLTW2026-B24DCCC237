import moment from 'moment';
import { useState, useEffect } from 'react';

export default () => {
	const [dsDanhGia, setDsDanhGia] = useState<QuanLyDichVu.DanhGia[]>(() => {
		const saved = localStorage.getItem('dsDanhGia_Master');
		return saved
			? JSON.parse(saved)
			: [
					{
						id: 1647615600000,
						idLichHen: 1647612000000,
						tenKhachHang: 'Nguyễn ABC',
						idNhanVien: 1,
						idDichVu: 1,
						soSao: 5,
						binhLuan: 'Peak, absolute cinema!',
						ngayRating: '18/03/2026 11:30',
					},
			  ];
	});

	useEffect(() => {
		localStorage.setItem('dsDanhGia_Master', JSON.stringify(dsDanhGia));
	}, [dsDanhGia]);

	const addDanhGia = (values: any, recordTuLichHen: any) => {
		const moi = {
			id: Date.now(),
			idLichHen: recordTuLichHen.id,
			tenKhachHang: recordTuLichHen.tenKhachHang,
			idNhanVien: recordTuLichHen.idNhanVien,
			soSao: values.soSao,
			binhLuan: values.binhLuan,
			ngayRating: moment().format('DD/MM/YYYY HH:mm'),
			idDichVu: recordTuLichHen.idDichVu,
		};
		setDsDanhGia((prev) => [moi, ...prev]);
	};

	return { dsDanhGia, addDanhGia };
};

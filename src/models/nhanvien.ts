import { message } from 'antd';
import { useEffect, useState } from 'react';
export default () => {
	const [dsNhanVien, setDsNhanVien] = useState<QuanLyDichVu.NhanVien[]>(() => {
		const saved = localStorage.getItem('dsNhanVien');
		return saved
			? JSON.parse(saved)
			: [
					{
						id: 1,
						ten: 'Hikaru Nakamura',
						gioiHanKhach: 5,
						lichLamViec: [
							{ thu: 2, caBatDau: '08:00', caKetThuc: '17:00' },
							{ thu: 3, caBatDau: '08:00', caKetThuc: '12:00' },
						],
					},
					{
						id: 2,
						ten: 'Magnus Carlsen',
						gioiHanKhach: 3,
						lichLamViec: [
							{ thu: 2, caBatDau: '13:00', caKetThuc: '21:00' },
							{ thu: 5, caBatDau: '08:00', caKetThuc: '17:00' },
						],
					},
			  ];
	});
	useEffect(() => {
		localStorage.setItem('dsNhanVien', JSON.stringify(dsNhanVien));
	}, [dsNhanVien]);

	const deleteNhanVien = (id: number) => {
		setDsNhanVien((prev) => prev.filter((item) => item.id !== id));
		message.success('Xóa nhân viên thành công');
	};
	const saveNhanVien = (record: QuanLyDichVu.NhanVien) => {
		setDsNhanVien((prev) => {
			if (record.id) {
				message.success('Cập nhật nhân viên thành công');
				return prev.map((item) => (item.id === record.id ? record : item));
			}
			message.success('Thêm mới thành công');
			return [{ ...record, id: Date.now() }, ...prev];
		});
	};
	const checkLichLamViec = (idNhanVien: number, ngayChon: string) => {
		const nv = dsNhanVien.find((item) => item.id === idNhanVien);
		if (!nv) return false;
		const thuCuaNgayChon = new Date(ngayChon).getDay();
		return nv.lichLamViec?.some((l) => l.thu === thuCuaNgayChon);
	};
	return { deleteNhanVien, saveNhanVien, checkLichLamViec, dsNhanVien };
};

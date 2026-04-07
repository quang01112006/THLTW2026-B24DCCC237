import { ELoaiHinh, EPhanKhucGia } from '@/services/DuLich/constants';
import type { DuLich } from '@/services/DuLich/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const MOCK_DIEM_DEN: DuLich.IDiemDen[] = [
		{
			id: '1',
			ten: 'Vịnh Hạ Long',
			loaiHinh: ELoaiHinh.BIEN,
			hinhAnh: 'https://bcp.cdnchinhphu.vn/344443456812359680/2023/9/18/hl-4938-1695021625841340768767.jpg',
			moTa: 'Di sản thiên nhiên thế giới, thích hợp đi du thuyền.',
			danhGia: 4.8,
			thoiGianThamQuan: 4,
			phanKhucGia: EPhanKhucGia.PHO_THONG,
			tongChiPhi: 2500000,
			mucChiPhi: {
				anUong: 1000000,
				luuTru: 1000000,
				diChuyen: 500000,
			},
		},
		{
			id: '2',
			ten: 'Đỉnh Fansipan',
			loaiHinh: ELoaiHinh.NUI,
			hinhAnh: 'https://booking.muongthanh.com/upload_images/images/H%60/dinh-nui-fansipan.jpg',
			moTa: 'Nóc nhà Đông Dương, săn mây cực đỉnh.',
			danhGia: 4.9,
			thoiGianThamQuan: 6,
			phanKhucGia: EPhanKhucGia.CAO_CAP,
			tongChiPhi: 3500000,
			mucChiPhi: {
				anUong: 800000,
				luuTru: 1500000,
				diChuyen: 1200000,
			},
		},
	];
	const [dsDiemDen, setDsDiemDen] = useState<DuLich.IDiemDen[]>(() => {
		const saved = localStorage.getItem('dsDiemDen');
		return saved ? JSON.parse(saved) : MOCK_DIEM_DEN;
	});
	const savedAndSync = (data: DuLich.IDiemDen[]) => {
		setDsDiemDen(data);
		localStorage.setItem('dsDiemDen', JSON.stringify(data));
	};

	const addDiemDen = (data: DuLich.IDiemDen) => {
		const newDiemDen = { ...data, id: `D_${Date.now()}` };
		const newList = [...dsDiemDen, newDiemDen];
		savedAndSync(newList);
		message.success('Thêm điểm đến thành công');
	};
	const deleteDiemDen = (id: string) => {
		const newList = dsDiemDen.filter((i) => i.id !== id);
		savedAndSync(newList);
		message.success('Xóa điểm đến thành công');
	};
	const editDiemDen = (record: DuLich.IDiemDen) => {
		const newList = dsDiemDen.map((i) => (i.id === record.id ? { ...i, ...record } : i));
		savedAndSync(newList);
		message.success('Sửa điểm đến thành công');
	};
	return { dsDiemDen, addDiemDen, deleteDiemDen, editDiemDen };
};

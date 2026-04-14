import { ETrangThai } from '@/services/QuanLyKhoaHoc/constants';
import { type QuanLyKhoaHoc } from '@/services/QuanLyKhoaHoc/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const MOCK_KHOA_HOC: QuanLyKhoaHoc.IKhoaHoc[] = [
		{
			id: 'KH001',
			ten: 'Lập trình ReactJS cơ bản',
			giangVien: 'GV_TuanAnh',
			soLuongHocVien: 25,
			trangThai: ETrangThai.DANG_MO,
			moTa: 'Khóa học dành cho người mới bắt đầu với React.',
		},
		{
			id: 'KH002',
			ten: 'Thiết kế UI/UX nâng cao',
			giangVien: 'GV_PhuongLinh',
			soLuongHocVien: 0,
			trangThai: ETrangThai.TAM_DUNG,
			moTa: 'Học cách tạo ra giao diện người dùng.',
		},
	];
	const [dsKhoaHoc, setDsKhoaHoc] = useState<QuanLyKhoaHoc.IKhoaHoc[]>(() => {
		const saved = localStorage.getItem('dsKhoaHoc');
		return saved ? JSON.parse(saved) : MOCK_KHOA_HOC;
	});

	const saveAndSync = (data: QuanLyKhoaHoc.IKhoaHoc[]) => {
		setDsKhoaHoc(data);
		localStorage.setItem('dsKhoaHoc', JSON.stringify(data));
	};

	const addKhoaHoc = (values: QuanLyKhoaHoc.IKhoaHoc) => {
		const isDuplicate = dsKhoaHoc.some((item) => item.ten.toLowerCase() === values.ten.toLowerCase());
		if (isDuplicate) {
			message.error('Tên khóa học này đã tồn tại!');
		}
		const newData = [...dsKhoaHoc, { ...values, id: `KH_${Date.now()}` }];
		message.success('Thêm khóa học mới thành công!');
		saveAndSync(newData);
	};

	const updateKhoaHoc = (id: string, values: Partial<QuanLyKhoaHoc.IKhoaHoc>) => {
		const newData = dsKhoaHoc.map((item) => {
			if (item.id === id) {
				return { ...item, ...values };
			}
			return item;
		});
		saveAndSync(newData);
	};

	const deleteKhoaHoc = (id: string) => {
		const deleted = dsKhoaHoc.find((item) => item.id === id);
		if (deleted && deleted.soLuongHocVien > 0) {
			message.error('Không thể xóa khóa học đang có học viên!');
		}
		const newData = dsKhoaHoc.filter((item) => item.id !== id);
		saveAndSync(newData);
	};

	return {
		dsKhoaHoc,
		addKhoaHoc,
		updateKhoaHoc,
		deleteKhoaHoc,
	};
};

import { ETrangThai } from '@/services/QuanLyKhoaHoc/constants';
import { type QuanLyKhoaHoc } from '@/services/QuanLyKhoaHoc/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const MOCK_KHOA_HOC: QuanLyKhoaHoc.IKhoaHoc[] = [
		{
			id: 'KH1',
			ten: 'Lập trình ReactJS cơ bản',
			giangVien: 'GV_TuanAnh',
			soLuongHocVien: 25,
			trangThai: ETrangThai.DANG_MO,
			moTa: 'Khóa học <b>cực hay</b> dành cho <i>người mới</i>.<ul><li>Tặng giáo trình</li><li>Hỗ trợ 24/7</li></ul>',
		},
		{
			id: 'KH2',
			ten: 'Thiết kế UI/UX nâng cao',
			giangVien: 'GV_PhuongLinh',
			soLuongHocVien: 0,
			trangThai: ETrangThai.TAM_DUNG,
			moTa: 'Học cách tạo ra giao diện người dùng.',
		},
	];
	const [dsGiangVien] = useState([
		{ value: 'GV_TuanAnh', label: 'Tuấn Anh' },
		{ value: 'GV_PhuongLinh', label: 'Phương Linh' },
		{ value: 'GV_MinhDuc', label: 'Minh Đức' },
	]);
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
			return;
		}
		const newData = [...dsKhoaHoc, { ...values, id: `KH${dsKhoaHoc.length + 1}` }];
		saveAndSync(newData);
		message.success('Thêm khóa học mới thành công!');
	};

	const updateKhoaHoc = (id: string, values: Partial<QuanLyKhoaHoc.IKhoaHoc>) => {
		const newData = dsKhoaHoc.map((item) => {
			if (item.id === id) {
				return { ...item, ...values };
			}
			return item;
		});
		saveAndSync(newData);
		message.success('Đã cập nhật thông tin khóa học!');
	};

	const deleteKhoaHoc = (id: string) => {
		const deleted = dsKhoaHoc.find((item) => item.id === id);
		if (deleted && deleted.soLuongHocVien > 0) {
			message.error('Không thể xóa khóa học đang có học viên!');
			return;
		}
		const newData = dsKhoaHoc.filter((item) => item.id !== id);
		saveAndSync(newData);
		message.success('Đã xóa khóa học thành công!');
	};

	return {
		dsKhoaHoc,
		addKhoaHoc,
		updateKhoaHoc,
		deleteKhoaHoc,
		dsGiangVien,
	};
};

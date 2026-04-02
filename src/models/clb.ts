import { ETrangThaiCLB } from '@/services/CLB/constants';
import type { CLB } from '@/services/CLB/typing';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
	const [dsCLB, setDsCLB] = useState<CLB.IRecord[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const initCLB = [
		{
			id: 'CLB001',
			ten: 'Câu lạc bộ Guitar PTIT',
			anhDaiDien: 'https://i.pinimg.com/1200x/7f/1f/80/7f1f80243786eb123824fd80d2cf4702.jpg',
			ngayThanhLap: '2020-05-19',
			moTa: 'Nơi hội tụ những sinh viên đam mê âm nhạc và tiếng đàn Guitar. Tổ chức sinh hoạt định kỳ tối thứ 4 hàng tuần tại sảnh A2.',
			chuNhiem: 'Nguyễn Văn A',
			dangHoatDong: ETrangThaiCLB.ACTIVE,
		},
		{
			id: 'CLB002',
			ten: 'Câu lạc bộ Kỹ năng mềm',
			anhDaiDien: 'https://i.pinimg.com/736x/4f/2d/eb/4f2debd0c8d330ede1d7f9eed4dae93a.jpg',
			ngayThanhLap: '2021-10-10',
			moTa: 'Phát triển kỹ năng giao tiếp, thuyết trình và làm việc nhóm cho sinh viên trong môi trường năng động.',
			chuNhiem: 'Trần Thị B',
			dangHoatDong: ETrangThaiCLB.ACTIVE,
		},
		{
			id: 'CLB003',
			ten: 'Câu lạc bộ Tin học (IT Club)',
			anhDaiDien: 'https://i.pinimg.com/1200x/f8/fe/5c/f8fe5cf7f876adeab6c4ce67b436a39b.jpg',
			ngayThanhLap: '2018-01-01',
			moTa: 'Chia sẻ kiến thức lập trình, thuật toán và hỗ trợ sinh viên trong các kỳ thi Olympic Tin học.',
			chuNhiem: 'Lê Văn C',
			dangHoatDong: ETrangThaiCLB.INACTIVE,
		},
	];
	/**
	 * Lấy danh sách Câu lạc bộ từ LocalStorage, nếu không có thì lấy mảng initCLB
	 */
	const getDanhSachCLB = () => {
		setLoading(true);
		try {
			const saved = localStorage.getItem('dsCLB');
			if (saved) {
				setDsCLB(JSON.parse(saved));
			} else {
				setDsCLB(initCLB);
				localStorage.setItem('dsCLB', JSON.stringify(initCLB));
			}
		} catch (error) {
			message.error('Lỗi khi lấy dữ liệu Câu lạc bộ');
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getDanhSachCLB();
	}, []);

	/**
	 * Cập nhật trạng thái state và đồng bộ dữ liệu vào LocalStorage
	 * @param {CLB.IRecord[]} data - Mảng danh sách clb mới cần lưu
	 */
	const saveAndSync = (data: CLB.IRecord[]) => {
		setDsCLB(data);
		localStorage.setItem('dsCLB', JSON.stringify(data));
	};

	/**
	 * Thêm mới hoặc Cập nhật thông tin một Câu lạc bộ
	 * @param {CLB.IRecord} values - thông tin clb lấy từ Form
	 * @param {string} id - id của clb, nếu có là edit, ko có là add
	 */
	const addOrEdit = (values: CLB.IRecord, id?: string) => {
		if (id) {
			const edited = dsCLB.map((i) => (i.id === id ? { ...i, ...values } : i));
			saveAndSync(edited);
			message.success('Cập nhật thông tin Câu lạc bộ thành công');
		} else {
			const newCLB: CLB.IRecord = {
				...values,
				id: `clb${Date.now()}`,
			};
			const danhSachMoi = [newCLB, ...dsCLB];
			saveAndSync(danhSachMoi);
			message.success('Thêm mới Câu lạc bộ thành công');
		}
	};
	/**
	 * Xóa một Câu lạc bộ khỏi danh sách dựa trên ID
	 * @param {string} id - truyền id của clb cần xóa
	 */
	const deleteCLB = (id: string) => {
		const danhSachMoi = dsCLB.filter((clb) => clb.id !== id);
		saveAndSync(danhSachMoi);
		message.success('Đã xóa Câu lạc bộ');
	};
	return { addOrEdit, deleteCLB, getDanhSachCLB, loading, dsCLB };
};

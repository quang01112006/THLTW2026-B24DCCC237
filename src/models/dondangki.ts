import { EGioiTinh, ETrangThaiDonDangKi } from '@/services/CLB/constants';
import type { CLB } from '@/services/CLB/typing';
import { message } from 'antd';
import moment from 'moment';
import { useState } from 'react';

export default () => {
	// --- MOCK DATA ---
	const initDonDangKi: CLB.IDonDangKi[] = [
		{
			id: 'DON_001',
			hoTen: 'Nguyễn Văn Mạnh',
			email: 'manh.nv@student.ptit.edu.vn',
			soDienThoai: '0912345678',
			gioiTinh: EGioiTinh.NAM,
			diaChi: 'Tokyo',
			soTruong: 'Chơi Guitar acoustic, biết nhạc lý cơ bản, hát rock',
			idCLB: 'CLB001',
			lyDoDangKi:
				'Em muốn tìm một môi trường năng động để rèn luyện kỹ năng biểu diễn và giao lưu với các bạn cùng đam mê.',
			trangThai: ETrangThaiDonDangKi.PENDING,
		},
		{
			id: 'DON_002',
			hoTen: 'Trần Thu Hà',
			email: 'ha.tt@student.ptit.edu.vn',
			soDienThoai: '0988888777',
			gioiTinh: EGioiTinh.NU,
			diaChi: ' Hà Đông',
			soTruong: 'Thuyết trình, lập kế hoạch sự kiện, làm nội dung TikTok',
			idCLB: 'CLB002',
			lyDoDangKi: 'Em muốn vượt qua nỗi sợ đứng trước đám đông và học cách quản lý thời gian hiệu quả hơn.',
			trangThai: ETrangThaiDonDangKi.APPROVED,
		},
		{
			id: 'DON_003',
			hoTen: 'Lê Minh Đức',
			email: 'duc.lm@student.ptit.edu.vn',
			soDienThoai: '0355666777',
			gioiTinh: EGioiTinh.NAM,
			diaChi: 'Hà Nội',
			soTruong: 'Lập trình C++, giải thuật, từng thi học sinh giỏi Tin học',
			idCLB: 'CLB003',
			lyDoDangKi:
				'Mục tiêu của em là tìm kiếm đồng đội để cùng luyện tập cho kỳ thi Olympic Tin học sinh viên sắp tới.',
			trangThai: ETrangThaiDonDangKi.REJECTED,
			ghiChu: 'Kỹ năng chuyên môn chưa phù hợp với định hướng hiện tại của CLB.', // Thêm vào mock cho nó hiện icon luôn
		},
	];

	const initLichSuThaoTac: CLB.ILichSuThaoTac[] = [
		{
			id: 'LOG_1',
			idDon: 'DON_002',
			thoiGian: '10:30 09/04/2026',
			noiDung: 'Đã chấp nhận vào lúc 10:30 09/04/2026',
			hanhDong: ETrangThaiDonDangKi.APPROVED,
		},
		{
			id: 'LOG_2',
			idDon: 'DON_003',
			thoiGian: '11:15 09/04/2026',
			noiDung:
				'Đã từ chối vào lúc 11:15 09/04/2026 với lý do: Kỹ năng chuyên môn chưa phù hợp với định hướng hiện tại của CLB.',
			hanhDong: ETrangThaiDonDangKi.REJECTED,
		},
	];

	// --- STATE ---
	const [dsDon, setDsDon] = useState<CLB.IDonDangKi[]>(() => {
		const saved = localStorage.getItem('dsDon');
		return saved ? JSON.parse(saved) : initDonDangKi;
	});

	const [lsThaoTac, setLsThaoTac] = useState<CLB.ILichSuThaoTac[]>(() => {
		const saved = localStorage.getItem('lsThaoTac');
		return saved ? JSON.parse(saved) : initLichSuThaoTac;
	});

	// --- SYNC ---
	const saveAndSync = (data: CLB.IDonDangKi[]) => {
		setDsDon(data);
		localStorage.setItem('dsDon', JSON.stringify(data));
	};

	const saveLog = (newLogs: CLB.ILichSuThaoTac[]) => {
		const updatedLogs = [...newLogs, ...lsThaoTac];
		setLsThaoTac(updatedLogs);
		localStorage.setItem('lsThaoTac', JSON.stringify(updatedLogs));
	};

	// --- METHODS ---
	const addDon = (values: CLB.IDonDangKi) => {
		const newDon = {
			...values,
			id: `DON_${Date.now()}`,
			trangThai: ETrangThaiDonDangKi.PENDING,
		};
		saveAndSync([newDon, ...dsDon]);
		message.success('Gửi đơn đăng ký thành công!');
	};

	const editDon = (id: string, values: Partial<CLB.IDonDangKi>) => {
		const newData = dsDon.map((item) => (item.id === id ? { ...item, ...values } : item));
		saveAndSync(newData);
		message.success('Cập nhật thông tin đơn thành công');
	};

	const pheDuyetDon = (ids: string[], status: ETrangThaiDonDangKi, ghiChu?: string) => {
		const thoiGian = moment().format('HH:mm DD/MM/YYYY');

		// CHỖ NÀY QUAN TRỌNG: Phải update trường ghiChu vào Item
		const newData = dsDon.map((item) => {
			if (ids.includes(item.id)) {
				return {
					...item,
					trangThai: status,
					ghiChu: ghiChu || item.ghiChu,
				};
			}
			return item;
		});
		saveAndSync(newData);

		const newLogs: CLB.ILichSuThaoTac[] = ids.map((id) => ({
			id: `LOG_${Date.now()}_${id}`,
			idDon: id,
			thoiGian,
			noiDung: `Admin đã ${status} vào lúc ${thoiGian}${ghiChu ? `. Lý do: ${ghiChu}` : ''}`,
			hanhDong: status as any,
		}));
		saveLog(newLogs);

		message.success(`Đã cập nhật trạng thái cho ${ids.length} đơn`);
	};

	return {
		dsDon,
		lsThaoTac,
		addDon,
		editDon,
		pheDuyetDon,
	};
};

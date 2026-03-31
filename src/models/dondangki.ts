import { message } from 'antd';
import moment from 'moment';
import { useState } from 'react';

export default () => {
	const [dsDon, setDsDon] = useState<QuanLyCLB.DonDangKy[]>(() => {
		const saved = localStorage.getItem('dsDon');
		return saved
			? JSON.parse(saved)
			: [
					{
						id: 'don_1',
						hoTen: 'Chu Văn D',
						email: 'd@gmail.com',
						soDienThoai: '0987654321',
						gioiTinh: 'Nam',
						diaChi: 'Hà Nội',
						soTruong: 'Đánh đàn nhanh',
						idCLB: 'clb_1',
						lyDo: 'Em thích âm nhạc từ nhỏ.',
						trangThai: 'Pending',
					},
			  ];
	});

	const [dsLichSu, setDsLichSu] = useState<QuanLyCLB.LichSuThaoTac[]>(() => {
		const saved = localStorage.getItem('dsLichSu');
		return saved ? JSON.parse(saved) : [];
	});

	const saveToLocal = (moi: QuanLyCLB.DonDangKy[], lsMoi: QuanLyCLB.LichSuThaoTac[]) => {
		setDsDon(moi);
		setDsLichSu(lsMoi);
		localStorage.setItem('dsDon', JSON.stringify(moi));
		localStorage.setItem('dsLichSu', JSON.stringify(lsMoi));
	};

	const xuLyDon = (ids: string[], status: 'Approved' | 'Rejected', lyDo?: string) => {
		const thoiGian = moment().format('HH:mm DD/MM/YYYY');
		const dsMoi = dsDon.map((don) => {
			if (ids.includes(don.id)) {
				return {
					...don,
					trangThai: status,
					ghiChuAdmin: status === 'Rejected' ? lyDo : don.ghiChuAdmin,
				};
			}
			return don;
		});

		const logsMoi: QuanLyCLB.LichSuThaoTac[] = ids.map((id) => ({
			id: `log_${Date.now()}_${id}`,
			idDon: id,
			nguoiThucHien: 'Admin',
			hanhDong: status,
			thoiGian: thoiGian,
			noiDung: status === 'Approved' ? 'Đã duyệt tham gia CLB' : `Từ chối. Lý do: ${lyDo}`,
		}));

		saveToLocal(dsMoi, [...logsMoi, ...dsLichSu]);
		message.success(`Đã xử lý ${ids.length} đơn!`);
	};

	const chuyenCLB = (ids: string[], newIdCLB: string) => {
		const dsMoi = dsDon.map((don) => {
			if (ids.includes(don.id)) {
				return { ...don, idCLB: newIdCLB };
			}
			return don;
		});

		saveToLocal(dsMoi, dsLichSu);
		message.success(`Đã chuyển ${ids.length} thành viên sang CLB mới!`);
	};

	const xoaDon = (id: string) => {
		const dsMoi = dsDon.filter((don) => don.id !== id);

		const lsMoi = dsLichSu.filter((ls) => ls.idDon !== id);

		saveToLocal(dsMoi, lsMoi);
		message.error('Đã xóa đơn đăng ký!');
	};

	return {
		dsDon,
		setDsDon,
		dsLichSu,
		xuLyDon,
		chuyenCLB,
		xoaDon,
	};
};

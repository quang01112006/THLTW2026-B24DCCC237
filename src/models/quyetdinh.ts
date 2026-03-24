import { useState } from 'react';
import { message } from 'antd';

export default () => {
	const [dsQuyetDinh, setDsQuyetDinh] = useState<TotNghiep.QuyetDinh[]>(() => {
		const saved = localStorage.getItem('dsQuyetDinh');
		return saved ? JSON.parse(saved) : [];
	});

	const saveAndRefresh = (moi: TotNghiep.QuyetDinh[]) => {
		setDsQuyetDinh(moi);
		localStorage.setItem('dsQuyetDinh', JSON.stringify(moi));
	};

	const themQD = (values: any) => {
		const moi = [
			...dsQuyetDinh,
			{
				...values,
				id: `qd_${Date.now()}`,
				tongLuotTraCuu: 0,
			},
		];
		saveAndRefresh(moi);
		message.success('Thêm quyết định tốt nghiệp thành công!');
	};

	const suaQD = (id: string, values: any) => {
		const moi = dsQuyetDinh.map((q) => (q.id === id ? { ...q, ...values } : q));
		saveAndRefresh(moi);
		message.success('Cập nhật quyết định thành công!');
	};

	const xoaQD = (id: string) => {
		const moi = dsQuyetDinh.filter((q) => q.id !== id);
		saveAndRefresh(moi);
		message.error('Đã xóa quyết định!');
	};

	const tangLuotTraCuu = (idQD: string) => {
		const moi = dsQuyetDinh.map((q) => (q.id === idQD ? { ...q, tongLuotTraCuu: q.tongLuotTraCuu + 1 } : q));
		saveAndRefresh(moi);
	};

	return { dsQuyetDinh, themQD, suaQD, xoaQD, tangLuotTraCuu };
};

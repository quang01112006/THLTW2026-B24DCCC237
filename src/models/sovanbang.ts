import { useState } from 'react';
import { message } from 'antd';
export default () => {
	const [dsSo, setDsSo] = useState<TotNghiep.SoVanBang[]>(() => {
		const saved = localStorage.getItem('dsSoVanBang');
		return saved ? JSON.parse(saved) : [{ id: '1', tenSo: 'Sổ 2026', namHoc: 2026, soVaoSoHienTai: 0 }];
	});

	const saveAndRefresh = (moi: TotNghiep.SoVanBang[]) => {
		setDsSo(moi);
		localStorage.setItem('dsSoVanBang', JSON.stringify(moi));
	};

	const themSo = (values: any) => {
		const newSo = { ...values, id: Date.now().toString(), soVaoSoHienTai: 0 };
		saveAndRefresh([...dsSo, newSo]);
		message.success('Đã mở sổ văn bằng mới thành công!');
	};

	const suaSo = (id: string, values: any) => {
		const moi = dsSo.map((s) => (s.id === id ? { ...s, ...values } : s));
		saveAndRefresh(moi);
		message.success('Cập nhật thông tin sổ thành công!');
	};

	const xoaSo = (id: string) => {
		const moi = dsSo.filter((s) => s.id !== id);
		saveAndRefresh(moi);
		message.error('Đã xóa sổ văn bằng!');
	};

	const tangSoVaoSo = (idSo: string) => {
		const moi = dsSo.map((s) => (s.id === idSo ? { ...s, soVaoSoHienTai: s.soVaoSoHienTai + 1 } : s));
		saveAndRefresh(moi);
	};

	return { dsSo, themSo, suaSo, xoaSo, tangSoVaoSo };
};

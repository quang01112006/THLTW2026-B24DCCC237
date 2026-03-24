import { useState } from 'react';
import { useModel } from 'umi';
import { message } from 'antd';

export default () => {
	const { tangSoVaoSo } = useModel('sovanbang');
	const [dsVanBang, setDsVanBang] = useState<any[]>(() => {
		const saved = localStorage.getItem('dsVanBang');
		return saved ? JSON.parse(saved) : [];
	});

	const saveAndRefresh = (moi: any[]) => {
		setDsVanBang(moi);
		localStorage.setItem('dsVanBang', JSON.stringify(moi));
	};

	const themVanBang = (values: any, idSo: string) => {
		const newVB = {
			...values,
			id: `vb_${Date.now()}`,
		};

		const moi = [...dsVanBang, newVB];
		saveAndRefresh(moi);
		tangSoVaoSo(idSo);
		message.success('Đã cấp bằng thành công!');
	};

	const suaVanBang = (id: string, values: any) => {
		const moi = dsVanBang.map((vb) => (vb.id === id ? { ...vb, ...values } : vb));
		saveAndRefresh(moi);
		message.success('Cập nhật thông tin bằng thành công!');
	};

	const xoaVanBang = (id: string) => {
		const moi = dsVanBang.filter((vb) => vb.id !== id);
		saveAndRefresh(moi);
		message.error('Đã xóa thông tin văn bằng!');
	};

	return { dsVanBang, themVanBang, suaVanBang, xoaVanBang };
};

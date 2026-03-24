import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [dsCauHinh, setDsCauHinh] = useState<TotNghiep.CauHinhTruong[]>(() => {
		const saved = localStorage.getItem('dsCauHinh');
		return saved
			? JSON.parse(saved)
			: [
					{ id: 'ch1', tenTruong: 'Nơi sinh', kieuDuLieu: 'String' },
					{ id: 'ch2', tenTruong: 'Điểm trung bình', kieuDuLieu: 'Number' },
			  ];
	});

	const luuCauHinh = (moi: TotNghiep.CauHinhTruong[]) => {
		const dataChuan = moi.map((item) => ({
			...item,

			id: item.id || `ch_${Date.now()}`,
		}));

		setDsCauHinh(dataChuan);
		localStorage.setItem('dsCauHinh', JSON.stringify(dataChuan));
		message.success('Đã lưu cấu hình biểu mẫu!');
	};

	return { dsCauHinh, luuCauHinh };
};

import { message } from 'antd';
import { useState, useEffect } from 'react';

export default () => {
	const [dsDeThi, setDsDeThi] = useState<any[]>(() => {
		const saved = localStorage.getItem('dsDeThi_Final');
		return saved ? JSON.parse(saved) : [];
	});

	const [dsCauTruc, setDsCauTruc] = useState<any[]>(() => {
		const saved = localStorage.getItem('dsCauTruc_Template');
		return saved
			? JSON.parse(saved)
			: [
					{
						id: 'ct_default',
						tenCauTruc: 'Cấu trúc mặc định (5D-3TB-2K)',
						soDe: 5,
						soTrungBinh: 3,
						soKho: 2,
						soRatKho: 0,
					},
			  ];
	});

	useEffect(() => {
		localStorage.setItem('dsDeThi_Final', JSON.stringify(dsDeThi));
		localStorage.setItem('dsCauTruc_Template', JSON.stringify(dsCauTruc));
	}, [dsDeThi, dsCauTruc]);

	const saveDeThi = (newDe: any) => {
		setDsDeThi((prev) => [{ ...newDe, id: Date.now() }, ...prev]);
		message.success('Đã tạo và lưu đề thi thành công');
	};

	const saveCauTruc = (newTemplate: any) => {
		setDsCauTruc((prev) => [{ ...newTemplate, id: Date.now() }, ...prev]);
		message.success('Đã lưu cấu trúc đề thi');
	};

	return { dsDeThi, dsCauTruc, saveDeThi, saveCauTruc };
};

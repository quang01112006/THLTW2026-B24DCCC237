import { message } from 'antd';
import { useState, useEffect } from 'react';

export default () => {
	const [dsCauHoi, setDsCauHoi] = useState<any[]>(() => {
		const saved = localStorage.getItem('dsCauHoi_Bai2');
		return saved
			? JSON.parse(saved)
			: [
					{
						id: 1,
						maCauHoi: 'WEB01',
						idMonHoc: 1,
						idKhoiKienThuc: 1,
						doKho: 'DE',
						noiDung: 'React Component là gì? Nêu sự khác biệt giữa Functional và Class Component.',
					},
					{
						id: 2,
						maCauHoi: 'WEB02',
						idMonHoc: 1,
						idKhoiKienThuc: 1,
						doKho: 'DE',
						noiDung: 'Trình bày vòng đời (Lifecycle) của một Component trong React.',
					},
					{
						id: 3,
						maCauHoi: 'WEB03',
						idMonHoc: 1,
						idKhoiKienThuc: 2,
						doKho: 'TRUNG_BINH',
						noiDung: 'Giải thích cơ chế Virtual DOM và cách nó tối ưu hóa hiệu năng render.',
					},
					{
						id: 4,
						maCauHoi: 'WEB04',
						idMonHoc: 1,
						idKhoiKienThuc: 2,
						doKho: 'KHO',
						noiDung: 'Phân biệt UseState và UseReducer. Khi nào nên dùng UseReducer?',
					},
					{
						id: 5,
						maCauHoi: 'WEB05',
						idMonHoc: 1,
						idKhoiKienThuc: 2,
						doKho: 'RAT_KHO',
						noiDung: 'Thiết kế một hệ thống phân quyền (RBAC) sử dụng React Context và Middleware.',
					},

					{
						id: 6,
						maCauHoi: 'SEC01',
						idMonHoc: 2,
						idKhoiKienThuc: 3,
						doKho: 'DE',
						noiDung: 'Định nghĩa về mã hóa đối xứng và mã hóa bất đối xứng.',
					},
					{
						id: 7,
						maCauHoi: 'SEC02',
						idMonHoc: 2,
						idKhoiKienThuc: 3,
						doKho: 'TRUNG_BINH',
						noiDung: 'Tấn công SQL Injection là gì? Nêu 3 biện pháp phòng chống phổ biến.',
					},
					{
						id: 8,
						maCauHoi: 'SEC03',
						idMonHoc: 2,
						idKhoiKienThuc: 4,
						doKho: 'TRUNG_BINH',
						noiDung: 'Giải thích nguyên lý hoạt động của giao thức HTTPS và chứng chỉ SSL/TLS.',
					},
					{
						id: 9,
						maCauHoi: 'SEC04',
						idMonHoc: 2,
						idKhoiKienThuc: 4,
						doKho: 'KHO',
						noiDung: 'Trình bày cơ chế tấn công Cross-Site Scripting (XSS) và cách khắc phục trên Frontend.',
					},
					{
						id: 10,
						maCauHoi: 'SEC05',
						idMonHoc: 2,
						idKhoiKienThuc: 4,
						doKho: 'RAT_KHO',
						noiDung: 'Phân tích lỗ hổng Zero-day và quy trình ứng cứu sự cố khi hệ thống bị xâm nhập.',
					},
			  ];
	});

	useEffect(() => {
		localStorage.setItem('dsCauHoi_Bai2', JSON.stringify(dsCauHoi));
	}, [dsCauHoi]);

	const addCauHoi = (newItem: any) => {
		const newId = dsCauHoi.length > 0 ? Math.max(...dsCauHoi.map((i) => i.id)) + 1 : 1;
		setDsCauHoi([...dsCauHoi, { ...newItem, id: newId }]);
		message.success('Thêm câu hỏi thành công');
	};

	const delCauHoi = (id: number) => {
		setDsCauHoi((prev) => prev.filter((item) => item.id !== id));
		message.success('Đã xóa câu hỏi');
	};

	return { dsCauHoi, addCauHoi, delCauHoi };
};

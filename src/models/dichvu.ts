import { useState, useEffect } from 'react';
import { message } from 'antd';

export default () => {
	const [dsDichVu, setDsDichVu] = useState<QuanLyDichVu.DichVu[]>(() => {
		const saved = localStorage.getItem('dsDichVu_Master');
		return saved
			? JSON.parse(saved)
			: [
					{ id: 1, tenDichVu: 'Cắt tóc nam', gia: 100000, thoiGianThucHien: 30 },
					{ id: 2, tenDichVu: 'Combo Gội đầu ', gia: 250000, thoiGianThucHien: 60 },
					{ id: 3, tenDichVu: 'Nhuộm tóc ', gia: 500000, thoiGianThucHien: 120 },
			  ];
	});

	useEffect(() => {
		localStorage.setItem('dsDichVu_Master', JSON.stringify(dsDichVu));
	}, [dsDichVu]);

	const saveDichVu = (record: QuanLyDichVu.DichVu) => {
		setDsDichVu((prev) => {
			if (record.id) {
				return prev.map((item) => (item.id === record.id ? record : item));
			}

			message.success('Thêm dịch vụ mới thành công');
			return [{ ...record, id: Date.now() }, ...prev];
		});
	};

	const deleteDichVu = (id: number) => {
		setDsDichVu((prev) => prev.filter((item) => item.id !== id));
		message.success('Đã xóa dịch vụ');
	};

	return {
		dsDichVu,
		saveDichVu,
		deleteDichVu,
	};
};

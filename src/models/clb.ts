import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [dsCLB, setDsCLB] = useState<QuanLyCLB.CLB[]>(() => {
		const saved = localStorage.getItem('dsCLB');
		return saved
			? JSON.parse(saved)
			: [
					{
						id: 'clb_1',
						tenCLB: 'CLB Guitar PTIT',
						anhDaiDien: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guitar',
						ngayThanhLap: '2020-05-19',
						moTa: ' nơi hội tụ những tâm hồn yêu âm nhạc và tiếng đàn guitar.',
						chuNhiem: 'Nguyễn Văn A',
						dangHoatDong: true,
					},
					{
						id: 'clb_2',
						tenCLB: 'CLB Kỹ năng mềm',
						anhDaiDien: 'https://api.dicebear.com/7.x/avataaars/svg?seed=softskills',
						ngayThanhLap: '2021-10-10',
						moTa: 'Phát triển kỹ năng giao tiếp và thuyết trình cho sinh viên.',
						chuNhiem: 'Trần Thị B',
						dangHoatDong: true,
					},
					{
						id: 'clb_3',
						tenCLB: 'CLB Bóng rổ',
						anhDaiDien: 'https://api.dicebear.com/7.x/avataaars/svg?seed=basketball',
						ngayThanhLap: '2019-01-01',
						moTa: 'Sân chơi thể thao năng động, rèn luyện sức khỏe.',
						chuNhiem: 'Lê Văn C',
						dangHoatDong: false,
					},
			  ];
	});

	const saveAndRefresh = (data: QuanLyCLB.CLB[]) => {
		setDsCLB(data);
		localStorage.setItem('dsCLB', JSON.stringify(data));
	};
	const themCLB = (values: any) => {
		const newCLB = { ...values, id: `clb_${Date.now()}` };
		saveAndRefresh([...dsCLB, newCLB]);
		message.success('Thêm CLB thành công');
	};
	const xoaCLB = (id: string) => {
		const newCLB = dsCLB.filter((i) => i.id !== id);
		saveAndRefresh(newCLB);
		message.error('Đã xóa CLB');
	};
	const suaCLB = (id: string, values: any) => {
		const moi = dsCLB.map((item) => (item.id === id ? { ...item, ...values } : item));
		saveAndRefresh(moi);
		message.success('Cập nhật CLB thành công');
	};

	return { themCLB, dsCLB, xoaCLB, suaCLB };
};

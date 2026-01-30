import { TrangThaiDonHang } from '@/services/DonHang/constants';
import { DonHang } from '@/services/DonHang/typing';
import { message } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

export default () => {
	const { xuLyTonKho } = useModel('sanpham');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [text, setText] = useState('');
	const [donHang, setDonHang] = useState<DonHang.Record[]>(() => {
		const saved = localStorage.getItem('listDonHang');
		const initData = [
			{
				id: 'DH001',
				customerName: 'Nguyễn Văn A',
				phone: '0912345678',
				address: '123 Nguyễn Huệ, Q1, TP.HCM',
				products: [{ productId: 1, productName: 'Laptop Dell XPS 13', quantity: 1, price: 25000000 }],
				totalAmount: 25000000,
				status: TrangThaiDonHang.PENDING,
				createdAt: '2024-01-15',
			},
		];
		return saved ? JSON.parse(saved) : initData;
	});
	const handleAdd = (record: DonHang.Record) => {
		const newList = [record, ...donHang];
		setDonHang(newList);
		localStorage.setItem('listDonHang', JSON.stringify(newList));
		message.success('Tạo đơn hàng thành công!');
	};
	const handleDelete = (id: string) => {
		const newList = donHang.filter((i) => id !== i.id);
		setDonHang(newList);
		localStorage.setItem('listDonHang', JSON.stringify(newList));
		message.success('Xóa thành công');
	};
	const xuLyStatus = (orderId: string, newStatus: TrangThaiDonHang) => {
		setDonHang((prev) => {
			const order = prev.find((i) => i.id === orderId);
			if (!order) return prev;
			const oldStatus = order.status;
			if (newStatus === TrangThaiDonHang.SUCCESS && oldStatus !== TrangThaiDonHang.CANCELLED) {
				xuLyTonKho(order.products, 'GIAM');
			} else if (newStatus === TrangThaiDonHang.CANCELLED && oldStatus && TrangThaiDonHang.CANCELLED) {
				xuLyTonKho(order.products, 'TANG');
			}
			const newList = prev.map((i) => (i.id === orderId ? { ...i, status: newStatus } : i));
			localStorage.setItem('listDonHang', JSON.stringify(newList));
			return newList;
		});
	};
	const handleSearch = donHang.filter((i) => {
		const found = text.toLowerCase();
		return i.id.toLowerCase().includes(found) || i.customerName.toLowerCase().includes(found);
	});
	return { donHang, handleAdd, isModalOpen, setIsModalOpen, handleDelete, xuLyStatus, setText, handleSearch,text };
};

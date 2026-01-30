import { DonHang } from '@/services/DonHang/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [searchText, setSearchText] = useState('');
	const [listSanPham, setListSanPham] = useState<SanPham.Record[]>(() => {
		const saved = localStorage.getItem('listSanPham');
		return saved
			? JSON.parse(saved)
			: [
					{ id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
					{ id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
					{ id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
					{ id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
					{ id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
					{ id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
					{ id: 7, name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', price: 15000000, quantity: 7 },
					{ id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25 },
			  ];
	});
	const handleDelete = (id: number) => {
		setListSanPham((prev) => {
			const newList = prev.filter((item) => item.id !== id);
			return newList;
		});
		message.success('Đã xóa thành công');
	};
	const handleAdd = (newItem: SanPham.Record) => {
		setListSanPham((prev) => {
			const maxId = prev.length > 0 ? Math.max(...prev.map((i) => i.id)) : 0;
			const newId = maxId + 1;
			return [...prev, { ...newItem, id: newId }];
		});
		message.success('Thêm sản phẩm thành công');
	};
	const searchList = listSanPham.filter((i) => i.name.toLowerCase().includes(searchText.toLowerCase()));
	const handleEdit = (val: SanPham.Record) => {
		setListSanPham((prev) => prev.map((i) => (i.id === val.id ? { ...i, ...val } : i)));
	};

	const xuLyTonKho = (dsSanPham: DonHang.Product[], action: 'TANG' | 'GIAM') => {
		setListSanPham((prevKho) => {
			const khoMoi = prevKho.map((spTrongKho) => {
				const itemDoi = dsSanPham.find((i) => i.productId === spTrongKho.id);

				if (itemDoi) {
					const change = action === 'TANG' ? itemDoi.quantity : -itemDoi.quantity;
					return { ...spTrongKho, quantity: spTrongKho.quantity + change };
				}
				return spTrongKho;
			});
			localStorage.setItem('listSanPham', JSON.stringify(khoMoi));
			return khoMoi;
		});
	};
	return {
		listSanPham,
		setListSanPham,
		handleDelete,
		handleAdd,
		searchList,
		searchText,
		setSearchText,
		handleEdit,
		xuLyTonKho,
	};
};

import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [searchText, setSearchText] = useState('');
	const [listSanPham, setListSanPham] = useState([
		{ id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
		{ id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
		{ id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
		{ id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
		{ id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
	]);
	const handleDelete = (id: number) => {
		setListSanPham((prev) => {
			const newList = prev.filter((item) => item.id !== id);
			return newList;
		});
		message.success('Đã xóa thành công');
	};
	const handleAdd = (newItem) => {
		setListSanPham((prev) => {
			const maxId = prev.length > 0 ? Math.max(...prev.map((i) => i.id)) : 0;
			const newId = maxId + 1;
			return [...prev, { ...newItem, id: newId }];
		});
		message.success('Thêm sản phẩm thành công');
	};
	const searchList = listSanPham.filter((i) => i.name.toLowerCase().includes(searchText.toLowerCase()));

	return { listSanPham, setListSanPham, handleDelete, handleAdd, searchList, searchText, setSearchText };
};

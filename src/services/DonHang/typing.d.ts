import { TrangThaiDonHang } from './constants';

module DonHang {
	export interface Product {
		productId: SanPham.Record['id'];
		productName: SanPham.Record['name'];
		quantity: number;
		price: SanPham.Record['price'];
	}
	export interface Record {
		id: string;
		customerName: string;
		phone: string;
		address: string;
		products: Product[];
		totalAmount: number;
		status: TrangThaiDonHang;
		createdAt: string;
	}
}

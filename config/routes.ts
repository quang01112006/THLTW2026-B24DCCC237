export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './Dashboard',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	// {
	// 	path: '/random-user',
	// 	name: 'RandomUser',
	// 	component: './RandomUser',
	// 	icon: 'ArrowsAltOutlined',
	// },
	// {
	// 	path: '/todo-list',
	// 	name: 'TodoList',
	// 	icon: 'OrderedListOutlined',
	// 	component: './TodoList',
	// },
	// {
	// 	path: '/bang-san-pham',
	// 	name: 'Bảng sản phẩm',
	// 	component: './BangSanPham',
	// },
	// {
	// 	path: '/don-hang',
	// 	name: 'Đơn hàng',
	// 	component: './BangDonHang',
	// },
	// {
	// 	path: '/learn-form-list',
	// 	name: 'Form list',
	// 	component: './Test',
	// },
	// {
	// 	path:'/books',
	// 	name:'Manage books',
	// 	component:'./Books'
	// },
	{
		path: '/bai-1',
		name: 'Bài 1 - TH1',
		component: './Bai1',
	},
	{
		path: '/bai-2',
		name: 'Bài 2 - TH1',
		routes: [
			{ name: 'Quản lý môn học', path: 'bai-2/mon-hoc', component: './QuanLyMonHoc', exact: true },
			{ name: 'Tiến độ học tập', path: 'bai-2/tien-do-hoc-tap', component: './TienDoHocTap', exact: true },
			// { name: 'Mục tiêu học tập', path: 'bai-2/muc-tieu-hoc-tap', component: './MucTieuHocTap', exact: true },
		],
	},
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];

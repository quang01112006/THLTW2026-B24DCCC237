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
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/totnghiep',
		name: 'Quản lý văn bằng',
		icon: 'file',
		routes: [
			{
				path: '/totnghiep/so-van-bang',
				name: 'Sổ văn bằng',
				component: './SoVanBang',
			},
			{
				path: '/totnghiep/quyet-dinh',
				name: 'Quyết định tốt nghiệp',
				component: './QuyetDinh',
			},
			{
				path: '/totnghiep/cau-hinh-bieu-mau',
				name: 'Cấu hình biểu mẫu',
				component: './CauHinhBieuMau',
			},
			{
				path: '/totnghiep/danh-sach-van-bang',
				name: 'Thông tin văn bằng',
				component: './VanBang',
			},
		],
	},
	{
		path: '/tra-cuu',
		name: 'Tra cứu văn bằng',
		icon: 'search',
		component: './TraCuu',
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

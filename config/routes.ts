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
	// {
	// 	path: '/dashboard',
	// 	name: 'Dashboard',
	// 	component: './TrangChu',
	// 	icon: 'HomeOutlined',
	// },
	{
		path: '/health',
		name: 'Theo dõi sức khỏe',
		icon: 'HeartOutlined',
		routes: [
			{
				path: '/health/home',
				name: 'Trang chủ',
				component: './Health/TrangChu',
			},
			{
				path: '/health/nhat-ki-tap-luyen',
				name: 'Nhật kí tập luyện',
				component: './Health/NhatKiTapLuyen',
			},
			{
				path: '/health/chi-so-suc-khoe',
				name: 'Nhật kí chỉ số sức khỏe',
				component: './Health/ChiSoSucKhoe',
			},
			{
				path: '/health/quan-ly-muc-tieu',
				name: 'Quản lý mục tiêu',
				component: './Health/QuanLyMucTieu',
			},
			{
				path: '/health/thu-vien-bai-tap',
				name: 'Thư viện bài tập',
				component: './Health/ThuVienBaiTap',
			},
		],
	},
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

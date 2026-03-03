import { Button, Table, Space, Popconfirm, Card, Progress, Row, Col, Statistic } from 'antd';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { IColumn } from '@/components/Table/typing';
import FormMonHoc from './components/FormMonHoc';
import { useState } from 'react';

const QuanLyMonHoc = () => {
	const { monHoc, delMonHoc } = useModel('monhoc');
	const [isVisibleForm, setIsVisibleForm] = useState(false);
	const [edit, setEdit] = useState(false);
	const [record, setRecord] = useState<MonHoc.Record | null>(null);
	const { listTienDo } = useModel('tiendohoctap');
	const formatMinutes = (totalMinutes: number) => {
		const h = Math.floor(totalMinutes / 60);
		const p = totalMinutes % 60;
		if (h === 0) return `${p}'`;
		return p > 0 ? `${h}h ${p}'` : `${h}h`;
	};
	const tongMucTieu = monHoc.reduce((sum, item) => sum + (item.mucTieuHangThang || 0), 0);
	const tongThucTe = listTienDo.reduce((sum, item: any) => sum + (item.thoiLuongHoc || 0), 0);
	const phanTramTong = tongMucTieu > 0 ? Math.round((tongThucTe / tongMucTieu) * 100) : 0;
	const columns: IColumn<MonHoc.Record>[] = [
		{
			title: 'STT',
			dataIndex: 'index',
			width: 60,
			align: 'center',
			render: (val, record, index) => index + 1,
		},
		{
			title: 'Tên môn học',
			dataIndex: 'ten',
			width: 100,
			align: 'center',
		},

		{
			title: 'Mục tiêu hàng tháng',
			dataIndex: 'mucTieuHangThang',
			align: 'center',
			width: 120,
			render: (val) => <div>{formatMinutes(val)} </div>,
		},
		{
			title: 'Tiến độ mục tiêu',
			width: 250,
			align: 'center',
			render: (val, record: any) => {
				const tongDaHoc = listTienDo
					.filter((item: any) => item.idMonHoc === record.id)
					.reduce((sum: number, item: any) => sum + (item.thoiLuongHoc || 0), 0);

				const phanTram = record.mucTieuHangThang > 0 ? Math.round((tongDaHoc / record.mucTieuHangThang) * 100) : 0;

				return (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							padding: '8px 0',
						}}
					>
						<Progress
							percent={phanTram}
							status={phanTram >= 100 ? 'success' : 'active'}
							strokeWidth={12}
							style={{ width: '90%', marginBottom: 4 }}
						/>
						<div
							style={{
								fontSize: '12px',
								color: 'grey',
							}}
						>
							{formatMinutes(tongDaHoc)} / {formatMinutes(record.mucTieuHangThang)}
						</div>
					</div>
				);
			},
		},
		{
			title: 'Thao tác',
			width: 150,
			align: 'center',
			render: (val, record) => (
				<Space>
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setEdit(true);
							setRecord(record);
							setIsVisibleForm(true);
						}}
					>
						Sửa
					</Button>

					<Popconfirm title='Xác nhận xóa môn học?' onConfirm={() => delMonHoc(record.id)}>
						<Button type='primary' icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card title='Quản lý môn học'>
			<Row gutter={16} style={{ marginBottom: 24 }}>
				<Col span={8}>
					<Card>
						<Statistic title='Tổng mục tiêu tháng' value={formatMinutes(tongMucTieu)} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic title='Tổng thời gian đã học' value={formatMinutes(tongThucTe)} />
					</Card>
				</Col>
				<Col span={8}>
					<Card title={null} bodyStyle={{ padding: '10px 24px' }}>
						<div style={{ fontSize: '14px', marginBottom: 4 }}>Tiến độ tháng</div>
						<Progress
							percent={phanTramTong}
							status={phanTramTong >= 100 ? 'success' : 'active'}
							strokeColor={phanTramTong >= 100 ? 'green' : 'blue'}
						/>
					</Card>
				</Col>
			</Row>
			<Button
				type='primary'
				icon={<PlusOutlined />}
				onClick={() => {
					setEdit(false);
					setRecord(null);
					setIsVisibleForm(true);
				}}
			>
				Thêm môn học
			</Button>
			<Table columns={columns} dataSource={monHoc} pagination={{ pageSize: 10 }} />
			<FormMonHoc
				record={record}
				isVisibleForm={isVisibleForm}
				edit={edit}
				setIsVisibleForm={setIsVisibleForm}
			></FormMonHoc>
		</Card>
	);
};

export default QuanLyMonHoc;

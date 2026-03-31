import { SwapOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Card, Form, Modal, Select, Table } from 'antd';
import { useMemo, useState } from 'react';
import { useModel } from 'umi';

const ThanhVienPage = () => {
	const { chuyenCLB, dsDon } = useModel('dondangki');
	const { dsCLB } = useModel('clb');
	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const dsThanhVien = useMemo(() => {
		return dsDon.filter((d) => d.trangThai === 'Approved');
	}, [dsDon]);

	const handleChuyenCLB = async () => {
		const { targetCLB } = await form.validateFields();
		chuyenCLB(selectedRowKeys, targetCLB);
		setIsModalVisible(false);
		setSelectedRowKeys([]);
		form.resetFields();
	};

	const columns = [
		{ title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen' },
		{ title: 'Email', dataIndex: 'email' },
		{ title: 'Số điện thoại', dataIndex: 'soDienThoai' },
		{
			title: 'CLB Hiện tại',
			dataIndex: 'idCLB',
			render: (id: string) => {
				const clb = dsCLB.find((c) => c.id === id);
				return clb ? clb.tenCLB : 'N/A';
			},
		
			filters: dsCLB.map((c) => ({ text: c.tenCLB, value: c.id })),
			onFilter: (value: any, record: any) => record.idCLB === value,
		},
		{ title: 'Sở trường', dataIndex: 'soTruong' },
	];

	return (
		<Card
			title={
				<span>
					<UsergroupAddOutlined /> Danh sách thành viên chính thức
				</span>
			}
			extra={
				<Button
					type='primary'
					icon={<SwapOutlined />}
					disabled={selectedRowKeys.length === 0}
					onClick={() => setIsModalVisible(true)}
				>
					Chuyển CLB ({selectedRowKeys.length})
				</Button>
			}
		>
			<Table
				dataSource={dsThanhVien}
				columns={columns}
				rowKey='id'
				rowSelection={{
					selectedRowKeys,
					onChange: (keys) => setSelectedRowKeys(keys as string[]),
				}}
			/>

	
			<Modal
				title='Chuyển Câu lạc bộ'
				visible={isModalVisible}
				onOk={handleChuyenCLB}
				onCancel={() => setIsModalVisible(false)}
				okText='Xác nhận chuyển'
			>
				<Form form={form} layout='vertical'>
					<p>
						Mày đang thực hiện chuyển <b>{selectedRowKeys.length}</b> thành viên sang CLB mới.
					</p>
					<Form.Item
						name='targetCLB'
						label='Chọn Câu lạc bộ đích'
						rules={[{ required: true, message: 'Chọn CLB muốn chuyển đến!' }]}
					>
						<Select placeholder='Chọn một CLB'>
							{dsCLB.map((clb) => (
								<Select.Option key={clb.id} value={clb.id}>
									{clb.tenCLB}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default ThanhVienPage;

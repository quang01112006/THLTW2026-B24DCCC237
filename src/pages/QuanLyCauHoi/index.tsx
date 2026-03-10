import { PlusOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Table, Select, Tag, Popconfirm, Card } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import rules from '@/utils/rules';

const QuanLyCauHoi = () => {
	const { dsCauHoi, addCauHoi, delCauHoi } = useModel('cauhoi');
	const { monHoc } = useModel('monhoc');
	const { khoiKienThuc } = useModel('khoikienthuc');
	const TextDoKho = {
		DE: 'Dễ',
		TRUNG_BINH: 'Trung bình',
		KHO: 'KHó',
		RAT_KHO: 'Rất khó',
	};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [idMonHocSelected, setIdMonHocSelected] = useState<number | null>(null);

	const columns: any[] = [
		{ title: 'Mã', dataIndex: 'maCauHoi', width: 100, align: 'center' },
		{ title: 'Nội dung', dataIndex: 'noiDung', ellipsis: true, align: 'center' },
		{
			title: 'Môn học',
			dataIndex: 'idMonHoc',
			render: (id: number) => monHoc.find((m) => m.id === id)?.ten,
			align: 'center',
		},
		{
			title: 'Độ khó',
			dataIndex: 'doKho',
			render: (val: string) => {
				const color = val === 'DE' ? 'green' : val === 'RAT_KHO' ? 'red' : 'orange';
				return <Tag color={color}>{TextDoKho[val as keyof typeof TextDoKho]}</Tag>;
			},
			align: 'center',
		},
		{
			title: 'Thao tác',
			render: (record: any) => (
				<Popconfirm title='Xóa câu hỏi này?' onConfirm={() => delCauHoi(record.id)}>
					<Button type='link' danger icon={<DeleteOutlined />}>
						Xóa
					</Button>
				</Popconfirm>
			),
			align: 'center',
		},
	];

	return (
		<Card title='NGÂN HÀNG CÂU HỎI'>
			<Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
				Thêm câu hỏi tự luận
			</Button>

			<Modal
				title='THÊM CÂU HỎI'
				visible={isModalOpen}
				footer={null}
				onCancel={() => {
					setIsModalOpen(false);
					form.resetFields();
				}}
				width={700}
			>
				<Form
					form={form}
					layout='vertical'
					onFinish={(val) => {
						addCauHoi(val);
						setIsModalOpen(false);
						form.resetFields();
					}}
				>
					<Space style={{ display: 'flex' }} align='baseline'>
						<Form.Item name='maCauHoi' label='Mã câu hỏi' rules={[...rules.required]}>
							<Input placeholder='CH001' />
						</Form.Item>
						<Form.Item name='doKho' label='Độ khó' rules={[...rules.required]} initialValue='DE'>
							<Select style={{ width: 150 }}>
								<Select.Option value='DE'>Dễ</Select.Option>
								<Select.Option value='TRUNG_BINH'>Trung bình</Select.Option>
								<Select.Option value='KHO'>Khó</Select.Option>
								<Select.Option value='RAT_KHO'>Rất khó</Select.Option>
							</Select>
						</Form.Item>
					</Space>

					<Form.Item name='idMonHoc' label='Môn học' rules={[...rules.required]}>
						<Select placeholder='Chọn môn' onChange={(val) => setIdMonHocSelected(val)}>
							{monHoc.map((m) => (
								<Select.Option key={m.id} value={m.id}>
									{m.ten}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item name='idKhoiKienThuc' label='Khối kiến thức' rules={[...rules.required]}>
						<Select placeholder='Chọn khối kiến thức' disabled={!idMonHocSelected}>
							{khoiKienThuc
								.filter((k) => k.idMonHoc === idMonHocSelected)
								.map((k) => (
									<Select.Option value={k.id}>{k.ten}</Select.Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item name='noiDung' label='Nội dung câu hỏi' rules={[...rules.required]}>
						<Input.TextArea rows={4} placeholder='Nhập nội dung câu hỏi tự luận...' />
					</Form.Item>

					<Space style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							onClick={() => {
								setIsModalOpen(false);
								form.resetFields();
							}}
						>
							Hủy
						</Button>
						<Button htmlType='submit' type='primary'>
							Lưu câu hỏi
						</Button>
					</Space>
				</Form>
			</Modal>

			<Table columns={columns} dataSource={dsCauHoi} rowKey='id' />
		</Card>
	);
};

export default QuanLyCauHoi;

import rules from '@/utils/rules';
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Table, Select, InputNumber, Card, message, Divider, Tag } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

const QuanLyDeThi = () => {
	const { dsCauHoi } = useModel('cauhoi');
	const { monHoc } = useModel('monhoc');
	const { dsDeThi, dsCauTruc, saveDeThi, saveCauTruc } = useModel('dethi');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const generateExam = (values: any) => {
		const { idMonHoc, tenDeThi, soDe, soTrungBinh, soKho, soRatKho } = values;
		const cauHoiCuaMon = dsCauHoi.filter((c: any) => c.idMonHoc === idMonHoc);

		const pickRandom = (level: string, count: number) => {
			const pool = cauHoiCuaMon.filter((c: any) => c.doKho === level);
			if (pool.length < count) throw new Error(`Không đủ câu hỏi mức ${level}`);
			return pool
				.sort(() => 0.5 - Math.random())
				.slice(0, count)
				.map((c: any) => c.id);
		};

		try {
			const selectedIds = [
				...pickRandom('DE', soDe || 0),
				...pickRandom('TRUNG_BINH', soTrungBinh || 0),
				...pickRandom('KHO', soKho || 0),
				...pickRandom('RAT_KHO', soRatKho || 0),
			];
			saveDeThi({
				tenDeThi,
				idMonHoc,
				dsCauHoi: selectedIds,
				ngayTao: new Date().toLocaleString(),
			});
			setIsModalOpen(false);
			form.resetFields();
		} catch (err: any) {
			message.error(err.message);
		}
	};

	const handleSaveTemplate = () => {
		const values = form.getFieldsValue();
		if (!values.tenDeThi) {
			message.warning('Nhập tên đề thi để làm tên cấu trúc');
			return;
		}
		saveCauTruc({
			id: Date.now(),
			tenCauTruc: values.tenDeThi,
			soDe: values.soDe || 0,
			soTrungBinh: values.soTrungBinh || 0,
			soKho: values.soKho || 0,
			soRatKho: values.soRatKho || 0,
		});
	};

	const columns: any[] = [
		{ title: 'Tên đề thi', dataIndex: 'tenDeThi', align: 'center' },
		{
			title: 'Môn học',
			dataIndex: 'idMonHoc',
			render: (id: number) => monHoc.find((m) => m.id === id)?.ten,
			align: 'center',
		},
		{
			title: 'Số câu hỏi',
			dataIndex: 'dsCauHoi',
			render: (list: any[]) => <Tag color='blue'>{list?.length || 0} câu</Tag>,
			align: 'center',
		},
		{ title: 'Ngày tạo', dataIndex: 'ngayTao', align: 'center' },
		{
			title: 'Thao tác',
			align: 'center',
			render: () => (
				<Button type='link' icon={<FileTextOutlined />}>
					Xem chi tiết
				</Button>
			),
		},
	];

	return (
		<Card title='QUẢN LÝ ĐỀ THI'>
			<Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
				Tạo đề thi mới
			</Button>

			<Modal title='THIẾT LẬP ĐỀ THI' visible={isModalOpen} footer={null} width={650} closable={false}>
				<Form
					form={form}
					layout='vertical'
					onFinish={generateExam}
					initialValues={{ soDe: 0, soTrungBinh: 0, soKho: 0, soRatKho: 0 }}
				>
					<Form.Item label='Chọn cấu trúc mẫu (nếu có)'>
						<Select
							placeholder='Chọn một cấu trúc đã lưu để điền nhanh'
							onChange={(id) => {
								const template = dsCauTruc.find((t: any) => t.id === id);
								if (template) {
									form.setFieldsValue({
										soDe: template.soDe,
										soTrungBinh: template.soTrungBinh,
										soKho: template.soKho,
										soRatKho: template.soRatKho,
									});
								}
							}}
						>
							{dsCauTruc?.map((t: any) => (
								<Select.Option key={t.id} value={t.id}>
									{t.tenCauTruc}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item name='tenDeThi' label='Tên đề thi / Cấu trúc' rules={[...rules.required]}>
						<Input placeholder='Ví dụ: Đề thi cuối kỳ Web' />
					</Form.Item>

					<Form.Item name='idMonHoc' label='Chọn môn học' rules={[...rules.required]}>
						<Select placeholder='Chọn môn'>
							{monHoc.map((m) => (
								<Select.Option key={m.id} value={m.id}>
									{m.ten}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Divider orientation='left'>Số lượng câu hỏi</Divider>
					<Space size='large' wrap>
						<Form.Item name='soDe' label='Dễ'>
							<InputNumber min={0} />
						</Form.Item>
						<Form.Item name='soTrungBinh' label='TB'>
							<InputNumber min={0} />
						</Form.Item>
						<Form.Item name='soKho' label='Khó'>
							<InputNumber min={0} />
						</Form.Item>
						<Form.Item name='soRatKho' label='Rất khó'>
							<InputNumber min={0} />
						</Form.Item>
					</Space>

					<Space style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
						<Button
							onClick={() => {
								setIsModalOpen(false);
								form.resetFields();
							}}
						>
							Hủy
						</Button>

						<Button type='dashed' onClick={handleSaveTemplate}>
							Lưu cấu trúc
						</Button>

						<Button htmlType='submit' type='primary'>
							Tạo & Lưu đề thi
						</Button>
					</Space>
				</Form>
			</Modal>

			<Table columns={columns} dataSource={dsDeThi} />
		</Card>
	);
};

export default QuanLyDeThi;

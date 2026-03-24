import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Space, Table, Popconfirm, Select, DatePicker, Typography } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import moment from 'moment';

const { Text } = Typography;

const QuyetDinh = () => {
	const { dsQuyetDinh, themQD, suaQD, xoaQD } = useModel('quyetdinh');
	const { dsSo } = useModel('sovanbang');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingRecord, setEditingRecord] = useState<any>(null);
	const [form] = Form.useForm();

	const showModal = (record?: any) => {
		if (record) {
			setEditingRecord(record);

			form.setFieldsValue({
				...record,
				ngayBanHanh: record.ngayBanHanh ? moment(record.ngayBanHanh) : null,
			});
		} else {
			setEditingRecord(null);
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		const values = await form.validateFields();
		// Chuyển format date sang string để lưu localStorage cho nhẹ
		const dataSave = {
			...values,
			ngayBanHanh: values.ngayBanHanh ? values.ngayBanHanh.format('YYYY-MM-DD') : '',
		};

		if (editingRecord) {
			suaQD(editingRecord.id, dataSave);
		} else {
			themQD(dataSave);
		}
		setIsModalVisible(false);
	};

	const columns = [
		{ title: 'Số QĐ', dataIndex: 'soQD', key: 'soQD' },
		{
			title: 'Ngày ban hành',
			dataIndex: 'ngayBanHanh',
			key: 'ngayBanHanh',
			render: (text: string) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
		},
		{ title: 'Trích yếu', dataIndex: 'trichYeu', key: 'trichYeu', ellipsis: true },
		{
			title: 'Thuộc sổ',
			dataIndex: 'idSoVanBang',
			key: 'idSoVanBang',
			render: (idSo: string) => {
				const so = dsSo.find((s) => s.id === idSo);
				return so ? <Text strong>{so.tenSo}</Text> : <Text type='danger'>Sổ đã bị xóa</Text>;
			},
		},
		{ title: 'Lượt tra cứu', dataIndex: 'tongLuotTraCuu', key: 'tongLuotTraCuu', align: 'center' as const },
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: any) => (
				<Space size='middle'>
					<Button type='link' icon={<EditOutlined />} onClick={() => showModal(record)}>
						Sửa
					</Button>
					<Popconfirm title='Xóa quyết định này?' onConfirm={() => xoaQD(record.id)}>
						<Button type='link' danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card
			title='Danh sách Quyết định tốt nghiệp'
			extra={
				<Button type='primary' icon={<PlusOutlined />} onClick={() => showModal()}>
					Thêm quyết định
				</Button>
			}
		>
			<Table dataSource={dsQuyetDinh} columns={columns} rowKey='id' />

			<Modal
				title={editingRecord ? 'Sửa quyết định' : 'Thêm quyết định mới'}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={() => setIsModalVisible(false)}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='idSoVanBang' label='Chọn sổ văn bằng' rules={[{ required: true, message: 'Phải chọn sổ!' }]}>
						<Select placeholder='Chọn quyển sổ chứa quyết định này'>
							{dsSo.map((so) => (
								<Select.Option key={so.id} value={so.id}>
									{so.tenSo} ({so.namHoc})
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Space style={{ display: 'flex' }} align='baseline'>
						<Form.Item name='soQD' label='Số quyết định' rules={[{ required: true }]}>
							<Input placeholder='VD: 123/QĐ-PTIT' />
						</Form.Item>
						<Form.Item name='ngayBanHanh' label='Ngày ban hành' rules={[{ required: true }]}>
							<DatePicker format='DD/MM/YYYY' placeholder='Chọn ngày' />
						</Form.Item>
					</Space>

					<Form.Item name='trichYeu' label='Trích yếu'>
						<Input.TextArea rows={3} placeholder='Nội dung tóm tắt quyết định...' />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default QuyetDinh;

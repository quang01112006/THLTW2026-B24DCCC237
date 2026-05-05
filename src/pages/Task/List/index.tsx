import { EMucDoUuTienTask, ETrangThaiTask } from '@/services/Kanban/constants';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useModel } from 'umi';
import TaskForm from '../components/TaskForm';

const { Search } = Input;

const TaskList: React.FC = () => {
	const { dsTask, addTask, editTask, deleteTask } = useModel('task');
	const [searchText, setSearchText] = useState('');
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [editingTask, setEditingTask] = useState<any>(null);

	const filteredTasks = dsTask.filter((task) => task.tenTask.toLowerCase().includes(searchText.toLowerCase()));

	const handleAdd = () => {
		setEditingTask(null);
		setIsFormVisible(true);
	};

	const handleEdit = (record: any) => {
		setEditingTask(record);
		setIsFormVisible(true);
	};

	const handleSubmit = (values: any) => {
		if (editingTask) {
			editTask(editingTask.id, values);
		} else {
			addTask(values);
		}
		setIsFormVisible(false);
	};

	const columns = [
		{
			title: 'Tên Task',
			dataIndex: 'tenTask',
			key: 'tenTask',
			render: (text: string) => <strong>{text}</strong>,
		},
		{
			title: 'Deadline',
			dataIndex: 'deadline',
			key: 'deadline',
			sorter: (a: any, b: any) => moment(a.deadline).valueOf() - moment(b.deadline).valueOf(),
			render: (text: string) => moment(text).format('DD/MM/YYYY HH:mm'),
		},
		{
			title: 'Mức độ ưu tiên',
			dataIndex: 'mucDoUuTien',
			key: 'mucDoUuTien',
			render: (priority: string) => {
				let color = 'blue';
				if (priority === EMucDoUuTienTask.CAO) color = 'red';
				if (priority === EMucDoUuTienTask.TRUNG_BINH) color = 'orange';
				if (priority === EMucDoUuTienTask.THAP) color = 'green';
				return <Tag color={color}>{priority}</Tag>;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			filters: Object.values(ETrangThaiTask).map((val) => ({ text: val, value: val })),
			onFilter: (value: any, record: any) => record.trangThai === value,
			render: (status: string) => {
				let color = 'red';
				if (status === ETrangThaiTask.DANG_LAM) color = 'blue';
				if (status === ETrangThaiTask.HOAN_THANH) color = 'success';
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: 'Tags',
			dataIndex: 'tags',
			key: 'tags',
			render: (tags: string[]) => (
				<>
					{tags?.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</>
			),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: any) => (
				<Space size='middle'>
					<Button type='text' icon={<EditOutlined />} onClick={() => handleEdit(record)} />
					<Popconfirm title='Bạn có chắc chắn muốn xóa?' onConfirm={() => deleteTask(record.id)}>
						<Button type='text' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 24, background: '#fff', minHeight: 'calc(100vh - 100px)' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
				<h2>Danh sách công việc</h2>
				<Space>
					<Search
						placeholder='Tìm kiếm theo tên'
						allowClear
						onSearch={(value) => setSearchText(value)}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 300 }}
						enterButton={<SearchOutlined />}
					/>
					<Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
						Thêm Task
					</Button>
				</Space>
			</div>

			<Table columns={columns} dataSource={filteredTasks} rowKey='id' pagination={{ pageSize: 10 }} />

			<TaskForm
				visible={isFormVisible}
				onClose={() => setIsFormVisible(false)}
				initialValues={editingTask}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default TaskList;

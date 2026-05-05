import { EMucDoUuTienTask, ETrangThaiTask } from '@/services/Kanban/constants';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const MOCK_TASKS: Kanban.IRecord[] = [
		{
			id: 'TASK1',
			tenTask: 'Thiết kế giao diện Kanban',
			moTa: 'Tạo UI cho 3 cột Cần làm, Đang làm, Hoàn thành',
			deadline: '2026-05-10T12:00:00.000Z',
			mucDoUuTien: EMucDoUuTienTask.CAO,
			trangThai: ETrangThaiTask.HOAN_THANH,
			tags: ['UI/UX', 'Frontend'],
			createdAt: new Date().toISOString(),
		},
		{
			id: 'TASK2',
			tenTask: 'Tích hợp react-beautiful-dnd',
			moTa: 'Làm tính năng kéo thả task giữa các cột',
			deadline: '2026-05-12T17:00:00.000Z',
			mucDoUuTien: EMucDoUuTienTask.CAO,
			trangThai: ETrangThaiTask.DANG_LAM,
			tags: ['Feature', 'DragDrop'],
			createdAt: new Date().toISOString(),
		},
		{
			id: 'TASK3',
			tenTask: 'Viết API giả lập cho localStorage',
			moTa: 'Sử dụng umi model để lưu state và sync với localStorage',
			deadline: '2026-05-15T09:00:00.000Z',
			mucDoUuTien: EMucDoUuTienTask.TRUNG_BINH,
			trangThai: ETrangThaiTask.CAN_LAM,
			tags: ['Model', 'LocalStorage'],
			createdAt: new Date().toISOString(),
		},
		{
			id: 'TASK4',
			tenTask: 'Hoàn thiện Dashboard',
			moTa: 'Tính toán hiển thị số liệu thống kê tổng số, hoàn thành, quá hạn',
			deadline: '2026-05-20T17:00:00.000Z',
			mucDoUuTien: EMucDoUuTienTask.THAP,
			trangThai: ETrangThaiTask.CAN_LAM,
			tags: ['Dashboard', 'Stats'],
			createdAt: new Date().toISOString(),
		},
	];

	const [dsTask, setDsTask] = useState<Kanban.IRecord[]>(() => {
		const saved = localStorage.getItem('dsTask');
		return saved ? JSON.parse(saved) : MOCK_TASKS;
	});

	const save = (newList: Kanban.IRecord[]) => {
		setDsTask(newList);
		localStorage.setItem('dsTask', JSON.stringify(newList));
	};

	const addTask = (value: Kanban.IRecord) => {
		const newRecord = {
			...value,
			id: `TASK${Date.now()}`,
			createdAt: new Date().toISOString(),
		};
		const newList = [newRecord, ...dsTask];
		save(newList);
		message.success('Thêm task thành công');
	};

	const deleteTask = (id: string) => {
		const newList = dsTask.filter((item) => item.id !== id);
		save(newList);
		message.success('Xóa task thành công');
	};

	const editTask = (id: string, value: Partial<Kanban.IRecord>) => {
		const newList = dsTask.map((item) =>
			item.id === id ? { ...item, ...value, updatedAt: new Date().toISOString() } : item,
		);
		save(newList);
		message.success('Cập nhật task thành công');
	};

	return {
		dsTask,
		addTask,
		deleteTask,
		editTask,
	};
};

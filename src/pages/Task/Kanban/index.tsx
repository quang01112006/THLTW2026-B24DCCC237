import { EMucDoUuTienTask, ETrangThaiTask } from '@/services/Kanban/constants';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Card, Tag, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useModel } from 'umi';

const { Text } = Typography;

const COLUMNS = [
	{ id: ETrangThaiTask.CAN_LAM, title: 'Cần làm', color: '#f0f2f5' },
	{ id: ETrangThaiTask.DANG_LAM, title: 'Đang làm', color: '#e6f7ff' },
	{ id: ETrangThaiTask.HOAN_THANH, title: 'Hoàn thành', color: '#f6ffed' },
];

const PriorityTag = ({ priority }: { priority: string }) => {
	let color = 'blue';
	if (priority === EMucDoUuTienTask.CAO) color = 'red';
	if (priority === EMucDoUuTienTask.TRUNG_BINH) color = 'orange';
	if (priority === EMucDoUuTienTask.THAP) color = 'green';
	return <Tag color={color}>{priority}</Tag>;
};

const KanbanBoard: React.FC = () => {
	const { dsTask, editTask } = useModel('task');

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId) return;

		editTask(draggableId, { trangThai: destination.droppableId as any });
	};

	return (
		<div style={{ padding: 24, minHeight: 'calc(100vh - 100px)' }}>
			<h2 style={{ marginBottom: 24 }}>Kanban Board</h2>

			<DragDropContext onDragEnd={onDragEnd}>
				<div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 16 }}>
					{COLUMNS.map((column) => {
						const tasksInColumn = dsTask.filter((task) => task.trangThai === column.id);
						return (
							<div
								key={column.id}
								style={{
									display: 'flex',
									flexDirection: 'column',
									background: column.color,
									flex: 1,
									minWidth: 250,
									borderRadius: 8,
									padding: 16,
								}}
							>
								<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
									<Text strong style={{ fontSize: 16 }}>
										{column.title}
									</Text>
									<Tag color='default'>{tasksInColumn.length}</Tag>
								</div>

								<Droppable droppableId={column.id}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											style={{
												flexGrow: 1,
												minHeight: 100,
												transition: 'background-color 0.2s ease',
												backgroundColor: snapshot.isDraggingOver ? 'rgba(0,0,0,0.05)' : 'transparent',
												borderRadius: 8,
											}}
										>
											{tasksInColumn.map((task, index) => (
												<Draggable key={task.id} draggableId={task.id} index={index}>
													{(draggableProvided, draggableSnapshot) => (
														<div
															ref={draggableProvided.innerRef}
															{...draggableProvided.draggableProps}
															{...draggableProvided.dragHandleProps}
															style={{
																userSelect: 'none',
																marginBottom: 16,
																...draggableProvided.draggableProps.style,
															}}
														>
															<Card
																size='small'
																hoverable
																style={{
																	borderRadius: 8,
																	boxShadow: draggableSnapshot.isDragging
																		? '0 4px 12px rgba(0,0,0,0.15)'
																		: '0 1px 3px rgba(0,0,0,0.1)',
																}}
															>
																<div style={{ marginBottom: 8 }}>
																	<Text strong>{task.tenTask}</Text>
																</div>
																<div style={{ marginBottom: 12 }}>
																	<PriorityTag priority={task.mucDoUuTien} />
																	{task.tags?.map((tag) => (
																		<Tag key={tag}>{tag}</Tag>
																	))}
																</div>
																<div style={{ display: 'flex', alignItems: 'center', color: '#8c8c8c', fontSize: 12 }}>
																	<ClockCircleOutlined style={{ marginRight: 4 }} />
																	{moment(task.deadline).format('DD/MM/YYYY HH:mm')}
																</div>
															</Card>
														</div>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</div>
						);
					})}
				</div>
			</DragDropContext>
		</div>
	);
};

export default KanbanBoard;

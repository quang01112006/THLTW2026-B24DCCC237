import { DeleteOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Space } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Test = () => {
	return (
		<Card title='Learn dnd'>
			<Modal footer={null} title='Form' visible={true}>
				<Form onFinish={(val) => console.log(val)}>
					<Form.List name={'nameList'}>
						{(fields, { add, remove, move }) => (
							<>
								<DragDropContext
									onDragEnd={(res) => {
										if (!res.destination) return;
										move(res.source.index, res.destination.index);
									}}
								>
									<Droppable droppableId='khuvuckeotha'>
										{(provided) => (
											<div {...provided.droppableProps} ref={provided.innerRef}>
												{fields.map((field, index) => (
													<Draggable draggableId={field.key.toString()} index={index}>
														{(provided) => (
															<div
																{...provided.draggableProps}
																ref={provided.innerRef}
																style={{ ...provided.draggableProps.style }}
															>
																<Form.Item
																	label={`Nickname no.${field.name + 1}`}
																	key={field.key}
																	style={{ marginBottom: 24 }}
																>
																	<Space align='baseline'>
																		<MenuOutlined {...provided.dragHandleProps}></MenuOutlined>
																		<Form.Item {...field} noStyle>
																			<Input placeholder='Nhập biệt danh...' />
																		</Form.Item>

																		<Button icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
																	</Space>
																</Form.Item>
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
								<Button onClick={() => add()} icon={<PlusOutlined />} block type='dashed'></Button>
							</>
						)}
					</Form.List>

					<Space style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
						<Button>Cancel</Button>
						<Button type='primary' htmlType='submit'>
							OK
						</Button>
					</Space>
				</Form>
			</Modal>
		</Card>
	);
};
export default Test;

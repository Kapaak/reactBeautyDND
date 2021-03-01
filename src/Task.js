import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${props =>
		props.isDragDisabled
			? "lightgrey"
			: props.isDragging
			? "lightgreen"
			: "white"};
	transition: background-color 0.5s;
	display: flex;
`;

const Handle = styled.div`
	width: 20px;
	height: 20px;
	background-color: orange;
	border-radius: 4px;
	margin-right: 8px;
`;

const Task = ({ task, index }) => {
	const isDragDisabled = task.id === "task-1";
	return (
		<Draggable
			draggableId={task.id}
			index={index}
			isDragDisabled={isDragDisabled}
		>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					isDragging={snapshot.isDragging}
					isDragDisabled={isDragDisabled}
				>
					<Handle />
					{/* pokud udelam <Handle {...provided.dragHandleProps}/>  a oddelam provided.dragHandleProps z toho nahore, tak pak lze tahnout jen pomoci kliku na tenhle el*/}
					{task.content}
				</Container>
			)}
		</Draggable>
	);
};

export default Task;

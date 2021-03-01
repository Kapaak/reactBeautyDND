import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;
	display: flex;
	flex-direction: column;
`;
const Title = styled.h3`
	padding: 8px;
`;
const TaskList = styled.div`
	padding: 8px;
	transition: background-color 0.2 ease;
	background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
	flex-grow: 1;
	min-height: 100px;
`;

const Column = ({ column, tasks }) => {
	return (
		<Container>
			<Title>{column.title}</Title>
			<Droppable
				droppableId={column.id}
				// type={column.id === "column-3" ? "done" : "active"}
			>
				{(provided, snapshot) => (
					<TaskList
						ref={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}
					>
						{tasks.map((task, index) => (
							<Task key={task.id} task={task} index={index} />
						))}
						{provided.placeholder}
					</TaskList>
				)}
			</Droppable>
		</Container>
	);
};

export default Column;

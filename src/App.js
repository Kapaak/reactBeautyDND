import { useState } from "react";
import logo from "./logo.svg";
import initialData from "./initial-data";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
const Container = styled.div`
	display: flex;
`;

function App() {
	const [dataState, setDataState] = useState(initialData);
	//vetsinou se styluje pouze pomoci snapshotu a ne onDrag ..
	const onDragEnd = result => {
		document.body.style.color = "inherit"; // to reset color added in onDragStart
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;
		const start = dataState.columns[source.droppableId];
		const finish = dataState.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);
			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newState = {
				...dataState,
				columns: {
					...dataState.columns,
					[newColumn.id]: newColumn,
				},
			};

			setDataState(newState);
			return;
		}
		//moving from one list to another
		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};
		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = { ...finish, taskIds: finishTaskIds };
		const newState = {
			...dataState,
			columns: {
				...dataState.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		setDataState(newState);
	};

	// const onDragStart = () => {
	// 	document.body.style.color = "orange";
	// 	document.body.style.transition = "background-color 0.2s ease";
	// };
	const onDragUpdate = update => {
		const { destination } = update;
		const opacity = destination
			? destination.index / Object.keys(dataState.tasks).length
			: 0;
		document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
	};
	return (
		<div className="App">
			<DragDropContext
				onDragEnd={onDragEnd}
				// onDragStart={onDragStart}
				onDragUpdate={onDragUpdate}
			>
				<Container>
					{dataState.columnOrder.map(columnID => {
						const column = dataState.columns[columnID];
						const tasks = column.taskIds.map(taskId => dataState.tasks[taskId]);
						return <Column key={column.id} column={column} tasks={tasks} />;
					})}
				</Container>
			</DragDropContext>
		</div>
	);
}

export default App;

//https://www.youtube.com/watch?v=t1HQUPrfdOY&ab_channel=LetsCode 19:52
//https://egghead.io/lessons/react-conditionally-allow-movement-using-react-beautiful-dnd-draggable-and-droppable-props

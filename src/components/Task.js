import { FaTimes } from 'react-icons/fa';

const Task = props =>
{
	return (
		<div className={props.task.reminder ? 'task reminder' : 'task'} onDoubleClick={() => props.onDubClick(props.task.id)}>
			<h3>The task is: {props.task.text} <FaTimes onClick={() => props.onDelete(props.task.id)} style={{color: 'red'}}></FaTimes></h3>
			<p>The time for it is: {props.task.day}</p>
			<p>You will be reminded: {props.task.reminder ? "Yes" : "No"}</p>
		</div>
	);
}

export default Task;
import Task from './Task.js';

const Tasks = props =>
{
	return (
		<div>
			{
				props.tasks.map(t => 
				{
					return (
					<Task key={t.id} task={t} onDelete={props.onDelete} onDubClick={props.onDubClick}></Task>
					);
				})
			}
		</div>
	);
}

export default Tasks;
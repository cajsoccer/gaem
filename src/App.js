//import ButtonList from './altcomps/ButtonList.js';
import Header from './components/Header.js';
import Tasks from './components/Tasks.js';
import AddTask from './components/AddTask.js';
import Footer from './components/Footer.js';
import About from './components/About.js';
import Board from './comps/SnakeBoard';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => 
{
	/*let people = 
	[
		{name: "Richard", age: 22},
		{name: "Charles", age: 32},
		{name: "Gypsy-Whore", age: 23},
		{name: "Ben", age: 20}
	];*/
	const [tasks, setTasks] = useState({});
	const fetchTasks = async () => 
	{
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();
		return data;
	}
	const fetchTask = async id => 
	{
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();
		return data;
	}
	useEffect(() => 
	{
		const getTasks = async () => 
		{
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		}
		getTasks();
	}, []);

	const deleteTask = async id => 
	{
		await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'});
		setTasks(tasks.filter(t => t.id !== id))
	};
	const toggleReminder = async id => 
	{
		let taskToToggle = await fetchTask(id);
		let updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};
		await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT', headers: {'Content-type': 'application/json'}, body: JSON.stringify(updatedTask)});
		setTasks(tasks.map(t => (t.id === id) ? {...t, reminder: !t.reminder}: t));
	};
	const addTask = async task => 
	{
		let res = await fetch(`http://localhost:5000/tasks`, {method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(task)});
		let data = await res.json();
		setTasks([...tasks, data]);
	};
	const [showAddTask, setShowAddTask] = useState(false);
	const toggleAddForm = () => setShowAddTask(!showAddTask);
	let speed = 100;
	let answer = prompt("Enter the difficulty (easy, normal, or hard): ");
	if (answer === "easy")
		speed = 150;
	else if (answer === "hard")
		speed = 50;

	return (
		<Router>
    		<div className="container">
				<Header onToggle={toggleAddForm} formShowing={showAddTask}></Header>
				<Route path='/' exact render={props => (
					<>
					<Board speed={speed}></Board>
					{/*showAddTask ? <AddTask onSave={addTask}></AddTask> : <div></div>}
					{tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onDubClick={toggleReminder}></Tasks> : <p>No tasks</p>*/}
					</>
				)}/>
				<Route path='/about' component={About}/>
					<Footer/>
    		</div>
		</Router>
		
  	);
};

export default App;
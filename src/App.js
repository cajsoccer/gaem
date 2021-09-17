//import ButtonList from './altcomps/ButtonList.js';
import Header from './components/Header.js';
import Tasks from './components/Tasks.js';
import AddTask from './components/AddTask.js';
import Footer from './components/Footer.js';
import About from './components/About.js';
import Board from './comps/SnakeBoard.js';
import Leaderboard from './comps/Leaderboard.js';
import SpeedPrompt from './comps/SpeedPrompt.js';
import Top from './comps/Top.js';
import Login from './comps/Login.js';
import SignUp from './comps/SignUp.js';
import Account from './comps/Account.js';
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
	];
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
	const toggleAddForm = () => setShowAddTask(!showAddTask);*/
	
	const [speed, setSpeed] = useState(0);
	/*const [user, setUser] = useState({
		"userProfileId": "72b74f3e-6d4f-42bd-82ad-dc42e25c82f4",
		"username": "King Radovid",
		"password": "Tretogor",
		"highScore": 50,
		"userProfileImageLink": null
	});*/
	const [user, setUser] = useState(null);
	const logIn = userData => setUser(userData);
	const logOut = () => setUser(null);
	const changeAvatar = updatedUserData => setUser(updatedUserData);
	setInterval(() => console.log(user), 5000);

	return (
		<Router>
    		<div className="container">
				<Top user={user} logOut={logOut}/>
				<Route path='/' exact render={props => (
					<>
						{speed !== 0 ? <Board speed={speed}></Board> : <SpeedPrompt setSpeed={setSpeed}/>}
						<Footer/>
					</>
				)}/>
				<Route path='/leaderboard' component={Leaderboard}/>
				<Route path='/signin' exact render={props => (
					<>
						<Login logIn={logIn}/>
					</>
				)}/>
				<Route path='/signup' exact render={props => (
					<>
						<SignUp logIn={logIn}/>
					</>
				)}/>
				<Route path='/account' exact render={props => (
					<>
						<Account user={user} changeAvatar={changeAvatar}/>
					</>
				)}/>
    		</div>
		</Router>
		
  	);
};

export default App;
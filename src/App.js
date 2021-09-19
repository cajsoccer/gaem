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
	const [speed, setSpeed] = useState(0);
	/*const [user, setUser] = useState({
		"userProfileId": "72b74f3e-6d4f-42bd-82ad-dc42e25c82f4",
		"username": "King Radovid",
		"password": "Tretogor",
		"highScore": 50,
		"userProfileImageLink": null
	});*/
	const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')) || null);
	const logIn = data => {
		window.localStorage.setItem('user', JSON.stringify(data));
		setUser(data);
	}
	const logOut = () => {
		window.localStorage.removeItem('user');
		setUser(null);
	}
	const changeAvatar = updatedUserData => {
		logIn(updatedUserData);
	}
	setInterval(console.log(user), 5000);

	return (
		<Router>
    		<div className="container">
				<Top user={user} logOut={logOut}/>
				<Route path='/' exact render={props => (
					<>
						{speed !== 0 ? <Board speed={speed} user={user} updateScore={logIn}></Board> : <SpeedPrompt setSpeed={setSpeed}/>}
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
import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";

const Leaderboard = props => 
{
	const [players, setPlayers] = useState([]);
	const getPlayers = async () => 
	{
		let res = await axios.get("http://localhost:8080/leaderboard");
		let sorted = res.data.sort((a, b) => b.highScore - a.highScore);
		let topTen = sorted.map((p, i) => {if (i < 10) return p;});
		setPlayers(topTen);
	};
	useEffect(() => getPlayers(), []);
	players.forEach(p => console.log(p));
	const getRowType = index =>
	{
		switch (index)
		{
			case 1: 
				return "gold-cell";
			case 2: 
				return "silver-cell";
			case 3: 
				return "bronze-cell";
			default:
				return "";
		}
	}

	return (
		<div>
			<table className="table">
				<tr>
		  			<th className="row-element">Avatar</th>
		 			<th className="row-element">User</th>
		  			<th className="row-element">High Score</th>
				</tr>
				{players.map((p, index) => 
				{
					return (
						<tr key={index} className={getRowType(index + 1)}>
							<th className="row-element">{p.userProfileImageLink != null ? <img className="profile-pic" src={`http://localhost:8080/leaderboard/${p.userProfileId}/image/download`}/> : <img className="profile-pic" src='https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg'/>}</th>
							<th className="row-element">{p.username}</th>
							<th className="row-element">{p.highScore}</th>
						</tr>
					);
				})}
			</table> 
			<a href='/'>Back to the Game</a>
		</div>
	);
};

export default Leaderboard;
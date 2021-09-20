const Top = props => {
	return (
		<div className="navbar">
			<a href='/'>Home </a>
			<a href='/leaderboard'>Leaderboard</a>
			{props.user !== null ?
				<div className="account-header">
					<button className="logout-button" onClick={() => props.logOut()}>Log Out</button>
					<a href='/account'>
						{props.user.userProfileImageLink !== null ?
							<img className="bar-pic" src={`http://localhost:8080/leaderboard/${props.user.userProfileId}/image/download`} />
							:
							<img className="bar-pic" src={'https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg'} />}
					</a>
				</div>
				:
				<>
					<a href='./signup'>Sign Up</a>
					<a href='/signin'>Sign In</a>
				</>}
		</div>
	);
}

export default Top;
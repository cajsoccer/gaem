import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import axios from "axios";

const Account = props => 
{
	function MyDropzone({ userProfileId, username, password, highScore }) {
		const onDrop = useCallback(acceptedFiles => {
			const file = acceptedFiles[0];
			props.changeAvatar({ userProfileId: userProfileId, username: username, password: password, highScore: highScore, userProfileImageLink: file.path });
			console.log(file);
			const formData = new FormData();
			formData.append("file", file);
			axios.post(
				`http://localhost:8080/leaderboard/${userProfileId}/image/upload`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			).then(() => { console.log("File upload sucessfully") }).catch(err => { console.log(err) });
		}, [])
		const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
		return (
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{
					isDragActive ?
						<p style={{ textAlign: 'center' }}>Drop the files here ...</p> :
						<p style={{ textAlign: 'center' }}>Drag 'n' drop or click to select profile image</p>
				}
			</div>
		)
	}
	if (props.user === null) 
		return (<div></div>);
	else
		return (
			<div id="account-container">
				<h1>Account Information:</h1>
				<h2>Username: {props.user.username}</h2>
				<div id="avatar-container">
					<h2>Avatar:</h2>
					{props.user.userProfileImageLink !== null ? <img id="avatar" src={`http://localhost:8080/leaderboard/${props.user.userProfileId}/image/download`} /> : <img id="avatar" src={'https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg'} />}
				</div>
				<h2>High Score: {props.user.highScore}</h2>
				<MyDropzone {...props.user} />
			</div>
		);
}

export default Account;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from "./MenuItems"
import './Navbar.css'
import  { useAuth } from '../../contexts/AuthContext'

function useCurrentUser() {  
	const { currentUser } = useAuth()
	return currentUser.email
}

class Navbar extends Component {
	render() {
		return(
	        <nav className="App-NavbarItems">
	            <h1 className="App-title">Zen Cycle</h1>
	            <ul className="App-NavMenu">
	            	<li>
	            		<Link to='#'></Link>
	            	</li>
	            	{MenuItems.map((item, index) => {
	            		return(
	            			<li key={index} className={item.cName}>
	            				<Link to= {item.path}>
	            					<span>{item.title}</span>
	            				</Link>
	            			</li>
	            		)
	            	})}
	            </ul>
	        </nav>
    	)
	}
}

export default Navbar
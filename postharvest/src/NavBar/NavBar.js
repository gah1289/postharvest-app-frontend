import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../Images/windham-logo-blue.svg';
import './NavBar.css';

import { Container, Row, Col, InputGroup, Input, Form } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import ItemContext from '../ItemContext';

function NavBar(props) {
	const [
		collapsed,
		setCollapsed
	] = useState(true);
	const { isLoggedIn, user } = useContext(ItemContext);

	const toggleNavbar = () => setCollapsed(!collapsed);
	library.add(faUser);

	return (
		<div>
			<Navbar color="faded" light>
				<NavbarBrand href="/" className="me-auto">
					<img alt="Windham Packaging Logo" className="windham-logo-img" src={logo} />
				</NavbarBrand>

				<button
					onClick={toggleNavbar}
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo01"
					aria-controls="navbarTogglerDemo01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					{!isLoggedIn && <FontAwesomeIcon icon="fa-solid fa-user" />}
					{isLoggedIn && (
						<div className="logged-in-btn">
							{user.current.firstName[0]}
							{user.current.lastName[0]}
						</div>
					)}
				</button>
				<Collapse isOpen={!collapsed} navbar>
					<Nav navbar>
						{!isLoggedIn && (
							<NavItem>
								<NavLink href="/login">Log In</NavLink>
							</NavItem>
						)}
						{isLoggedIn && (
							<NavItem>
								<NavLink href="/logout">Log Out</NavLink>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default NavBar;

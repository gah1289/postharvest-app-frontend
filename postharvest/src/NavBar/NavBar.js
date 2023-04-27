import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import './NavBar.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import ItemContext from '../ItemContext';

function NavBar() {
	const [
		collapsed,
		setCollapsed
	] = useState(true);
	const { isLoggedIn, user } = useContext(ItemContext);

	const toggleNavbar = () => setCollapsed(!collapsed);
	library.add(faCircleUser, faHouse);

	return (
		<div>
			<Navbar color="faded" light>
				<NavbarBrand href="/" className="me-auto">
					<FontAwesomeIcon icon="fa-solid fa-house" />
					{/* <img alt="Windham Packaging Logo" className="windham-logo-img" src={logo} /> */}
				</NavbarBrand>

				<button
					onClick={toggleNavbar}
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo01"
					aria-controls="navbarTogglerDemo01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					{!isLoggedIn && <FontAwesomeIcon className="nav-icon" icon="fa-solid fa-circle-user" />}
					{isLoggedIn && (
						<div className="logged-in-btn">
							{user.current.firstName[0]}
							{user.current.lastName[0]}
						</div>
					)}
				</button>

				<Collapse isOpen={!collapsed} navbar>
					<Nav navbar className="align-items-center ">
						{!isLoggedIn && (
							<NavItem>
								<NavLink href="/login">Log In</NavLink>
							</NavItem>
						)}
						<NavItem>
							<NavLink href="/search">Commodities</NavLink>
						</NavItem>
						{isLoggedIn && (
							<NavItem>
								<NavLink href="/profile">Profile</NavLink>
							</NavItem>
						)}
						{user.current.isAdmin && (
							<NavItem>
								<NavLink href="/studies-list">Shelf Life Studies</NavLink>
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

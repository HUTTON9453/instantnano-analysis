import React, { FunctionComponent, useState } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import './header.css'
import classNames from 'classnames';


export const Header: FunctionComponent = () => {

	const [ collapsed, setCollapse ] = useState(false);


	return (
		<Navbar className={`navbar navbar-expand-lg bg-info col-sm-12 col-md-12`} sticky="top">
			<NavbarToggler
				className="navbar-toggler"
				type="button"
				aria-expanded={!collapsed}
				aria-label="Toggle navigation"
				onClick={() => setCollapse(!collapsed)}
			/>
			<Collapse className="collapse navbar-collapse" id="navbarSupportedContent" isOpen={!collapsed}>
				<Nav className="navbar-nav mr-auto align-items-center">
					<NavItem
						className={classNames('nav-item', {
							active: true
						})}
					>
						<Link
							className="nav-link"
							to={routes.HOME}
							replace
						>
							<img className="mx-2" width="50" height="50" src={process.env.PUBLIC_URL + "other_pic.png"} alt="Logo" />
							Home
						</Link>
					</NavItem>
				</Nav>
			</Collapse>

		</Navbar>
	);
};

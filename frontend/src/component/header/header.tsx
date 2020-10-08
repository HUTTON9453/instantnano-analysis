import React, { FunctionComponent, useState } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import * as routes from '../../constants/routes';
import logoImage from '../../assets/other_pic.png';
import { Mode } from '../../models/mode.enum';
import { Locale_Zh, Locale_En } from '../../constants/routes'
import Button from '@material-ui/core/Button';
import './header.css'

export const Header: FunctionComponent = () => {

	const [ collapsed, setCollapse ] = useState(false);


	return (
		<Navbar className={`navbar navbar-expand-lg navbar-dark  col-sm-12 col-md-12`} sticky="top">
			<NavbarToggler
				className="navbar-toggler"
				type="button"
				aria-expanded={!collapsed}
				aria-label="Toggle navigation"
				onClick={() => setCollapse(!collapsed)}
			/>
			<Collapse className="collapse navbar-collapse" id="navbarSupportedContent" isOpen={!collapsed}>
				<Nav className="navbar-nav mr-auto align-items-center">
					<NavItem active
					>
						<Link
							className="nav-link"
							to={routes.HOME}
							replace
						>
							Home
						</Link>
					</NavItem>
					<NavItem
					>
						<Link
							to={routes.QUERY}
							replace
							className="nav-link"
						>
							<FormattedMessage id="header.query" />
						</Link>
					</NavItem>
					<NavItem
					>
						<Link
							className="nav-link"
							to={routes.IMPORT}
							replace
						>
							<FormattedMessage id="header.import" />
						</Link>
					</NavItem>
					<NavItem
					>
						<Link
							className="nav-link"
							to={routes.FIRMWARE}
							replace
						>
							<FormattedMessage id="header.firmware" />
						</Link>
					</NavItem>
				</Nav>
			</Collapse>

			<Button style={{borderColor: 'rgba(255, 255, 255, 0.7)', color: 'white'}}  variant="outlined" color="inherit" ><FormattedMessage id="header.language" /></Button>
		</Navbar>
	);
};

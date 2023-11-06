// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import Configurator from 'components/Configurator/Configurator';
import Footer from 'components/Footer/Footer.js';
// Layout components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import SidebarContent from 'components/Sidebar';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { dashRoutesAdministracion, dashRoutesPatologo, dashRoutesTecnico } from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// Custom Chakra theme
import theme from 'theme/theme.js';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';
import { ModoVisualizacionProvider } from "components/ModoVisualizacion/ModoVisualizacion";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Dashboard(props) {
	const dashRoutes = [...dashRoutesAdministracion, ...dashRoutesPatologo, ...dashRoutesTecnico];
	const { ...rest } = props;
	// states and functions
	const [sidebarVariant, setSidebarVariant] = useState('transparent');
	const [fixed, setFixed] = useState(false);
	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (dashRoutes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < dashRoutes.length; i++) {
			if (dashRoutes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(dashRoutes[i].views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (dashRoutes[i].category) {
				let categoryActiveRoute = getActiveRoute(dashRoutes[i].views);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(dashRoutes[i].layout + dashRoutes[i].path) !== -1) {
					return dashRoutes[i].name;
				}
			}
		}
		return activeRoute;
	};
	// This changes navbar state(fixed or not)
	const getActiveNavbar = (dashRoutes) => {
		let activeNavbar = false;
		for (let i = 0; i < dashRoutes.length; i++) {
			if (dashRoutes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(dashRoutes[i].views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(dashRoutes[i].layout + dashRoutes[i].path) !== -1) {
					if (dashRoutes[i].secondaryNavbar) {
						return dashRoutes[i].secondaryNavbar;
					}
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (dashRoutes) => {
		return dashRoutes.map((prop, key) => {
			if (prop.collapse) {
				return dashRoutes(prop.views);
			}
			if (prop.category === 'account') {
				return dashRoutes(prop.views);
			}
			if (prop.layout === '/admin') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			} else {
				return null;
			}
		});
	};

	//evitar darle atras 
	const history = useHistory();

	useEffect(() => {
		const handlePopstate = (event) => {
			history.go(1); // Vuelve a avanzar una página para mantener al usuario en la página de inicio
			window.history.pushState(null, document.title, window.location.href); // Reemplaza la entrada actual del historial
		};

		window.addEventListener("popstate", handlePopstate);

		return () => {
			window.removeEventListener("popstate", handlePopstate);
		};
	}, [history]);




	const { isOpen, onOpen, onClose } = useDisclosure();
	document.documentElement.dir = 'ltr';
	// Chakra Color Mode
	return (
		<ModoVisualizacionProvider>
			<ChakraProvider theme={theme} resetCss={false}>
				<SidebarContent
					routes={dashRoutes}
					display='none'
					sidebarVariant={sidebarVariant}
					{...rest}
				/>
				<MainPanel
					w={{
						base: '100%',
						xl: 'calc(100% - 220px)'
					}}>
					<Portal>
						<AdminNavbar
							onOpen={onOpen}
							brandText={getActiveRoute(dashRoutes)}
							secondary={getActiveNavbar(dashRoutes)}
							fixed={fixed}
							{...rest}
						/>
					</Portal>
					{getRoute() ? (
						<PanelContent>
							<PanelContainer>
								<Switch>
									{getRoutes(dashRoutes)}
									<Redirect from='/admin' to='/admin/Home' />
								</Switch>
							</PanelContainer>
						</PanelContent>
					) : null}
				</MainPanel>
				<ToastContainer />
			</ChakraProvider>
		</ModoVisualizacionProvider>

	);
}

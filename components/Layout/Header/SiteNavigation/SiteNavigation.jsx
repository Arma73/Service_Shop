import { bool, func } from "prop-types";
import class_names from "class-names";
import Toggle from "./Toggle";

const SiteNavigation = ({ children, handleToggleClick, isMobile, isOpen }) => {
	const navWrapClassName = class_names("nav-wrap", {
		open: isOpen
	});

	return (
		<nav className={navWrapClassName}>
			{isMobile && <Toggle handleClick={handleToggleClick} />}
			{children}
		</nav>
	);
};

SiteNavigation.propTypes = {
	handleToggleClick: func,
	isMobile: bool,
	isOpen: bool
};

SiteNavigation.defaultProps = {
	handleToggleClick: () => {},
	isMobile: false,
	isOpen: true
};

export default SiteNavigation;

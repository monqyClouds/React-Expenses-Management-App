import { useContext } from "react";

import { GiExitDoor } from "react-icons/gi";

import AuthContext from "../../context/auth-context";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <div className={classes.logo}>monqyPence</div>
      <div className={classes.rightNav}>
        <span className={classes.user}>LingZing</span>
        <GiExitDoor color="#FFF" title="exit" onClick={ctx.onLogout} />
      </div>
    </nav>
  );
};

export default Navigation;

import classes from '../css/Header.module.css';
import { MdPostAdd, MdMessage } from 'react-icons/md';

export default function Header() {

    return (
        <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        Header
      </h1>
      <p>
        <button className={classes.button} >
          <MdPostAdd size={18} />
          해더
        </button>
      </p>
    </header>

    );
}
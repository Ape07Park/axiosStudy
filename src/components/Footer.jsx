import classes from '../css/Header.module.css';
import { MdPostAdd, MdMessage } from 'react-icons/md';

export default function Footer() {

    return (
        <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        푸터
      </h1>
      <p>
        <button className={classes.button}>
          <MdPostAdd size={18} />
          푸터
        </button>
      </p>
    </header>

    );
}
import classes from '@css/Header.module.css';
import { useTranslation } from 'react-i18next';
import { MdPostAdd, MdMessage } from 'react-icons/md';

export default function Footer() {

  const  {t} = useTranslation();

    return (
        <header className={classes.header}>
      <h1 className={classes.logo}
      mainTitle={t(`footer.maintitle`)}
      >
        <MdMessage />
        푸터
      </h1>
      <p>
        <button className={classes.button}
         mainTitle={t(`footer.subTitle`)}
        >
          <MdPostAdd size={18} />
          푸터
        </button>
      </p>
    </header>

    );
}
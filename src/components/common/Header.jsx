import { useNavigate } from 'react-router-dom';
import classes from '@css/Header.module.css';
import { MdPostAdd, MdMessage } from 'react-icons/md';
import { TfiWorld } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { LangState } from '../../recoil/LangAtom';

export default function Header() {
  const [lang, setLang] = useRecoilState(LangState);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleMain = () => {
    navigate('/');
  };

  const goKyoWonDea = () => {
    window.location.href = 'https://www.knue.ac.kr/www/index.do';
  };

  const handleList = () => {
    navigate('/list');
  };

  const handleLang = () => {
    const newLang = (lang === "en") ? "ko" : "en";
    setLang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.logo} onClick={handleMain} >
        <MdMessage />
        {t('header.title')} {/* 태그와 /태그 사이에 넣어야함 */}
      </h1>
      <div className={classes.navLinks}>
        <p onClick={goKyoWonDea} >
          {t('header.homepage')} 
        </p>
        <p onClick={handleList} >
          {t('header.list')} 
        </p>
        <p data-institute={t('header.institute')}>
          {t('header.institute')} 
        </p>
      </div>
      <button className={classes.button} onClick={handleLang} >
        <TfiWorld size={18} />
        {t('header.langChange')} 
      </button>
      <button className={classes.button}>
        <MdPostAdd size={18} />
        {t('header.header')} 
      </button>
    </header>
  );
}

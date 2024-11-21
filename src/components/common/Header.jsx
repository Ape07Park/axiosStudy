import { useNavigate } from 'react-router-dom';
import classes from '@css/Header.module.css';
import { MdPostAdd, MdMessage } from 'react-icons/md';
import { TfiWorld } from "react-icons/tfi";
import i18n from "../../lang/i18n"
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { LangState } from '../../recoil/LangAtom';


export default function Header() {

  const [lang, setLang] = useRecoilState(LangState);
  const isEnglish = lang === "eng";

  const  {t} = useTranslation();

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

    const newLang = isEnglish ? "kr" : "eng";
    setLang(newLang);
    i18n.changeLanguage(newLang);
    console.log("newLang: " + newLang);
    
    localStorage.setItem("language", newLang);

    console.log("leng: " +lang);
    
    
  }

  return (
    <header className={classes.header}>
      <h1 className={classes.logo} onClick={handleMain}
        title={t(`header.title`)}
      >
        <MdMessage />
        한국근대교육의 주체, 공간, 경험
      </h1>
      <div className={classes.navLinks}>
        <p onClick={goKyoWonDea}
        homepage={t(`header.homepage`)}
        
        >한국교원대 홈피</p>
        <p onClick={handleList}
        list={t(`header.list`)}
        >리스트</p>
        <p
        institute={t(`header.institute`)}
        >한국근대교육사 연구센터</p>
      </div>
      {/* 한글, 영어로 변경 */}

      <button className={classes.button} onClick={handleLang}
      langChange={t(`header.langChange`)}
      >
        <TfiWorld size={18} />
        언어 변경
      </button>

      <button className={classes.button}
      header={t(`header.header`)}
      >
        <MdPostAdd size={18} />
        해더
      </button>
    </header>
  );
}

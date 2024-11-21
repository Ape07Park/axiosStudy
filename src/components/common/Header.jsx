import { useNavigate } from 'react-router-dom';
import classes from '@css/Header.module.css';
import { MdPostAdd, MdMessage } from 'react-icons/md';
import { TfiWorld } from "react-icons/tfi";
import { useEffect, useState } from 'react';


export default function Header() {

  const [lang, setLang] = useState('KR');

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

    if(lang === 'KR') {
      setLang('ENG');
    } else if(lang === 'ENG'){
      setLang('KR');
    }
    console.log(lang);
    
  }

  // use이펙트로 어떤 언어인지 보고 영어면 영어 페이지로 보내기
  useEffect((lang) => {
    if (lang === 'ENG') {
      navigate('/eng')
    } 
  }, [lang])

  return (
    <header className={classes.header}>
      <h1 className={classes.logo} onClick={handleMain}>
        <MdMessage />
        한국근대교육의 주체, 공간, 경험
      </h1>
      <div className={classes.navLinks}>
        <p onClick={goKyoWonDea}>한국교원대 홈피</p>
        <p onClick={handleList}>리스트</p>
        <p>한국근대교육사 연구센터</p>
      </div>
      {/* 한글, 영어로 변경 */}

      <button className={classes.button} onClick={handleLang}>
        <TfiWorld size={18} />
        언어 변경
      </button>

      <button className={classes.button}>
        <MdPostAdd size={18} />
        해더
      </button>
    </header>
  );
}

import { useNavigate } from 'react-router-dom';
import classes from '../css/Header.module.css';
import { MdPostAdd, MdMessage } from 'react-icons/md';

export default function Header() {
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

// TODO 리코일을 사용해 페이지마다 주체, 공간, 경험 중 불 들어오는 거 다르게 하기

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
      <button className={classes.button}>
        <MdPostAdd size={18} />
        해더
      </button>
    </header>
  );
}

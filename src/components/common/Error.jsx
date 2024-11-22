import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
  const goMain = () => {
    window.location.href = '/';
  };

  return (
    <div style={styles.errorContainer}>
      <h1 style={styles.title}>전역 에러</h1>
      <p style={styles.message}>We are sorry, 전역 에러.</p>
      <button onClick={goMain} style={styles.button}>메인으로 이동하기</button>
    </div>
  );
}

export function ErrorFallback({ error }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/error', { replace: true });
  }, [navigate]);

  return null;
}

const styles = {
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.25rem',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#155724',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Error;

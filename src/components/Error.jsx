import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
  return (
    <div>
      <h1>전역 에러</h1>
      <p>We are sorry, 전역 에러.</p>
    </div>
  );
}

// ErrorBoundary component
export function ErrorFallback({ error }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/error', { replace: true });
  }, [navigate]);

  return null;
}

export default Error;
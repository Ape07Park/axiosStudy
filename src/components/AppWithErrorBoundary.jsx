import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

// Fallback Component with useNavigate
function FallbackComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/error');
  }, [navigate]);
  
  return null;
}

// Error Handler function
const errorHandler = (error, info) => {
  console.log('Error:', error);
  console.log('Error Info:', info);
};

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary 
      FallbackComponent={FallbackComponent}
      onError={errorHandler}
    >
      {children}
    </ErrorBoundary>
  );
}

// 이벤트 핸들러에서 에러를 처리하기 위한 래퍼 함수
export const withErrorHandler = (fn) => {
  return (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      // window.location.href = '/error';
      // 또는 아래처럼 구현할 수도 있습니다
      const event = new ErrorEvent('error', { error });
      window.dispatchEvent(event);
    }
  };
};

// 버튼 컴포넌트에서의 사용 예시
const handleModalError = () => {
  throw new Error('User triggered error');
};

// 버튼 컴포넌트
<button 
 
  onClick={() => {
      try {
          handleModalError();
      } catch (error) {
          throw error; // ErrorBoundary가 이 에러를 캐치합니다
      }
  }}
>
  No
</button>
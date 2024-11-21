import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

// 사용자 정의 에러 페이지 컴포넌트
const CustomErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          문제가 발생했습니다
        </h2>
        <p className="text-gray-600 mb-4">
          죄송합니다. 페이지를 표시하는 동안 오류가 발생했습니다.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            이전 페이지
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
};

// 로딩 컴포넌트
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// 에러 핸들러 함수
const errorHandler = (error, errorInfo) => {
  // 프로덕션 환경에서는 에러 로깅 서비스로 전송
  console.error('Error occurred:', error);
  console.error('Error Info:', errorInfo);
};

// 메인 에러 바운더리 컴포넌트
export const AppErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={CustomErrorPage}
      onError={errorHandler}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

// 이벤트 핸들러용 에러 래퍼 함수
export const withErrorHandler = (fn) => async (...args) => {
  try {
    await fn(...args);
  } catch (error) {
    // ErrorBoundary로 에러를 전파
    throw error;
  }
};


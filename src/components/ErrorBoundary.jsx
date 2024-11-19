// ErrorBoundary.js에 리디렉션 추가
import React from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
   
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 여기에서 에러를 로그로 기록하거나 리디렉션할 수 있습니다.
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // 에러 페이지로 리디렉션
    this.navigate('/error');
  }

  render() {
    if (this.state.hasError) {
      return <h1>Redirecting to error page...</h1>; // 리디렉션 메시지
    }

    return this.props.children;  // 에러가 없으면 자식 컴포넌트를 정상적으로 렌더링
  }
}

export default ErrorBoundary;

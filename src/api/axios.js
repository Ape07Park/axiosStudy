import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 타임아웃 시간 설정 (예: 10초)
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * 인터셉터는 중간에서 가로채는 역할 수행
 */
// 요청 인터셉터
axiosInstance.interceptors.request.use(
    config => {
      // 요청 전 수행할 작업
      console.log('Request sent:', config);
      return config;
    },
    error => {
      // 요청 에러 처리
      return Promise.reject(error);
    }
  );
  
  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    response => {
      // 응답 데이터 가공 등 작업
      return response;
    },
    error => {
      // 응답 에러 처리
      if (error.response.status === 401) {
        // 예: 인증 에러 처리
        console.log('Unauthorized, redirect to login');
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;
// fetch는 인스턴스를 직접 생성할 수 없으므로, 공통 설정을 함수로 만들어 사용합니다.
// 또한, fetch에는 인터셉터가 없기 때문에 공통 설정과 처리를 위한 래퍼 함수를 만들어야 합니다.

// BASE_URL, DEFAULT_TIMEOUT 및 DEFAULT_HEADERS는 customFetch 함수의 기본 동작을 구성하는 데 사용되는 상수입니다.

const BASE_URL = 'http://localhost:3001'; // 모든 API 요청의 기본 URL
const DEFAULT_TIMEOUT = 5000; // 요청의 기본 타임아웃 시간(밀리초) 타임아웃은 기다리는 시간을 의미하며 시간이 지나면 실패로 인지
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json', // 모든 요청의 기본 헤더
};

/**
 * 기본 설정과 타임아웃 처리를 제공하기 위해 네이티브 fetch API를 래핑하는 커스텀 fetch 함수입니다.
 * @param {string} endpoint - 요청할 엔드포인트(BASE_URL에 추가됨).
 * @param {object} options - fetch 요청의 선택적 구성(예: method, headers, body).
 * @returns {Promise} - 응답 데이터를 해결하거나 오류를 거부하는 프로미스.
 */
function customFetch(endpoint, options = {}) {
  // 요청 타임아웃을 처리하기 위해 AbortController 생성
  const controller = new AbortController();

  // 요청이 DEFAULT_TIMEOUT보다 오래 걸리면 요청을 중단하도록 타임아웃 설정
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  // 기본 헤더와 options에 전달된 추가 헤더를 병합
  const config = {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
    signal: controller.signal, // 요청에 중단 신호 연결
  };

  // 병합된 구성으로 생성된 URL에 fetch 요청 수행
  return fetch(`${BASE_URL}${endpoint}`, config)
    .then((response) => {
      // 요청이 성공적으로 완료되었으므로 타임아웃 해제
      clearTimeout(id);

      // 응답이 ok(상태 코드 200-299)인지 확인
      if (!response.ok) {
        // 응답이 ok가 아니면 오류 발생
        throw new Error('Network response was not ok');
      }

      // 응답을 JSON으로 반환
      return response.json();
    })
    .catch((error) => {
      // 오류가 발생한 경우 타임아웃 해제
      clearTimeout(id);
      console.error("Fetch error:", error); // 오류를 콘솔에 출력
      throw error; // 오류를 다시 발생시킴
    });
}

export default customFetch; // customFetch 함수를 기본 내보내기로 설정

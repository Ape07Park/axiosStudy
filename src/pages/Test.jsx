import React, { useReducer } from 'react';

// 초기 상태: 처음 점수는 0점
const initialState = { score: 0 };

// 리듀서 함수: 새로운 상태를 계산하는 방법
function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return { score: state.score + 1 }; // 점수를 1점 올리기
    case 'decrease':
      return { score: state.score - 1 }; // 점수를 1점 내리기
    default:
      return state; // 다른 경우는 현재 상태를 그대로 유지
  }
}

function ScoreCounter() {
  // useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>현재 점수: {state.score}</p>
     
      <button onClick={() => dispatch({ type: 'increase' })}>점수 올리기</button>
     
      <button onClick={() => dispatch({ type: 'decrease' })}>점수 내리기</button>
    </div>
  );
}

export default ScoreCounter;
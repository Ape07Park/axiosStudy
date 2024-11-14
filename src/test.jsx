
import { useRef } from 'react';

export default function Form() {
    // 태그를 담을 변수 생성
  const inputRef = useRef(null);

  function handleClick() {
    // inputRef.current로 input 태그에 접근할 수 있다
    inputRef.current.focus();
  }

  return (
    <>
    {/* ref라는 것에 inputRef 함수를 담아 input 태그를 넣음*/}
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
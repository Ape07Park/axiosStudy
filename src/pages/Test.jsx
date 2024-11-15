import React, { useState, useLayoutEffect, useRef } from 'react';

function LayoutEffectExample() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const divRef = useRef(null);

  // 크기 측정은 랜더링 전에 이루어져야 한디
  useLayoutEffect(() => {

    const updateSize = () => {
      const { offsetWidth, offsetHeight } = divRef.current; // 사이즈 변경 중 다시 리랜더링 방지 위해 
      setSize({ width: offsetWidth, height: offsetHeight });
    };

    updateSize(); // 초기 크기 측정
    window.addEventListener('resize', updateSize); // 윈도우 크기 변경 시 크기 업데이트

    return () => {
      window.removeEventListener('resize', updateSize); //  cleanup 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거 
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하여 마운트(화면에 데이터, 컴포넌트가 나타날 때) 시와 언마운트 시에만 실행되도록 함
 

  return (
    <div>
      <div ref={divRef} style={{ width: '50%', height: '100px', background: 'lightblue' }}>
        크기 측정 대상
      </div>
      <p>너비: {size.width}px</p>
      <p>높이: {size.height}px</p>
    </div>
  );
}

export default LayoutEffectExample;

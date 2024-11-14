import React, { useState, useMemo } from 'react';

function slowFunction(num) {
  console.log('엄청 느린 계산...');
  for (let i = 0; i <= 1000000000; i++) {} // 일부러 시간을 지연시키기 위해서
  return num * 2;
}

export default function Test() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // useMemo를 사용하여 메모이제이션
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const themeStyles = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'black' : 'white'
  };

  return (
    
    <div>
      <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
      <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={themeStyles}>{doubleNumber}</div>
    </div>
  );
};

// 숫자를 입력하면 setNumber가 작동한다. useMemo에 의해 slowFunction함수가 작동하고 시간이 지나면 입력한 숫자에 * 2가 된다.
// 여기서 중요한 건 색깔을 바꾸면 재랜더링이 발생하지만 숫자는 0으로 초기화 되지 않고 오직 입력으로 숫자를 바꿀 때만 숫자가 변한다는 것이다.
// 값을 캐싱해 남겨두는 것이다

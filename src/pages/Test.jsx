import React, { useState } from 'react';

const EventsExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [focusStatus, setFocusStatus] = useState('');
  const [keyInfo, setKeyInfo] = useState('');
  const [submitData, setSubmitData] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitData(`폼 제출됨: ${inputValue}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">React 이벤트 예제</h2>
      <form onSubmit={handleSubmit}>
        {/* onChange & onClick 예제 */}
        <div className="space-y-2">
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setFocusStatus('입력창 포커스됨')}
            onBlur={() => setFocusStatus('입력창 포커스 잃음')}
            onKeyDown={(e) => setKeyInfo(`키 누름: ${e.key}`)}
            onKeyUp={(e) => setKeyInfo(`키 뗌: ${e.key}`)}
            placeholder="텍스트를 입력하세요"
          />
          
          <div>입력값: {inputValue}</div>
          
          <div>포커스 상태: {focusStatus}</div>
          
          <div>키보드 정보: {keyInfo}</div>
        </div>

        {/* onSubmit 예제 */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => console.log('버튼 클릭됨')}
        >
          제출
        </button>

        {submitData && (
          <div className="mt-4 text-sm text-green-600">
            {submitData}
          </div>
        )}
      </form>
    </div>
  );
};

export default EventsExample;

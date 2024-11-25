import { atom } from "recoil";

// 로컬 스토리지에 저장하는 이유는 세로고침을 이유로 언어 설정이 안풀리도록 하기 위함
export const LangState = atom({
    key: 'LangState',
    default: localStorage.getItem("language") || "kr",
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((nowLang) => {
          localStorage.setItem("language", nowLang); // 상태가 변경될 때 localStorage에 저장
        });
      },
    ],
  });



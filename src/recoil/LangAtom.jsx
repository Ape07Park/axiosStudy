import { atom } from "recoil";

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



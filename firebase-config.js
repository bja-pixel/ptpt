// ── 프로그래밍교수학습 실습실 서버 설정 ──
// Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹) > SDK 설정의 firebaseConfig 값을 아래에 붙여 넣으세요.
window.LAB_CONFIG = {
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:0000000000000000"
  },
  // 교수자(제출 현황·명단 관리) 로 인정할 Google 계정 이메일. firestore.rules 의 목록과 같게 유지하세요.
  teacherEmails: ["iseri2022@gmail.com"]
};

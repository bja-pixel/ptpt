// ── 프로그래밍교수학습 실습실 서버 설정 ──
// Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹) > SDK 설정의 firebaseConfig 값을 아래에 붙여 넣으세요.
window.LAB_CONFIG = {
  firebase: {
    apiKey: "AIzaSyA482P-3DeGJYwkh4aiOUl4CgfuqNUaWFQ",
  authDomain: "ptpt-c3ebf.firebaseapp.com",
  projectId: "ptpt-c3ebf",
  storageBucket: "ptpt-c3ebf.firebasestorage.app",
  messagingSenderId: "1002920730617",
  appId: "1:1002920730617:web:f589eab68c80b1918b6728",
  measurementId: "G-6WWPE46FHL"
  },
  // 교수자(제출 현황·명단 관리) 로 인정할 Google 계정 이메일. firestore.rules 의 목록과 같게 유지하세요.
  teacherEmails: ["20000101.bja@gmail.com"]
};

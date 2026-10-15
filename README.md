# 프로그래밍교수학습 실습실

Python · 데이터 분석 · 머신러닝 12주 실습 앱. 브라우저 안에서 Python을 실행하고, 과제·퀴즈·성찰 기록을 Firebase(Firestore)에 저장합니다. 교수자가 등록한 명단(학번 + 접속 코드)에 있는 학생만 접속할 수 있습니다.

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 본체 (강의 내용·데이터·Python 런타임 포함) |
| `firebase-config.js` | **직접 채워야 하는 파일.** Firebase 웹 앱 설정값 + 교수자 이메일 |
| `firestore.rules` | Firestore 보안 규칙 (Firebase 콘솔에 붙여 넣음) |
| `.nojekyll` | GitHub Pages가 파일을 그대로 서빙하도록 하는 표시 |

## 1. Firebase 프로젝트 만들기 (약 10분)

1. https://console.firebase.google.com 에서 **프로젝트 추가** (이름 예: `pel-lab`). Google 애널리틱스는 꺼도 됩니다.
2. 왼쪽 **빌드 → Authentication → 시작하기 → 로그인 방법** 탭에서 두 가지를 **사용 설정**합니다.
   - **익명** (Anonymous) — 학생용
   - **Google** — 교수자용 (프로젝트 지원 이메일 선택 후 저장)
3. **빌드 → Firestore Database → 데이터베이스 만들기**. 위치는 `asia-northeast3 (서울)`, 모드는 **프로덕션 모드**로 시작합니다.
4. Firestore의 **규칙** 탭을 열어 내용을 전부 지우고 이 저장소의 `firestore.rules` 내용을 붙여 넣은 뒤 **게시**합니다.
   - 규칙 안의 `['iseri2022@gmail.com']` 부분에 교수자 Google 계정 이메일을 넣습니다(여러 명이면 쉼표로 나열).
5. **프로젝트 설정(톱니) → 일반 → 내 앱 → 웹 앱 추가(</>)**. 앱 닉네임을 넣고 등록하면 `firebaseConfig = { apiKey: ..., ... }` 코드가 보입니다. 이 값들을 `firebase-config.js`의 같은 자리에 붙여 넣습니다. `teacherEmails`에도 교수자 이메일을 넣습니다(규칙의 목록과 같게).
6. **Authentication → 설정 → 승인된 도메인**에 GitHub Pages 주소(`사용자이름.github.io`)를 추가합니다. (교수자 Google 로그인 팝업이 이 도메인에서 열리도록 허용)

## 2. GitHub Pages로 배포

1. GitHub에서 새 저장소를 만듭니다(예: `pel-lab`, Public).
2. 이 폴더의 파일 4개(`index.html`, `firebase-config.js`, `firestore.rules`, `README.md`)와 `.nojekyll`을 올립니다. 웹에서 **Add file → Upload files**로 끌어다 놓아도 되고, git을 쓰면:
   ```bash
   git init
   git add .
   git commit -m "실습실 앱 배포"
   git branch -M main
   git remote add origin https://github.com/<사용자이름>/pel-lab.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Build and deployment**에서 Source를 **Deploy from a branch**, Branch를 **main / (root)** 로 저장합니다.
4. 1~2분 뒤 `https://<사용자이름>.github.io/pel-lab/` 에서 앱이 열립니다. 이 주소를 Firebase 승인된 도메인에 추가했는지 확인합니다(1-6).

앱을 수정한 뒤에는 바뀐 `index.html`을 같은 자리에 덮어써서 커밋하면 자동으로 다시 배포됩니다.

## 3. 운영

### 교수자
1. 앱 접속 화면 아래의 **교수자 로그인 (Google)** 으로 로그인합니다(`teacherEmails`에 있는 계정).
2. **제출 현황 → 명단 관리**에 `이름,학번`을 한 줄에 한 명씩 붙여 넣고 **명단 저장**. 학생마다 6자리 **접속 코드**가 자동 생성됩니다. **CSV 내려받기**로 명단+코드를 받아 학생에게 각자 알려 줍니다.
3. 제출 현황 표에서 학생별 진행·제출 상태를 보고, 행을 눌러 코드·실행 결과·성찰을 확인하고 **점수·피드백**을 저장합니다. 학생은 제출 탭에서 봅니다.
4. 코드가 유출되었거나 학생이 잊었으면 **코드 재발급**: 새 코드가 만들어지고 그 학번에 연결된 기기가 모두 끊깁니다.

### 학생
1. 앱 주소를 열고 **학번 + 접속 코드**를 입력합니다. Claude·Google 등 어떤 계정도 필요 없습니다.
2. 한 번 접속한 브라우저는 다음부터 자동으로 들어갑니다. 다른 컴퓨터에서는 같은 학번·코드로 다시 접속하면 기록이 이어집니다.
3. 주차마다 과제·퀴즈를 하고 **제출 탭 → 제출하기**를 누릅니다. 제출 파일(.md) 내려받기는 개인 보관용입니다.

## 4. 데이터 구조 (Firestore)

| 경로 | 내용 | 읽기 | 쓰기 |
|---|---|---|---|
| `roster/{학번}` | 이름, 접속 코드 | 교수자, 본인(연결된 학번) | 교수자 |
| `links/{기기ID}` | 기기(익명 계정) ↔ 학번 연결 | 교수자, 본인 | 본인(코드가 맞을 때만), 교수자 삭제 |
| `submissions/{학번}` | 이름, 주차별 요약(퀴즈 점수·과제 수·제출 시각·점수) | 교수자, 본인 | 교수자, 본인 |
| `submissions/{학번}/modules/{w01…w13}` | 주차 상세: 퀴즈 답, 과제 코드·결과·성찰, 교수자 점수·피드백 | 교수자, 본인 | 교수자, 본인 |

학생은 다른 학생의 문서를 읽거나 쓸 수 없습니다(규칙으로 서버에서 막힘). 학기 말에는 제출 현황의 **요약 CSV 내려받기**로 백업해 두세요. Firestore 무료 할당량(일 읽기 5만·쓰기 2만)은 한 반 규모의 수업에 충분합니다.

## 5. 문제가 생기면

- 상단에 **서버 설정 없음**: `firebase-config.js`가 비어 있거나 잘못됨.
- 접속 시 **익명 로그인이 켜져 있지 않습니다**: Authentication에서 익명 로그인을 사용 설정.
- 교수자 로그인 후 **불러오지 못했습니다 / permission**: `firestore.rules`의 교수자 이메일 목록 확인 후 규칙 다시 게시.
- 교수자 로그인 팝업이 막힘: 승인된 도메인에 `github.io` 주소 추가.
- **Python 엔진을 불러오지 못했습니다**: `cdnjs.cloudflare.com` 접속이 막힌 네트워크. 다른 네트워크에서 확인.

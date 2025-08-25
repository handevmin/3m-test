# 3M 제품 분석기

모바일 웹앱을 통해 카메라로 사진을 촬영하고, OpenAI GPT를 이용하여 3M 제품을 자동으로 식별하고 분석하는 웹 애플리케이션입니다.

## 주요 기능

- **모바일 친화적 UI**: 모바일 기기에서 최적화된 반응형 디자인
- **카메라 촬영**: 웹 브라우저를 통한 실시간 카메라 접근 및 사진 촬영
- **AI 기반 제품 분석**: OpenAI GPT-4o-mini를 활용한 3M 제품 식별 및 매칭
- **실시간 결과 표시**: 분석 결과를 표 형태로 명확하게 표시

## 사용 방법

### 1. 준비사항
- OpenAI API 키 (https://platform.openai.com/api-keys)
- Vercel 계정 (배포용)
- 카메라가 있는 모바일 기기 또는 컴퓨터

### 2. 배포 방법 (Vercel)

1. **GitHub에 프로젝트 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [your-github-repo-url]
   git push -u origin main
   ```

2. **Vercel에 배포**
   - [Vercel](https://vercel.com)에 로그인
   - "New Project" 클릭
   - GitHub 저장소 선택하여 배포

3. **환경변수 설정**
   - Vercel 대시보드 → Project → Settings → Environment Variables
   - 새 환경변수 추가:
     - Name: `OPENAI_API_KEY`
     - Value: [your-openai-api-key]
   - 저장 후 다시 배포

### 3. 로컬 개발

1. **로컬 서버 실행**
   ```bash
   # Vercel CLI 설치 및 실행 (권장)
   npm i -g vercel
   vercel dev
   
   # 또는 일반 웹 서버 (API 기능 제한됨)
   python -m http.server 8000
   ```

2. **환경변수 설정 (로컬)**
   - 프로젝트 루트에 `.env.local` 파일 생성:
     ```
     OPENAI_API_KEY=your-openai-api-key-here
     ```

### 4. 사용 방법

1. **웹 앱 접속**
   - 배포된 URL 또는 `http://localhost:3000` (vercel dev 사용시)

2. **사진 촬영 및 분석**
   - "카메라 시작" → 카메라 활성화
   - "사진 촬영" → 제품 사진 촬영
   - "분석하기" → AI 분석 시작

### 5. 분석 결과

분석 결과는 다음과 같은 형태로 제공됩니다:

| 사진속제품정보 | 매칭된 제품명 | SKU |
|---|---|---|
| 노란색 포스트잇 | POST-IT노트(656 노랑) | 56169 |
| 파란색 스카치테이프 | 3M스카치다용도테이프디스펜서 | 56265 |

## 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI**: OpenAI GPT-4o-mini Vision API
- **Camera**: MediaDevices WebRTC API
- **Design**: 모바일 우선 반응형 디자인

## 파일 구조

```
3M 테스트/
├── api/
│   └── analyze.js      # Vercel API 라우트 (OpenAI 호출)
├── public/
│   ├── index.html      # 메인 HTML 파일
│   ├── style.css       # 스타일시트
│   └── script.js       # JavaScript 로직
├── package.json        # 프로젝트 설정
├── .gitignore          # Git 무시 파일 목록
└── README.md           # 사용 가이드
```

## 🔒 보안 및 아키텍처

- **서버사이드 API**: OpenAI API 키는 Vercel 서버에서만 사용되어 클라이언트에 노출되지 않습니다.
- **환경변수**: API 키는 Vercel 환경변수로 안전하게 관리됩니다.
- **HTTPS 자동**: Vercel이 자동으로 HTTPS를 제공하여 카메라 API를 안전하게 사용할 수 있습니다.
- **무료 배포**: Vercel의 무료 플랜으로도 충분히 사용 가능합니다.

## 지원하는 3M 제품 카테고리

- **사무메모**: Post-it 노트, 플래그, 인덱스 탭 등
- **사무테이프**: 스카치 테이프, 매직 테이프, 양면 테이프 등
- **수세미**: 스카치브라이트 각종 수세미
- **청소용품**: 클리너, 청소포, 행주 등
- **접착제품**: 코맨드 훅, 양면테이프, 접착제 등
- **생활용품**: 후레쉬 제품군, 장갑, 이어플러그 등

## 주의사항

- **카메라 권한**: 브라우저에서 카메라 접근 권한을 허용해야 합니다
- **HTTPS 필수**: 카메라 API 사용을 위해 HTTPS 환경이 필요합니다
- **API 사용량**: OpenAI API 사용량에 따른 비용이 발생할 수 있습니다
- **정확도**: AI 분석 결과는 참고용이며, 최종 확인은 사용자가 직접 해야 합니다

## 브라우저 호환성

- Chrome (권장)
- Firefox
- Safari (iOS 11+)
- Edge

## 문제 해결

### 배포 관련 문제
1. **환경변수 설정**: Vercel 대시보드에서 `OPENAI_API_KEY`가 올바르게 설정되었는지 확인
2. **재배포**: 환경변수 변경 후 반드시 재배포 필요
3. **API 라우트 오류**: Vercel 함수 로그에서 오류 확인

### 카메라 관련 문제
1. **HTTPS 필수**: Vercel은 자동으로 HTTPS를 제공하므로 문제없음
2. **브라우저 권한**: 카메라 접근 권한을 허용했는지 확인
3. **모바일 호환성**: iOS Safari, Android Chrome에서 테스트 완료

### API 호출 문제
1. **크레딧 확인**: OpenAI 계정에 충분한 크레딧이 있는지 확인
2. **네트워크**: 클라이언트와 Vercel 서버 간 연결 상태 확인
3. **로그 확인**: Vercel 대시보드에서 함수 실행 로그 확인

## 라이선스

이 프로젝트는 개인 사용 및 학습 목적으로 제작되었습니다.

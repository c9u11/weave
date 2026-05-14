# Weave — 디자인 시스템

> **Direction**: **Wave** (파도·흐름·깊이)
> **무드**: 차분 · 흐름 · 깊이. 산만한 시작을 하나의 결로 모은다.
> 어셋: `assets/logo.svg`

---

## 1. 브랜드 한 줄

> 시작에 헤매는 0→1 구간을 AI 가 한 줄로 안내한다.
> 흩어진 아이디어를 하나의 흐름으로 엮어, 익숙한 도구에 그대로 떠나보낸다.

**Weave** 는 `weave`(엮다) + `wave`(파도) 의 이중 의미. 직조의 짜임새와 파도의 결을 함께 가져간다.

---

## 2. 무드 보드

### 키워드
- **차분 (Calm)** — 강한 워밍 컬러·과도한 그라데이션 금지. 위계는 색의 채도 차이가 아니라 명도 차이로.
- **흐름 (Flow)** — 단계 간 전환·로딩·hover 가 600ms 안팎의 느슨한 ease-out 으로 이어진다.
- **깊이 (Depth)** — primary 의 3단 스케일(light/base/dark)이 그대로 정보 위계가 된다. 본문은 dark, 메인 CTA 는 base, 보조 표면은 light.

### 톤 가이드
- **Do** — 넉넉한 여백, 단단하게 둥근 모서리(14–18px), 옅은 blue-tinted shadow.
- **Don't** — 두꺼운 1px 검정 보더, 무지개 그라데이션, 그림자 남발.

---

## 3. 로고

### 어셋
- **`public/logo.svg`** (125×125 viewBox, 단일 path 4개 — `0`·`W` 좌·`W` 우·`1`)

### 사용 규칙

| 사이즈 | 용도 |
|---|---|
| 24~32px | 헤더·네비게이션·favicon |
| 56~96px | 앱 내 hero·온보딩 |
| 200px+ | 마케팅·OG 이미지 |

### 색상 규칙
- 라이트 배경 → `--color-primary` (`#566CCC`) fill
- 다크 배경 → `--color-paper` (`#F6F7FB`) fill
- 인라인 SVG 사용 시 `currentColor` 로 두고 부모에 `text-primary` 적용 권장.

### 워드마크
- 로고 우측에 **Pretendard SemiBold "Weave"**, 자간 `-0.03em`, 사이즈 = 로고 높이 × 0.6.

### 스플래시 모션
0(좌상단) → W(중심선 따라 stroke 풀어내기) → 1(우상단 튀어오름). 전 구간 back-out easing `cubic-bezier(0.34, 1.56, 0.64, 1)` 으로 톡톡 두드리는 리듬을 만든다. (구현: `src/pages/prototype/Splash.tsx`)

---

## 4. 컬러 팔레트 (Wave)

### 코어 — Primary 3단 스케일이 곧 위계
| 토큰 | HEX | 용도 |
|---|---|---|
| `--color-primary` | `#566CCC` | 메인 CTA·헤딩 강조·로고·링크 |
| `--color-primary-light` | `#8694DF` | 보조 표면·서브 강조·hover state |
| `--color-primary-dark` | `#3C4883` | **본문 텍스트**·딥 강조·진한 1순위 CTA |
| `--color-accent` | `#3C4883` | `primary-dark` 의 alias (별도 accent 없음) |
| `--color-accent-soft` | `#E8EBF7` | 옅은 primary 틴트 — 배지·하이라이트 bg |

### Surfaces — Cool 뉴트럴
| 토큰 | HEX | 용도 |
|---|---|---|
| `--color-paper` | `#F6F7FB` | 페이지 배경 |
| `--color-surface` | `#FFFFFF` | 카드·패널 |
| `--color-surface-alt` | `#EEF1F8` | 입력·서브 표면 |
| `--color-border` | `#E3E6F0` | 디바이더·테두리 |
| `--color-muted` | `#64748B` | 보조 텍스트 (slate-500) |

### 페르소나 6색 (유지)
페르소나/팀원 아바타에만 한정 사용. cool primary 와 충돌하지 않도록 일반 UI 에는 절대 쓰지 않는다.

| 페르소나 | HEX | 키 |
|---|---|---|
| 사용자 입장 | `#FB923C` | `--persona-user` |
| 회의적 동료 | `#A78BFA` | `--persona-skeptic` |
| 현실 체크 | `#34D399` | `--persona-realist` |
| 심사위원 | `#F87171` | `--persona-judge` |
| 시간 관리자 | `#60A5FA` | `--persona-timekeeper` |
| VC 투자자 | `#F472B6` | `--persona-vc` |

### 상태 색
| 상태 | HEX | 용도 |
|---|---|---|
| 합의 (success) | `#10B981` | ✅ 합의 항목 |
| 충돌 (warning) | `#F59E0B` | ⚠️ 충돌 항목 |
| 위험 (danger) | `#EF4444` | 삭제·에러 |
| 정보 (info) | `#3B82F6` | 알림·튜토리얼 |

### 카카오
- `#FEE500` 노란 배경 / `#181600` 검정 텍스트 (브랜드 규정 준수, 변경 금지)

---

## 5. 타이포그래피

### 폰트
- **한국어 + 영문**: Pretendard Variable
- **모노**: SF Mono (코드·기획안 미리보기)
- CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css`

### 스케일
| 토큰 | 사이즈 | line-height | weight | 색 | 용도 |
|---|---|---|---|---|---|
| display | 40px | 1.15 | 700 | primary-dark | 랜딩 hero |
| h1 | 24–28px | 1.2 | 700 | primary-dark | 페이지 제목 (`tracking-tighter`) |
| h2 | 20px | 1.3 | 700 | primary-dark | 섹션 제목 |
| h3 | 17–19px | 1.35 | 600 | primary-dark | 카드 제목 |
| body | 15px | 1.55 | 400 | primary-dark | 본문 |
| sm | 13px | 1.5 | 400 | primary-dark or muted | 보조·캡션 |
| xs | 11px | 1.4 | 400 | muted | 라벨·메타 |
| label | 11px | 1.4 | 700 | muted (uppercase, tracking 0.12em) | 카테고리 라벨 |
| brand | 자유 | — | — | **primary (`#566CCC`)** | 로고·강조 링크·헤드라인의 단어 강조 |

### 자간
- 한글 기본: `-0.02em`
- 영문·헤딩: `-0.03em`
- 라벨/대문자: `+0.12em`

### 색 규칙
- 기본 본문은 항상 `text-primary-dark` (대비 8.6:1).
- `text-primary` (mid-blue) 는 **헤딩의 강조어·링크·CTA 라벨** 등 "브랜드 발화" 에 한정.
- 위계는 사이즈·weight·color 세 변수로 표현 — color 만으로 강조하지 않는다.

---

## 6. 스페이싱 (8px 그리드)

| 토큰 | 값 |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

여백은 위계만큼 중요한 디자인 자산. **줄이지 말고 늘리는** 방향이 Wave 무드에 맞는다.

---

## 7. Border Radius

| 토큰 | 값 | 용도 |
|---|---|---|
| `rounded-sm` | 6px | 작은 배지·뱃지·태그 |
| `rounded-md` | 10px | 입력·기본 버튼 |
| `rounded-lg` | 14px | **카드 (디폴트)** |
| `rounded-xl` | 18px | 큰 컨테이너·모달·hero 이미지 |
| `rounded-full` | 9999px | 아바타·pill·칩 |

Wave 무드는 **lg/xl 위주**. 카드는 무조건 `rounded-lg` 이상. 8px 미만의 모서리는 브랜드와 부조화 — 쓰지 말 것.

---

## 8. Shadow (Blue-tinted)

primary-dark `#3C4883` (= rgb 60,72,131) 을 베이스로 한 옅은 푸른 그림자. 슬레이트 그림자보다 한 톤 더 깊이감 있는 인상.

| 토큰 | 값 | 용도 |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(60,72,131,0.06)` | 카드 정적 상태 |
| `shadow-md` | `0 4px 14px rgba(60,72,131,0.10)` | 카드 hover·떠있는 요소 |
| `shadow-lg` | `0 12px 36px rgba(60,72,131,0.14)` | 모달·드롭다운 |

그림자는 **sm 위주**. md 는 hover 한정, lg 는 모달·드롭다운에만.

---

## 9. Motion

흐름(Flow) 키워드를 살리는 느슨한 transition.

| 속성 | 값 | 용도 |
|---|---|---|
| duration 기본 | `200ms` | hover·focus 같은 작은 상태 변화 |
| duration Wave | `600ms` (`duration-wave`) | 페이지 전환·hero·splash 같은 큰 흐름 |
| easing 기본 | `ease-out` | 일반 UI |
| easing Wave | `cubic-bezier(0.22, 0.61, 0.36, 1)` (`ease-wave`) | 큰 흐름 — 시작은 빠르고 끝은 부드럽게 |
| easing Back-out | `cubic-bezier(0.34, 1.56, 0.64, 1)` | "톡 박히는" 인터랙션 (splash·tap) |

`tailwind.config.js` 에 `transitionDuration.wave: '600ms'`, `transitionTimingFunction.wave: cubic-bezier(...)` 등록 완료.

---

## 10. 컴포넌트

### 10-1. 버튼
| 변형 | 배경 | 텍스트 | 용도 |
|---|---|---|---|
| Primary | `primary` (`#566CCC`) | `paper` (`#F6F7FB`) | 메인 CTA |
| Accent | `accent` (= primary-dark `#3C4883`) | `#FFFFFF` | 딥 강조 CTA (1순위) |
| Outline | transparent + 1.5px `primary` | `primary` | 보조 액션 |
| Ghost | transparent | `primary-dark` | 인라인 액션 |
| Kakao | `#FEE500` | `#181600` | 카카오 로그인·공유 |

공통: padding `12px 20px`, `rounded-md`, font-weight 600, font-size 15px, `transition-opacity`.

### 10-2. 카드
- bg `surface` (`#FFFFFF`), border `border` (`#E3E6F0`), `rounded-lg`, padding `20px`
- hover 시 `shadow-md` 만 변경 (테두리·배경은 그대로 — 차분함)

### 10-3. Idea Card (썸네일)
- 썸네일 영역: `image` 가 있으면 `<img object-cover object-top>`, 없으면 cool primary 그라데이션 + 이모지
- 그라데이션 8종은 모두 `linear-gradient(135deg, #XXXXX22~33, #XXXXX44)` 형식의 primary scale 틴트
- "AI 생성" 배지는 우상단, `bg-primary/70 text-paper rounded-full`

### 10-4. 입력 필드
- bg `surface-alt` (`#EEF1F8`), border `border`, `rounded-md`, padding `12px 16px`
- focus: border `primary`, outline 제거
- placeholder: `muted`

### 10-5. 아바타
- 원형, 페르소나/팀원 색상 + 흰색 이니셜
- 사이즈: sm 22px / md 32px / lg 48px
- 폰트 700

### 10-6. 댓글
- bg `paper`, border `border`, `rounded-md`, padding `12px`
- 작성자 이름 13px 700, 본문 12px 400, 시간 11px muted
- "target" 라벨이 있으면 `bg-accent-soft` + `text-accent` (소프트 primary 틴트)

### 10-7. Hero 이미지 (PDF 목업 자리)
- `rounded-lg`, `overflow-hidden`, `bg-surface-alt` 백킹
- `<img object-cover object-top>` 으로 헤드라인이 카드 상단에 잡히게

### 10-8. Stepper
- 단계 칸: `bg-border` (미진행), `bg-primary` (현재), `bg-primary-dark` (완료)
- 높이 4px, gap 6px

### 10-9. Badge
- pill, padding `2px 8px`, 11px 700
- variants: default(bg `border`, text `primary-dark`), accent(bg `accent`, text white), soft(bg `accent-soft`, text `accent`)

### 10-10. Notification Item
- bg `surface-alt`, border `border`, `rounded-md`
- 읽지 않음: `bg-accent-soft` + left-border `primary`
- 아이콘 색은 알림 type 별로 (`comment`/`rating`/`member`/`deadline` 은 분류 색, `ai` 만 `primary` — 우리 시그니처)

---

## 11. 아이콘
- **방향**: Lucide React (stroke 1.5px, `currentColor`)
- 일관성 우선 — Lucide 와 이모지 혼용 금지. 이모지는 썸네일·카테고리 칩 등 "표현" 영역에만, UI 컨트롤은 Lucide.

---

## 12. CSS 변수 / Tailwind 토큰

### `:root` (현재 `src/index.css` 동기화 완료)
```css
:root {
  --color-primary: #566CCC;
  --color-primary-light: #8694DF;
  --color-primary-dark: #3C4883;
  --color-accent: #3C4883;
  --color-accent-soft: #E8EBF7;
  --color-paper: #F6F7FB;
  --color-surface: #FFFFFF;
  --color-surface-alt: #EEF1F8;
  --color-border: #E3E6F0;
  --color-muted: #64748B;
  /* 페르소나·상태·카카오는 변경 없음 */
}
```

### Tailwind 클래스
- `bg-primary` / `bg-primary-light` / `bg-primary-dark`
- `bg-accent` (= primary-dark) / `bg-accent-soft` (옅은 틴트)
- `bg-paper` / `bg-surface` / `bg-surface-alt`
- `border-border` / `text-muted`
- `shadow-sm` / `shadow-md` / `shadow-lg` (blue-tinted)
- `duration-wave` / `ease-wave`

---

## 13. Do / Don't

### Do ✓
- 본문은 `text-primary-dark`, 헤딩 강조어·CTA 라벨은 `text-primary`, 보조 표면은 `bg-primary-light/20` 같은 알파 틴트.
- 그라데이션은 primary scale 의 알파 틴트만. 채도 강한 무지개 금지.
- 카드는 `rounded-lg` 이상.
- 큰 전환은 `duration-wave ease-wave`.

### Don't ✗
- `text-primary` 를 본문 전체에 적용 (대비 sub-AA).
- 페르소나 색을 일반 UI 에 (혼동).
- 워밍 컬러(#B45309, #FCD34D, #FB923C 등) 를 일반 UI 강조에. 페르소나·상태색 외 사용 금지.
- 두꺼운 검정 그림자 / 4px 미만 모서리.

---

## 14. 변경 이력

| 일자 | 변경 |
|---|---|
| 2026-05-14 | **Wave 방향으로 전환** — Primary 3단 blue/purple, cool 뉴트럴, blue-tinted shadow, motion 토큰 신설, 페르소나는 유지. (이전: Thread 방향, 인디고 + 머스타드 + 페이퍼) |

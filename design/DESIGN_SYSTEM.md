# Weave Design System

Figma 스크린샷 9종(`design/*.png`)을 기준으로 추출한 디자인 토큰·컴포넌트·레이아웃 규칙. 이 문서가 흐트러지지 않게 모든 화면 구현의 기준이 된다.

기준 단말: iPhone 14 Pro (393 × 852 logical px). 한글 본문 기준이라 letter-spacing은 살짝 좁힘.

---

## 0. Prototype 제약 (모든 구현에 우선)

이 결과물은 **실제 동작 서비스가 아니라 프로토타입**이다. 심사위원·사용자가 흐름을 따라가며 서비스를 파악하는 것이 목적.

### 0.1 흐름은 절대 막히지 않는다
- 모든 화면에 **다음으로 가는 경로**와 **뒤로 돌아가는 경로**가 함께 존재해야 한다.
- 뒤로가기는 헤더 좌측 `<` chevron, in-content back 링크, 또는 둘 다로 보장.
- 모달·시트·결과 화면도 닫기/돌아가기 경로 필수.
- 새 화면을 추가할 때 "여기서 어떻게 빠져나가는가"를 먼저 정의하고 만든다.

### 0.2 모바일 상단바는 코드에 그리지 않는다
- Figma 시안에는 9:41 시계, 다이나믹 아일랜드, 신호/Wi-Fi/배터리 아이콘이 그려져 있지만 **실제 프로토타입 코드에는 그리지 않는다**.
- 프로토타입은 실제 배포된 서비스처럼 보여야 한다 — 상단바 시뮬레이션이 있으면 "Figma 목업"으로 보이고 시연 몰입이 깨진다.
- 이 문서의 모든 페이지 매핑·컴포넌트 규칙은 **상단바를 제외한 영역**을 기준으로 한다.
- 페이지는 실제 헤더(back + 타이틀)부터 시작.

---

## 1. Color tokens

Tailwind 클래스명은 `tailwind.config.js`와 동일하다.

### Brand · Primary scale (Wave blue/purple)
| Token | HEX | 용도 |
|---|---|---|
| `primary` | `#566CCC` | 메인 CTA, 진행바 fill, 사용자 채팅 버블, 스플래시 배경 |
| `primary-light` | `#8694DF` | 보조 강조, 그라데이션 끝점, 작은 강조 |
| `primary-dark` | `#3C4883` | 딥 강조, 본문 강조 텍스트, 섀도우 베이스 |
| `accent-soft` | `#E8EBF7` | 선택된 카드 배경, 배지 bg, 소프트 하이라이트 |

> 사용 규칙: 단일 화면에서 primary 색조는 **3 stop 이상 섞지 않는다** (예: dark + soft + white 정도). 너무 많이 섞이면 채도가 흐트러진다.

### Surface · Neutral (Cool tone)
| Token | HEX | 용도 |
|---|---|---|
| `surface` | `#FFFFFF` | 카드, 입력창, 기본 페이지 |
| `paper` | `#F6F7FB` | 페이지 배경(스크롤 컨테이너), 비활성 카드 |
| `surface-alt` | `#EEF1F8` | 미세 구분 영역, 비활성 토글 트랙 |
| `border` | `#E3E6F0` | 1px 카드 테두리, divider |
| `muted` | `#64748B` | 보조 텍스트(서브카피, 캡션, 타임스탬프) |

본문 텍스트는 별도 토큰 없이 `text-neutral-900` 또는 `#0F172A` 계열의 짙은 회흑색을 쓴다(Tailwind 기본 `slate-900` 사용 OK).

### State · Semantic
| Token | HEX | 용도 |
|---|---|---|
| `success` | `#10B981` | 성공 알림, 완료 체크 |
| `warning` | `#F59E0B` | 경고, 마감 임박 강조 |
| `danger` | `#EF4444` | 삭제·오류 |
| `info` | `#3B82F6` | 정보 노티스 |

### Persona (페르소나 카드/말풍선용)
| 페르소나 | HEX |
|---|---|
| user (오렌지) | `#FB923C` |
| skeptic (퍼플) | `#A78BFA` |
| realist (그린) | `#34D399` |
| judge (레드) | `#F87171` |
| timekeeper (블루) | `#60A5FA` |
| vc (핑크) | `#F472B6` |

### Vendor
| Token | HEX | 용도 |
|---|---|---|
| `kakao` | `#FEE500` | 카카오 로그인 버튼 bg |
| `kakao.text` | `#181600` | 카카오 버튼 텍스트 |

---

## 2. Typography

폰트: **Pretendard Variable** → Pretendard → system-ui fallback. 한글이므로 `letter-spacing: -0.02em`(`tracking-tight`) 디폴트.

| Role | Size / Line | Weight | Tailwind |
|---|---|---|---|
| Display (로고) | 32 / 40 | 700 | `text-3xl font-bold` |
| H1 (페이지 제목) | 26 / 34 | 700 | `text-[26px] font-bold tracking-tight` |
| H2 (섹션 제목) | 20 / 28 | 700 | `text-xl font-bold tracking-tight` |
| H3 (카드 타이틀) | 17 / 24 | 600 | `text-[17px] font-semibold` |
| Body | 16 / 24 | 400 | `text-base` |
| Body strong | 16 / 24 | 600 | `text-base font-semibold` |
| Sub / Sublabel | 14 / 20 | 400 | `text-sm text-muted` |
| Caption / Timestamp | 12 / 16 | 400 | `text-xs text-muted` |
| Button label | 16 / 24 | 600 | `text-base font-semibold` |

규칙:
- 본문 어두운 색은 별도 토큰 없이 `text-slate-900`. 강조 본문은 `text-primary-dark`.
- 보조 텍스트(`사용량`, `2026.05.18 ...`)는 전부 `text-muted` + `text-sm`.
- D-day, 가격 같은 숫자 강조는 H1 굵기 + `text-primary-dark`.

---

## 3. Spacing & Layout

기본 8pt 그리드. 단위는 Tailwind 클래스(`p-5` = 20px).

| 토큰 | px | 용도 |
|---|---|---|
| 1 | 4 | 아이콘 ↔ 라벨 미세 간격 |
| 2 | 8 | 칩 내부, 작은 갭 |
| 3 | 12 | 리스트 row 위/아래 패딩 |
| 4 | 16 | 일반 카드 내부, 폼 row 갭 |
| 5 | 20 | **페이지 horizontal padding 표준** |
| 6 | 24 | 섹션 사이 갭 |
| 8 | 32 | 큰 섹션 사이 갭 |

페이지 레이아웃 규칙:
1. 페이지 컨테이너: `max-w-[440px] mx-auto px-5 pt-3 pb-24` (모바일 컨테이너 + 하단 CTA 영역 확보).
2. 페이지 최상단은 **실제 헤더(back + 타이틀) 행**이다. 모바일 상단바(9:41/노치 등)는 그리지 않는다 (§0.2).
3. 상단 헤더 영역 높이: 56 (back button row).
4. 진행바(progress)는 헤더 아래 24~32 간격 후 노출.
5. **고정 하단 CTA**가 있는 화면은 콘텐츠에 `pb-32` 이상 부여하여 가림 방지.
6. 카드 간 세로 간격: `space-y-4`(16) 또는 `space-y-6`(24) 두 가지로만.

---

## 4. Radius

| Token | px | 용도 |
|---|---|---|
| `rounded-md` | 10 | 작은 칩, 작은 인풋 |
| `rounded-lg` | 14 | 일반 카드, 인풋, 버튼(스플래시 로그인) |
| `rounded-xl` | 18 | 큰 카드, 이미지 카드 |
| `rounded-2xl` | 20 | 메인 CTA 버튼, 큰 컨테이너 카드 |
| `rounded-full` | — | 진행바, 칩 배지, 채팅 버블, 아바타, FAB |

규칙: **버튼은 `rounded-2xl` 또는 `rounded-full` 중 하나로 통일.** 화면 내에서 섞지 않는다. 현재 디자인은 `rounded-2xl` 우세.

---

## 5. Shadow & Elevation

푸른 톤이 빠지면 어색해지므로 그림자 베이스는 `#3C4883` (= primary-dark).

| Token | 값 | 용도 |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(60,72,131,0.06)` | 카드 hover, 미세 입체 |
| `shadow-md` | `0 4px 14px rgba(60,72,131,0.10)` | 일반 카드, FAB, 모달 시트 |
| `shadow-lg` | `0 12px 36px rgba(60,72,131,0.14)` | 떠 있는 큰 카드, 댓글 시트 |

규칙: 페이지 배경이 `paper`(#F6F7FB)일 때 흰 카드는 그림자 없이 `border` 1px만 써도 분리감이 충분하다. **border와 shadow 둘 중 하나만 쓴다.**

---

## 6. Motion

| Token | 값 | 용도 |
|---|---|---|
| `ease-wave` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | 일반 전환 (페이지/카드 in) |
| `duration-wave` | 600ms | 페이지 전환, 큰 모션 |
| 기본 인터랙션 | 150~200ms / `ease-out` | 버튼 press, hover |

규칙: 페이지 진입은 `translate-y-2 → 0 + opacity 0 → 1` (wave easing). 클릭 피드백은 `scale-95 active:scale-95` + 150ms.

---

## 7. Components

### 7.1 Button

| Variant | bg | text | radius | height | 용도 |
|---|---|---|---|---|---|
| `primary` | `primary` | white | `rounded-2xl` | 56 | 메인 CTA (다음, 시작하기, 결제) |
| `outline` | white | `primary-dark` | `rounded-2xl` | 56 | 보조 CTA (링크 공유하기) |
| `kakao` | `kakao` | `kakao.text` | `rounded-lg` | 56 | 카카오 로그인 |
| `google` | white + border | slate-900 | `rounded-lg` | 56 | 구글 로그인 |
| `ghost-link` | transparent | `muted` | — | — | "결정을 못하겠어요 (건너뛰기)" 같은 텍스트 링크 |
| `fab` | `primary` | white | `rounded-full` | 56 | 홈 우측 하단 (✦ 아이콘) |

모든 풀폭 버튼: `w-full text-base font-semibold`. 비활성 상태는 `bg-surface-alt text-muted`.

### 7.2 Card

기본 형태: `bg-white border border-border rounded-2xl p-5`.

| 변형 | 차이 |
|---|---|
| 일반 카드 | 위 기본 |
| **선택된 카드** | `border-2 border-primary bg-accent-soft` (예: Plus 플랜) |
| 그룹 카드 (리스트형) | `divide-y divide-border` 내부 row, row 패딩 `py-4` |
| 이미지 카드 | `aspect-square rounded-xl overflow-hidden` |
| 정보 노티스 카드 | `bg-accent-soft` + 아이콘 + 본문 (예: "기획안이 완성 되었어요!") |

### 7.3 Input / Select-row

- **Text input**: `h-14 px-4 rounded-2xl border border-border bg-white text-base placeholder:text-muted`.
- **Select row** (온보딩 폼처럼 값 + chevron): `flex items-center justify-between py-4`, 라벨 위에 `text-base font-semibold`, 값 아래에 `text-sm text-muted`, 우측 chevron-right `text-muted`.
- **Chat input**: 풀폭 `rounded-2xl bg-white border border-border h-14 px-4`, 좌측 placeholder, 우측 send icon.

### 7.4 Chip / Badge

- Soft chip: `inline-flex items-center px-3 py-1 rounded-full bg-accent-soft text-primary-dark text-sm font-semibold`.
- 플랜 배지(작은 "Plus"): `px-2 py-0.5 rounded-md bg-accent-soft text-primary text-xs font-semibold`.
- 카운트 칩(좋아요/댓글): `inline-flex items-center gap-1 text-muted text-sm` + 아이콘 16px.

### 7.5 Progress bar

- 라이너 바: `h-1.5 rounded-full bg-surface-alt overflow-hidden`, fill `bg-primary rounded-full`.
- 진행 단계 도트 (홈 카드의 4단계): 16px 원, 활성 `bg-primary`, 비활성 `bg-surface-alt`, 도트 사이에 1px 선 `bg-border`. 각 도트 아래 `text-xs text-muted` 라벨.

### 7.6 Avatar / Persona label

- 아바타 원: 28~32px, `rounded-full`, 단색 배경 + 이니셜 흰색.
- 페르소나 댓글: 좌측 `rounded-full` 아바타 (`bg-persona.*`) + 이름 라벨, 우측에 본문. 댓글 사이 `space-y-4`.

### 7.7 Comment sheet (Bottom sheet)

- 컨테이너: `rounded-t-3xl bg-white shadow-lg`, 상단 `w-10 h-1 rounded-full bg-border` (drag handle).
- 헤더 "댓글" `text-xl font-bold`, 패딩 `p-5`.
- 인풋 영역은 시트 하단 고정, 자기 아바타 + input.

### 7.8 Chat (AI 대화)

- 사용자 버블: `bg-primary text-white rounded-2xl px-4 py-3 max-w-[80%] ml-auto`.
- AI 응답: **버블 없이 본문 텍스트만** `text-slate-900 text-base leading-7`. 위에 상태 라벨 (`✦ AI 입력 중`) `text-primary font-semibold`.
- 스파클 아이콘(`✦`)은 `text-primary`, 16px.

### 7.9 Top bar / Navigation

- 페이지 상단: 좌측 `<` back (24px chevron, no fill) + 중앙/좌측 타이틀, 우측 메뉴/벨.
- **모든 화면(홈 포함)은 뒤로 갈 수 있는 경로를 보장한다** (§0.1). 홈처럼 back chevron이 없는 화면은 사용자 메뉴/햄버거/in-content 링크로 이전 단계 진입을 보장.
- 아이콘은 lucide-react 24px stroke-1.5 기본.
- iOS status bar(9:41/노치/시그널) 시뮬레이션은 코드에 넣지 않는다 (§0.2).

### 7.10 Bottom CTA bar

- 페이지 하단 고정: `fixed bottom-0 left-0 right-0 px-5 pb-6 pt-3 bg-white/95 backdrop-blur` (단, 정적 시안엔 backdrop 없이도 OK).
- 단일 버튼 또는 텍스트 링크 + 버튼 2단 구성.

---

## 8. Iconography

- 라이브러리: `lucide-react` (이미 설치됨).
- 기본 크기 24, stroke 1.5, 색상은 컨테이너 텍스트 색 상속(`currentColor`).
- 이모지는 카피용으로만(예: 👋, ✅). UI 아이콘은 lucide 통일.

---

## 9. 페이지별 적용 매핑

| Figma 시안 | 라우트 후보 | 핵심 컴포넌트 |
|---|---|---|
| `첫 화면.png` | `/` (로그인) | primary 배경, Display 로고, google/kakao 버튼 |
| `수정_온보딩 단계_01.png` | `/onboard/welcome` | Display + Subhead, 칩들, outline + primary 2버튼 |
| `수정_온보딩 단계_01-1.png` | `/onboard/project` | progress bar, 그룹 카드(select-row), primary CTA |
| `수정_온보딩 단계_01-2.png` | `/onboard/plan` | progress bar, 카드 3개(1개 selected), primary CTA |
| `홈.png` | `/home` | 사용자 헤더, 프로젝트 카드(D-day + 4-step 도트), 그리드, FAB |
| `AI 채팅.png` | `/idea/:id/chat` | top bar, 사용자 버블, AI 본문 + 상태 라벨, chat input |
| `투표 진행.png` | `/vote` | progress bar, 큰 이미지 카드, ghost-link 건너뛰기 |
| `아이디어 상세.png` + `-1.png` | `/idea/:id` | top bar, 이미지 갤러리, 섹션(설명/기능/타깃/차별성/리스크), 댓글 시트, 카운트 칩 |
| `최종 기획안 확인.png` | `/proposal/final` | 정보 노티스 카드, PDF 미리보기, 메트릭 칩, 내보내기 카드(Docx/Canva) |

---

## 10. Do / Don't

**Do**
- 페이지 컨테이너는 항상 `max-w-[440px] mx-auto px-5`.
- 카드는 border-only 또는 shadow-only 중 하나만.
- 한글 본문엔 `tracking-tight`를 거의 항상.
- 같은 화면에서 버튼 radius 일관(전부 `rounded-2xl`).
- 진행 단계/CTA는 항상 primary scale 안에서.

**Don't**
- accent-soft 위에 또 accent-soft 카드 겹치지 않기 (콘트라스트 사라짐).
- shadow + border 동시 사용 금지.
- 컴포넌트 색을 임의로 hex 박지 말고 토큰 사용.
- 본문 글자에 primary 색 남발 금지 (강조 라벨만).
- 너무 많은 radius 종류 혼용 금지 (한 화면 최대 2종).
- 모바일 상단바(9:41/노치/시그널) 코드에 그리지 않기 (§0.2).
- 다음 단계 또는 뒤로 경로가 없는 막다른 화면 만들지 않기 (§0.1).

---

## 11. 바이브 코딩 페이지 추가 시 가이드

핵심 9페이지 사이를 채우는 화면(예: 로딩, 빈 상태, 에러, 설정 등)은 다음 원칙으로:

1. **새 컬러 토큰 추가 금지** — 위 팔레트 안에서 해결.
2. **새 컴포넌트 만들기 전에 §7 카탈로그 확인.** 80%는 변형으로 처리 가능.
3. 페이지 골격은 `홈` 또는 `온보딩 단계 1-1` 중 하나의 골조를 베이스로.
4. 헤더·진행바·하단 CTA의 위치/높이는 §3, §7.9, §7.10을 그대로 따른다.
5. 일러스트/이미지를 넣을 땐 `rounded-xl` + `border` 또는 `bg-accent-soft` 캔버스에 얹는다.

이 규칙 안에서만 움직이면 디자인 분위기가 흐트러지지 않는다.

# Weave — 디자인 시스템

> **Direction**: Thread (직조·페이퍼·따뜻함)
> **무드**: 차분 + 직조 + 친근. "헤매지 않게 데려가는 가이드".
> 어셋: `logo.svg`

---

## 1. 브랜드 한 줄

> 시작에 헤매는 0→1 구간을 AI가 한 줄로 안내한다.
> 흩어진 아이디어를 하나의 흐름으로 엮어, 익숙한 도구에 그대로 떠나보낸다.

---

## 2. 로고

### 어셋
- **`assets/logo.svg`** (125×125 viewBox, single path)

### 사용 규칙

| 사이즈 | 용도 |
|---|---|
| 32~48px | 헤더·네비게이션·favicon |
| 80~120px | 랜딩 hero·온보딩 |
| 200px+ | 마케팅·OG 이미지 |

### 색상 규칙
- 라이트 배경 → 인디고(`#1E1B4B`) fill
- 다크 배경 → 페이퍼(`#F5F0E6`) fill
- SVG 내부 `fill="black"`은 CSS로 오버라이드 권장:

```css
.logo svg path { fill: var(--color-primary); }
```

### 클리어 스페이스
로고 주변 **최소 logo 높이의 25%** 여백 확보.

### 워드마크 동반 시
- 로고 우측에 **Pretendard SemiBold "Weave"**
- 자간 `-0.03em`, 사이즈 = 로고 높이 × 0.6

---

## 3. 컬러 팔레트 (Thread)

### 코어
| 토큰 | HEX | 용도 |
|---|---|---|
| `--color-primary` | `#1E1B4B` | 본문·CTA·로고·헤딩 |
| `--color-accent` | `#B45309` | 강조·링크·서브 CTA |
| `--color-accent-soft` | `#FCD34D` | 하이라이트·AI 메시지·뱃지 |
| `--color-bg` | `#F5F0E6` | 페이지 배경 (페이퍼) |
| `--color-surface` | `#FFFAF0` | 카드·패널 |
| `--color-surface-alt` | `#FAFAF9` | 입력·서브 표면 |
| `--color-border` | `#E7DFD0` | 디바이더·테두리 |
| `--color-text-muted` | `#78716C` | 보조 텍스트 |

### 다크 모드
| 토큰 | HEX |
|---|---|
| `--color-primary-dark` | `#F5F0E6` (역전: 페이퍼) |
| `--color-accent-dark` | `#FCD34D` (머스타드 → 골드) |
| `--color-bg-dark` | `#1E1B4B` |
| `--color-surface-dark` | `#2D2A5F` |

### 페르소나 4색 (Tide-friendly muted)
| 페르소나 | HEX | 키 |
|---|---|---|
| 사용자 입장 | `#FB923C` | `--persona-user` |
| 회의적 동료 | `#A78BFA` | `--persona-skeptic` |
| 현실 체크 | `#34D399` | `--persona-realist` |
| 심사위원 (아이디어톤) | `#F87171` | `--persona-judge` |
| 시간 관리자 (사이드) | `#60A5FA` | `--persona-timekeeper` |
| VC 투자자 (창업) | `#F472B6` | `--persona-vc` |

### 상태 색
| 상태 | HEX | 용도 |
|---|---|---|
| 합의 (success) | `#10B981` | ✅ 합의 항목 |
| 충돌 (warning) | `#F59E0B` | ⚠️ 충돌 항목 |
| 위험 (danger) | `#EF4444` | 삭제·에러 |
| 정보 (info) | `#3B82F6` | 알림·튜토리얼 |

### 카카오
- `#FEE500` 노란 배경 / `#181600` 검정 텍스트 (브랜드 규정 준수)

---

## 4. 타이포그래피

### 폰트
- **한국어 + 영문**: Pretendard Variable
- **모노**: SF Mono (코드·기획안 미리보기)
- CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css`

### 스케일
| 토큰 | 사이즈 | line-height | weight | 용도 |
|---|---|---|---|---|
| `--text-display` | 40px | 1.15 | 700 | 랜딩 hero |
| `--text-h1` | 32px | 1.2 | 700 | 페이지 제목 |
| `--text-h2` | 24px | 1.3 | 700 | 섹션 제목 |
| `--text-h3` | 19px | 1.35 | 600 | 카드 제목 |
| `--text-body` | 15px | 1.55 | 400 | 본문 |
| `--text-sm` | 13px | 1.5 | 400 | 보조·캡션 |
| `--text-xs` | 11px | 1.4 | 400 | 라벨·메타 |
| `--text-label` | 11px | 1.4 | 700 | 카테고리 라벨 (대문자·자간 0.12em) |

### 자간
- 한글: `-0.02em` (기본)
- 영문 헤딩: `-0.03em`
- 라벨/대문자: `0.12em`

---

## 5. 스페이싱 (8px 그리드)

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

---

## 6. Border Radius

| 토큰 | 값 | 용도 |
|---|---|---|
| `--radius-sm` | 6px | 작은 버튼·뱃지 |
| `--radius-md` | 10px | 입력·기본 버튼 |
| `--radius-lg` | 14px | 카드 |
| `--radius-xl` | 18px | 큰 컨테이너·모달 |
| `--radius-full` | 9999px | 원형 아바타·pill |

---

## 7. Shadow

| 토큰 | 값 | 용도 |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(15,23,42,0.05)` | 카드 hover |
| `--shadow-md` | `0 4px 12px rgba(15,23,42,0.08)` | 떠있는 카드 |
| `--shadow-lg` | `0 12px 32px rgba(15,23,42,0.12)` | 모달·드롭다운 |

---

## 8. 컴포넌트

### 8-1. 버튼

| 변형 | 배경 | 텍스트 | 용도 |
|---|---|---|---|
| Primary | `--color-primary` | `--color-bg` | 메인 CTA |
| Accent | `--color-accent` | `#FFFFFF` | 보조 CTA |
| Outline | transparent + 1.5px border `--color-primary` | `--color-primary` | 보조 액션 |
| Ghost | transparent | `--color-primary` | 인라인 액션 |
| Kakao | `#FEE500` | `#181600` | 카카오 액션 (로그인·공유) |

공통: padding `12px 20px`, radius `--radius-md`, font-weight 600, font-size 15px.

```css
.btn {
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.02em;
  transition: opacity 0.15s ease-out;
}
.btn:hover { opacity: 0.9; }
.btn-primary { background: var(--color-primary); color: var(--color-bg); }
.btn-accent { background: var(--color-accent); color: #FFFFFF; }
.btn-outline { background: transparent; border: 1.5px solid var(--color-primary); color: var(--color-primary); }
.btn-kakao { background: #FEE500; color: #181600; }
```

### 8-2. 카드

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: box-shadow 0.15s ease-out;
}
.card:hover { box-shadow: var(--shadow-md); }
.card-featured { border: 2px solid var(--color-accent); }
```

### 8-3. Idea Card (썸네일 포함)

```
+------------------------+
| [🎨 AI 이미지 썸네일]  |  ← 56px, 그라디언트
+------------------------+
| 👤 작성자 (10px)       |
| 카드 제목 (15px bold)  |
| ⭐ 4.2 · 💬 5 (11px)   |
+------------------------+
```

### 8-4. 입력 필드

```css
.input {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 15px;
  width: 100%;
  transition: border-color 0.15s;
}
.input:focus {
  outline: none;
  border-color: var(--color-primary);
}
.textarea { min-height: 120px; resize: vertical; }
```

### 8-5. 페르소나 아바타

원형 컬러 dot + 이니셜.
- 사이즈: `--avatar-sm` (22px) / `--avatar-md` (32px) / `--avatar-lg` (48px)
- 폰트: 700, 흰색
- 컬러: 페르소나별 (8-3 참조)

```css
.avatar {
  border-radius: var(--radius-full);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; color: #FFFFFF;
}
.avatar-sm { width: 22px; height: 22px; font-size: 10px; }
.avatar-md { width: 32px; height: 32px; font-size: 13px; }
.avatar-lg { width: 48px; height: 48px; font-size: 18px; }
```

### 8-6. 댓글 (Figma 스타일)

```css
.comment {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px;
}
.comment-author { font-weight: 700; font-size: 13px; }
.comment-target {
  background: var(--color-accent-soft) + 44 (alpha);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
  color: #78350F;
  display: inline-block;
  margin: 4px 0;
}
.comment-body { font-size: 13px; line-height: 1.5; color: #57534E; }
.comment-time { font-size: 11px; opacity: 0.5; margin-top: 6px; }
```

본문 텍스트에서 **댓글 단 부분**: `background: var(--color-accent-soft)` + opacity 0.27, 클릭 시 우측 댓글로 스크롤.

### 8-7. Hero 이미지 (AI 생성)

```css
.hero-image {
  height: 240px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-accent-soft) 0%, var(--color-accent) 100%);
  /* 또는 실제 AI 이미지 url(...) */
  position: relative;
}
.hero-image-controls {
  position: absolute;
  bottom: 12px; right: 12px;
  display: flex; gap: 6px;
}
.hero-image-controls .chip {
  background: rgba(30,27,75,0.85);
  color: var(--color-bg);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
}
```

### 8-8. Stepper (진행 단계)

```css
.stepper { display: flex; gap: 6px; }
.stepper-item {
  flex: 1; height: 4px;
  background: var(--color-border);
  border-radius: 2px;
}
.stepper-item.done { background: var(--color-accent); }
.stepper-item.active { background: var(--color-primary); }
```

### 8-9. Badge

```css
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.badge-default { background: var(--color-border); color: var(--color-primary); }
.badge-accent { background: var(--color-accent); color: #FFFFFF; }
.badge-new { background: #34D399; color: #064E3B; }
```

### 8-10. Notification Item

```css
.notif {
  display: flex; gap: 12px;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px;
}
.notif-unread {
  background: rgba(252,211,77,0.13);
  border-left: 3px solid var(--color-accent-soft);
}
.notif-icon { font-size: 18px; flex-shrink: 0; }
.notif-body { font-size: 13px; line-height: 1.5; }
.notif-time { font-size: 11px; opacity: 0.5; margin-top: 4px; }
```

---

## 9. 아이콘

- **방향**: 이모지 기반 (이모지로 빠르게 의미 전달)
- **보조**: 필요 시 [Lucide](https://lucide.dev) 추천 (stroke 1.5px, currentColor)
- 절대 금지: 두 스타일 혼용

### 자주 쓰는 이모지
| 의미 | 이모지 |
|---|---|
| AI | 🤖 |
| 이미지 | 🎨 |
| 댓글 | 💬 |
| 좋아요·평가 | ⭐ |
| 합의 | ✅ |
| 충돌 | ⚠️ |
| 알림 | 🔔 |
| 카톡 | 💬 (또는 카카오 로고) |
| 마감 | ⏰ |
| 팀원 | 👤 👥 |

---

## 10. CSS 변수 전체 (복사용)

```css
:root {
  /* 코어 */
  --color-primary: #1E1B4B;
  --color-accent: #B45309;
  --color-accent-soft: #FCD34D;
  --color-bg: #F5F0E6;
  --color-surface: #FFFAF0;
  --color-surface-alt: #FAFAF9;
  --color-border: #E7DFD0;
  --color-text-muted: #78716C;

  /* 페르소나 */
  --persona-user: #FB923C;
  --persona-skeptic: #A78BFA;
  --persona-realist: #34D399;
  --persona-judge: #F87171;
  --persona-timekeeper: #60A5FA;
  --persona-vc: #F472B6;

  /* 상태 */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  --color-info: #3B82F6;

  /* 카카오 */
  --color-kakao: #FEE500;
  --color-kakao-text: #181600;

  /* 타이포 */
  --font-sans: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;
  --font-mono: 'SF Mono', Menlo, monospace;
  --letter-tight: -0.02em;
  --letter-tighter: -0.03em;
  --letter-wide: 0.12em;

  /* 사이즈 */
  --text-display: 40px;
  --text-h1: 32px;
  --text-h2: 24px;
  --text-h3: 19px;
  --text-body: 15px;
  --text-sm: 13px;
  --text-xs: 11px;

  /* 스페이싱 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(15,23,42,0.05);
  --shadow-md: 0 4px 12px rgba(15,23,42,0.08);
  --shadow-lg: 0 12px 32px rgba(15,23,42,0.12);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #F5F0E6;
    --color-accent: #FCD34D;
    --color-bg: #1E1B4B;
    --color-surface: #2D2A5F;
    --color-surface-alt: #252253;
    --color-border: #3F3A75;
    --color-text-muted: #B8B5D1;
  }
}
```

---

## 11. Tailwind Config 스니펫

`tailwind.config.js` 사용 시 (선택):

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1E1B4B',
        accent: '#B45309',
        'accent-soft': '#FCD34D',
        paper: '#F5F0E6',
        surface: '#FFFAF0',
        'surface-alt': '#FAFAF9',
        kakao: '#FEE500',
        persona: {
          user: '#FB923C',
          skeptic: '#A78BFA',
          realist: '#34D399',
          judge: '#F87171',
        },
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px', md: '10px', lg: '14px', xl: '18px',
      },
    },
  },
};
```

---

## 12. 활용 가이드

### Do ✓
- 페이퍼 배경(`#F5F0E6`) 위에 인디고 텍스트 — 신뢰·차분
- 머스타드(`#B45309`)는 **강조 1군데만**, 남발 금지
- 페르소나 색은 페르소나 카드 안에서만 사용
- 페르소나 아바타는 항상 원형
- 카드 모서리는 `--radius-lg`, 버튼은 `--radius-md`

### Don't ✗
- 머스타드를 본문 텍스트로 (가독성 ↓)
- 페르소나 색을 일반 UI에 (혼동)
- 흰색 배경(`#FFFFFF`) 사용 — 페이퍼톤을 유지
- 그림자 과다 — `--shadow-sm` 위주, 큰 그림자는 모달에만
- 둥근 모서리 8px 미만 (브랜드와 부조화)

---

## 13. 다음 단계 (MVP 목업 구현 시)

이 디자인 시스템을 베이스로:

1. **공통 컴포넌트 HTML 만들기** — 버튼·카드·입력 등 재사용 가능한 partial
2. **Screen별 상세 HTML 작업** — 13개 화면을 디자인 시스템 기반으로 구현
3. **로고 import** — `<img src="/logo.svg">` 또는 inline SVG로 (테마 색상 적용 시 inline 권장)

> 모든 토큰은 CSS 변수로 분리되어 있어, 추후 다크 모드·테마 변경 시 한 파일 수정으로 전체 반영.

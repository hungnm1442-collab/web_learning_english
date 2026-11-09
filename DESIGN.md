---
name: LingoLy
description: Warm Frosted Glass & Wine-Red Bento Design System for Vietnamese English Learners
colors:
  wine-primary: "#8d1e32"
  wine-deep: "#681426"
  wine-bright: "#b22a42"
  blush-accent: "#e8a9b9"
  blush-soft: "#f9e6ec"
  quiet-blue: "#46658b"
  blue-mist: "#9db8d3"
  blue-soft: "#e3edf6"
  cream-paper: "#fffaf7"
  pure-white: "#ffffff"
  beige-canvas: "#ede0d7"
  ink-primary: "#2c1017"
  ink-muted: "#6f5a60"
  mint-live: "#58b89e"
  gold-badge: "#f3cb78"
  status-error: "#b42318"
  status-success: "#147d52"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.625rem, 5vw, 4.375rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Noto Serif, Georgia, serif"
    fontSize: "clamp(1.625rem, 2.7vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  subheading:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  body-sm:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
  ui-copy:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  caption:
    fontFamily: "Manrope, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  xs: "6px"
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "16px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.wine-primary}"
    textColor: "{colors.cream-paper}"
    rounded: "{rounded.pill}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.quiet-blue}"
  button-white-pill:
    backgroundColor: "{colors.cream-paper}"
    textColor: "{colors.wine-deep}"
    rounded: "{rounded.pill}"
    padding: "11px 18px"
  button-dark-pill:
    backgroundColor: "{colors.ink-primary}"
    textColor: "{colors.cream-paper}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  card-glass:
    backgroundColor: "{colors.cream-paper}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-hero-wine:
    backgroundColor: "{colors.wine-primary}"
    textColor: "{colors.cream-paper}"
    rounded: "{rounded.xl}"
    padding: "28px 30px"
---

# Design System: LingoLy

## Overview

**Creative North Star: "The Warm Glass Study Studio"**

LingoLy pairs an editorial warm-cream landing experience with a tactile **Glassy Dashboard V24** learning workspace. Instead of clinical white cards or cold dark-mode fintech panels, the learning workspace suspends translucent champagne-beige glass boards (`rgba(252, 246, 241, 0.88)`) and a smoked-wine glass sidebar over an ambient wine-to-sand canvas. Every study session feels like stepping into a sunlit personal studio where daily momentum, vocabulary retention, and lesson schedules are organized into a scannable Bento grid.

Color is purposeful and emotionally grounded in LingoLy's triadic identity: **Wine Red** (`#8d1e32`) drives primary actions, hero momentum cards, and streak highlights; **Quiet Blue** (`#46658b`) anchors secondary data series, phonetic cues, and positive trend badges; and **Warm Beige & Cream** (`#fffaf7` / `#ede0d7`) form the frosted glass surfaces that keep reading effortless for Vietnamese learners.

**Key Characteristics:**
- Floating frosted-glass architecture (`backdrop-filter: blur(20px–28px)`) over a warm multi-stop wine, blush, and sand ambient backdrop.
- Bento grid workspace combining a saturated Wine-Red momentum hero card (with a 68% segmented circular gauge and orbiting skill badges), an interactive 7-day calendar & lesson schedule card, and 4 KPI cards with smooth SVG sparklines.
- Vietnamese-safe display and editorial typography pairing geometric `Manrope` with italic `Noto Serif` accents that keep Vietnamese diacritics crisp at all sizes.
- Zero-clutter hierarchy: headings speak directly without eyebrows or kickers above them, and all icons are rendered with consistent 1.85px stroke SVGs.

## Colors

LingoLy's palette balances warm burgundy depth, serene slate-blue data clarity, and translucent champagne-beige glass surfaces.

### Primary
- **Vintage Wine** (`#8d1e32`): Primary brand accent, active day capsules, primary CTA buttons, and the core stop of the Bento Hero Card and Streak KPI gradient.
- **Deep Burgundy** (`#681426`): High-contrast display headings on light surfaces, active sidebar pill text, and the deep shadow stop of wine gradients.
- **Luminous Crimson** (`#b22a42`): Upper-left highlight stop on Wine-Red gradient cards and notification count badges.

### Secondary
- **Quiet Slate Blue** (`#46658b`): Secondary accent for vocabulary retention trends, mastered word statuses, phonetic transcriptions, and button hover transitions.
- **Powder Blue Mist** (`#9db8d3`): Soft atmospheric glow on the ambient canvas and editorial collage cards.
- **Ice Blue Pill** (`#e3edf6`): Background tint for positive trend pills (`+12 từ`, `+4.2%`) and secondary lesson badges.

### Tertiary
- **Rose Blush** (`#e8a9b9`): Warm highlight for brand wordmark accents, phonetic orbit badges, and editorial underlines.
- **Soft Petal Blush** (`#f9e6ec`): Subtle fill for active grammar badges, modal pills, and hover states on vocabulary rows.

### Neutral
- **Warm Cream Paper** (`#fffaf7`): Base canvas for the Landing Page, modal dialogs, active sidebar pills, and primary text on Wine-Red surfaces.
- **Champagne Beige Canvas** (`#ede0d7`): Underlying warm neutral tone for frosted glass workspace boards (`rgba(252, 246, 241, 0.88)`) and translucent Bento cards (`rgba(255, 251, 248, 0.72)`).
- **Espresso Wine Ink** (`#2c1017`): Primary body and numeral ink across frosted beige cards, maintaining ≥4.5:1 contrast.
- **Warm Taupe Muted** (`#6f5a60`): Secondary descriptions, timestamps, and table column headers, tinted with warm burgundy undertones rather than flat gray.

### Named Rules
**The One Highlighted Bento Rule.** In any multi-card KPI row, exactly one card (such as the 7-day Streak card) may wear the full Wine-Red gradient (`#b32a42` to `#681426`); its sibling cards remain translucent champagne-beige glass (`rgba(255, 251, 248, 0.72)`) so the focal metric commands immediate attention.

**The Tinted Neutral Rule.** Never use pure achromatic gray (`#808080` or `#f5f5f5`) inside the learning workspace; every surface, muted label, and divider is tinted from the Wine-Beige warm axis (`#6f5a60`, `rgba(141, 30, 50, 0.12)`).

## Typography

**Display Font:** `Manrope` (with `system-ui, sans-serif` fallback)
**Headline & Accent Font:** `Noto Serif` (with `Georgia, serif` fallback)
**Body Font:** `DM Sans` (with `system-ui, sans-serif` fallback)

**Character:** `Manrope` provides crisp geometric numerals (`tabular-nums`) and modern dashboard authority, while `Noto Serif` injects warm editorial personality into italic emphasis words (`rất đều`, `tự tin hơn`) with full Vietnamese diacritic support.

### Hierarchy
- **Display** (`800`, `clamp(2.625rem, 5vw, 4.375rem)`, line-height `0.98`, letter-spacing `-0.04em`): Hero headlines on the Landing Page.
- **Headline** (`700`, `clamp(1.625rem, 2.7vw, 2.25rem)`, line-height `1.08`, letter-spacing `-0.03em`): Top workspace greeting (`Chào buổi chiều, Minh Anh`), Bento Hero Card statement, and modal titles.
- **Title** (`700`, `1.375rem` / `22px`, line-height `1.2`, letter-spacing `-0.02em`): Subpage panel headers and section titles.
- **Body** (`400`–`500`, `0.8125rem`–`0.875rem` / `13px`–`14px`, line-height `1.55`–`1.65`): Lesson descriptions, schedule subtitles, and flashcard example sentences (65–75ch max measure).
- **Label** (`700`, `0.6875rem` / `11px`, letter-spacing `0.08em`): Sidebar navigation group headers and pill badges.

### Named Rules
**The Serif Inflection Rule.** Inside the Bento Hero Card and Landing headlines, highlight the single most emotional phrase using italic `Noto Serif` (`<em>rất đều</em>`) with a soft blush underline (`text-underline-offset: 5px`), never gradient text.

**The Tabular Metric Rule.** Every progress percentage (`68%`), calendar date (`08`), duration (`09:30`), and KPI counter (`86`, `94.8%`) enforces `font-variant-numeric: tabular-nums` so numbers align cleanly across rows and state updates.

## Layout

The Learning Workspace (`.v24-workspace`) uses a framed, floating two-column shell (`16px` outer padding, `16px` gap) over a fixed ambient backdrop:
- **Left Floating Sidebar:** `256px` fixed width on desktop (`220px` at `≤1050px`, collapsing to a compact horizontal top bar at `≤760px`).
- **Right Frosted Glass Board:** Fluid `flex: 1` container (`padding: 28px clamp(22px, 3vw, 38px) 32px`, `border-radius: 16px`).
- **Bento Grid Structure (`.v24-bento-shell`):**
  - **Upper Row (`.v24-upper-grid`):** Asymmetric 2-column grid (`grid-template-columns: minmax(0, 1.48fr) minmax(300px, 1fr)`, `gap: 18px`) pairing the Wine-Red Hero Card on the left with the Frosted Beige Calendar & Lesson Schedule Card on the right. Stacks to `1fr` at `≤1180px`.
  - **Lower Row (`.v24-kpi-grid`):** 4-column equal Bento row (`grid-template-columns: repeat(4, minmax(0, 1fr))`, `gap: 16px`) collapsing to 2 columns at `≤1180px` and 1 column at `≤760px`.

## Elevation & Depth

Depth is achieved through **translucent glass layering and offset ambient shadows** rather than heavy borders or hard block shadows. Three distinct glass tiers sit over the wine-and-sand ambient mesh:
1. **Smoked Wine Sidebar Glass:** `linear-gradient(180deg, rgba(112, 28, 44, 0.66), rgba(58, 15, 25, 0.84))` with `backdrop-filter: blur(26px)`.
2. **Champagne Workspace Board Glass:** `linear-gradient(155deg, rgba(252, 246, 241, 0.88), rgba(229, 214, 206, 0.78))` with `backdrop-filter: blur(28px)`.
3. **Frosted Bento Card Glass:** `rgba(255, 251, 248, 0.72)` with `backdrop-filter: blur(20px)`, lifting to `rgba(255, 252, 250, 0.9)` and `translateY(-3px)` on hover.

### Shadow Vocabulary
- **Ambient Shell Shadow** (`box-shadow: 0 18px 42px rgba(58, 14, 24, 0.12)`): Anchors the floating sidebar and main glass board against the ambient background.
- **Bento Card Shadow** (`box-shadow: 0 10px 26px rgba(72, 18, 30, 0.08)`): Soft burgundy-tinted offset shadow under frosted glass cards.
- **Wine Hero Elevation** (`box-shadow: 0 18px 38px rgba(104, 20, 38, 0.24)`): Deep warm shadow beneath saturated Wine-Red gradient cards.

### Named Rules
**The Single-Elevation Declaration Rule.** Cards declare their depth through translucent fill plus a soft offset shadow (`--shadow-card`), never combining a `1px` structural border with a wide drop shadow.

## Shapes

- **Glass Boards, Bento Cards & Modals:** `16px` border radius (`--rounded-lg`), keeping containers crisp and architectural.
- **Inner Schedule Rows & Word Cards:** `12px`–`14px` border radius (`--rounded-md`), nested cleanly inside `16px` parent cards with `24px`–`28px` padding.
- **Action Buttons, Status Badges, Day Capsules & Trend Chips:** `999px` full pill radius (`--rounded-pill`), providing a tactile counterpoint to the `16px` cards.

## Components

### Buttons
- **Shape:** Full pill (`border-radius: 999px`) for all workspace actions and header CTAs.
- **Primary Wine Button (`.primary-button`):** `#8d1e32` background, `#fffaf7` text, `12px 18px` padding, `700 13px Manrope`. Transitions to Quiet Blue (`#46658b`) with `translateY(-1px)` on hover.
- **White Hero Pill (`.v24-btn-white`):** `#fffaf7` background, `#681426` text, `11px 18px` padding, paired with a diagonal `arrowUpRight` SVG icon inside the Wine-Red Hero Card.
- **Dark Header Pill (`.v24-pill-dark`):** `#2f0d16` background, `#fffaf7` text, `10px 16px` padding, shifting to `#8d1e32` on hover.
- **Frosted Light Pill (`.v24-pill-light`):** `rgba(255, 251, 248, 0.78)` background, `#4a1c26` text, lifting to `#ffffff` on hover.

### Chips
- **Status Live Pill (`.v24-status-pill`):** `rgba(255, 250, 247, 0.16)` translucent pill with a `7px` mint live indicator dot (`#8ee5c6`) and `11px` Manrope label.
- **Trend & Schedule Badges (`.v24-kpi-trend`, `.v24-schedule-badge`):** `999px` radius, `4px 9px` padding, `700 10px Manrope` in Quiet Blue (`#46658b` on `#e3edf6`) or Vintage Wine (`#8d1e32` on `#f9e6ec`).

### Cards / Containers
- **Wine-Red Hero Card (`.v24-hero-card`):** `16px` radius, `28px 30px` padding, `linear-gradient(135deg, #b52b43 0%, #8d1e32 52%, #681426 100%)`, housing the headline, 3 inline mini-metrics, 2 pill CTAs, and the 68% circular gauge.
- **Frosted Schedule & KPI Cards (`.v24-schedule-card`, `.v24-kpi-card`):** `16px` radius, `20px`–`24px` padding, `rgba(255, 251, 248, 0.72)` with `backdrop-filter: blur(20px)`.

### Inputs / Fields
- **Style:** Quick search bar (`.v24-ask-pill` in sidebar and `.v24-search-drawer` on board) uses `999px` pill triggers and `16px` frosted drawers; form inputs in `AuthModal` use `10px` radius and `1px solid rgba(141, 30, 50, 0.22)` stroke on `#ffffff`.
- **Focus:** `2px solid #46658b` outline with `2px` offset.

### Navigation
- **Floating Glass Sidebar (`.v24-sidebar`):** Smoked-wine translucent rail with `11px` rounded nav items (`13px Manrope`). Default items use `rgba(255, 244, 246, 0.78)` text; the active route lights up as a solid `#fffaf7` pill with `#681426` bold text and `0 6px 18px rgba(40, 8, 16, 0.18)` shadow.

### Segmented Orbit Gauge (`.v24-orbit-ring`)
- **Role:** Signature visual anchor on the Hero Bento Card. Combines a `186px` SVG circular progress ring (`stroke: #fffaf7`, `stroke-width: 11`, `stroke-linecap: round`) over a dashed orbital guide ring with 5 interactive circular skill badges (`Do`, `Aa`, `iː`, `A2`, `12`) that open the corresponding lesson or flashcard session on click.

## Do's and Don'ts

### Do:
- **Do** preserve the triadic **Wine Red (`#8d1e32`) + Quiet Blue (`#46658b`) + Warm Beige (`#ede0d7` / `#fffaf7`)** palette across both the Landing Page and the Glassy Dashboard V24 workspace.
- **Do** use `Noto Serif` for italic display emphasis and `Manrope` with `tabular-nums` for all metrics, percentages, dates, and timers.
- **Do** keep card border radii at `16px` (`12px`–`14px` for inner rows) and use `999px` pills for buttons, day capsules, and status badges.
- **Do** use consistent `1.85px`–`2px` stroke inline SVGs for all icons and sparklines.

### Don't:
- **Don't** place uppercase kickers or eyebrows above headings (`<h1>`, `<h2>`, `<h3>`); let the heading carry its own hierarchy or use an interactive live-status pill where appropriate.
- **Don't** use raw Unicode glyphs or emojis (`✦`, `→`, `•••`) as UI icons inside the learning workspace.
- **Don't** tighten letter-spacing past `-0.04em` on any heading or display text.
- **Don't** use bounce or elastic easing (`cubic-bezier(.2, 1.4, ...)`): always decelerate smoothly with `cubic-bezier(0.22, 1, 0.36, 1)`.

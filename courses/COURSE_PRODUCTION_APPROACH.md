# Course & Content Production Approach (Bannaa)

This document explains **how we produce courses** (Arabic-first, beginner-friendly) and which **tools** we use from idea → outline → lesson packs → review → publishing.

> Scope: This is the operating playbook. Actual course specs live in `courses/<COURSE_ID>.md`.

---

## 0) North Star (النقطة الأساسية)
We optimize for:
- **Clarity over cleverness** (وضوح > استعراض)
- **Practical shipping** (نتائج قابلة للتطبيق)
- **Repeatability** (نفس القالب يتكرر بسهولة)
- **Evaluation** (اختبار + rubric بدل الانطباع)

Arabic style:
- **فصحى** لشرح القاعدة
- **Neutral mix** (عامية خفيفة) في الأمثلة لتقريب الفكرة

---

## 1) Deliverable Standards (المخرجات القياسية)
Every lesson ships as a **Lesson Pack**:
1) **Lesson text** (شرح)
2) **Slides script** (نص الشرائح)
3) **Quiz**
   - 5 MCQ
   - 2 short answers
4) **Homework**
   - clear task
   - submission format
   - rubric (grading criteria)
5) (Optional) **Video explainer plan** using Remotion

Every course ships as:
- **Course Spec** (audience, outcomes, modules, lesson list)
- **Assets checklist**
- **Changelog** (versioned updates)

---

## 2) Production Pipeline (سير العمل)

### Step A — Intake (جمع المتطلبات)
We capture:
- Course title + ID + target audience
- prerequisites
- measurable outcomes
- constraints (length, tone, platform)

Output: first draft **Course Spec Card**.

### Step B — Outline (المنهج)
- Modules
- Lesson list
- For each lesson: objective + key concepts + one real scenario

Output: **Approved outline**.

### Step C — Draft Lesson Packs (إنتاج المحتوى)
We produce each lesson pack following a strict template:
- Objective
- Concepts
- Explanation
- Worked example (before/after)
- Slides script
- Quiz
- Homework + rubric
- Remotion storyboard (when relevant)

Output: **Lesson Pack v1**.

### Step D — Review & Iteration (المراجعة)
We do passes:
- **Clarity pass**: simpler wording, remove ambiguity
- **Consistency pass**: stable terminology, consistent format
- **Context pass**: examples grounded + realistic
- **Evaluation pass**: quiz/homework truly test the lesson objective

Output: **Lesson Pack v2/v3…** + changelog.

### Step E — Publishing (النشر)
Depending on platform (site/LMS/Telegram), we:
- export lesson pack into the required format
- generate video explainers (Remotion) when needed
- announce release notes

---

## 3) Versioning (الإصدارات)
We keep everything versioned:
- `Spec v0.1, v0.2…`
- `Lesson Lx v1, v2…`

Rules:
- Latest approved spec is marked **APPROVED**.
- Every edit adds a **Changelog** entry.

---

## 4) File Structure (داخل الريبو)
Suggested structure in this OpenClaw workspace:

```
/courses
  COURSE_PRODUCTION_APPROACH.md
  AI-AGE-FUND-01.md
  <OTHER_COURSE_ID>.md
```

If/when we publish to the website, we can export to:
- MD/MDX
- JSON (for structured quizzes)

---

## 5) Tools We Use (الأدوات)

### A) OpenClaw (this assistant runtime)
Used for:
- drafting specs + lesson packs
- iterating quickly via Telegram feedback
- saving canonical markdown files in the workspace

### B) GitHub (GitHub-first workflow)
Used for:
- version control
- reviewing changes via PRs
- keeping templates for course repos (README, folders, assets)

### C) Remotion (Video explainers)
- Website: https://www.remotion.dev/
- Best-practices skill notes: https://skills.sh/remotion-dev/skills/remotion-best-practices

Used for:
- consistent, reusable video explainers
- programmatic animations (scenes/components)
- render pipeline suitable for repeated course production

We follow these Remotion principles:
- reusable components (TitleCard/BulletList/CodeBlock)
- deterministic animations (no randomness)
- consistent theme (fonts/colors)
- timing driven by script segments

### D) Convex + Next.js + Vercel (publishing platform)
(When we publish to the site)
- Next.js renders course and lesson pages
- Convex can store structured course objects (quizzes, lessons, metadata)
- Vercel provides preview deployments for review

---

## 6) Quality Bar (معايير الجودة)
A lesson is “ready” when:
- objective is measurable
- examples are realistic and reproducible
- quiz aligns with objective
- homework produces an artifact (repo/file/output)
- slides can be recorded as a 1–3 minute explainer

---

## 7) How You Review (طريقة المراجعة من Moe)
Recommended feedback format:
- Quote the line/section
- Say: **keep / remove / rewrite**
- If rewrite: provide the intended tone (more formal / more casual) and any must-include points

---

## 8) Next Improvements (later)
- Add a reusable "Course Spec Card" generator
- Add an export script: MD → website (MDX/Convex)
- Add a Remotion theme package for consistent branding

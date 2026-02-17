# AI-AGE-FUND-01 — AI Age Fundamentals (أساسيات عصر الذكاء الاصطناعي)

Status: **APPROVED (Spec v0.1)**  
Level: **Beginner-friendly**  
Language: **Arabic (فصحى + neutral mix in examples)**  
Format per lesson: **Text + Slides + Quiz + Homework + (optional) 60–180s Remotion explainer**  
Git: **GitHub-first (repo, issues, PR basics)**

---

## 1) Audience (مين الكورس ده ليه؟)
- Beginners who want to start building with AI without drowning in theory
- Creators/builders who need a clear map: LLMs + Agents + Audio + Video + shipping workflow

## 2) Prerequisites (المتطلبات)
- Basic computer literacy
- No coding required, but coding-friendly (optional stretch tasks)

## 3) Outcomes (بنهاية الكورس المتعلم يقدر يعمل إيه؟)
Learner can:
1) Use GitHub confidently for a small project (repo, commits, branches, PR basics).
2) Explain what LLMs are/aren’t + handle common failure modes.
3) Write clear prompts with constraints + output formats.
4) Evaluate outputs with a tiny test set + iteration loop.
5) Understand Agents conceptually (tools/memory/planning) and when to use them.
6) Build a mini “AI content pipeline”: script → slides → quiz → short video explainer (Remotion).
7) Ship a small capstone project with README + assets.

## 4) Course Deliverables (ناتج الكورس)
- 12 lesson packs (each: text + slides script + quiz + homework)
- A shared GitHub template repo (README, folders, example assets)
- 6–12 Remotion micro-explainers (one per key concept)

## 5) Course Structure (12 Lessons)

### Module A — Shipping & GitHub Workflow (3 lessons)
- **L1. The AI Age Map + How This Course Works**
  - what you can build (LLM/audio/video/agents) + workflow + course repo tour
- **L2. Git + GitHub Basics (Practical)**
  - clone/init, add/commit/push, branches, PR concept, issues
- **L3. Project Hygiene**
  - folder structure, naming, prompt/versioning, keeping datasets & outputs tidy

### Module B — LLM Fundamentals (3 lessons)
- **L4. What an LLM Is (and Isn’t)**
  - tokens, context window, hallucinations, instruction conflicts
- **L5. Prompting 101**
  - goal, constraints, examples, output format (JSON/table), “done” criteria
- **L6. Evaluation & Iteration Basics**
  - small test set, rubrics, regression checks, “don’t break what worked”

### Module C — Agents Fundamentals (2 lessons)
- **L7. What Is an Agent?**
  - tools, planning, memory (high-level), when agent is overkill
- **L8. Agent Workflows in Real Life**
  - research assistant, support assistant, content assistant + guardrails

### Module D — Audio Fundamentals (2 lessons)
- **L9. Audio Use Cases**
  - transcription, summarization, voiceover scripts, timestamps
- **L10. Audio Quality & Pipeline**
  - chunking, noise basics, prompt patterns for transcripts

### Module E — Video & Remotion Fundamentals (2 lessons)
- **L11. Video Explainers: Script → Slides → Storyboard**
  - writing for narration, slide pacing, before/after demos
- **L12. Remotion Overview + Capstone Plan**
  - compositions/scenes/components mental model
  - capstone instructions + render checklist

## 6) Remotion Explainers (Standard Recipe)
Per explainer:
- 60–180s
- 5 scenes: Intro → Concept → Before/After → Mistakes → Recap
- on-screen: Arabic key terms + tiny code/prompt snippets

Best practices we’ll follow:
- reusable components (TitleCard, BulletList, CodeBlock)
- deterministic animations (no randomness)
- consistent theme (font/colors) across all videos

## 7) Capstone (المشروع النهائي)
Ship a mini “AI-powered lesson generator” repo:
- input: topic + audience
- output: lesson text + slide script + quiz + homework
- plus 1 Remotion explainer storyboard (and optional render)

## 8) Open Questions (pending)
1) Do we require everyone to create a GitHub account, or provide a “no-account alternative” path?
2) Any brand theme requirements now? (font/colors/logo) for Remotion videos.
3) Preferred capstone domain: (A) education, (B) marketing, (C) business ops, (D) coding helper.

---

# Lesson Pack — L1 (v1)

## L1 — The AI Age Map + How This Course Works (خريطة عصر الذكاء الاصطناعي + طريقة الكورس)
Lesson #: **1 / 12**

### Objective (هدف الدرس)
بنهاية الدرس، المتعلم يقدر:
- يشرح بسرعة “إيه ممكن نعمل بالـ AI اليوم؟” (LLMs / Agents / Audio / Video).
- يفهم الفرق بين: **Model** vs **Prompt** vs **Tools** vs **Workflow**.
- يمشي على طريقة الكورس: كل درس = (شرح + سلايدز + كويز + واجب) + مشروع نهائي.
- يجهّز Repo على GitHub هنشتغل فيه طول الكورس (بدون تعقيد).

### Core Concepts (المفاهيم الأساسية)
- **LLM (Large Language Model):** نموذج لغة يتوقع النص التالي، مش “بيفهم” زي الإنسان.
- **Prompt (برومبت):** تعليمات + سياق + أمثلة بتحدد سلوك النموذج.
- **Context Window (نافذة السياق):** “ذاكرة قصيرة” داخل الرسالة الحالية—ليها حجم محدود.
- **Tools (أدوات):** البحث، قواعد بيانات، تنفيذ كود… بتدي النموذج قدرة يعمل حاجات خارج الكلام.
- **Agent (وكيل):** نظام بيستخدم LLM + أدوات + خطوات متعددة عشان ينجز مهمة.
- **Pipeline (بايبلاين):** سلسلة خطوات واضحة لإنتاج نتيجة (مثلاً: سكربت → سلايدز → كويز → فيديو).

### Lesson Text (الشرح)
#### خريطة عصر الـ AI: أربع قدرات رئيسية
**(A) LLMs — “الكلام الذكي”**
- تلخيص، كتابة، شرح، ترجمة، توليد أفكار.
- ممتاز في: صياغة، تنظيم، توليد نص.
- ضعيف/خطر في: اختلاق معلومات لو مفيش مصادر، أو لما التعليمات تكون مبهمة.

**(B) Audio — “اسمع/اتكلم”**
- تفريغ صوت (Transcription)
- تلخيص مكالمات/محاضرات
- كتابة سكربت Voiceover

**(C) Video — “اشرح بصريًا”**
- فيديوهات قصيرة تشرح فكرة (micro-explainers)
- تحويل سلايدز إلى فيديو
- إبراز before/after

**(D) Agents — “أنجزلي شغل”**
- سلسلة خطوات: search → extract → summarize → cite → draft → review

#### Model vs Prompt vs Tools vs Workflow
- **Model**: القدرة الخام.
- **Prompt**: تعليماتك وقيودك.
- **Tools**: قدرات خارج الكلام.
- **Workflow**: خطة وخطوات للوصول.

#### طريقة الكورس
كل درس: (Text + Slides + Quiz + Homework) + (أحيانًا) Remotion plan.

### Slides Script (10–12 slides)
1) Title
2) The Big Picture
3) LLMs
4) Context Window
5) Audio
6) Video + Remotion
7) Agents
8) The 4-part mental model
9) Course Workflow
10) What you’ll ship
11) Mini check
12) Homework

### Quiz
**MCQ**
1) LLM ممتاز في: **B**
2) Context window: **B**
3) Agent يعني: **C**
4) نتائج مختلفة كل مرة: **C**
5) Remotion مناسب لأنه: **A**

**Short answer**
6) الفرق بين Prompt و Workflow؟
7) مثال على Audio pipeline؟

### Homework + Rubric
**Part A:** AI Map لمجالك (3 LLM + 2 Audio + 2 Video + 1 Agent workflow)  
**Part B:** GitHub repo `ai-age-fundamentals` + README + `lesson-01/homework.md`

Rubric (10):
- (3) فهم المجالات الأربعة
- (3) أمثلة واقعية
- (2) تنظيم
- (2) Repo + README

### Remotion Explainer Storyboard (60–120s)
Title: **Model vs Prompt vs Tools vs Workflow**
- Scene 1 Intro
- Scene 2 4 Blocks
- Scene 3 Before/After
- Scene 4 Tools/Workflow
- Scene 5 Recap

---

## Changelog
- v0.1: initial approved spec + L1 pack v1 embedded

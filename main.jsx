import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, BookOpen, Braces, Check,
  ChevronDown, CircleHelp, Code2, Compass, Flame, GraduationCap,
  Menu, Play, Search, Sparkles, Terminal, Trophy, X, Zap
} from "lucide-react";
import "./styles.css";

const languages = [
  {
    id: "python", name: "Python", short: "PY", color: "#78b7a5", type: "Beginner friendly",
    tagline: "Make ideas happen with clean, readable code.",
    description: "A great first language for automation, data, AI, and general-purpose programming.",
    level: "Beginner", lessons: 8, time: "2h 20m",
    code: 'name = "Alex"\\nfor step in range(3):\\n    print(f"Hello, {name}!")',
    output: "Hello, Alex!\\nHello, Alex!\\nHello, Alex!",
    lessonsList: [
      ["Your first program", "Print text and understand how a program runs.", 'print("Hello, world!")', "print() writes a value to the output. Text goes inside quotes."],
      ["Variables & values", "Store information using names.", 'player = "Nova"\\nlevel = 1\\nprint(player, level)', "Variables give values a readable name. Python figures out the type for you."],
      ["Conditions", "Make decisions with if and else.", 'score = 82\\nif score >= 70:\\n    print("Passed")\\nelse:\\n    print("Try again")', "Indentation marks the block that belongs to each condition."],
      ["Loops", "Repeat work without repeating code.", 'for number in range(1, 4):\\n    print(number)', "range(1, 4) produces 1, 2, and 3. The end value is excluded."],
      ["Functions", "Package reusable behavior.", 'def greet(name):\\n    return f"Hi, {name}!"\\n\\nprint(greet("Sam"))', "Use def to define a function. return sends a result back to the caller."],
      ["Lists", "Keep related values together.", 'tools = ["editor", "terminal", "git"]\\nprint(tools[0])\\ntools.append("browser")', "Lists are ordered and zero-indexed, so the first item is at index 0."],
      ["Dictionaries", "Represent values with named keys.", 'user = {"name": "Mika", "xp": 120}\\nprint(user["name"])', "A dictionary maps keys to values, which is handy for structured data."],
      ["Mini project", "Combine the basics into a tiny XP tracker.", 'xp = 0\\nfor reward in [10, 25, 15]:\\n    xp += reward\\nprint(f"Total XP: {xp}")', "Small projects help turn individual syntax rules into problem-solving habits."]
    ]
  },
  {
    id: "cpp", name: "C++", short: "C++", color: "#88a8ff", type: "Systems & performance",
    tagline: "Build fast software with precise control.",
    description: "Used for game engines, real-time systems, desktop software, and performance-critical code.",
    level: "Intermediate", lessons: 8, time: "3h 10m",
    code: '#include <iostream>\\n\\nint main() {\\n    std::cout << "Hello, world!\\\\n";\\n    return 0;\\n}',
    output: "Hello, world!",
    lessonsList: [
      ["Your first program", "Meet main, headers, and output.", '#include <iostream>\\n\\nint main() {\\n    std::cout << "Hello, world!\\\\n";\\n    return 0;\\n}', "Execution starts in main. iostream provides std::cout for console output."],
      ["Types & variables", "Choose a type and store a value.", 'int score = 100;\\ndouble speed = 2.5;\\nbool ready = true;', "C++ is statically typed: each variable has a declared type."],
      ["Conditions", "Branch based on a condition.", 'int health = 40;\\nif (health > 0) {\\n    std::cout << "Alive";\\n} else {\\n    std::cout << "Out";\\n}', "Parentheses contain the condition; braces delimit the branch."],
      ["Loops", "Repeat a block of statements.", 'for (int i = 0; i < 3; ++i) {\\n    std::cout << i << "\\\\n";\\n}', "The loop initializer runs once, the condition is checked each pass, and the increment follows."],
      ["Functions", "Give reusable logic a name.", 'int add(int a, int b) {\\n    return a + b;\\n}', "The return type appears before the function name. Parameters have declared types."],
      ["References", "Pass access to an existing value.", 'void doubleValue(int& value) {\\n    value *= 2;\\n}', "A reference parameter can modify the original argument without copying it."],
      ["Vectors", "Use a dynamic sequence.", '#include <vector>\\nstd::vector<int> scores{8, 9, 10};\\nscores.push_back(11);', "std::vector manages a resizable sequence and its storage."],
      ["Mini project", "Calculate the average of a score list.", '#include <vector>\\nint total = 0;\\nfor (int score : scores) total += score;\\ndouble average = static_cast<double>(total) / scores.size();', "Watch integer division: convert to a floating-point type when you need decimals."]
    ]
  },
  {
    id: "csharp", name: "C#", short: "C#", color: "#c8a0ff", type: "Apps & games",
    tagline: "Create apps, tools, and games with modern C#.",
    description: "A modern, strongly typed language used with .NET, Unity, desktop apps, and services.",
    level: "Beginner", lessons: 8, time: "2h 50m",
    code: 'string name = "Alex";\\nfor (int i = 0; i < 3; i++)\\n{\\n    Console.WriteLine($"Hello, {name}!");\\n}',
    output: "Hello, Alex!\\nHello, Alex!\\nHello, Alex!",
    lessonsList: [
      ["Your first program", "Print output with Console.", 'Console.WriteLine("Hello, world!");', "Console.WriteLine writes a line to the console."],
      ["Variables & types", "Store typed values.", 'string player = "Nova";\\nint level = 1;\\nbool online = true;', "C# variables have declared types, such as string, int, and bool."],
      ["Conditions", "Choose a path with if and else.", 'int score = 82;\\nif (score >= 70)\\n{\\n    Console.WriteLine("Passed");\\n}', "C# uses braces for blocks; the condition evaluates to a bool."],
      ["Loops", "Repeat a task a fixed number of times.", 'for (int i = 0; i < 3; i++)\\n{\\n    Console.WriteLine(i);\\n}', "A for loop groups initialization, condition, and iteration in one statement."],
      ["Methods", "Organize reusable logic.", 'static int Add(int a, int b)\\n{\\n    return a + b;\\n}', "Methods can accept parameters and return a typed result."],
      ["Arrays & lists", "Store collections of items.", 'var items = new List<string> { "map", "key", "coin" };\\nitems.Add("potion");', "List<T> is a resizable collection; add using the Add method."],
      ["Classes", "Model data and behavior together.", 'class Player\\n{\\n    public string Name { get; set; } = "Nova";\\n    public int Health { get; set; } = 100;\\n}', "A class defines a type. Properties expose data through a consistent interface."],
      ["Mini project", "Make a tiny health status check.", 'int health = 35;\\nstring status = health > 0 ? "Active" : "Down";\\nConsole.WriteLine(status);', "The conditional operator chooses one of two values based on a condition."]
    ]
  },
  {
    id: "html", name: "HTML", short: "5", color: "#ff9b76", type: "Web foundations",
    tagline: "Give every webpage its structure.",
    description: "Learn semantic page structure, links, forms, and accessible content for the web.",
    level: "Beginner", lessons: 7, time: "1h 45m",
    code: '<main>\\n  <h1>Hello, world!</h1>\\n  <p>My first webpage.</p>\\n  <a href="#learn">Start learning</a>\\n</main>',
    output: "A page with a heading, paragraph, and link.",
    lessonsList: [
      ["Your first page", "Build a valid HTML document.", '<!doctype html>\\n<html lang="en">\\n  <head><title>My page</title></head>\\n  <body><h1>Hello!</h1></body>\\n</html>', "HTML elements describe the structure and meaning of page content."],
      ["Headings & text", "Create a clear content hierarchy.", '<h1>Course title</h1>\\n<h2>First topic</h2>\\n<p>A short explanation.</p>', "Use headings in a logical order, not just to change text size."],
      ["Links & images", "Connect pages and add visuals.", '<a href="https://example.com">Visit site</a>\\n<img src="photo.jpg" alt="A mountain at sunrise">', "Meaningful alt text makes informative images accessible."],
      ["Lists", "Group related content.", '<ul>\\n  <li>Practice</li>\\n  <li>Build</li>\\n  <li>Repeat</li>\\n</ul>', "Use ul for unordered lists and ol when order matters."],
      ["Forms", "Collect user input semantically.", '<label for="email">Email</label>\\n<input id="email" name="email" type="email">\\n<button type="submit">Join</button>', "Associate labels with inputs so the purpose is clear to everyone."],
      ["Semantic layout", "Use elements that communicate purpose.", '<header>Site name</header>\\n<nav>Navigation</nav>\\n<main>Main content</main>\\n<footer>Copyright</footer>', "Semantic elements make documents easier to navigate and maintain."],
      ["Mini project", "Sketch a simple course card.", '<article>\\n  <h2>Python Basics</h2>\\n  <p>Learn the essentials one step at a time.</p>\\n  <a href="#lessons">View lessons</a>\\n</article>', "Compose smaller meaningful elements into a reusable page section."]
    ]
  },
  {
    id: "javascript", name: "JavaScript", short: "JS", color: "#f3d477", type: "Interactive web",
    tagline: "Turn static pages into experiences.",
    description: "Add logic and interactivity to websites, and build servers and tools with the same language.",
    level: "Beginner", lessons: 8, time: "2h 40m",
    code: 'const name = "Alex";\\nfor (let i = 0; i < 3; i++) {\\n  console.log(`Hello, ${name}!`);\\n}',
    output: "Hello, Alex!\\nHello, Alex!\\nHello, Alex!",
    lessonsList: [
      ["Your first script", "Write output to the console.", 'console.log("Hello, world!");', "console.log is useful while learning and debugging."],
      ["Variables", "Choose const or let.", 'const appName = "CodeCraft";\\nlet points = 0;\\npoints += 10;', "Prefer const unless you need to reassign the binding; use let when it changes."],
      ["Conditions", "Run code only when a condition matches.", 'const loggedIn = true;\\nif (loggedIn) {\\n  console.log("Welcome back");\\n}', "An if statement evaluates a truthy or falsy expression."],
      ["Loops", "Repeat operations.", 'for (let i = 1; i <= 3; i++) {\\n  console.log(i);\\n}', "The counter changes each iteration until the condition becomes false."],
      ["Functions", "Create reusable behavior.", 'function add(a, b) {\\n  return a + b;\\n}\\nconsole.log(add(2, 3));', "Functions can accept arguments and return a value."],
      ["Arrays & objects", "Represent collections and records.", 'const user = { name: "Mika", xp: 120 };\\nconst tools = ["editor", "terminal"];\\nconsole.log(user.name, tools[0]);', "Objects group named properties; arrays store ordered values."],
      ["DOM events", "Respond to a click.", 'document.querySelector("button")\\n  .addEventListener("click", () => {\\n    console.log("Clicked!");\\n  });', "Event listeners let your page react to user actions."],
      ["Mini project", "Filter a list of scores.", 'const scores = [45, 82, 91, 60];\\nconst passed = scores.filter(score => score >= 70);\\nconsole.log(passed);', "Array methods such as filter transform data without manual index loops."]
    ]
  },
  {
    id: "typescript", name: "TypeScript", short: "TS", color: "#86baff", type: "Typed JavaScript",
    tagline: "Catch mistakes before your code runs.",
    description: "Add a type system to JavaScript to make larger projects easier to understand and maintain.",
    level: "Intermediate", lessons: 8, time: "2h 55m",
    code: 'type User = { name: string; xp: number };\\n\\nconst user: User = { name: "Alex", xp: 120 };\\nconsole.log(`${user.name}: ${user.xp} XP`);',
    output: "Alex: 120 XP",
    lessonsList: [
      ["Why TypeScript?", "Annotate values and get earlier feedback.", 'const username: string = "Nova";\\nconst level: number = 1;', "TypeScript checks your code during development and compiles to JavaScript."],
      ["Basic types", "Work with common type annotations.", 'let active: boolean = true;\\nlet score: number = 100;\\nlet label: string = "ready";', "Types document what a value should be and help tools detect mismatches."],
      ["Typed functions", "Specify parameters and return values.", 'function add(a: number, b: number): number {\\n  return a + b;\\n}', "Function annotations help callers understand which arguments are valid."],
      ["Union types", "Allow a value to have specific alternatives.", 'type Status = "idle" | "loading" | "done";\\nlet status: Status = "idle";', "Unions model a closed set of possible values."],
      ["Interfaces", "Describe an object's shape.", 'interface Player {\\n  name: string;\\n  health: number;\\n}\\nconst p: Player = { name: "Nova", health: 100 };', "Interfaces describe the properties an object must provide."],
      ["Arrays & generics", "Type collections and reusable helpers.", 'const scores: number[] = [80, 92, 77];\\nfunction first<T>(items: T[]): T | undefined {\\n  return items[0];\\n}', "Generics preserve the relationship between input and output types."],
      ["Narrowing", "Prove which type a value has.", 'function show(value: string | number) {\\n  if (typeof value === "string") {\\n    console.log(value.toUpperCase());\\n  }\\n}', "A runtime check can narrow a union to a more specific type."],
      ["Mini project", "Model a typed task.", 'type Task = { title: string; done: boolean };\\nconst task: Task = { title: "Practice", done: false };\\nconsole.log(task.title);', "Start by modeling your data, then let those types guide the implementation."]
    ]
  }
];

const quizBank = {
  python: [
    { q: "Which keyword defines a function?", a: ["func", "def", "function", "method"], correct: 1, why: "Python uses def to define a function." },
    { q: "What is the first index in a list?", a: ["0", "1", "-1", "It depends"], correct: 0, why: "Python sequences are zero-indexed." },
    { q: "Which symbol starts a comment?", a: ["//", "#", "/*", "--"], correct: 1, why: "A hash begins a single-line Python comment." }
  ],
  cpp: [
    { q: "Where does a standard C++ program begin?", a: ["start()", "run()", "main()", "init()"], correct: 2, why: "The entry point is main." },
    { q: "Which container can resize dynamically?", a: ["std::vector", "int", "char", "bool"], correct: 0, why: "std::vector manages a dynamic array." },
    { q: "What does #include do?", a: ["Runs a loop", "Includes declarations from a header", "Creates a class", "Returns a value"], correct: 1, why: "The preprocessor directive includes a header." }
  ],
  csharp: [
    { q: "Which type stores true or false?", a: ["string", "int", "bool", "double"], correct: 2, why: "bool represents a Boolean value." },
    { q: "Which method writes a line to the console?", a: ["Console.WriteLine", "printLine", "echo", "System.Log"], correct: 0, why: "Console.WriteLine writes text and a newline." },
    { q: "What keyword declares a class?", a: ["object", "structonly", "type", "class"], correct: 3, why: "The class keyword declares a reference type." }
  ],
  html: [
    { q: "What does HTML primarily define?", a: ["Page structure", "Database queries", "Machine code", "Network routing"], correct: 0, why: "HTML describes the structure and meaning of web content." },
    { q: "Which attribute provides alternative text for an image?", a: ["title", "alt", "srcset", "role"], correct: 1, why: "The alt attribute gives an image text alternative." },
    { q: "Which element is the main page content landmark?", a: ["<section>", "<body>", "<main>", "<aside>"], correct: 2, why: "main identifies the document's dominant content." }
  ],
  javascript: [
    { q: "Which declaration cannot be reassigned?", a: ["let", "var", "const", "change"], correct: 2, why: "const prevents reassignment of the binding." },
    { q: "Which method adds an event listener?", a: ["on()", "addEventListener()", "listenFor()", "attach()"], correct: 1, why: "addEventListener registers a handler for an event." },
    { q: "Which value means intentional absence?", a: ["null", "false", "0", "NaN"], correct: 0, why: "null represents an intentional absence of a value." }
  ],
  typescript: [
    { q: "TypeScript is built on which language?", a: ["C#", "Java", "JavaScript", "Python"], correct: 2, why: "TypeScript extends JavaScript with a static type system." },
    { q: "Which operator describes a union type?", a: ["&", "|", "=>", "::"], correct: 1, why: "The | operator combines alternatives in a union." },
    { q: "When are TypeScript types usually checked?", a: ["Only after deployment", "During development/build", "Only at runtime", "Never"], correct: 1, why: "Type checking happens before runtime; types are erased from emitted JavaScript." }
  ]
};

const readProgress = () => {
  try { return JSON.parse(localStorage.getItem("codecraft-progress") || "{}"); }
  catch { return {}; }
};

function App() {
  const [activeId, setActiveId] = useState("python");
  const [view, setView] = useState("home");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [progress, setProgress] = useState(readProgress);
  const [search, setSearch] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [quizChoice, setQuizChoice] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [notice, setNotice] = useState("");
  const active = languages.find(l => l.id === activeId) || languages[0];
  const currentLesson = active.lessonsList[Math.min(lessonIndex, active.lessonsList.length - 1)];
  const totalDone = languages.reduce((sum, lang) => sum + Math.min(progress[lang.id]?.done?.length || 0, lang.lessons), 0);
  const totalLessons = languages.reduce((sum, lang) => sum + lang.lessons, 0);
  const filteredLanguages = useMemo(() => languages.filter(l => `${l.name} ${l.description} ${l.type}`.toLowerCase().includes(search.toLowerCase())), [search]);

  useEffect(() => { localStorage.setItem("codecraft-progress", JSON.stringify(progress)); }, [progress]);

  function openLanguage(id, targetView = "course") {
    setActiveId(id); setView(targetView); setLessonIndex(0); setMobileNav(false);
    setQuizChoice(null); setQuizIndex(0); setQuizScore(0); setQuizDone(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function markLesson() {
    setProgress(prev => {
      const item = prev[activeId] || { done: [], quizBest: 0 };
      const done = [...new Set([...item.done, lessonIndex])];
      return { ...prev, [activeId]: { ...item, done } };
    });
    setNotice("Lesson marked complete");
    window.setTimeout(() => setNotice(""), 1800);
  }
  function startQuiz() {
    setView("quiz"); setQuizIndex(0); setQuizChoice(null); setQuizScore(0); setQuizDone(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function submitAnswer() {
    if (quizChoice === null) return;
    const isCorrect = quizChoice === quizBank[activeId][quizIndex].correct;
    const nextScore = quizScore + (isCorrect ? 1 : 0);
    setQuizScore(nextScore);
    if (quizIndex === quizBank[activeId].length - 1) {
      setQuizDone(true);
      setProgress(prev => {
        const item = prev[activeId] || { done: [], quizBest: 0 };
        return { ...prev, [activeId]: { ...item, quizBest: Math.max(item.quizBest || 0, nextScore) } };
      });
    } else {
      setQuizIndex(i => i + 1);
    }
    setQuizChoice(null);
  }
  const doneCount = progress[activeId]?.done?.length || 0;
  const coursePercent = Math.round(doneCount / active.lessons * 100);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <button className="brand" onClick={() => setView("home")} aria-label="CodeCraft home">
          <span className="brand-mark"><Code2 size={22} strokeWidth={2.6} /></span>
          <span>codecraft<span className="brand-dot">.</span><small>ACADEMY</small></span>
        </button>
        <div className="side-label">WORKSPACE</div>
        <button className={`nav-link ${view === "home" ? "selected" : ""}`} onClick={() => { setView("home"); setMobileNav(false); }}><Compass size={18}/> Overview <span className="nav-hotkey">⌘ 1</span></button>
        <button className={`nav-link ${view === "course" ? "selected" : ""}`} onClick={() => setView("course")}><BookOpen size={18}/> My learning</button>
        <button className={`nav-link ${view === "quiz" ? "selected" : ""}`} onClick={startQuiz}><CircleHelp size={18}/> Quick quiz</button>
        <div className="side-divider" />
        <div className="side-label language-label">LANGUAGES <span>{languages.length}</span></div>
        <div className="language-nav">
          {languages.map(lang => (
            <button key={lang.id} className={`language-link ${activeId === lang.id && view !== "home" ? "language-active" : ""}`} onClick={() => openLanguage(lang.id)}>
              <span className="lang-icon" style={{ "--lang": lang.color }}>{lang.short}</span>
              <span>{lang.name}</span>
              <span className="mini-progress"><i style={{ width: `${Math.round((progress[lang.id]?.done?.length || 0) / lang.lessons * 100)}%`, background: lang.color }} /></span>
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="streak-card">
            <div className="streak-icon"><Flame size={18} fill="currentColor"/></div>
            <div><strong>Keep your streak</strong><p>Little steps add up.</p></div>
            <ArrowDownRight size={16} className="streak-arrow"/>
          </div>
          <div className="profile-row"><div className="avatar">C</div><div className="profile-text"><strong>Curious coder</strong><span>Free learner</span></div><span className="online-dot"/></div>
        </div>
      </aside>

      {mobileNav && <button className="mobile-backdrop" onClick={() => setMobileNav(false)} aria-label="Close menu" />}
      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20}/></button>
          <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{view === "home" ? "Overview" : view === "quiz" ? `${active.name} quiz` : active.name}</strong></div>
          <div className="top-actions">
            <div className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a language..." aria-label="Search languages"/><kbd>⌘ K</kbd></div>
            <button className="top-avatar" title="Learner profile">C</button>
          </div>
        </header>

        {view === "home" && (
          <div className="page-content">
            <section className="welcome-row">
              <div><div className="eyebrow"><span className="eyebrow-dot"/> YOUR NEXT CHAPTER STARTS HERE</div><h1>Build skills.<br/><span>Ship something real.</span></h1><p className="welcome-copy">Six languages. One place to start. Learn the fundamentals, practice with bite-sized lessons, and keep your progress moving.</p><div className="hero-actions"><button className="primary-btn" onClick={() => openLanguage("python")}><Play size={16} fill="currentColor"/> Continue learning <ArrowRight size={16}/></button><button className="text-btn" onClick={() => document.getElementById("language-grid")?.scrollIntoView({ behavior: "smooth" })}>Explore languages <ArrowDownRight size={16}/></button></div></div>
              <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-core"><Braces size={64} strokeWidth={1.5}/></div><span className="float-chip chip-python">Py</span><span className="float-chip chip-cpp">C++</span><span className="float-chip chip-js">JS</span><span className="float-chip chip-ts">TS</span><span className="sparkle s-one">✳</span><span className="sparkle s-two">✦</span></div>
            </section>
            <section className="stats-grid">
              <div className="stat-card"><div className="stat-icon purple"><BookOpen size={18}/></div><div><span className="stat-label">LESSONS COMPLETED</span><strong>{totalDone}<small> / {totalLessons}</small></strong><div className="stat-foot"><span className="stat-bar"><i style={{ width: `${totalDone / totalLessons * 100}%` }}/></span><span>{Math.round(totalDone / totalLessons * 100)}%</span></div></div></div>
              <div className="stat-card"><div className="stat-icon orange"><Flame size={18}/></div><div><span className="stat-label">LEARNING STREAK</span><strong>1 <small>day</small></strong><div className="stat-note">Start small. Show up often.</div></div></div>
              <div className="stat-card"><div className="stat-icon green"><Trophy size={18}/></div><div><span className="stat-label">QUIZ BEST SCORE</span><strong>{Math.max(0, ...languages.map(l => progress[l.id]?.quizBest || 0))}<small> / 3</small></strong><div className="stat-note">Test what you know.</div></div></div>
            </section>
            <section className="section-block" id="language-grid">
              <div className="section-heading"><div><div className="eyebrow muted">PICK YOUR PATH</div><h2>What do you want to build?</h2><p>Choose a language. Start with the basics. Keep leveling up.</p></div><span className="section-count">{filteredLanguages.length} COURSES <ChevronDown size={14}/></span></div>
              <div className="course-grid">
                {filteredLanguages.map((lang, i) => {
                  const complete = progress[lang.id]?.done?.length || 0;
                  return <article key={lang.id} className="course-card" style={{ "--accent": lang.color, "--delay": `${i * 45}ms` }}>
                    <div className="course-card-top"><span className="lang-badge">{lang.short}</span><span className="level-pill">{lang.level}</span><button className="card-arrow" onClick={() => openLanguage(lang.id)} aria-label={`Open ${lang.name}`}><ArrowUpRightIcon/></button></div>
                    <h3>{lang.name}</h3><p>{lang.description}</p>
                    <div className="course-meta"><span><BookOpen size={14}/>{lang.lessons} lessons</span><span><Zap size={14}/>{lang.time}</span></div>
                    <div className="card-progress"><div><span>YOUR PROGRESS</span><b>{Math.round(complete / lang.lessons * 100)}%</b></div><span className="progress-track"><i style={{ width: `${complete / lang.lessons * 100}%` }}/></span></div>
                    <button className="course-cta" onClick={() => openLanguage(lang.id)}>{complete ? "Continue course" : "Start learning"} <ArrowRight size={15}/></button>
                  </article>
                })}
                {filteredLanguages.length === 0 && <div className="empty-search">No languages match “{search}”. Try Python, C++, HTML, or TypeScript.</div>}
              </div>
            </section>
            <section className="bottom-banner"><div className="banner-symbol"><Sparkles size={21}/></div><div><strong>Learning is a build, not a race.</strong><p>Finish one small lesson today. Future you will be glad you did.</p></div><button onClick={() => openLanguage("javascript")}>Try a lesson <ArrowRight size={15}/></button></section>
            <footer className="footer"><span>© 2026 CodeCraft Academy</span><span>Made for the curious <span className="footer-heart">✦</span></span></footer>
          </div>
        )}

        {view === "course" && (
          <div className="page-content course-page">
            <div className="course-hero" style={{ "--accent": active.color }}>
              <div className="course-hero-main"><div className="eyebrow"><span className="eyebrow-dot" style={{ background: active.color }}/> LEARNING PATH <span className="hero-divider">/</span> {active.type.toUpperCase()}</div><div className="course-title-line"><span className="big-lang-icon">{active.short}</span><div><h1>{active.name}<span> fundamentals</span></h1><p>{active.tagline}</p></div></div><div className="course-hero-meta"><span><BookOpen size={15}/>{active.lessons} lessons</span><span><Zap size={15}/>{active.time}</span><span className="level-pill">{active.level}</span></div></div>
              <div className="course-ring" style={{ "--percent": `${coursePercent}%` }}><div><strong>{coursePercent}%</strong><span>COMPLETE</span></div></div>
            </div>
            <div className="learning-layout">
              <section className="lesson-panel">
                <div className="panel-heading"><div><div className="eyebrow muted">YOUR CURRICULUM</div><h2>Learn by doing</h2></div><span className="lesson-counter">{doneCount} of {active.lessons} done</span></div>
                <div className="lesson-list">
                  {active.lessonsList.map((lesson, i) => {
                    const isDone = (progress[activeId]?.done || []).includes(i);
                    return <button key={lesson[0]} className={`lesson-row ${lessonIndex === i ? "lesson-selected" : ""}`} onClick={() => setLessonIndex(i)}>
                      <span className={`lesson-number ${isDone ? "lesson-done" : ""}`}>{isDone ? <Check size={15}/> : String(i + 1).padStart(2, "0")}</span>
                      <span className="lesson-label"><strong>{lesson[0]}</strong><small>{lesson[1]}</small></span>
                      <span className="lesson-duration">{i === active.lessonsList.length - 1 ? "PROJECT" : `${8 + (i % 4) * 2} MIN`}</span>
                    </button>;
                  })}
                </div>
              </section>
              <section className="lesson-workspace">
                <div className="lesson-workspace-top"><span className="lesson-tag">LESSON {String(lessonIndex + 1).padStart(2, "0")}</span><span className="lesson-tag-right"><span className="live-dot"/> INTERACTIVE GUIDE</span></div>
                <h2>{currentLesson[0]}</h2><p className="lesson-intro">{currentLesson[1]}</p>
                <div className="code-window"><div className="code-window-top"><div className="window-dots"><i/><i/><i/></div><span>{active.id === "html" ? "index.html" : active.id === "python" ? "main.py" : active.id === "cpp" ? "main.cpp" : active.id === "csharp" ? "Program.cs" : active.id === "typescript" ? "main.ts" : "main.js"}</span><span className="code-language">{active.name}</span></div><pre><code>{currentLesson[2]}</code></pre></div>
                <div className="concept-box"><span className="concept-icon"><Sparkles size={16}/></span><div><strong>Key idea</strong><p>{currentLesson[3]}</p></div></div>
                <div className="lesson-actions"><button className="secondary-btn" disabled={lessonIndex === 0} onClick={() => setLessonIndex(i => Math.max(0, i - 1))}><ArrowLeft size={15}/> Previous</button><button className="primary-btn" onClick={() => { markLesson(); if (lessonIndex < active.lessons - 1) setLessonIndex(i => i + 1); }}><Check size={15}/> Mark complete <ArrowRight size={15}/></button></div>
                <div className="workspace-foot"><span><CircleHelp size={14}/> Take the quiz when you're ready.</span><button onClick={startQuiz}>Test your knowledge <ArrowRight size={14}/></button></div>
                {notice && <div className="toast"><Check size={15}/>{notice}</div>}
              </section>
            </div>
            <footer className="footer"><button className="back-home" onClick={() => setView("home")}><ArrowLeft size={14}/> Back to overview</button><span>Keep practicing. Keep building. <span className="footer-heart">✦</span></span></footer>
          </div>
        )}

        {view === "quiz" && (
          <div className="page-content quiz-page">
            <div className="quiz-topline"><button className="back-home" onClick={() => setView("course")}><ArrowLeft size={14}/> Back to lessons</button><span className="quiz-label"><CircleHelp size={15}/> QUICK CHECK</span></div>
            <div className="quiz-card">
              <div className="quiz-visual" style={{ "--accent": active.color }}><div className="quiz-orbit"/><div className="quiz-symbol"><Braces size={42}/></div><span className="quiz-float qf-one">{active.short}</span><span className="quiz-float qf-two">?</span></div>
              {!quizDone ? <>
                <div className="quiz-progress-top"><span>{active.name.toUpperCase()} · QUESTION {quizIndex + 1} OF {quizBank[activeId].length}</span><span>{Math.round(quizIndex / quizBank[activeId].length * 100)}%</span></div>
                <span className="quiz-progress-track"><i style={{ width: `${quizIndex / quizBank[activeId].length * 100}%` }}/></span>
                <h1>{quizBank[activeId][quizIndex].q}</h1><p className="quiz-subtitle">Choose the best answer to keep your skills sharp.</p>
                <div className="answer-list">{quizBank[activeId][quizIndex].a.map((answer, i) => <button key={answer} className={`answer-option ${quizChoice === i ? "answer-selected" : ""}`} onClick={() => setQuizChoice(i)}><span className="answer-letter">{String.fromCharCode(65 + i)}</span><span>{answer}</span><span className="answer-radio">{quizChoice === i && <i/>}</span></button>)}</div>
                <button className="primary-btn quiz-submit" disabled={quizChoice === null} onClick={submitAnswer}>Submit answer <ArrowRight size={16}/></button>
              </> : <div className="quiz-results"><div className="result-trophy"><Trophy size={30}/></div><div className="eyebrow muted">QUIZ COMPLETE</div><h1>{quizScore === quizBank[activeId].length ? "Perfect run." : quizScore >= 2 ? "Nice work." : "Good start."}</h1><p>You scored</p><div className="result-score">{quizScore}<span> / {quizBank[activeId].length}</span></div><p className="result-copy">Every attempt helps the concepts stick. Revisit a lesson and try again whenever you want.</p><div className="result-actions"><button className="secondary-btn" onClick={() => openLanguage(activeId)}>Review lessons</button><button className="primary-btn" onClick={startQuiz}>Try again <ArrowRight size={15}/></button></div></div>}
            </div>
            <footer className="footer"><span>© 2026 CodeCraft Academy</span><span>Practice makes progress <span className="footer-heart">✦</span></span></footer>
          </div>
        )}
      </main>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={16} className="diagonal-arrow"/>;
}

createRoot(document.getElementById("root")).render(<App />);

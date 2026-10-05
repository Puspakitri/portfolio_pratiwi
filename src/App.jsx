import { useCallback, useState } from "react";
import BookOpening from "./components/BookOpening";
import ContactForm from "./components/ContactForm";
import usePageMotion from "./hooks/usePageMotion";
import "./App.css";

const asset = (file) => `/landing-page/${file}.png`;
const books = [
  ["Aku Tidak Takut", "April 2020", "Inspirational fiction", 2067],
  [
    "Bait Cinta untuk Negeriku",
    "Published anthology",
    "Poetry & reflection",
    2068,
  ],
  ["Pantang Menyerah", "Published anthology", "Children’s literature", 2069],
  ["Ayah, I Love You…", "Published anthology", "Family & inspiration", 2070],
  [
    "Surat Cinta untuk Bunda",
    "Published anthology",
    "Letters & memories",
    2071,
  ],
  ["Tersakiti Lagi", "Published anthology", "Poetry collection", 2072],
];
const tools = [
  ["Excel", "Data analysis", "Group 48095858"],
  ["PowerPoint", "Visual storytelling", "Group 48095857"],
  ["Power BI", "Interactive dashboards", "Group 48095856"],
  ["Classroom", "Digital learning", "Group 48095859"],
  ["Sheets", "Collaborative data", "Frame 48095864"],
  ["Forms", "Surveys & research", "Vector23"],
];
const stack = [
  ["JavaScript", "Vector-3"],
  ["PHP", "Vector-12"],
  ["MySQL", "Vector-13"],
  ["React", "Vector-11"],
  ["Tailwind CSS", "Vector-9"],
  ["Bootstrap", "Vector-10"],
  ["Figma", "Vector-6"],
  ["Canva", "Vector-7"],
];
const projects = [
  {
    category: "Data Analytics",
    title: "Interactive Organizational Analytics Hub",
    description:
      "Turning complex data into clear insights. An interactive dashboard for operational performance and educational statistics.",
    tags: "Excel · Power BI · DAX",
    kind: "analytics",
  },
  {
    category: "Web Development",
    title: "Dynamic Student Information System",
    description:
      "A thoughtful academic management experience, bringing student records, course tracking, and grade calculations together.",
    tags: "PHP · MySQL · Tailwind",
    kind: "web",
  },
  {
    category: "UI / Design",
    title: "Anthology Visual Identity & Covers",
    description:
      "Stories deserve a beautiful first impression. Cover concepts and editorial layouts for children’s literature and poetry.",
    tags: "Typography · Canva · Figma",
    kind: "design",
  },
];
const socials = [
  [
    "Instagram",
    "@p.praatiwi",
    "https://instagram.com/p.praatiwi",
    "selfhst_instagram",
  ],
  [
    "TikTo",
    "@tiktoknyatiway",
    "https://tiktok.com/@tiktoknyatiway",
    "thesvg-color_tiktok-light",
  ],
  [
    "YouTube",
    "@pratiwiiip",
    "https://youtube.com/@pratiwiiip",
    "thesvg-color_youtube",
  ],
  [
    "Medium",
    "@smokingcannabis",
    "https://medium.com/@smokingcannabis",
    "thesvg-color_medium",
  ],
];
function BookCover({ book, className = "" }) {
  return (
    <img
      className={`book-cover ${className}`}
      src={asset(`Book slider/Rectangle ${book[3]}`)}
      alt={`${book[0]} book cover`}
      loading="lazy"
    />
  );
}
function Heading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
function ProjectPreview({ project }) {
  return (
    <div className={`project-preview ${project.kind}`}>
      <div className="mock-window">
        <div className="mock-top">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>{project.category}</span>
        </div>
        {project.kind === "analytics" ? (
          <div className="mock-chart">
            <div className="mock-stats">
              <span>
                Total records<strong>2,480</strong>
              </span>
              <span>
                Growth<strong>+24.8%</strong>
              </span>
            </div>
            <div className="bars">
              {[35, 55, 43, 70, 62, 87, 77, 100, 91].map((height, i) => (
                <i key={i} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        ) : project.kind === "web" ? (
          <div className="mock-portal">
            <div className="mock-sidebar" />
            <div>
              <span>Welcome back, Student</span>
              <div className="mock-tiles">
                <i />
                <i />
                <i />
              </div>
              <div className="mock-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        ) : (
          <div className="mock-books">
            {books.slice(0, 3).map((book) => (
              <BookCover book={book} key={book[0]} />
            ))}
          </div>
        )}
      </div>
      <span className="preview-caption">A CONCEPT EXPLORATION</span>
    </div>
  );
}
function App() {
  const [introActive, setIntroActive] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  usePageMotion(!introActive);
  const finishIntro = useCallback(() => setIntroActive(false), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(0);
  const [filter, setFilter] = useState("All Work");
  const book = books[selectedBook];
  return (
    <>
      {introActive && <BookOpening onComplete={finishIntro} />}
      <div inert={introActive}>
        <header className="header">
          <a className="wordmark" href="#home">
            PRATIWI PUSPAKITRI<span>PERSONAL PORTFOLIO</span>
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close ×" : "Menu ☰"}
          </button>
          <nav id="navigation" className={menuOpen ? "open" : ""}>
            {[
              ["About", "about"],
              ["Skills", "expertise"],
              ["Published Books", "books"],
              ["Gallery", "projects"],
              ["Social", "socials"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a className="button header-contact" href="#contact">
            Get in touch <span>↗</span>
          </a>
        </header>
        <main>
          <section className="hero container" id="home">
            <div className="hero-content">
              <div className="availability">
                <span /> OPEN TO IDEAS & COLLABORATIONS
              </div>
              <div className="hero-layout">
                <div className="portrait-frame">
                  <img
                    src={asset("Rectangle 2006")}
                    alt="Pratiwi Puspakitri wearing a grey hijab"
                  />
                  <span className="portrait-caption">
                    TECHNOLOGIST & STORYTELLER <span>↗</span>
                  </span>
                </div>
                <div className="hero-copy">
                  <h1>
                    PRATIWI
                    <br />
                    <em>PUSPAKITRI</em>
                  </h1>
                  <a className="button outline" href="#about">
                    Discover my world <span>↘</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-bottom">
              <span>BASED IN INDONESIA</span>
              <a href="#about">
                SCROLL TO EXPLORE <span>↓</span>
              </a>
              <span>01 — AN INTRODUCTION</span>
            </div>
          </section>
          <section className="about container section" id="about">
            <article className="panel about-card">
              <div className="card-meta">
                <span className="eyebrow">01 / THE PERSON</span>
                <span>✳</span>
              </div>
              <h2>
                Who <em>am I?</em>
              </h2>
              <p>
                Pelajar teknologi yang berfokus pada olah data, solusi digital,
                dan desain fungsional. Dikenal sebagai pribadi yang detail,
                adaptif, dan menyukai tantangan teknis. Memiliki sisi kreatif
                mendalam sebagai penulis yang telah menerbitkan{" "}
                <strong>6 buku.</strong>
              </p>
              <div className="about-notes">
                <div>
                  <span>DRIVEN BY</span>
                  <p>Curiosity & creativity</p>
                </div>
                <div>
                  <span>AT THE INTERSECTION</span>
                  <p>Data, design & stories</p>
                </div>
              </div>
            </article>
            <article className="panel language-card">
              <div className="language-title">
                <h3>Languages</h3>
                <span className="eyebrow">FLUENCY</span>
              </div>
              <p className="muted">
                Connecting across cultures, one word at a time.
              </p>
              <div className="languages">
                {[
                  ["Indonesian", "Native", 100, 375],
                  ["English", "Advanced", 85, 376],
                  ["Spanish", "Novice", 23, 377],
                  ["German", "Novice", 20, 378],
                ].map(([name, level, progress, flag]) => (
                  <div className="language" key={name}>
                    <img src={asset(`Ellipse ${flag}`)} alt={`${name} flag`} />
                    <div>
                      <div className="language-info">
                        <strong>{name}</strong>
                        <span>{level}</span>
                      </div>
                      <div
                        className="progress"
                        role="meter"
                        aria-label={`${name} fluency`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                        aria-valuetext={level}
                      >
                        <span style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <span className="tiny-note">
                THE WORLD IS BIG. KEEP LEARNING.
              </span>
            </article>
          </section>
          <section className="expertise section container" id="expertise">
            <Heading
              eyebrow="SPECIALIZATIONS & EVERYDAY TOOLS"
              title="PROFESSIONAL EXPERTISE"
            />
            <div className="category-label">
              <span>DATA, PRODUCTIVITY & LEARNING</span>
              <span>01 / 02</span>
            </div>
            <div className="tool-grid">
              {tools.map(([name, description, file]) => (
                <div className="tool panel" key={name}>
                  <img loading="lazy" src={asset(file)} alt="" />
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
            <div className="category-label">
              <span>DEVELOPMENT & CREATIVE TOOLKIT</span>
              <span>02 / 02</span>
            </div>
            <div className="stack panel">
              {stack.map(([name, file]) => (
                <div key={name}>
                  <img loading="lazy" src={asset(file)} alt="" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="books section container" id="books">
            <Heading eyebrow="THE LITERARY SIDE" title="PUBLISHED BOOKS">
              <p>Six books. Countless words. A world of stories.</p>
            </Heading>
            <div className="book-spotlight panel">
              <div className="spotlight-art">
                <BookCover book={book} />
                <span className="book-number">0{selectedBook + 1} / 06</span>
              </div>
              <div className="book-copy" aria-live="polite">
                <span className="eyebrow">A STORY WORTH SHARING</span>
                <h3>{book[0]}</h3>
                <div className="book-date">
                  <span>◷</span> {book[1]} <span>·</span> Published in Indonesia
                </div>
                <p>
                  Karya yang lahir dari imajinasi, pengalaman, dan rasa ingin
                  tahu. Sebuah perjalanan tentang keberanian, tumbuh bersama
                  cerita, dan menemukan makna dalam hal-hal sederhana.
                </p>
                <div className="tags">
                  <span>{book[2]}</span>
                  <span>Indonesian literature</span>
                </div>
                <a className="text-link" href="#contact">
                  Let’s talk about stories <span>↗</span>
                </a>
              </div>
            </div>
            <div className="book-shelf">
              {books.map((item, index) => (
                <button
                  key={item[0]}
                  className={`book-item ${selectedBook === index ? "selected" : ""}`}
                  onClick={() => setSelectedBook(index)}
                  aria-pressed={selectedBook === index}
                >
                  <BookCover book={item} />
                  <span className="book-item-number">0{index + 1}</span>
                  <span className="book-item-title">{item[0]}</span>
                  <span className="book-item-genre">{item[2]}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="projects section container" id="projects">
            <div className="project-header">
              <Heading
                eyebrow="SELECTED EXPLORATIONS"
                title="PROJECT’S GALLERY"
              />
              <div className="filters" aria-label="Filter projects">
                {[
                  "All Work",
                  "Data Analytics",
                  "Web Development",
                  "UI / Design",
                ].map((item) => (
                  <button
                    key={item}
                    aria-pressed={filter === item}
                    className={filter === item ? "active" : ""}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="project-grid">
              {projects
                .filter(
                  (item) => filter === "All Work" || filter === item.category,
                )
                .map((item) => (
                  <article
                    className={`project panel ${item.kind}`}
                    key={item.title}
                  >
                    <ProjectPreview project={item} />
                    <div className="project-body">
                      <span className="eyebrow">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="project-footer">
                        <span>{item.tags}</span>
                        <a href="#contact" aria-label={`Discuss ${item.title}`}>
                          Let’s discuss ↗
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
            <p className="gallery-note">
              Concepts inspired by data, technology, and storytelling.
            </p>
          </section>
          <section className="socials section container" id="socials">
            <Heading eyebrow="BEYOND THE PORTFOLIO" title="WHERE TO FIND ME" />
            <div className="filmstrip panel">
              <div className="film-holes" />
              <div className="film-frames">
                {["THINK", "CREATE", "WRITE", "REPEAT"].map((word, i) => (
                  <a
                    key={word}
                    href={socials[i][2]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit Pratiwi on ${socials[i][0]}`}
                  >
                    <span className="frame-count">0{i + 1} — PRATIWI</span>
                    <img
                      loading="lazy"
                      src={asset(`Rectangle ${2032 + i}`)}
                      alt={`Pratiwi — ${word.toLowerCase()}`}
                    />
                    <span className="frame-word">
                      {word}
                      <span>↗</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="film-holes" />
            </div>
            <div className="social-links">
              {socials.map(([name, handle, url, logo]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name}: ${handle}`}
                >
                  <img
                    className="social-logo"
                    src={asset(logo)}
                    alt=""
                    loading="lazy"
                  />
                  {handle}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </section>
          <section className="contact section container" id="contact">
            <Heading
              eyebrow="GOOD THINGS BEGIN WITH A CONVERSATION"
              title="GET IN TOUCH"
            />
            <div className="contact-panel panel">
              <div className="contact-copy">
                <span className="eyebrow">LET’S MAKE SOMETHING MEANINGFUL</span>
                <h3>
                  Having
                  <br />
                  questions
                  <br />
                  <em>or ideas?</em>
                </h3>
                <p>
                  Reach out anytime and let’s connect.
                  <br />
                  Untuk ide baru, kolaborasi digital,
                  <br />
                  atau sekadar bertukar cerita.
                </p>
                <span className="contact-note">
                  <span /> Always open to a thoughtful conversation.
                </span>
              </div>
              <ContactForm />
            </div>
          </section>
        </main>
        <footer className="footer container">
          <span>© 2026 Pratiwi Puspakitri</span>
          <span>MADE WITH CURIOSITY & CARE</span>
          <a href="#home">Back to top ↑</a>
        </footer>
      </div>
    </>
  );
}
export default App;

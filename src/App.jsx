import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Experiment", href: "/experiment" },
];

const aboutText =
  "Computer science researcher exploring creativity, digital fabrication, and human-computer interaction. My work focuses on designing technologies that better support how people learn, create, fail, and iterate. I enjoy building research communities just as much as I enjoy building research systems, and I'm passionate about making creative expertise more accessible through thoughtful design.";

const projects = [
  {
    title: "BEADLE",
    authors: "Creativity & Cognition 2026",
    href: "https://drive.google.com/file/d/11XAXWlFk54KKy4asaxZbjIebSj7KNndM/view?usp=sharing",
    image: "/assets/images/Fuseblocks.png",
    description:
      "Beadle explores material-aware CAD/CAM workflows using fuse beads as an expressive fabrication medium. The project investigates how digital design tools can better capture the physical properties of craft materials instead of treating them as idealized geometry. I contributed to the research, software development, fabrication, evaluation, and publication.",
    icons: [
      ["React", "/assets/icons/React.png"],
      ["Paper.js", "/assets/icons/Paper.js.png"],
      ["OpenSCAD", "/assets/icons/openSCAD.png"],
      ["JavaScript", "/assets/icons/Node.js.png"],
      ["Digital Fabrication", "/assets/icons/FDM.png"],
      ["3D Printing", "/assets/icons/FDM.png"],
      ["Laser Cutting", "/assets/icons/FDM.png"],
    ],
  },
  {
    title: "CASE BY CASE",
    authors: "Creativity & Cognition 2026 — Best Paper Award",
    href: "https://alluring-mambo-972.notion.site/18f904b24ec18196ac2ffd4950463015?v=18f904b24ec181f49434000ce6c14410",
    image: "/assets/images/acm.jpg",
    description:
      "Case by Case investigates how expert ceramic knowledge can be represented, validated, and shared through computational knowledge representations. The work focuses on documenting experiential knowledge—including failures, heuristics, and exceptions—that is often missing from traditional documentation. I led ontology development, study design, software development, and writing.",
    icons: [
      ["Neo4j", "/assets/icons/Node.js.png"],
      ["React", "/assets/icons/React.png"],
      ["TypeScript", "/assets/icons/React.png"],
      ["Knowledge Graphs", "/assets/icons/Notion.png"],
      ["Ontology Design", "/assets/icons/Notion.png"],
      ["User Research", "/assets/icons/Figma.png"],
      ["Human–Computer Interaction", "/assets/icons/Figma.png"],
    ],
  },
  {
    title: "RHEOCAST",
    authors: "2025–2026",
    href: "https://youtu.be/byfGf6kUgbk",
    image: "/assets/images/PH.png",
    description:
      "RheoCast began as a sensing system for understanding ceramic slip behavior and predicting casting readiness. As the project evolved, it shifted toward studying uncertainty, material behavior, and failure throughout creative practice, ultimately laying the foundation for later research on error-aware fabrication systems.",
    icons: [
      ["Embedded Systems", "/assets/icons/Ardunio.png"],
      ["Arduino", "/assets/icons/Ardunio.png"],
      ["Sensors", "/assets/icons/Ardunio.png"],
      ["Python", "/assets/icons/Python.png"],
      ["Rapid Prototyping", "/assets/icons/FDM.png"],
      ["Research", "/assets/icons/Notion.png"],
    ],
  },
  {
    title: "ACM RESEARCH",
    authors: "Director of Research",
    href: "https://devpost.com/software/planet-score",
    image: "/assets/images/PlanetScore.png",
    description:
      "As Director of Research for ACM at UTA, I built and led an undergraduate research program designed to lower the barrier to research. I organized workshops, mentored student teams, connected students with faculty mentors, and helped projects progress from ideas to conference publications.",
    icons: [
      ["Leadership", "/assets/icons/Notion.png"],
      ["Mentorship", "/assets/icons/Notion.png"],
      ["Program Development", "/assets/icons/Notion.png"],
      ["Research Management", "/assets/icons/Notion.png"],
      ["Community Building", "/assets/icons/Notion.png"],
      ["Public Speaking", "/assets/icons/Notion.png"],
    ],
  },
  {
    title: "GIRLS WHO CODE",
    authors: "Co-Founder & Vice President",
    href: "https://devpost.com/software/panicbuddy",
    image: "/assets/images/panicbuddy.png",
    description:
      "I co-founded the University of Texas at Arlington chapter of Girls Who Code to create a welcoming community for women in computing. The organization hosts technical workshops, networking opportunities, mentorship initiatives, and community events that help students build confidence and belonging in technology.",
    icons: [
      ["Leadership", "/assets/icons/Notion.png"],
      ["Community Building", "/assets/icons/Notion.png"],
      ["Event Planning", "/assets/icons/Notion.png"],
      ["Mentorship", "/assets/icons/Notion.png"],
      ["Public Speaking", "/assets/icons/Notion.png"],
      ["Graphic Design", "/assets/icons/Figma.png"],
    ],
  },
  {
    title: "PERMANENT HALLOWEEN",
    authors: "Personal Creative Project",
    href: "https://well-logged.vercel.app/",
    image: "/assets/images/well-logged.png",
    description:
      "Permanent Halloween is an ongoing creative brand exploring spooky aesthetics through photography, design, storytelling, and visual identity. It serves as a space for experimenting with creative direction and interactive media outside of my academic research.",
    icons: [
      ["Photography", "/assets/icons/Film.png"],
      ["Adobe Illustrator", "/assets/icons/Figma.png"],
      ["Adobe Photoshop", "/assets/icons/Figma.png"],
      ["Brand Identity", "/assets/icons/Figma.png"],
      ["Graphic Design", "/assets/icons/Figma.png"],
      ["Creative Direction", "/assets/icons/Film.png"],
    ],
  },
];

const screenplaySections = [
  {
    heading: "BEADLE",
    slug: "INT. FABRICATION LAB – DAY",
    action:
      "Beadle explores material-aware CAD/CAM workflows using fuse beads as an expressive fabrication medium. The project investigates how digital design tools can better capture the physical properties of craft materials instead of treating them as idealized geometry. I contributed to the research, software development, fabrication, evaluation, and publication.",
    character: "DATE",
    dialogue: "Creativity & Cognition 2026",
    entries: [
      {
        title: "Tools",
        meta: "React | Paper.js | OpenSCAD | JavaScript | Digital Fabrication | 3D Printing | Laser Cutting",
      },
    ],
  },
  {
    heading: "CASE BY CASE",
    slug: "INT. CERAMICS STUDIO – AFTERNOON",
    action:
      "Case by Case investigates how expert ceramic knowledge can be represented, validated, and shared through computational knowledge representations. The work focuses on documenting experiential knowledge—including failures, heuristics, and exceptions—that is often missing from traditional documentation. I led ontology development, study design, software development, and writing.",
    character: "DATE",
    dialogue: "Creativity & Cognition 2026 — Best Paper Award",
    entries: [
      {
        title: "Tools",
        meta: "Neo4j | React | TypeScript | Knowledge Graphs | Ontology Design | User Research | Human–Computer Interaction",
      },
    ],
  },
  {
    heading: "RHEOCAST",
    slug: "INT. CERAMICS LAB – MORNING",
    action:
      "RheoCast began as a sensing system for understanding ceramic slip behavior and predicting casting readiness. As the project evolved, it shifted toward studying uncertainty, material behavior, and failure throughout creative practice, ultimately laying the foundation for later research on error-aware fabrication systems.",
    character: "DATE",
    dialogue: "2025–2026",
    entries: [
      {
        title: "Tools",
        meta: "Embedded Systems | Arduino | Sensors | Python | Rapid Prototyping | Research",
      },
    ],
  },
  {
    heading: "ACM RESEARCH",
    slug: "INT. UNIVERSITY CLASSROOM – EVENING",
    action:
      "As Director of Research for ACM at UTA, I built and led an undergraduate research program designed to lower the barrier to research. I organized workshops, mentored student teams, connected students with faculty mentors, and helped projects progress from ideas to conference publications.",
    character: "DATE",
    dialogue: "Director of Research",
    entries: [
      {
        title: "Tools",
        meta: "Leadership | Mentorship | Program Development | Research Management | Community Building | Public Speaking",
      },
    ],
  },
  {
    heading: "GIRLS WHO CODE",
    slug: "INT. CAMPUS MEETING ROOM – NIGHT",
    action:
      "I co-founded the University of Texas at Arlington chapter of Girls Who Code to create a welcoming community for women in computing. The organization hosts technical workshops, networking opportunities, mentorship initiatives, and community events that help students build confidence and belonging in technology.",
    character: "DATE",
    dialogue: "Co-Founder & Vice President",
    entries: [
      {
        title: "Tools",
        meta: "Leadership | Community Building | Event Planning | Mentorship | Public Speaking | Graphic Design",
      },
    ],
  },
  {
    heading: "PERMANENT HALLOWEEN",
    slug: "INT. LIVING ROOM – OCTOBER NIGHT",
    action:
      "Permanent Halloween is an ongoing creative brand exploring spooky aesthetics through photography, design, storytelling, and visual identity. It serves as a space for experimenting with creative direction and interactive media outside of my academic research.",
    character: "DATE",
    dialogue: "Personal Creative Project",
    entries: [
      {
        title: "Tools",
        meta: "Photography | Adobe Illustrator | Adobe Photoshop | Brand Identity | Graphic Design | Creative Direction",
      },
    ],
  },
];

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function SideNav() {
  return (
    <nav className="side-nav" aria-label="Primary navigation">
      <div className="logo padding-32">
        <a href="#home">mariah-gardner.com</a>
      </div>
      {navItems.map((item) => (
        <a className="bar-item button" href={item.href} key={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function Section({ id, title, children }) {
  return (
    <section className="container padding-32" id={id}>
      <h3 className="border-bottom border-light-grey padding-16">{title}</h3>
      {children}
    </section>
  );
}

function TechIcon({ label, src }) {
  return (
    <div className="icon-block">
      <img src={src} alt={label} className="icon" />
      <div className="tooltip">{label}</div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="col l4 m6">
      <div className="display-container">
        {project.badge ? <div className="display-topleft black padding">{project.badge}</div> : null}
        <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
          <div className="image-wrapper">
            <img src={project.image} alt="" className="square-image" />
          </div>
          <div>
            <b>{project.title}</b>
          </div>
          <div>{project.authors}</div>
        </a>
        <small>{project.description}</small>
        <div className="icon-container" aria-label={`${project.title} technologies`}>
          {project.icons.map(([label, src]) => (
            <TechIcon label={label} src={src} key={`${project.title}-${label}`} />
          ))}
        </div>
      </div>
    </article>
  );
}

function ScreenplaySectionPage({ section, index }) {
  const renderEntryContent = (entry) => (
    <>
      <span>{entry.title}</span>
      <span>{entry.meta ?? entry.authors}</span>
      {entry.details ? (
        <ul>
          {entry.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      ) : null}
    </>
  );

  return (
    <div className="screenplay-scene">
      <p className="scene-heading">
        <span className="scene-number">{index + 1}</span>
        <span>{section.slug}</span>
        <span className="scene-number">{index + 1}</span>
      </p>
      <p className="scene-section">TITLE CARD: {section.heading}</p>
      <p className="scene-action">{section.action}</p>
      <div className="scene-dialogue">
        <p>{section.character}</p>
        <p>{section.dialogue}</p>
      </div>
      <div className="scene-items">
        {section.entries.map((entry) => (
          entry.href ? (
            <a href={entry.href} key={entry.title} target="_blank" rel="noreferrer">
              {renderEntryContent(entry)}
            </a>
          ) : (
            <div className="scene-item" key={entry.title}>
              {renderEntryContent(entry)}
            </div>
          )
        ))}
      </div>
      <p className="scene-transition">CONTINUED</p>
    </div>
  );
}

function ScreenplayPageContent({ page }) {
  if (page.type === "about") {
    return (
      <div className="screenplay-title-page">
        <div className="title-lockup">
          <p className="title-overline">A PORTFOLIO SCREENPLAY</p>
          <h1>MARIAH GARDNER</h1>
          <p>{aboutText}</p>
          <p>FADE IN.</p>
        </div>
        <div className="title-contact" aria-label="Portfolio summary">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    );
  }

  if (page.type === "final") {
    return (
      <div className="screenplay-title-page">
        <div className="title-lockup">
          <p>FADE OUT.</p>
          <h1>THE END</h1>
          <p>MARIAH GARDNER</p>
          <p>Research • Design • Community</p>
        </div>
        <div className="title-contact" aria-label="Portfolio ending">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    );
  }

  return <ScreenplaySectionPage section={page.section} index={page.index} />;
}

function PageCurlOverlay({ curlKey, direction }) {
  const sketchRef = useRef(null);
  const curlKeyRef = useRef(curlKey);
  const directionRef = useRef(direction);

  useEffect(() => {
    curlKeyRef.current = curlKey;
    directionRef.current = direction;
  }, [curlKey, direction]);

  useEffect(() => {
    let instance;
    let cancelled = false;

    const sketch = (p) => {
      let seenCurl = curlKeyRef.current;
      let progress = 1;
      let turnDirection = directionRef.current;

      p.setup = () => {
        const parent = sketchRef.current;
        const canvas = p.createCanvas(parent.clientWidth, parent.clientHeight);
        canvas.parent(parent);
        p.noStroke();
        p.clear();
      };

      p.windowResized = () => {
        const parent = sketchRef.current;

        if (parent) {
          p.resizeCanvas(parent.clientWidth, parent.clientHeight);
        }
      };

      p.draw = () => {
        if (seenCurl !== curlKeyRef.current) {
          seenCurl = curlKeyRef.current;
          turnDirection = directionRef.current;
          progress = 0;
        }

        p.clear();

        if (progress >= 1) {
          return;
        }

        progress = Math.min(1, progress + 0.034);
        drawCurlingPage(p, progress, turnDirection);
      };
    };

    import("p5").then((module) => {
      if (cancelled) {
        return;
      }

      const P5 = module.default;
      instance = new P5(sketch);
    });

    return () => {
      cancelled = true;
      instance?.remove();
    };
  }, []);

  return <div className="page-curl-overlay" ref={sketchRef} aria-hidden="true" />;
}

function drawCurlingPage(p, progress, direction) {
  const w = p.width;
  const h = p.height;
  const eased = easeInOutCubic(progress);
  const fromRight = direction === "next";
  const pageW = Math.min(w * 0.42, h * 0.772727 * 0.48);
  const pageH = pageW * 1.294118;
  const top = (h - pageH) / 2;
  const gutter = w / 2;
  const startX = fromRight ? gutter + 7 : gutter - 7;
  const outerStart = fromRight ? startX + pageW : startX - pageW;
  const curl = Math.sin(eased * Math.PI) * pageW * 0.34;
  const outerX = fromRight
    ? p.lerp(outerStart, startX - pageW * 0.92, eased)
    : p.lerp(outerStart, startX + pageW * 0.92, eased);
  const foldX = fromRight ? outerX + curl : outerX - curl;
  const lowerBend = Math.sin(eased * Math.PI) * pageH * 0.08;
  const alpha = 255 * Math.sin(progress * Math.PI);

  p.push();
  p.noStroke();
  p.fill(0, 0, 0, alpha * 0.16);
  p.quad(
    startX,
    top + 8,
    fromRight ? outerX - pageW * 0.04 : outerX + pageW * 0.04,
    top + 26,
    fromRight ? outerX - pageW * 0.06 : outerX + pageW * 0.06,
    top + pageH + 28,
    startX,
    top + pageH + 12,
  );

  const paperShade = p.map(Math.sin(eased * Math.PI), 0, 1, 248, 228);
  p.fill(paperShade, paperShade - 2, paperShade - 8, alpha);
  p.stroke(30, 30, 30, alpha * 0.34);
  p.strokeWeight(1);
  p.beginShape();
  p.vertex(startX, top);
  p.bezierVertex(foldX, top + pageH * 0.06, foldX, top + pageH * 0.32, outerX, top + pageH * 0.5);
  p.bezierVertex(foldX, top + pageH * 0.7, foldX, top + pageH * 0.94, startX, top + pageH);
  p.endShape(p.CLOSE);

  p.noFill();
  p.stroke(80, 80, 80, alpha * 0.22);
  p.strokeWeight(1);
  for (let line = 0; line < 18; line += 1) {
    const y = top + pageH * 0.16 + line * pageH * 0.034;
    const inset = pageW * 0.14;
    const wobble = Math.sin(line * 0.9 + progress * 4) * lowerBend * 0.08;
    p.line(
      fromRight ? Math.min(startX, outerX) + inset : Math.max(startX, outerX) - inset,
      y + wobble,
      fromRight ? Math.max(startX, outerX) - inset * 0.72 : Math.min(startX, outerX) + inset * 0.72,
      y - wobble,
    );
  }

  p.stroke(255, 255, 255, alpha * 0.45);
  p.strokeWeight(Math.max(2, pageW * 0.018));
  p.line(foldX, top + pageH * 0.05, outerX, top + pageH * 0.5);
  p.line(outerX, top + pageH * 0.5, foldX, top + pageH * 0.95);
  p.pop();
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function ExperimentPage() {
  const pages = [
    { type: "about", key: "about" },
    ...screenplaySections.map((section, index) => ({ type: "section", section, key: section.heading, index })),
    { type: "final", key: "final" },
  ];
  const spreads = [
    [pages[0]],
    ...Array.from({ length: Math.ceil((pages.length - 1) / 2) }, (_, spreadIndex) =>
      pages.slice(1 + spreadIndex * 2, 1 + spreadIndex * 2 + 2),
    ),
  ];
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [curlKey, setCurlKey] = useState(0);
  const currentSpread = spreads[spreadIndex];
  const firstVisiblePageNumber = spreadIndex === 0 ? 1 : spreadIndex * 2;
  const spreadLabel =
    currentSpread.length === 1
      ? String(firstVisiblePageNumber).padStart(2, "0")
      : `${String(firstVisiblePageNumber).padStart(2, "0")}-${String(firstVisiblePageNumber + 1).padStart(2, "0")}`;
  const goToSpread = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= spreads.length || nextIndex === spreadIndex) {
      return;
    }

    setDirection(nextIndex > spreadIndex ? "next" : "prev");
    setSpreadIndex(nextIndex);
    setCurlKey((current) => current + 1);
  };

  return (
    <main className="experiment-page screenplay-book">
      <header className="screenplay-topbar">
        <a href="/">MARIAH-GARDNER.COM</a>
        <span>SCREENPLAY PORTFOLIO</span>
        <span>PAGE {spreadLabel} / {String(pages.length).padStart(2, "0")}</span>
      </header>

      <section className={`book-shell ${spreadIndex === 0 ? "single-page" : "two-page"}`} aria-live="polite">
        <div className={`book-spread flip-${direction}`} key={currentSpread.map((page) => page.key).join("-")}>
          {currentSpread.map((page, pageOffset) => {
            const visiblePageNumber = spreadIndex === 0 ? 0 : firstVisiblePageNumber + pageOffset;

            return (
              <div className="book-page" key={page.key}>
                <span className="script-page-number">{visiblePageNumber === 0 ? "" : `${visiblePageNumber}.`}</span>
                <ScreenplayPageContent page={page} />
              </div>
            );
          })}
          {currentSpread.length === 1 && spreadIndex !== 0 ? (
            <div className="book-page blank-page" aria-hidden="true">
              <div>
                <p className="scene-transition">FADE OUT.</p>
              </div>
            </div>
          ) : null}
        </div>
        <PageCurlOverlay curlKey={curlKey} direction={direction} />
      </section>

      <nav className="book-controls" aria-label="Screenplay pages">
        <button disabled={spreadIndex === 0} onClick={() => goToSpread(spreadIndex - 1)} type="button">
          Previous
        </button>
        <div>
          {spreads.map((spread, index) => (
            <button
              className={index === spreadIndex ? "active" : ""}
              key={spread.map((page) => page.key).join("-")}
              onClick={() => goToSpread(index)}
              type="button"
              aria-label={`Go to spread ${index + 1}`}
            />
          ))}
        </div>
        <button disabled={spreadIndex === spreads.length - 1} onClick={() => goToSpread(spreadIndex + 1)} type="button">
          Next
        </button>
      </nav>

      <section className="mobile-script" aria-label="Mobile screenplay pages">
        {pages.map((page, index) => (
          <article className="book-page mobile-page" key={page.key}>
            <span className="script-page-number">{index === 0 ? "" : `${index}.`}</span>
            <ScreenplayPageContent page={page} />
          </article>
        ))}
      </section>
    </main>
  );
}

function AboutScatterText() {
  const frameRef = useRef(null);
  const [width, setWidth] = useState(760);
  const font = '16px "Lab Mono", monospace';
  const lineHeight = 26;
  const padding = 8;

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame) {
      return undefined;
    }

    const updateWidth = () => {
      setWidth(Math.max(260, Math.floor(frame.clientWidth)));
    };
    const observer = new ResizeObserver(updateWidth);

    updateWidth();
    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  const prepared = useMemo(() => prepareWithSegments(aboutText, font), [font]);
  const maxTextWidth = Math.max(220, width - padding * 2);
  const aboutLayout = layoutWithLines(prepared, maxTextWidth, lineHeight);
  const svgHeight = aboutLayout.height + padding * 2;
  let characterIndex = 0;

  return (
    <div className="about-scatter" ref={frameRef}>
      <p className="sr-only">{aboutText}</p>
      <svg
        className="about-scatter-art"
        viewBox={`0 0 ${width} ${svgHeight}`}
        role="img"
        aria-label={aboutText}
      >
        {aboutLayout.lines.map((line, lineIndex) => {
          const y = padding + lineIndex * lineHeight + 17;
          const charWidth = line.text.length > 0 ? line.width / line.text.length : 9.6;

          return (
            <g key={`${line.text}-${lineIndex}`}>
              {[...line.text].map((letter, letterIndex) => {
                const currentIndex = characterIndex;
                characterIndex += 1;

                return (
                  <text
                    className="scatter-letter"
                    key={`${lineIndex}-${letterIndex}-${letter}`}
                    x={padding + letterIndex * charWidth}
                    y={y}
                    style={{
                      "--scatter-x": `${Math.sin(currentIndex * 1.73) * 34}px`,
                      "--scatter-y": `${Math.cos(currentIndex * 2.11) * 22}px`,
                      "--scatter-rotate": `${Math.sin(currentIndex * 0.87) * 18}deg`,
                      transitionDelay: `${(currentIndex % 9) * 8}ms`,
                    }}
                  >
                    {letter === " " ? "\u00a0" : letter}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
      <div className="about-sources" aria-label="About section links">
        <ExternalLink href="https://www.uta.edu/news/news-releases/2023/09/11/uta-recognized-by-insight-into-diversity">
          UTA diversity
        </ExternalLink>
        <ExternalLink href="https://www.uta.edu/news/news-releases/2021/12/17/uta-renamed-to-carnegie-r1-category">
          R1 status
        </ExternalLink>
        <ExternalLink href="https://www.leedsbeckett.ac.uk/">
          Leeds Beckett University
        </ExternalLink>
      </div>
    </div>
  );
}

export default function App() {
  if (window.location.pathname === "/experiment") {
    return <ExperimentPage />;
  }

  return (
    <>
      <SideNav />
      <main className="main-content" id="home">
        <div className="content-container">
          <Section id="about" title="About">
            <div className="main-copy">
              <AboutScatterText />
            </div>
          </Section>

          <Section id="news" title="News">
            <div className="main-copy">
              <p>
                Nov 2024: I just won{" "}
                <ExternalLink href="https://devpost.com/software/planet-score">
                  best devpost
                </ExternalLink>{" "}
                at the second largest hackathon in the country!
              </p>
              <p>
                Oct 2024: Attended SWE 2024 as a part of a student cohort from UTA. Delighted to
                meet new friends and learn new things!
              </p>
            </div>
          </Section>

          <Section id="projects" title="Projects">
            <div className="row-padding">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.title} />
              ))}
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="main-copy">
              <p>mxg6678 [at] mavs.uta.edu</p>
            </div>
          </Section>
        </div>
      </main>
    </>
  );
}

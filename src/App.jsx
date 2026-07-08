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
  "I'm a Computer Science sophomore at the University of Texas at Arlington, an institution celebrated for its diversity and proud status as an R1 research institution. Prior to this, I earned a BFA in Filmmaking from Leeds Beckett University, where I developed a deep appreciation for storytelling and creative expression. Now, my academic journey is fueled by a passion for research, particularly in the field of Human-Computer Interaction (HCI). After graduation, I plan to pursue a PhD in HCI, focusing on innovative ways to bridge technology and creativity.";

const projects = [
  {
    title: "Fuseblocks: Enabling Expressive Multimaterial Modeling through Modular CAD-CAM Fuse Bead Prototyping",
    authors: "Mariah Gardner, Nasir Rakib, Cesar Torres",
    href: "https://drive.google.com/file/d/11XAXWlFk54KKy4asaxZbjIebSj7KNndM/view?usp=sharing",
    image: "/assets/images/Fuseblocks.png",
    description:
      "A manuscript completed for a 2024 NSF REU, with the project currently being revised for submission to TEI '26.",
    icons: [
      ["React", "/assets/icons/React.png"],
      ["FDM", "/assets/icons/FDM.png"],
      ["Paper.js", "/assets/icons/Paper.js.png"],
      ["openSCAD", "/assets/icons/openSCAD.png"],
      ["Unity", "/assets/icons/Unity.png"],
      ["Node.js", "/assets/icons/Node.js.png"],
      ["LaTex", "/assets/icons/LaTex.png"],
      ["Figma", "/assets/icons/Figma.png"],
    ],
  },
  {
    title: "Director of Research for ACM UTA",
    authors: "Mariah Gardner, Rohita Konjeti",
    href: "https://alluring-mambo-972.notion.site/18f904b24ec18196ac2ffd4950463015?v=18f904b24ec181f49434000ce6c14410",
    image: "/assets/images/acm.jpg",
    description: (
      <>
        We are relaunching the research division of our{" "}
        <a href="https://acmuta.com/" target="_blank" rel="noreferrer">
          ACM student chapter
        </a>{" "}
        with an emphasis on mentoring students and guiding them into research.
      </>
    ),
    icons: [
      ["Notion", "/assets/icons/Notion.png"],
      ["Figma", "/assets/icons/Figma.png"],
    ],
  },
  {
    title: "Permanent Halloween",
    authors: "Mariah Gardner, Ray Baker, Tom Foden",
    href: "https://youtu.be/byfGf6kUgbk",
    image: "/assets/images/PH.png",
    description:
      "A short film completed as our graduation project, for which I created the shoot schedule, managed the budget, and led the team.",
    icons: [
      ["Movie Magic", "/assets/icons/MM.png"],
      ["Excel", "/assets/icons/Excel.png"],
      ["16mm Film", "/assets/icons/Film.png"],
    ],
  },
  {
    title: "Planet Score",
    authors: "Mariah Gardner",
    href: "https://devpost.com/software/planet-score",
    image: "/assets/images/PlanetScore.png",
    badge: "Best Devpost",
    description:
      "A Google Chrome extension that computes the carbon footprint of products while users shop.",
    icons: [
      ["Chrome Extension", "/assets/icons/Chrome.png"],
      ["Life Cycle Assessment", "/assets/icons/LCA.png"],
      ["Python", "/assets/icons/Python.png"],
    ],
  },
  {
    title: "Panic Buddy",
    authors: "Mariah Gardner, Rohita Konjeti, Ashwin Indurti, Samanza Ahmed",
    href: "https://devpost.com/software/panicbuddy",
    image: "/assets/images/panicbuddy.png",
    description: "An iOS app that alerts loved ones in the event of a user's panic attack.",
    icons: [
      ["Swift", "/assets/icons/Swift.png"],
      ["Ngork", "/assets/icons/Ngork.png"],
      ["Arduino", "/assets/icons/Ardunio.png"],
    ],
  },
  {
    title: "Well-Logged!",
    authors: "Mariah Gardner, Matheos Giakoumi, Gabriel Ojo, Manav Patel, Leena Abdulqader",
    href: "https://well-logged.vercel.app/",
    image: "/assets/images/well-logged.png",
    description:
      "A React app that interfaces with a Python application via FastAPI to generate well log visuals using Matplotlib.",
    icons: [
      ["React", "/assets/icons/React.png"],
      ["FastAPI", "/assets/icons/FastAPI.png"],
      ["Python", "/assets/icons/Python.png"],
      ["Matplotlib", "/assets/icons/MatLib.png"],
    ],
  },
];

const screenplaySections = [
  {
    heading: "EDUCATION",
    slug: "INT. STUDY ROOM - DAY",
    action:
      "Two disciplines sit on the same desk: computer science in Texas, filmmaking in Leeds. The technical and creative timelines refuse to stay separate.",
    character: "TRANSCRIPT",
    dialogue:
      "B.S. in Computer Science, University of Texas at Arlington. B.F.A. in Filmmaking, Leeds Beckett University.",
    entries: [
      {
        title: "The University of Texas at Arlington",
        meta: "B.S. in Computer Science | Arlington, Texas | Aug. 2023 - est. May 2027",
      },
      {
        title: "Leeds Beckett University",
        meta: "B.F.A. in Filmmaking | Leeds, United Kingdom | Sept. 2018 - June 2021",
      },
    ],
  },
  {
    heading: "RESEARCH EXPERIENCE",
    slug: "INT. FABRICATION STUDIO - DAY",
    action:
      "Material practice becomes a research method. Ceramic slip-casting, fuse beads, and physical computing all become ways to study how people create with tools.",
    character: "RESEARCHER",
    dialogue: "Creativity support tools start with the textures, constraints, and decisions of real making.",
    entries: [
      {
        title: "Computing Research Association's Undergraduates to PhD (U2PhD) REU",
        meta: "Researcher | Arlington, Texas | June 2025 - Aug. 2025",
        details: [
          "Investigated ceramic slip-casting as a material interaction case study for physical and hybrid creative systems.",
          "Analyzed material affordances and interaction patterns across fabrication modalities.",
        ],
      },
      {
        title: "Mirage Mentoring Program",
        meta: "Researcher | Arlington, Texas | June 2025 - Aug. 2025",
        details: [
          "Designed a studio-based user study on creative workflows in physical computing and fabrication contexts.",
          "Conducted qualitative coding and thematic analysis to inform interactive systems research.",
        ],
      },
    ],
  },
  {
    heading: "RESEARCH TRAINING",
    slug: "INT. MAKERSPACE - AFTERNOON",
    action:
      "A 10-week NSF research site turns tools into method: FDM printing, kilns, technical writing, documentation, and a manuscript built from material experiments.",
    character: "MANUSCRIPT",
    dialogue: "Expressive Multimaterial Modeling through Modular CAD-CAM Fuse Bead Prototyping.",
    entries: [
      {
        title: "NSF REU Site: Hybrid Media and Performative Making",
        meta: "Researcher | Arlington, Texas | June 2024 - Aug. 2024",
        details: [
          "Completed a 10-week undergraduate research program with makerspace training, technical writing, and research documentation.",
          "Prepared a LaTeX manuscript on modular CAD-CAM fuse bead prototyping.",
        ],
      },
    ],
  },
  {
    heading: "PUBLICATIONS",
    slug: "INT. CONFERENCE PROGRAM - DAY",
    action:
      "The research turns into papers: fabrication systems, material speculation, and creative tools written for an audience of builders and HCI researchers.",
    character: "PROGRAM",
    dialogue: "Creativity and Cognition, London, July 2026.",
    entries: [
      {
        title: "FuseBits: A Dialogue Toolkit for Exploring, Prescribing, and Redesigning Thermoplastic Materials using Fuse Beads",
        meta: "Mariah Gardner, Mohammad Nasir Rakib, Cesar Torres | Creativity and Cognition (C&C), London, July 2026",
        href: projects[0].href,
      },
      {
        title: "Case by Case: Generative AI as a Tool for Documentation and Speculation Across Material Practices",
        meta: "Mariah Gardner, Adam Emerson, Cesar Torres | C&C Undergraduate Symposium, London, July 2026",
      },
    ],
  },
  {
    heading: "STUDENT LEADERSHIP",
    slug: "INT. STUDENT ORG MEETING - EVENING",
    action:
      "The work leaves the lab and becomes infrastructure: programs, showcases, officer teams, mentorship, and a clearer path for students who have not seen themselves in research yet.",
    character: "ORGANIZER",
    dialogue: "Lower the barrier, keep the room open, make the first research question less lonely.",
    entries: [
      {
        title: "Association of Computing Machinery (ACM), UTA Chapter",
        meta: "Director of Research | Remote | Nov. 2024 - Present",
        href: projects[1].href,
        details: [
          "Co-founded a student-led research program for underclassmen.",
          "Organized a college-wide showcase with engineering student organizations to recognize underrepresented student work.",
        ],
      },
      {
        title: "Girls Who Code (GWC), UTA Chapter",
        meta: "Vice President | Remote | Nov. 2024 - Present",
        details: [
          "Co-founded UTA's collegiate chapter and helped establish organizational structure, programming, and growth strategy.",
          "Scaled the organization to 200+ members and 11 officers through mentorship and technical development.",
        ],
      },
    ],
  },
  {
    heading: "SELECTED PROJECTS",
    slug: "INT. INTERFACE - NIGHT",
    action:
      "The portfolio side of the resume keeps moving: research prototypes, software tools, films, hackathon builds, and systems that turn abstract care into usable interfaces.",
    character: "STACK",
    dialogue: "React, FastAPI, Python, Matplotlib, Swift, Chrome extensions, fabrication tools, Figma, and film production.",
    entries: [projects[5], projects[3], projects[0]],
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
          <h1>Mariah J. Gardner</h1>
          <p>Written by</p>
          <p>Mariah J. Gardner</p>
        </div>
        <div className="title-contact" aria-label="Portfolio summary">
          <p>Computer Science Student</p>
          <p>Undergraduate Researcher</p>
          <p>Creative Problem-Solver</p>
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

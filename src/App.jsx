import { layoutWithLines, measureNaturalWidth, prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Signal", href: "#signal" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const signalText =
  "Human-computer interaction, fabrication, and film all ask the same question: how can a system make room for people to think, make, and tell better stories?";

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

function TextSignal() {
  const frameRef = useRef(null);
  const [width, setWidth] = useState(620);
  const font = '16px "Lab Mono", monospace';
  const lineHeight = 26;
  const padding = 24;

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

  const prepared = useMemo(() => prepareWithSegments(signalText, font), [font]);
  const naturalWidth = useMemo(() => measureNaturalWidth(prepared), [prepared]);
  const maxTextWidth = Math.max(180, width - padding * 2);
  const layout = layoutWithLines(prepared, Math.min(maxTextWidth, naturalWidth), lineHeight);
  const svgHeight = layout.height + padding * 2 + 10;

  return (
    <section className="text-signal" id="signal" ref={frameRef}>
      <div className="text-signal-copy">
        <h3>Signal</h3>
        <p>
          A tiny Pretext sketch: the sentence is measured before it is drawn, then rendered as SVG
          lines that respond to the available width.
        </p>
      </div>
      <svg
        className="text-signal-art"
        viewBox={`0 0 ${width} ${svgHeight}`}
        role="img"
        aria-label={signalText}
      >
        <line x1={padding} x2={width - padding} y1={padding - 7} y2={padding - 7} />
        {layout.lines.map((line, index) => {
          const y = padding + index * lineHeight + 18;
          const markerWidth = Math.max(24, line.width);

          return (
            <g key={`${line.text}-${index}`}>
              <rect
                x={padding}
                y={y - 16}
                width={markerWidth}
                height="22"
                className="text-signal-measure"
              />
              <text x={padding + 8} y={y}>
                {line.text}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

export default function App() {
  return (
    <>
      <SideNav />
      <main className="main-content" id="home">
        <div className="content-container">
          <Section id="about" title="About">
            <div className="main-copy">
              <p>
                I&apos;m a Computer Science sophomore at the University of Texas at Arlington, an
                institution{" "}
                <ExternalLink href="https://www.uta.edu/news/news-releases/2023/09/11/uta-recognized-by-insight-into-diversity">
                  celebrated for its diversity
                </ExternalLink>{" "}
                and proud status as an{" "}
                <ExternalLink href="https://www.uta.edu/news/news-releases/2021/12/17/uta-renamed-to-carnegie-r1-category">
                  R1 research institution
                </ExternalLink>
                . Prior to this, I earned a BFA in Filmmaking from{" "}
                <ExternalLink href="https://www.leedsbeckett.ac.uk/">
                  Leeds Beckett University
                </ExternalLink>
                , where I developed a deep appreciation for storytelling and creative expression.
                Now, my academic journey is fueled by a passion for research, particularly in the
                field of Human-Computer Interaction (HCI). After graduation, I plan to pursue a PhD
                in HCI, focusing on innovative ways to bridge technology and creativity.
              </p>
            </div>
          </Section>

          <TextSignal />

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

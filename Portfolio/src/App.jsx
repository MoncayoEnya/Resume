import { useState, useEffect, useRef } from "react";
import profilePhoto from "./assets/hero.png";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}

:root{
  --bg:#F9F8F6;--bg2:#F2F1ED;--card:#FFFFFF;
  --border:#E3E0DA;--border2:#C8C5BE;
  --text:#5A5653;--muted:#97938E;--head:#0E0D0B;
  --accent:#B85C2A;--accent-l:rgba(184,92,42,0.08);--accent-m:rgba(184,92,42,0.18);
  --green:#1A7A4A;--green-bg:rgba(26,122,74,0.08);
  --nav:rgba(249,248,246,0.94);
  --font-b:'Outfit',sans-serif;--font-h:'Instrument Serif',serif;
}
[data-theme=dark]{
  --bg:#0E0D0C;--bg2:#161513;--card:#1C1A18;
  --border:#2B2926;--border2:#3B3935;
  --text:#88847F;--muted:#514E4A;--head:#EDE9E3;
  --accent:#D97742;--accent-l:rgba(217,119,66,0.09);--accent-m:rgba(217,119,66,0.2);
  --green:#3AB870;--green-bg:rgba(58,184,112,0.09);
  --nav:rgba(14,13,12,0.94);
}
body{background:var(--bg);font-family:var(--font-b);font-size:15px;line-height:1.7;color:var(--text);transition:background .3s,color .3s}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;height:54px;display:flex;align-items:center;padding:0 clamp(1rem,5vw,2.5rem);background:var(--nav);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--border);transition:background .3s,border-color .3s}
.logo{font-family:var(--font-h);font-size:1.15rem;color:var(--head);margin-right:auto;text-decoration:none;letter-spacing:-.01em;white-space:nowrap}
.nl{display:flex;gap:.1rem;list-style:none}
.nl a{color:var(--muted);font-size:.76rem;font-weight:500;text-decoration:none;padding:.28rem .62rem;border-radius:6px;letter-spacing:.02em;transition:color .15s,background .15s}
.nl a:hover{color:var(--head);background:var(--bg2)}
.tbtn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:1px solid var(--border);border-radius:7px;background:transparent;cursor:pointer;margin-left:.6rem;color:var(--muted);transition:all .15s;flex-shrink:0}
.tbtn:hover{background:var(--bg2);color:var(--head)}

/* ── HERO ── */
.page{padding-top:54px}
.hero{padding:clamp(2rem,5vw,4rem) clamp(1rem,5vw,2.5rem) clamp(2rem,5vw,3.5rem);border-bottom:1px solid var(--border)}

/* Desktop: text left, photo right */
.hero-inner{
  display:grid;
  grid-template-columns:1fr auto;
  grid-template-areas:"content photo";
  gap:2.5rem;
  align-items:start;
  max-width:860px;
  margin:0 auto;
}
.hero-content{grid-area:content}
.hero-photo-wrap{grid-area:photo;display:flex;align-items:flex-start;padding-top:.25rem}

.badge{display:inline-flex;align-items:center;gap:7px;background:var(--green-bg);color:var(--green);font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:1.1rem}
.pulse{width:6px;height:6px;border-radius:50%;background:var(--green);animation:p 2.2s infinite}
@keyframes p{0%,100%{opacity:1}50%{opacity:.35}}
h1{font-family:var(--font-h);font-size:clamp(2rem,5vw,3.1rem);font-weight:400;line-height:1.1;color:var(--head);letter-spacing:-.02em;margin-bottom:.65rem}
h1 em{font-style:italic;color:var(--accent)}
.meta{display:flex;flex-wrap:wrap;gap:.3rem .85rem;margin-bottom:1rem}
.mi{display:flex;align-items:center;gap:4px;font-size:.74rem;color:var(--muted)}
.mi a{color:var(--accent);text-decoration:none;transition:opacity .15s}
.mi a:hover{opacity:.7}
.mi svg{flex-shrink:0}
.summary{font-size:.9rem;color:var(--text);max-width:490px;line-height:1.85;margin-bottom:1.75rem}
.btns{display:flex;gap:.6rem;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:5px;padding:.48rem 1.2rem;font-family:var(--font-b);font-size:.78rem;font-weight:600;border-radius:7px;text-decoration:none;border:1.5px solid transparent;cursor:pointer;transition:all .18s;letter-spacing:.02em}
.btn-p{background:var(--accent);color:#fff;border-color:var(--accent)}
.btn-p:hover{opacity:.85;transform:translateY(-1px)}
.btn-o{background:transparent;color:var(--text);border-color:var(--border)}
.btn-o:hover{background:var(--bg2);color:var(--head);border-color:var(--border2)}

/* Profile photo — larger and properly sized */
.photo{
  width:clamp(120px,14vw,160px);
  height:clamp(120px,14vw,160px);
  border-radius:16px;
  border:2px solid var(--border);
  overflow:hidden;
  flex-shrink:0;
}
.photo img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}

/* ── CONTENT SECTIONS ── */
.wrap{max-width:860px;margin:0 auto;padding:0 clamp(1rem,5vw,2.5rem)}
.sec{padding:clamp(2rem,4vw,3.25rem) 0;border-bottom:1px solid var(--border)}
.sec:last-child{border-bottom:none}
.lbl{font-size:.63rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:.3rem}
h2{font-family:var(--font-h);font-size:clamp(1.45rem,3vw,1.9rem);font-weight:400;color:var(--head);letter-spacing:-.02em;margin-bottom:1.5rem}

.edu{background:var(--card);border:1px solid var(--border);border-radius:11px;padding:1.25rem 1.5rem;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;transition:border-color .2s}
.edu:hover{border-color:var(--border2)}
.edu-d{font-size:.91rem;font-weight:600;color:var(--head);margin-bottom:.12rem}
.edu-s{font-size:.82rem;color:var(--text)}
.edu-y{font-size:.71rem;color:var(--muted);background:var(--bg2);border:1px solid var(--border);padding:3px 11px;border-radius:20px;white-space:nowrap;flex-shrink:0}

.sg{display:grid;grid-template-columns:repeat(auto-fit,minmax(188px,1fr));gap:.75rem}
.sc{background:var(--card);border:1px solid var(--border);border-radius:11px;padding:1.1rem 1.3rem;transition:border-color .2s}
.sc:hover{border-color:var(--border2)}
.sct{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:.7rem}
.tags{display:flex;flex-wrap:wrap;gap:.3rem}
.tag{background:var(--bg2);color:var(--text);font-size:.69rem;font-weight:500;padding:2px 9px;border-radius:20px;border:1px solid var(--border)}

.pl{display:flex;flex-direction:column;gap:.85rem}
.pc{background:var(--card);border:1px solid var(--border);border-radius:11px;padding:1.4rem;transition:border-color .2s,transform .2s;text-decoration:none;display:block;color:inherit}
.pc:hover{border-color:var(--accent-m);transform:translateY(-1px)}
.ph2{display:flex;justify-content:space-between;align-items:flex-start;gap:.8rem;margin-bottom:.9rem}
.pn{font-size:.92rem;font-weight:600;color:var(--head)}
.ptags{display:flex;flex-wrap:wrap;gap:.28rem;flex-shrink:0;max-width:55%}
.tt{background:var(--accent-l);color:var(--accent);font-size:.65rem;font-weight:600;padding:2px 8px;border-radius:20px;border:1px solid var(--accent-m);white-space:nowrap}
.bl{list-style:none;display:flex;flex-direction:column;gap:.35rem}
.bl li{font-size:.82rem;color:var(--text);padding-left:.9rem;position:relative;line-height:1.65}
.bl li::before{content:'';position:absolute;left:0;top:.62em;width:3px;height:3px;border-radius:50%;background:var(--accent);opacity:.65}
.gh-link{display:inline-flex;align-items:center;gap:5px;margin-top:.9rem;font-size:.73rem;font-weight:600;color:var(--accent);letter-spacing:.02em;opacity:.75;transition:opacity .15s}
.pc:hover .gh-link{opacity:1}

.cg{display:grid;grid-template-columns:1fr 1fr;gap:1.75rem;align-items:start}
.cb{font-size:.88rem;color:var(--text);margin-bottom:1.25rem;line-height:1.85}
.clinks{display:flex;flex-direction:column;gap:.5rem}
.cl{display:flex;align-items:center;gap:.65rem;padding:.6rem .9rem;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--text);text-decoration:none;font-size:.81rem;transition:all .18s}
.cl:hover{border-color:var(--border2);color:var(--head);background:var(--bg2)}
.cl svg{flex-shrink:0;color:var(--muted)}
.sc2{background:var(--bg2);border:1px solid var(--border);border-radius:11px;padding:1.35rem}
.ab{display:inline-flex;align-items:center;gap:5px;font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--green);margin-bottom:.7rem}
.ad{width:6px;height:6px;border-radius:50%;background:var(--green);animation:p 2.2s infinite}
.sc2 h3{font-size:.9rem;font-weight:600;color:var(--head);margin-bottom:.3rem}
.sc2 p{font-size:.79rem;color:var(--muted);line-height:1.72}

footer{text-align:center;padding:1.5rem;font-size:.71rem;color:var(--muted);border-top:1px solid var(--border)}

.rev{opacity:0;transform:translateY(12px);transition:opacity .5s ease,transform .5s ease}
.rev.vis{opacity:1;transform:none}

/* ── TABLET (640–768px) ── */
@media(max-width:768px){
  .cg{grid-template-columns:1fr}
  .ph2{flex-wrap:wrap;gap:.5rem}
  .ptags{max-width:100%}
}

/* ── MOBILE (<520px) ── */
@media(max-width:520px){
  /* Stack photo above text on mobile */
  .hero-inner{
    grid-template-columns:1fr;
    grid-template-areas:
      "photo"
      "content";
    gap:1.25rem;
  }
  .hero-photo-wrap{
    padding-top:0;
    justify-content:flex-start;
  }
  .photo{
    width:clamp(90px,25vw,110px);
    height:clamp(90px,25vw,110px);
    border-radius:12px;
  }
  .nl{display:none}
  .ph2{flex-direction:column;gap:.5rem}
  .ptags{max-width:100%}
  .sg{grid-template-columns:1fr 1fr}
}
`;

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const skills = [
  { title: "Languages", items: ["Java","C#","C","JavaScript","HTML","CSS"] },
  { title: "Technologies", items: ["React","Firebase","Firestore","ASP.NET Core","Entity Framework Core"] },
  { title: "Databases", items: ["MySQL","SQLite","Firebase Firestore"] },
  { title: "Tools", items: ["Git","GitHub","Figma"] },
];

const projects = [
  {
    title: "Barangay Management System",
    tech: ["React","Firebase","Firestore","GroqAPI","Leaflet.js","Tailwind CSS"],
    github: "https://github.com/MoncayoEnya/eBarangay",
    bullets: [
      "Web application handling barangay operations — residents records, document requests, incidents, health and finance with role-based authentication",
      "AI chatbot supporting Filipino, Cebuano, and English that answers questions using live data from the system",
      "Disease outbreak detector with an interactive GPS map and purok boundary editing",
    ],
  },
  {
    title: "Hospital Management System",
    tech: ["C#","Avalonia UI","ASP.NET Core","SignalR"],
    github: "https://github.com/MoncayoEnya/HospitalApp",
    bullets: [
      "Cross-platform desktop app for admins and doctors to manage patients, appointments, and medicine inventory",
      "Real-time updates via SignalR so all users immediately see changes in appointments or doctor availability",
      "Auto-generates medical certificates and prescriptions as PDFs delivered directly to patients via email",
    ],
  },
  {
    title: "Seven Segments Classroom Checker",
    tech: ["C#","Avalonia UI","SQLite","Entity Framework Core"],
    github: "https://github.com/MoncayoEnya/Seven-Segments-System",
    bullets: [
      "Desktop tool for teachers to manage students, track attendance, and score a 7-segment display activity",
      "Secure per-teacher login ensuring each account only accesses its own class data",
      "Exports attendance and score reports as PDF and Excel files",
    ],
  },
];

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("vis"); obs.disconnect(); }
    }, { threshold: 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

function Reveal({ children }) {
  const ref = useRef(null);
  useReveal(ref);
  return <div ref={ref} className="rev">{children}</div>;
}

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <style>{css}</style>
      <nav>
        <a href="#" className="logo">Enya Moncayo</a>
        <ul className="nl">
          {["About","Skills","Projects","Contact"].map(s => (
            <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
          ))}
        </ul>
        <button className="tbtn" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
          {dark
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          }
        </button>
      </nav>

      <div className="page">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="badge"><span className="pulse"/>Open to OJT opportunities</div>
              <h1>Enya<br/><em>Moncayo</em></h1>
              <div className="meta">
                <span className="mi">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  Apas, Cebu City
                </span>
                <span className="mi">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.9 19.79 19.79 0 0 1 1 3.28 2 2 0 0 1 2.98 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.99 5.99l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>
                  09224045682
                </span>
                <span className="mi">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <a href="mailto:moncayoenya@gmail.com">moncayoenya@gmail.com</a>
                </span>
                <span className="mi">
                  <GithubIcon/>
                  <a href="https://github.com/MoncayoEnya" target="_blank" rel="noreferrer">github.com/MoncayoEnya</a>
                </span>
              </div>
              <p className="summary">Computer Science student who enjoys building real-world applications. My work spans web and desktop projects using React, C#, and Firebase — covering barangay management, hospital systems, and classroom tools. Always looking to grow and contribute to meaningful software.</p>
              <div className="btns">
                <a href="#projects" className="btn btn-p">View Projects</a>
                <a href="#contact" className="btn btn-o">Contact Me</a>
              </div>
            </div>
            <div className="hero-photo-wrap">
              <div className="photo">
                <img src={profilePhoto} alt="Enya Moncayo"/>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <section className="sec" id="about">
            <Reveal>
              <p className="lbl">Education</p>
              <h2>Background</h2>
              <div className="edu">
                <div>
                  <p className="edu-d">Bachelor of Science in Computer Science</p>
                  <p className="edu-s">University of Cebu — Main Campus</p>
                </div>
                <span className="edu-y">Expected 2027</span>
              </div>
            </Reveal>
          </section>

          <section className="sec" id="skills">
            <Reveal>
              <p className="lbl">Expertise</p>
              <h2>Technical Skills</h2>
              <div className="sg">
                {skills.map(g => (
                  <div className="sc" key={g.title}>
                    <p className="sct">{g.title}</p>
                    <div className="tags">{g.items.map(i => <span className="tag" key={i}>{i}</span>)}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section className="sec" id="projects">
            <Reveal>
              <p className="lbl">Work</p>
              <h2>Projects</h2>
              <div className="pl">
                {projects.map(p => (
                  <a key={p.title} className="pc" href={p.github} target="_blank" rel="noreferrer">
                    <div className="ph2">
                      <h3 className="pn">{p.title}</h3>
                      <div className="ptags">{p.tech.map(t => <span className="tt" key={t}>{t}</span>)}</div>
                    </div>
                    <ul className="bl">
                      {p.bullets.map((b,i) => <li key={i}>{b}</li>)}
                    </ul>
                    <span className="gh-link"><GithubIcon/> View on GitHub</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </section>

          <section className="sec" id="contact">
            <Reveal>
              <p className="lbl">Get in touch</p>
              <h2>Contact</h2>
              <div className="cg">
                <div>
                  <p className="cb">I am currently looking for an OJT opportunity. If you have an opening or simply want to connect, feel free to reach out — I would love to hear from you.</p>
                  <div className="clinks">
                    <a href="mailto:moncayoenya@gmail.com" className="cl">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      moncayoenya@gmail.com
                    </a>
                    <a href="https://github.com/MoncayoEnya" target="_blank" rel="noreferrer" className="cl">
                      <GithubIcon/> github.com/MoncayoEnya
                    </a>
                    <a href="tel:09224045682" className="cl">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.9 19.79 19.79 0 0 1 1 3.28 2 2 0 0 1 2.98 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.99 5.99l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>
                      09224045682
                    </a>
                  </div>
                </div>
                <div className="sc2">
                  <div className="ab"><span className="ad"/>Available now</div>
                  <h3>Looking for OJT</h3>
                  <p>BS Computer Science student at University of Cebu, expected to graduate 2027. Interested in web or software development roles where I can learn and contribute to real-world projects.</p>
                </div>
              </div>
            </Reveal>
          </section>
        </div>

        <footer>© 2026 Enya Moncayo &nbsp;·&nbsp; BS Computer Science &nbsp;·&nbsp; University of Cebu</footer>
      </div>
    </>
  );
}

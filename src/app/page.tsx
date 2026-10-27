"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Award, BookOpen, Check, Github, MapPin, Menu, X } from "lucide-react";
import { portfolio as p } from "@/data/portfolio";
import karlPortrait from "@/assets/karl.jpg";

const links = [
  ["About", "about"], ["Education", "education"], ["Skills", "skills"],
  ["Work", "work"], ["Contact", "contact"],
] as const;

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return <div className="label"><span>{n}</span>{children}</div>;
}

function Heading({ n, kicker, title }: { n: string; kicker: string; title: string }) {
  return <div className="section-heading reveal"><Label n={n}>{kicker}</Label><h2>{title}<b>.</b></h2></div>;
}

const projectDetails = [
  ["Project objectives", p.feedSmart.objectives],
  ["System architecture", p.feedSmart.architecture],
  ["Hardware & IoT components", p.feedSmart.hardware],
  ["Mobile application", p.feedSmart.mobile],
  ["Database integration", p.feedSmart.database],
  ["Challenges & learning", p.feedSmart.learning],
  ["Karl’s individual contribution", p.feedSmart.contribution],
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: "-30% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? window.scrollY / available * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { sectionObserver.disconnect(); revealObserver.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!detailsOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailsOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [detailsOpen]);

  return <>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Karl Almomento, back to top">KA<span>✳</span></a>
      <div className="header-context">PORTFOLIO / <span>2026</span></div>
      <nav className={menuOpen ? "header-nav open" : "header-nav"} aria-label="Main navigation">
        {links.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
      <div className="reading-progress" style={{ width: `${progress}%` }}/>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-topline"><span>AN ASPIRING SOFTWARE DEVELOPER</span><span>BASED IN DAVAO DEL NORTE, PH</span></div>
        <div className="hero-name" aria-label="Karl Almomento">
          <div className="hero-name-line"><span className="type-in">KARL</span><span className="hero-asterisk" aria-hidden="true">✳</span></div>
          <div className="hero-name-line second"><span className="type-in delay-one">ALMO</span><span className="name-outline type-in delay-two">MENTO</span></div>
        </div>
        <div className="hero-lower">
          <div className="hero-intro"><span className="intro-rule"/><p>Curious about the space between <em>good ideas</em> and useful technology.</p></div>
          <div className="hero-stamp"><Image className="hero-portrait" src={karlPortrait} alt="Karl Almomento" fill sizes="(max-width: 600px) 105px, 142px" placeholder="blur"/><small>HELLO, I’M KARL</small></div>
          <div className="hero-cta"><p>{p.title}</p><a href="#work">EXPLORE MY WORK <ArrowDown size={17}/></a></div>
        </div>
        <div className="hero-footerline"><span>SCROLL TO EXPLORE</span><span>01 / 07</span></div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track"><span>LEARN&nbsp; ✳ &nbsp;BUILD&nbsp; ✳ &nbsp;IMPROVE&nbsp; ✳ &nbsp;REPEAT&nbsp; ✳ &nbsp;</span><span>LEARN&nbsp; ✳ &nbsp;BUILD&nbsp; ✳ &nbsp;IMPROVE&nbsp; ✳ &nbsp;REPEAT&nbsp; ✳ &nbsp;</span></div></div>

      <section className="about section-pad" id="about"><div className="wrap">
        <Heading n="01" kicker="THE PERSON BEHIND THE CODE" title="A little about me"/>
        <div className="about-layout"><div className="about-statement reveal"><span className="giant-quote">“</span><p>Learning by <em>making.</em><br/>Growing by <em>doing.</em></p></div><div className="about-text reveal"><p>{p.introduction}</p><a className="inline-link" href="#contact">LET’S CONNECT <ArrowUpRight size={16}/></a></div></div>
        <div className="fact-strip reveal"><div><span>01 / NAME</span><strong>{p.name}</strong></div><div><span>02 / CURRENTLY</span><strong>BSIT Student</strong></div><div><span>03 / INTEREST</span><strong>Software Development</strong></div><div><span>04 / LOCATION</span><strong>Davao del Norte, PH</strong></div></div>
        <div className="objective reveal"><Label n="↗">CAREER OBJECTIVE</Label><p>{p.objective}</p></div>
      </div></section>

      <section className="education section-pad" id="education"><div className="wrap">
        <Heading n="02" kicker="WHERE THE JOURNEY IS HAPPENING" title="Education"/>
        <div className="education-entry reveal"><div className="education-year"><span className="live-dot"/> CURRENT</div><div className="education-main"><span>HIGHER EDUCATION / PHILIPPINES</span><h3>Davao del Norte<br/>State College<sup>↗</sup></h3><p>BSIT Student</p></div><div className="education-aside"><BookOpen size={28} strokeWidth={1.3}/><span>BUILDING FOUNDATIONS<br/>IN INFORMATION TECHNOLOGY</span></div></div>
        <div className="education-location"><MapPin size={14}/>{p.location}</div>
      </div></section>

      <section className="skills section-pad" id="skills"><div className="wrap">
        <Heading n="03" kicker="TOOLS, TOPICS & CURIOSITY" title="Skills in motion"/>
        <div className="skills-layout reveal"><p className="skills-lead">Always<br/><em>learning</em><b>.</b></p><div className="skills-list">{p.skills.length ? p.skills.map((group, index) => <div className="skill-row" key={group.category}><span>0{index + 1}</span><div><h3>{group.category}</h3><p>{group.items.join(" / ")}</p></div><ArrowUpRight size={20}/></div>) : <><div className="skill-row"><span>01</span><div><h3>Programming & development</h3><p>Personal technologies will be listed once confirmed.</p></div><ArrowUpRight size={20}/></div><div className="skill-row"><span>02</span><div><h3>Application development</h3><p>Learning through academic and collaborative projects.</p></div><ArrowUpRight size={20}/></div><div className="skill-row"><span>03</span><div><h3>Exploration</h3><p>Interested in practical technology solutions.</p></div><ArrowUpRight size={20}/></div></>}</div></div>
      </div></section>

      <section className="work section-pad" id="work"><div className="wrap">
        <Heading n="04" kicker="SELECTED ACADEMIC WORK" title="Featured work"/>
        <article className="feature-project reveal"><div className="project-visual" role="img" aria-label="Typographic illustration of the FeedSmart project"><div className="visual-top"><span>TEAM CAPSTONE / 001</span><span>IoT × MOBILE</span></div><div className="project-orbit orbit-one"/><div className="project-orbit orbit-two"/><div className="project-signal signal-a"/><div className="project-signal signal-b"/><div className="visual-title"><span>FEED</span><strong>SMART</strong></div><div className="visual-bottom"><span>CONNECTED THINKING</span><span>ESP32 ↗ FLUTTER ↗ SUPABASE</span></div></div><div className="project-body"><div className="project-body-top"><span>01 / FEATURED PROJECT</span><span>COLLABORATIVE</span></div><h3>FeedSmart<span>↗</span></h3><p className="project-subtitle">IoT-Based Smart Feeding System</p><p className="project-description">{p.feedSmart.description}</p><div className="project-tech"><span>TEAM TECHNOLOGIES</span><p>{p.feedSmart.technologies.join(" · ")}</p></div><button className="project-link" onClick={() => setDetailsOpen(true)} aria-haspopup="dialog">EXPLORE PROJECT <ArrowUpRight size={19}/></button></div></article>
        <div className="work-bottom reveal"><span>MORE WORK / COMING AS IT’S READY</span><p>Additional academic and personal projects will appear here when their details are available.</p></div>
      </div></section>

      <section className="github-section" id="github"><div className="wrap github-layout reveal"><div className="github-kicker"><Github size={23}/><span>FIND ME ON GITHUB</span></div><p>Ideas, experiments &<br/><em>work in progress.</em></p><a href={p.github} target="_blank" rel="noopener noreferrer">VISIT PROFILE <ArrowUpRight size={20}/></a></div></section>

      <section className="experience section-pad" id="experience"><div className="wrap"><Heading n="05" kicker="LEARNING IN PRACTICE" title="Experience"/><div className="experience-row reveal"><span>01</span><div><small>ACADEMIC / TEAM PROJECT</small><h3>Collaborative capstone development</h3><p>FeedSmart — a student team project combining connected hardware and mobile software. Karl’s specific role and completed tasks will be added when confirmed.</p></div><ArrowRight size={24} strokeWidth={1.4}/></div></div></section>

      <section className="achievements section-pad" id="achievements"><div className="wrap achievements-layout reveal"><div><Label n="06">THE MILESTONES</Label><h2>Achievements &<br/>certifications<b>.</b></h2></div><div className="achievements-empty"><Award size={28} strokeWidth={1.3}/>{p.achievements.length ? <ul>{p.achievements.map(item => <li key={item}>{item}</li>)}</ul> : <p>Achievements and certifications can be added as they are completed.</p>}</div></div></section>

      <section className="contact" id="contact"><div className="wrap"><div className="contact-top"><Label n="07">OPEN TO CONNECTIONS</Label><span>LET’S START A CONVERSATION ↗</span></div><h2 className="contact-title"><span>LET’S</span><span className="outline">CONNECT<b>.</b></span></h2><div className="contact-bottom"><p>Have an idea, a project, or a question?<br/>I’d like to hear from you.</p><div className="contact-actions"><a href={p.github} target="_blank" rel="noopener noreferrer"><Github size={18}/> GITHUB <ArrowUpRight size={17}/></a><a href={p.facebook} target="_blank" rel="noopener noreferrer">FACEBOOK <ArrowUpRight size={17}/></a></div></div></div></section>
    </main>

    <footer className="site-footer"><div className="wrap footer-inner"><a href="#home" className="brand">KA<span>✳</span></a><span>© {new Date().getFullYear()} KARL ALMOMENTO</span><a href="#home">BACK TO TOP <ArrowUpRight size={14}/></a></div></footer>

    {detailsOpen && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setDetailsOpen(false); }}><div ref={dialogRef} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title"><div className="dialog-header"><button onClick={() => setDetailsOpen(false)}><ArrowLeft size={17}/> BACK</button><span>ACADEMIC CAPSTONE / TEAM PROJECT</span><button onClick={() => setDetailsOpen(false)} aria-label="Close project details"><X size={20}/></button></div><h2 id="project-dialog-title">FeedSmart<b>.</b></h2><p className="dialog-intro">{p.feedSmart.description}</p><div className="dialog-technology"><span>PROJECT TECHNOLOGIES</span><p>{p.feedSmart.technologies.join(" / ")}</p></div><div className="dialog-grid">{projectDetails.map(([heading, value], index) => <div key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{value}</p></div>)}</div><div className="dialog-end"><span><Check size={16}/>{p.feedSmart.status}</span>{p.feedSmart.repository && <a href={p.feedSmart.repository} target="_blank" rel="noopener noreferrer">REPOSITORY <ArrowUpRight size={15}/></a>}{p.feedSmart.demo && <a href={p.feedSmart.demo} target="_blank" rel="noopener noreferrer">DEMO <ArrowUpRight size={15}/></a>}</div></div></div>}
  </>;
}

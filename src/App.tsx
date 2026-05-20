import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================ DATA ============================================================ */
const PROFILE = {
  name: "Tejasvini Akhaja", role: "Creative Designer & UI/UX Enthusiast", location: "Ahmedabad, India",
  tagline: "BCA graduate with a passion for 2D design and aesthetics — crafting intuitive interfaces, strong visual identities, and thoughtful user experiences in Figma.",
  email: "akhajatejasvini@gmail.com", phone: "+91 7069118391", languages: ["English", "Gujarati", "Hindi"],
  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/tejasvini-akhaja-001a82313/" }, { label: "Email", href: "mailto:akhajatejasvini@gmail.com" }],
};

type Project = { id: string; title: string; category: string; year: string; description: string; tags: string[]; figmaUrl: string; coverGradient: string; accent: string; frame: "phone" | "browser"; role?: string; startNodeId?: string; };

const PROJECTS: Project[] = [
  { id: "p1", title: "TARANFIT", category: "Mobile App", year: "2025", role: "UI/UX · Figma Prototype", description: "A fitness experience designed end-to-end in Figma — from onboarding flows to workout tracking.", tags: ["Fitness", "UI/UX", "Prototype"], figmaUrl: "https://www.figma.com/design/QxuVJ0Lb3BOPVvfOo6GXoI/TARANFIT?node-id=0-1&t=hv1HDAzCmQSA3Jpd-1", coverGradient: "from-lime-400 via-emerald-500 to-teal-600", accent: "emerald", frame: "phone", startNodeId: "161-57" },
  { id: "p2", title: "Drape", category: "Fashion App", year: "2025", role: "Mobile UI Concept", description: "A fashion-forward mobile concept focused on elegant browsing and curated collections.", tags: ["Fashion", "E-commerce", "UI/UX"], figmaUrl: "https://www.figma.com/design/V90RmmvFalBEuAZ3LMNHKT/Drape?node-id=0-1&t=QL8Rx0t7j0cksXgX-1", coverGradient: "from-rose-400 via-pink-500 to-fuchsia-600", accent: "rose", frame: "phone" },
  { id: "p3", title: "Pizza Hut", category: "Food Delivery", year: "2025", role: "Redesign Concept", description: "A bold redesign concept for the Pizza Hut ordering experience with vibrant brand colors.", tags: ["Food", "Mobile", "Branding"], figmaUrl: "https://www.figma.com/design/DFaqLSFuXlJIi7TwvDF8J8/Pizza-Hut?node-id=0-1&t=xIps4ncG4btVJTmz-1", coverGradient: "from-red-500 via-orange-500 to-amber-400", accent: "orange", frame: "phone" },
  { id: "b1", title: "Wally Fit", category: "Fitness App", year: "2025", role: "Behance Case Study", description: "A clean blue fitness app design focusing on workout tracking.", tags: ["Fitness", "UI/UX", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=6-3306&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-blue-400 to-cyan-500", accent: "blue", frame: "phone", startNodeId: "6-3306" },
  { id: "b2", title: "Food Finder", category: "Food Delivery", year: "2025", role: "Behance Case Study", description: "A dark-themed food delivery app interface.", tags: ["Food", "Dark Mode", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=7-5954&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-slate-700 to-slate-900", accent: "slate", frame: "phone", startNodeId: "7-5954" },
  { id: "b3", title: "My Pharmacy", category: "Health App", year: "2025", role: "Behance Case Study", description: "A pink-themed pharmacy and health app design.", tags: ["Health", "Mobile", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=7-12337&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-pink-400 to-rose-500", accent: "pink", frame: "phone", startNodeId: "7-12337" },
  { id: "b4", title: "Tudu", category: "Finance App", year: "2025", role: "Behance Case Study", description: "A blue finance and banking app interface.", tags: ["Finance", "Banking", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=7-12730&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-indigo-400 to-blue-600", accent: "indigo", frame: "phone", startNodeId: "7-12730" },
  { id: "b5", title: "Bloom", category: "Plant Shop", year: "2025", role: "Behance Case Study", description: "A teal-themed plant shop and ecommerce app.", tags: ["Ecommerce", "Nature", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=7-13085&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-teal-400 to-emerald-600", accent: "teal", frame: "phone", startNodeId: "7-13085" },
  { id: "b6", title: "Love Rebound", category: "Dating App", year: "2025", role: "Behance Case Study", description: "A red-themed dating app interface.", tags: ["Dating", "Social", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=7-13509&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-red-500 to-pink-600", accent: "red", frame: "phone", startNodeId: "7-13509" },
  { id: "b7", title: "Calme", category: "Meditation", year: "2025", role: "Behance Case Study", description: "A blue meditation and wellness app.", tags: ["Wellness", "Health", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=7-13878&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-blue-500 to-indigo-600", accent: "blue", frame: "phone", startNodeId: "7-13878" },
  { id: "b8", title: "Medi-Flower", category: "Health App", year: "2025", role: "Behance Case Study", description: "A green health and medical app design.", tags: ["Health", "Medical", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=7-14218&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-green-400 to-emerald-600", accent: "green", frame: "phone", startNodeId: "7-14218" },
  { id: "b9", title: "Locket", category: "Social App", year: "2025", role: "Behance Case Study", description: "A clean, white-themed social app interface.", tags: ["Social", "Minimal", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=7-14663&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-gray-200 to-gray-400", accent: "gray", frame: "phone", startNodeId: "7-14663" },
  { id: "b10", title: "Tara Workforce", category: "Workforce App", year: "2025", role: "Behance Case Study", description: "A yellow-themed workforce management app.", tags: ["Business", "Management", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=8-15292&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-yellow-400 to-orange-500", accent: "yellow", frame: "phone", startNodeId: "8-15292" },
  { id: "b11", title: "Air Food", category: "Food Delivery", year: "2025", role: "Behance Case Study", description: "A dark blue food delivery app concept.", tags: ["Food", "Delivery", "Behance"], figmaUrl: "https://www.figma.com/design/l6hGVuSvQP3FrjDy7yoIaz/Social-media-post?node-id=10-801&t=NTXzghmNVKt1r1IT-0", coverGradient: "from-blue-800 to-slate-900", accent: "blue", frame: "phone", startNodeId: "10-801" },
];

const SKILLS = [
  { label: "Figma", level: 92 }, { label: "UI / UX Design", level: 88 }, { label: "Canva", level: 90 },
  { label: "Wireframing", level: 85 }, { label: "Graphic Design", level: 85 }, { label: "Visual Branding", level: 82 }, { label: "HTML / CSS", level: 70 },
];

const EXPERIENCE = [
  { role: "Graphic Design & UI/UX Intern", company: "Kretos Technology", location: "Ahmedabad, India", period: "Dec 2025 – Present", current: true, bullets: ["Designed compelling interfaces and graphic assets for web and mobile apps", "Created branded wireframes, mockups, and high-fidelity prototypes", "Developed icons, layouts, and UI components using Figma and Canva"] },
  { role: "Receptionist", company: "English World", location: "Ahmedabad, India", period: "Nov 2024 – Jun 2025", current: false, bullets: ["Managed front desk operations and handled customer inquiries", "Maintained records and coordinated with internal staff"] },
  { role: "Cloud Computing & DevOps Intern", company: "Sahana System Ltd", location: "Ahmedabad, India", period: "Jun 2024 – Aug 2024", current: false, bullets: ["Gained hands-on exposure to cloud computing and DevOps fundamentals", "Assisted in deployment and basic configuration of applications"] },
];

const EDUCATION = [
  { degree: "Bachelor of Computer Applications (BCA)", school: "Matushri D.D.B & K.N.G College", period: "2021 – 2024" },
  { degree: "Higher Secondary Certificate (HSC)", school: "S.S Ajmera Girls School", period: "2020 – 2021" },
  { degree: "Secondary School Certificate (SSC)", school: "S.S Ajmera Girls School", period: "2018 – 2019" },
];

const PROJECT_ICONS: Record<string, string> = { p1: "💪", p2: "👗", p3: "🍕", b1: "🏋️", b2: "🍔", b3: "💊", b4: "💰", b5: "🌿", b6: "❤️", b7: "🧘", b8: "🌸", b9: "📸", b10: "👷", b11: "✈️" };

/* ============================================================ HELPERS & HOOKS ============================================================ */
function getFigmaEmbedUrl(figmaUrl: string, startNodeId?: string) {
  try {
    const url = new URL(figmaUrl); const parts = url.pathname.split("/").filter(Boolean); const fileId = parts[1]; const name = parts[2] || "file";
    const isValidFrameId = (id?: string | null) => !!id && /^\d+-\d+$/.test(id) && id !== "0-1";
    const rawNodeId = url.searchParams.get("node-id");
    const effectiveNodeId = isValidFrameId(startNodeId) ? startNodeId : isValidFrameId(rawNodeId) ? rawNodeId : null;
    const nodeParam = effectiveNodeId ? `&node-id=${encodeURIComponent(effectiveNodeId)}&starting-point-node-id=${encodeURIComponent(effectiveNodeId)}` : "";
    const protoUrl = `https://www.figma.com/proto/${fileId}/${name}?kind=proto&scaling=min-scale&embed-host=portfolio${nodeParam}`;
    return `https://www.figma.com/embed?embed_host=portfolio&url=${encodeURIComponent(protoUrl)}`;
  } catch { return `https://www.figma.com/embed?embed_host=portfolio&url=${encodeURIComponent(figmaUrl)}`; }
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("in-view"); }); }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCursorSpotlight() {
  useEffect(() => {
    const handler = (e: MouseEvent) => { document.documentElement.style.setProperty("--mx", `${e.clientX}px`); document.documentElement.style.setProperty("--my", `${e.clientY}px`); };
    window.addEventListener("mousemove", handler); return () => window.removeEventListener("mousemove", handler);
  }, []);
}

/* ============================================================ COMPONENTS ============================================================ */
function TiltCard({ children, className = "", intensity = 12 }: { children: React.ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width; const y = (e.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(1200px) rotateX(${(0.5 - y) * intensity}deg) rotateY(${(x - 0.5) * intensity}deg)`;
  };
  const handleLeave = () => { const el = ref.current; if (el) el.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`; };
  return <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`tilt-card ${className}`} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>{children}</div>;
}

function Nav({ active }: { active: string }) {
  const links = [{ id: "home", label: "Home" }, { id: "about", label: "About" }, { id: "experience", label: "Experience" }, { id: "work", label: "Work" }, { id: "skills", label: "Skills" }, { id: "contact", label: "Contact" }];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass-strong flex items-center gap-1 rounded-full px-2 py-2">
        <a href="#home" className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-white"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-500 to-indigo-600 text-xs shadow-lg shadow-violet-500/30">✦</span>TA</a>
        <div className="hidden sm:flex items-center gap-1">{links.map((l) => (<a key={l.id} href={`#${l.id}`} className={`rounded-full px-3 py-1.5 text-sm transition ${active === l.id ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"}`}>{l.label}</a>))}</div>
        <a href="#contact" className="ml-1 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-zinc-200 hover:scale-105">Let's talk</a>
      </nav>
    </header>
  );
}

function Hero() {
  useScrollReveal();
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-violet-600/30 blur-3xl" />
        <div className="animate-blob absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-fuchsia-600/20 blur-3xl" style={{ animationDelay: "5s" }} />
        <div className="animate-blob absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl" style={{ animationDelay: "10s" }} />
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-[18%] right-[12%] h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 opacity-60 blur-[1px]" style={{ transform: "rotate(20deg)" }} />
        <div className="animate-float absolute bottom-[22%] left-[8%] h-12 w-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 opacity-50" style={{ animationDelay: "2s" }} />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-24">
        <div className="reveal flex items-center gap-3 text-sm text-zinc-400">
          <span className="relative flex h-2.5 w-2.5"><span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400"></span><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span></span>
          Open to opportunities · {PROFILE.location}
        </div>
        <h1 className="reveal mt-8 text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-[8rem] lg:leading-[0.95]">Hi, I'm <br className="sm:hidden" /><span className="text-gradient">{PROFILE.name}</span>.</h1>
        <p className="reveal mt-6 max-w-2xl text-xl text-zinc-300 sm:text-2xl"><span className="text-zinc-500">{PROFILE.role}.</span></p>
        <p className="reveal mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">{PROFILE.tagline}</p>
        <div className="reveal mt-10 flex flex-wrap gap-4">
          <a href="#work" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.03] hover:shadow-2xl hover:shadow-violet-500/20">View my work<span className="transition-transform group-hover:translate-x-1">→</span></a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:border-white/30">Get in touch</a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-zinc-500 uppercase animate-float">scroll ↓</div>
    </section>
  );
}

function Marquee() {
  const items = ["Figma", "✦", "UI/UX", "✦", "Graphic Design", "✦", "Canva", "✦", "Wireframing", "✦", "Prototyping", "✦", "Branding", "✦", "Visual Identity", "✦"];
  const doubled = [...items, ...items];
  return (
    <div className="relative border-y border-white/5 bg-black/40 py-8 overflow-hidden">
      <div className="flex gap-10 animate-marquee whitespace-nowrap">{doubled.map((item, i) => (<span key={i} className={`text-4xl sm:text-6xl font-semibold ${item === "✦" ? "text-violet-400" : "text-zinc-700 hover:text-white transition"}`}>{item}</span>))}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="reveal text-sm font-medium tracking-[0.3em] text-violet-400 uppercase">About</p>
              <h2 className="reveal mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Designing with <span className="text-gradient">detail</span>, creating with care.</h2>
              <TiltCard className="reveal mt-10">
                <div className="glass relative overflow-hidden rounded-3xl p-7">
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-violet-500/20 blur-2xl" />
                  <div className="relative flex items-center gap-4">
                    <div className="relative"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600 text-2xl font-bold text-white shadow-xl shadow-violet-500/40">TA</div><div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 opacity-40 blur-xl -z-10" /></div>
                    <div><div className="font-medium text-white">{PROFILE.name}</div><div className="text-sm text-zinc-400">{PROFILE.role}</div></div>
                  </div>
                  <div className="relative mt-5 flex flex-wrap gap-2">{["Figma", "Canva", "UI/UX", "Branding"].map((t) => (<span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10">{t}</span>))}</div>
                </div>
              </TiltCard>
            </div>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-300 lg:col-span-7">
            <p className="reveal">I'm a <span className="text-white font-medium">BCA graduate</span> with hands-on experience in graphic design, UI/UX, and customer-facing roles. I love turning ideas into clean, intuitive interfaces — from wireframes to polished visual assets.</p>
            <p className="reveal">Currently interning at <span className="text-white font-medium">Kretos Technology</span> in Ahmedabad, where I design interfaces, build prototypes, and help maintain visual branding across products using Figma and Canva.</p>
            <p className="reveal">My focus is on <span className="text-white">2D design</span>, strong visual hierarchy, and thoughtful aesthetics — always collaborating with teams to ship work that feels both functional and beautiful.</p>
            <div className="reveal mt-12 grid grid-cols-2 gap-5 border-t border-white/10 pt-8">
              {[{ k: "Based in", v: PROFILE.location }, { k: "Languages", v: PROFILE.languages.join(", ") }, { k: "Education", v: "BCA · 2021–2024" }, { k: "Status", v: "Open to opportunities", highlight: true }].map((i) => (<div key={i.k} className="border-l-2 border-violet-500/50 pl-4 hover:border-violet-400 transition"><div className="text-xs tracking-[0.2em] text-zinc-500 uppercase">{i.k}</div><div className={`mt-1 ${i.highlight ? "text-emerald-400" : "text-white"}`}>{i.v}</div></div>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="reveal text-sm font-medium tracking-[0.3em] text-violet-400 uppercase">Experience</p>
              <h2 className="reveal mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Where I've <span className="text-gradient">worked</span>.</h2>
              <p className="reveal mt-6 max-w-sm text-zinc-400">A blend of design internships, tech exposure, and customer experience — all shaping how I approach creative work.</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-violet-500/40 before:via-white/10 before:to-transparent">
              {EXPERIENCE.map((exp) => (<div key={exp.role + exp.company} className="reveal relative pl-10">
                <div className={`absolute left-0 top-2 h-6 w-6 rounded-full border-2 ${exp.current ? "border-emerald-400 bg-emerald-400/20" : "border-white/20 bg-zinc-900"}`}>{exp.current && <span className="absolute inset-1.5 rounded-full bg-emerald-400 animate-pulse" />}</div>
                <TiltCard intensity={6}>
                  <div className="glass rounded-2xl p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div><h3 className="text-lg font-semibold text-white">{exp.role}</h3><div className="mt-1 text-sm text-zinc-400"><span className="text-zinc-200">{exp.company}</span> · {exp.location}</div></div>
                      <div className="flex items-center gap-2">{exp.current && <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/30">Current</span>}<span className="text-xs text-zinc-500">{exp.period}</span></div>
                    </div>
                    <ul className="mt-4 space-y-2">{exp.bullets.map((b) => (<li key={b} className="flex gap-3 text-sm text-zinc-300"><span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-violet-400" /><span>{b}</span></li>))}</ul>
                  </div>
                </TiltCard>
              </div>))}
            </div>
            <div className="mt-20">
              <h3 className="reveal mb-6 text-2xl font-semibold text-white">Education</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {EDUCATION.map((e, i) => (<div key={e.degree} className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-violet-400/30 hover:bg-white/[0.04]" style={{ transitionDelay: `${i * 80}ms` }}><div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/0 blur-2xl transition group-hover:bg-violet-500/20" /><div className="relative"><div className="text-xs text-zinc-500">{e.period}</div><div className="mt-1 font-medium text-white">{e.degree}</div><div className="mt-1 text-sm text-zinc-400">{e.school}</div></div></div>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== PHONE SIMULATOR =================== */
function PhoneSimulator() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeProject = activeId ? PROJECTS.find((p) => p.id === activeId) ?? null : null;
  const activeIndex = activeProject ? PROJECTS.findIndex((p) => p.id === activeProject.id) : -1;

  const transitionTo = useCallback((nextId: string | null) => { setTransitioning(true); setLoaded(false); setTimeout(() => { setActiveId(nextId); setTimeout(() => setTransitioning(false), 50); }, 300); }, []);
  const openApp = (id: string) => transitionTo(id);
  const goHome = () => transitionTo(null);
  const nextApp = () => { if (!activeProject) return; transitionTo(PROJECTS[(activeIndex + 1) % PROJECTS.length].id); };
  const prevApp = () => { if (!activeProject) return; transitionTo(PROJECTS[(activeIndex - 1 + PROJECTS.length) % PROJECTS.length].id); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key.toLowerCase() === "h") goHome(); if (activeId && e.key === "ArrowRight") nextApp(); if (activeId && e.key === "ArrowLeft") prevApp(); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [activeId, activeIndex, activeProject, transitionTo]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => { if (touchStartX.current == null || !activeId) return; const deltaX = e.changedTouches[0].clientX - touchStartX.current; if (deltaX < -50) nextApp(); else if (deltaX > 50) prevApp(); touchStartX.current = null; };
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => { document.body.style.overflow = fullscreen ? "hidden" : ""; }, [fullscreen]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className={`absolute inset-0 scale-90 rounded-full blur-3xl opacity-30 transition-all duration-700 ${activeProject ? `bg-gradient-to-br ${activeProject.coverGradient}` : "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600"}`} />
          <TiltCard intensity={8} className="relative z-10">
            <div className="phone-frame w-[320px] sm:w-[360px] lg:w-[380px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div className="phone-notch" />
              <div className="phone-screen relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-7 pt-4 pb-2 text-[11px] font-semibold text-white">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h4V10H2v12zm7 0h4V2H9v20zm7 0h4V14h-4v8z" /></svg>
                    <svg className="h-3 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.8 3 3.9 4.5.9 7l1.4 1.7C5 6.4 8.4 5 12 5s7 1.4 9.7 3.7L23.1 7C20.1 4.5 16.2 3 12 3zm0 5c-2.9 0-5.5 1-7.6 2.7L5.8 12c1.8-1.3 3.9-2 6.2-2s4.4.7 6.2 2l1.4-1.3C17.5 9 14.9 8 12 8zm0 5c-1.6 0-3.1.6-4.3 1.6L9.1 16c.8-.6 1.8-1 2.9-1s2.1.4 2.9 1l1.4-1.4C15.1 13.6 13.6 13 12 13zm0 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>
                    <span className="ml-1 inline-flex h-2.5 w-5 items-center rounded-[3px] border border-white/70 p-[1px]"><span className="h-full w-[85%] rounded-[2px] bg-white" /></span>
                  </span>
                </div>
                <div className={`absolute inset-0 pt-10 transition-all duration-500 ease-spring ${transitioning ? "opacity-0 scale-[0.85]" : "opacity-100 scale-100"}`}>
                  {activeId === null ? <HomeScreen onOpenApp={openApp} /> : activeProject ? <AppView key={activeProject.id} project={activeProject} loaded={loaded} onLoad={() => setLoaded(true)} /> : null}
                </div>
                <button onClick={goHome} className="absolute bottom-1.5 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-white/80 transition hover:bg-white" aria-label="Home" />
                {activeId && (<>
                  <button onClick={prevApp} className="group absolute left-1.5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition hover:bg-black/70 lg:opacity-70 lg:hover:opacity-100">‹</button>
                  <button onClick={nextApp} className="group absolute right-1.5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition hover:bg-black/70 lg:opacity-70 lg:hover:opacity-100">›</button>
                </>)}
              </div>
            </div>
          </TiltCard>
          <div className="mt-8 flex items-center justify-center gap-2">
            <button onClick={goHome} className={`h-1.5 rounded-full transition-all ${activeId === null ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"}`} aria-label="Home" />
            {activeProject && <div className="h-1.5 w-8 rounded-full bg-white/80" />}
          </div>
          <p className="mt-4 text-center text-xs text-zinc-500">Tap icons · swipe · use ← → arrows</p>
        </div>
      </div>
      {fullscreen && activeProject && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 p-4 backdrop-blur-md animate-fade-in" onClick={() => setFullscreen(false)}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3" onClick={(e) => e.stopPropagation()}>
            <div><div className="text-xs text-zinc-500">{activeProject.category} · {activeProject.year}</div><div className="font-semibold text-white">{activeProject.title}</div></div>
            <div className="flex items-center gap-2">
              <a href={activeProject.figmaUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white transition hover:bg-white/10">Open in Figma ↗</a>
              <button onClick={() => setFullscreen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition hover:bg-white/10" aria-label="Close">✕</button>
            </div>
          </div>
          <div className="mt-3 flex-1 overflow-hidden rounded-xl border border-white/10 bg-zinc-900" onClick={(e) => e.stopPropagation()}>
            <iframe title={`${activeProject.title} fullscreen`} src={getFigmaEmbedUrl(activeProject.figmaUrl, activeProject.startNodeId)} className="h-full w-full border-0" allowFullScreen />
          </div>
        </div>
      )}
    </>
  );
}

function HomeScreen({ onOpenApp }: { onOpenApp: (id: string) => void }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 flex flex-col">
      <div className="absolute inset-0"><div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-violet-500/40 blur-3xl" /><div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" /></div>
      <div className="relative flex h-full flex-col px-4 pb-8 pt-2">
        <div className="px-2 pb-4 pt-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl h-9 flex items-center px-3 gap-2 text-white/60 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>Search
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2 py-2 grid grid-cols-3 gap-y-6 gap-x-2 content-start">
          {PROJECTS.map((p) => (
            <button key={p.id} onClick={() => onOpenApp(p.id)} className="group flex flex-col items-center gap-2">
              <div className={`relative flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br ${p.coverGradient} text-2xl shadow-xl transition-transform duration-200 group-active:scale-90 group-hover:scale-105`}>
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/25 to-transparent" />
                <span className="relative z-10 drop-shadow-md">{PROJECT_ICONS[p.id]}</span>
              </div>
              <div className="text-[10px] font-medium text-white/90 drop-shadow text-center leading-tight line-clamp-2 w-full">{p.title}</div>
            </button>
          ))}
        </div>
        <div className="pt-4 text-center text-[10px] tracking-widest text-white/60 uppercase animate-pulse">Tap to open</div>
      </div>
    </div>
  );
}

function AppView({ project, loaded, onLoad }: { project: Project; loaded: boolean; onLoad: () => void }) {
  return (
    <div className="relative h-full w-full bg-black">
      {!loaded && (<div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br ${project.coverGradient} transition-opacity duration-500`}><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 text-2xl animate-pulse">{PROJECT_ICONS[project.id]}</div><div className="text-xs font-medium text-white/90">Loading {project.title}…</div></div>)}
      <iframe key={project.id} title={project.title} src={getFigmaEmbedUrl(project.figmaUrl, project.startNodeId)} loading="lazy" onLoad={onLoad} className="absolute left-0 right-0 bottom-0 w-full border-0" style={{ top: "46px", height: "calc(100% - 46px)" }} allowFullScreen />
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center">
        <div className="mb-16 text-center">
          <p className="reveal text-sm font-medium tracking-[0.3em] text-violet-400 uppercase">Selected Work</p>
          <h2 className="reveal mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">An <span className="text-gradient">interactive</span> phone.</h2>
          <p className="reveal mx-auto mt-6 max-w-xl text-zinc-400">Tap any app icon to open a live Figma preview inside the device. Swipe between projects or use the arrows to browse.</p>
        </div>
        <div className="reveal-scale w-full flex justify-center">
          <PhoneSimulator />
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="reveal text-sm font-medium tracking-[0.3em] text-violet-400 uppercase">Toolkit</p>
          <h2 className="reveal mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Tools & <span className="text-gradient">expertise</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SKILLS.map((s, i) => <SkillCard key={s.label} skill={s} index={i} />)}
          <div className="reveal col-span-2 md:col-span-3 lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 flex flex-col justify-center transition hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-500/10" style={{ transitionDelay: `${SKILLS.length * 50}ms` }}>
            <h3 className="text-xl font-semibold text-white mb-4">Also proficient in</h3>
            <div className="flex flex-wrap gap-2">
              {["Framer", "Illustrator", "Photoshop", "Notion", "MS Excel", "HTML/CSS"].map((t) => (<span key={t} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white">{t}</span>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: { label: string; level: number }; index: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setTimeout(() => setWidth(skill.level), index * 100); observer.unobserve(el); } }); }, { threshold: 0.3 });
    observer.observe(el); return () => observer.disconnect();
  }, [skill.level, index]);

  return (
    <div ref={ref} className="reveal group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 flex flex-col justify-center gap-4 h-32 transition hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-500/10" style={{ transitionDelay: `${index * 50}ms` }}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-violet-500/20" />
      <div className="relative z-10 text-lg font-medium text-zinc-100">{skill.label}</div>
      <div className="relative z-10 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <TiltCard intensity={5} className="reveal">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent p-10 sm:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl animate-blob" />
            <div className="absolute -left-10 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
            <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />
            <div className="relative">
              <p className="text-sm font-medium tracking-[0.3em] text-violet-400 uppercase">Get in touch</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">Let's create something <span className="text-gradient">great</span>.</h2>
              <p className="mt-6 max-w-xl text-lg text-zinc-300">I'm actively looking for full-time opportunities in Graphic Design and UI/UX — or open to freelance collaborations. Drop me a message and I'll get back to you soon.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={`mailto:${PROFILE.email}`} className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.03] hover:shadow-2xl hover:shadow-violet-500/30">{PROFILE.email}<span className="transition-transform group-hover:translate-x-1">→</span></a>
                <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:border-white/30">📞 {PROFILE.phone}</a>
              </div>
              <div className="mt-12 flex flex-wrap gap-6 border-t border-white/10 pt-8">{PROFILE.socials.map((s) => (<a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-zinc-400 transition hover:text-white">{s.label} ↗</a>))}</div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-zinc-500">© {new Date().getFullYear()} {PROFILE.name}. Crafted with care.</p>
        <p className="text-sm text-zinc-500">Built with React · Figma embeds · ✨</p>
      </div>
    </footer>
  );
}

export default function App() {
  const active = useActiveSection(["home", "about", "experience", "work", "skills", "contact"]);
  useScrollReveal();
  useCursorSpotlight();
  return (
    <div className="relative min-h-screen bg-[#05050a] text-white">
      <div className="cursor-spotlight" />
      <Nav active={active} />
      <main className="relative z-10">
        <Hero /><Marquee /><About /><Experience /><Work /><Skills /><Contact />
      </main>
      <Footer />
    </div>
  );
}

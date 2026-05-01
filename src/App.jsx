import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Twinkling star field ── */
const STARS = Array.from({ length: 220 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.2 + 0.4,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 1.5,
}))

function StarField() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {STARS.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Sparkle cursor trail ── */
function SparkleTrail() {
  const [sparks, setSparks] = useState([])
  useEffect(() => {
    let id = 0
    let last = 0
    const CHARS = ['✦', '✧', '⋆', '★', '·', '✶', '❋', '✹']
    const onMove = (e) => {
      const now = Date.now()
      if (now - last < 40) return
      last = now
      const sid = id++
      setSparks(prev => [
        ...prev.slice(-20),
        {
          id: sid,
          x: e.clientX + (Math.random() - 0.5) * 18,
          y: e.clientY + (Math.random() - 0.5) * 18,
          ch: CHARS[Math.floor(Math.random() * CHARS.length)],
          hue: Math.floor(Math.random() * 360),
        }
      ])
      setTimeout(() => setSparks(prev => prev.filter(s => s.id !== sid)), 700)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {sparks.map(s => (
        <span key={s.id} className="sparkle" style={{ left: s.x, top: s.y, color: `hsl(${s.hue}, 100%, 70%)` }}>
          {s.ch}
        </span>
      ))}
    </div>
  )
}

/* ── Shooting stars across the background ── */
const SHOOTING = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: 5 + Math.random() * 55,
  delay: (i * 3.5 + Math.random() * 2).toFixed(2),
  dur: (Math.random() * 1.2 + 0.6).toFixed(2),
}))

function ShootingStars() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {SHOOTING.map(s => (
        <div
          key={s.id}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Typewriter text ── */
function TypewriterText({ text, speed = 38 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (n < text.length) {
      const t = setTimeout(() => setN(n + 1), speed + Math.random() * 22)
      return () => clearTimeout(t)
    }
  }, [n, text, speed])
  return (
    <span>
      {text.slice(0, n)}
      {n < text.length && <span className="cursor-blink">_</span>}
    </span>
  )
}

/* ── Matrix rain (for winamp) ── */
const MATRIX_COLS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  left: 4 + (i / 9) * 92,
  delay: (i * 0.35 + Math.random() * 1.2).toFixed(2),
  dur: (Math.random() * 1.5 + 1.8).toFixed(2),
  text: Array.from({ length: 7 }, () =>
    String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
  ).join(''),
}))

function MatrixRain() {
  return (
    <div className="matrix-rain" aria-hidden="true">
      {MATRIX_COLS.map(col => (
        <span
          key={col.id}
          className="matrix-col"
          style={{ left: `${col.left}%`, animationDelay: `${col.delay}s`, animationDuration: `${col.dur}s` }}
        >
          {col.text}
        </span>
      ))}
    </div>
  )
}

/* ── Blinking badge ── */
function BlinkBadge({ label, bg = 'rgb(255,55,55)', fg = 'white' }) {
  return (
    <span className="blink" style={{
      background: bg, color: fg,
      fontSize: 9, fontWeight: 'bold',
      padding: '1px 4px', borderRadius: 2,
      marginLeft: 5, verticalAlign: 'middle',
      display: 'inline-block', userSelect: 'none',
    }}>{label}</span>
  )
}

/* ── Splash screen (satisfies browser autoplay gesture requirement) ── */
function SplashScreen({ onEnter }) {
  return (
    <div className="splash-overlay">
      <div className="splash-box winbody">
        <div className="winbar" style={{ margin: 0 }}>
          <span className="winbar-title">📁 welcome.exe</span>
          <span className="winbar-btn">_</span>
          <span className="winbar-btn">□</span>
        </div>
        <div className="wincontent" style={{ padding: '24px 32px', textAlign: 'center' }}>
          {/* <div className="wobble neon-glow text-5xl mb-3" style={{ display: 'inline-block' }}></div> */}
          <div className="waves select-none mb-3" style={{ fontSize: 'clamp(1rem,4vw,2rem)' }}>
            {'VP-TECHNOLOGY'.split('').map((ch, i) => (
              <span key={i} style={{ '--i': i, fontFamily: 'Righteous, sans-serif', WebkitTextStrokeWidth: '2px', WebkitTextStrokeColor: 'black', background: 'linear-gradient(rgb(0,146,151), rgb(227,255,126) 60%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', animation: 'waves 1s infinite', animationDelay: `calc(0.1s * ${i})` }}>{ch}</span>
            ))}
          </div>
          <p className="abttext mb-4" style={{ display: 'block' }}>brandon 4 vp-tech !!</p>
          <button onClick={onEnter} className="splash-enter-btn">
            ▶ ENTER SITE
          </button>
          {/* <p style={{ fontSize: 9, color: 'rgb(100,100,100)', marginTop: 10 }}>
            🔊 music will play on entry
          </p> */}
        </div>
      </div>
    </div>
  )
}

/* ── Background music player ── */
function BgMusic({ audioRef }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  const toggleMute = () => {
    audioRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <div className="music-player">
      <div className="winbar" style={{ margin: 0, padding: '0 4px' }}>
        <span className="winbar-title">🎵 bg music</span>
      </div>
      <div style={{ padding: '5px 7px', display: 'flex', alignItems: 'center', gap: 7 }}>
        <button onClick={toggleMute} className={`music-mute-btn ${muted ? 'music-muted' : 'music-unmuted'}`}>
          {muted ? '🔇' : '🔊'}
        </button>
        <div style={{ flex: 1 }}>
          <div className="motdmarquee">
            <span className="motdmarquee-inner" style={{ fontSize: 9, color: muted ? 'rgb(180,180,180)' : 'rgb(220,30,30)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
              {muted ? '— muted —' : '♫ never gonna give you up ♫'}
            </span>
          </div>
          <div style={{ marginTop: 3, background: 'rgb(60,60,60)', height: 3, borderRadius: 1 }}>
            {playing && !muted && <div className="music-bar" />}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Online indicator ── */
function OnlineIndicator() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
      <span className="online-dot" />
      <span style={{ color: 'rgb(100, 255, 100)', fontWeight: 'bold', letterSpacing: 1 }}>ONLINE</span>
    </span>
  )
}

/* ── Reusable Win95 Window ── */
function Win95({ title, variant = 'primary', children, className = '' }) {
  return (
    <div className={`winbody ${className || 'w-full'}`}>
      <div className={variant === 'secondary' ? 'winbar2' : 'winbar'}>
        <span className="winbar-title">📁 {title}</span>
        <span className="winbar-btn">_</span>
        <span className="winbar-btn">□</span>
        <span className="winbar-btn">✕</span>
      </div>
      <div className="wincontent p-2">
        {children}
      </div>
    </div>
  )
}

/* ── Wavy animated title ── */
function WavyText({ text }) {
  return (
    <div className="waves select-none">
      {text.split('').map((ch, i) => (
        <span key={i} style={{ '--i': i }}>{ch}</span>
      ))}
    </div>
  )
}

/* ── 88x31 Button ── */
function Butt88({ bg, fg = 'white', label, sub, href = '#' }) {
  return (
    <a
      href={href}
      className="butt88 flex flex-col items-center justify-center font-bold"
      style={{ background: bg, color: fg, border: '1px solid rgba(0,0,0,0.5)' }}
    >
      <span style={{ fontSize: 9, lineHeight: 1.2 }}>{label}</span>
      {sub && <span style={{ fontSize: 7, opacity: 0.85 }}>{sub}</span>}
    </a>
  )
}

const UPDATES = [
  { date: '2003-11-03', text: 'added a new section for my art!! check it out :)' },
  { date: '2003-10-28', text: 'updated the links page!! added 3 new affiliates' },
  { date: '2003-10-15', text: 'site launch!! hello world!!! ★' },
]

const LINKS = [
  { label: '🌿 daikonet',      href: 'https://daikonet.neocities.org', style: 'listindex' },
  { label: '🌙 moon archive',  href: '#',                              style: 'listans' },
  { label: '🌸 sakura shrine', href: '#',                              style: 'listindex2' },
  { label: '🎮 games & stuff', href: '#',                              style: 'listans' },
  { label: '🌿 pixel garden',  href: '#',                              style: 'listindex2' },
]

export default function App() {
  const [entered, setEntered] = useState(false)
  const audioRef = useRef(null)

  const handleEnter = () => {
    setEntered(true)
  }

  return (
    <div className="text-center justify-center py-6">
      <audio ref={audioRef} src="/Never-Gonna-Give-You-Up-3.mp3" loop />
      {!entered && <SplashScreen onEnter={handleEnter} />}
      <StarField />
      <SparkleTrail />
      <ShootingStars />
      {entered && <BgMusic audioRef={audioRef} />}
      <div className="mx-auto text-left px-3 sm:px-8 max-w-5xl" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div className="text-center mb-2">
          <div className="mb-1 flex items-center justify-center gap-3">
            <div className="wobble neon-glow inline-block text-4xl text-white">✧</div>
          </div>
          <WavyText text="VP-TECHNOLOGY" />
          {/* <div className="mt-1 flex items-center justify-center gap-4">
            <OnlineIndicator />
            <span className="blink text-xs" style={{ color: 'rgb(229,255,0)' }}>✦ est. 2003 ✦</span>
          </div>
          <p className="abttext text-center block mt-1">welcome to my little corner of the net !!</p> */}
        </div>

        {/* ── Nav ── */}
        <div className="text-center my-3">
          {[
            ['🏠', 'home',    '#'],
            ['👤', 'about',   '#about'],
            ['🗺️', 'plans',   '#plans'],
            ['⚖️', 'equity',  '#equity'],
            ['🛠️', 'recruit', '#recruit'],
          ].map(([icon, label, href]) => (
            <a key={label} href={href} className="navlink">
              <div style={{ fontSize: 22 }}>{icon}</div>
              <span className="navtext">{label}</span>
            </a>
          ))}
        </div>

        {/* ── MOTD marquee ── */}
        <div className="winbody w-full mb-3">
          <div className="winbar">
            <span className="winbar-title">📢 message of the day</span>
            <span className="winbar-btn">✕</span>
          </div>
          <div className="wincontent px-2 py-1 bg-black">
            <div className="motdmarquee">
              <div className="motdmarquee-inner text-sm">
                <span style={{ color: 'rgb(229,255,0)' }}>★ this is why u should have me back ★</span>
                <span style={{ color: 'rgb(100,255,200)' }}> &nbsp;✦ i would love to be part of csus again!! ✦ &nbsp;</span>
                {/* <span style={{ color: 'rgb(255,150,255)' }}>★ built with passion and notepad.exe ★ &nbsp;</span> */}
                <span style={{ color: 'rgb(255,220,80)' }}>✦ thanks 4 visiting!! :) &nbsp;✦ &nbsp;</span>
                <span style={{ color: 'rgb(150,220,255)' }}>★ computer science is cool ★ &nbsp;</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="grid gap-3 grid-cols-1">
          <div className="flex flex-col gap-3">

            {/* Welcome */}
            <Win95 title="welcome.txt">
              <div className="text-sm leading-relaxed scanlines">
                <p className="mb-2">
                  <TypewriterText text="heyooo, as you may have guessed, this is my application for csus :))" />
                </p>
                <p className="mb-2">
                  this site's design is a little tribute to the old geocities sites from the late 90s / early 2000s! i wanted to capture a nostalgic feel, while showcasing how i could be a good candidate for vp-technology
                </p>
                <img className='h-80 mx-auto' src="https://i.imgflip.com/aqmjls.jpg" title="made at imgflip.com"/>
              </div>
            </Win95>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="winbody media-card soft-glow floaty">
                <div className="winbar">
                  <span className="winbar-title">featured build</span>
                </div>
                <div className="wincontent p-2 bg-black text-center">
                  <img src="/website.png" alt="Website screenshot" className="w-full h-40 object-cover rounded border border-[rgba(175,216,81,0.35)]" />
                  <div className="text-[10px] mt-2 text-[rgb(175,216,81)]">redesigning the csus site for maintainability</div>
                </div>
              </div>
              <div className="winbody media-card soft-glow floaty" style={{ animationDelay: '0.35s' }}>
                <div className="winbar2">
                  <span className="winbar-title">workshop energy</span>
                </div>
                <div className="wincontent p-2 bg-black text-center">
                  <img src="https://scontent.fykz2-1.fna.fbcdn.net/v/t1.15752-9/676892167_853630093662375_5239898216475648816_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOmNvbnRyb2wiXX0%3D&_nc_ohc=lEk6YspC2RgQ7kNvwGRzJBf&_nc_oc=Adqrpji1tpolyFPSiq461iLi3aazb9NQjEXsBIgM2sgHnzBNiChLMFbjRLVjKhxTGrQ&_nc_zt=23&_nc_ht=scontent.fykz2-1.fna&_nc_ss=7b6a8&oh=03_Q7cD5QHavRHTzSpfQifGVI_U4MRi270L-fPy_1jIhnldCOp0Uw&oe=6A1BAF09" alt="Workshop photo" className="w-full h-40 object-cover rounded border border-[rgba(100,200,255,0.35)]" />
                  <div className="text-[10px] mt-2 text-[rgb(100,200,255)]">engaging students with hands-on embedded systems</div>
                </div>
              </div>
              <div className="winbody media-card soft-glow floaty" style={{ animationDelay: '0.7s' }}>
                <div className="winbar">
                  <span className="winbar-title">community loop</span>
                </div>
                <div className="wincontent p-2 bg-black text-center">
                  <img src="https://64.media.tumblr.com/d67b48150c438436bd2347deb205bac0/53d54e8ca4426511-05/s400x600/f46259ae64c1f4b66670f119e72be8a14071b4eb.gif" alt="Minecraft gif" className="w-full h-40 object-cover rounded border border-[rgba(255,200,0,0.35)]" />
                  <div className="text-[10px] mt-2 text-[rgb(255,200,0)]">building low-stakes spaces for members to connect</div>
                </div>
              </div>
            </div>

            {/* About */}
            <div id="about">
              <div className="reviewbar glitch-anim">★ about me</div>
              <Win95 title="about_me.exe" variant="secondary">
                <div className="grid gap-0.5 text-sm" style={{ gridTemplateColumns: '110px 1fr' }}>
                  {[
                    ['name',      'Brandon'],
                    ['program',  'U2 Computer Science'],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <div className="font-bold text-right pr-2 py-0.5 text-[rgb(62,22,88)]">{k}:</div>
                      <div className="py-0.5">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-[0.8em] space-y-4">
                  <div className="rounded border border-[rgba(62,22,88,0.35)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm pulse-border">
                    <div className="reviewbar text-sm mb-2">★ what sets me apart</div>
                    <p className="text-center leading-relaxed">
                      I bring a mix of technical leadership and creative intuition. I was the software lead for both Vanier Robotics and McGill Robotics, I do web freelancing, and my CEGEP program focused on web/app/game development, cybersecurity, computer networking, and professional software design.
                    </p>
                    <p className="text-center leading-relaxed mt-2">
                      I also took design classes, which helped me build a strong sense for layout, polish, and user experience. I have touched many areas of CS such as AI, embedded systems, cybersecurity, and more, which helps me build workshops and projects that appeal to students with different interests.
                    </p>
                  </div>
                  <div className="reviewbar text-sm mb-2">★ what have i contributed</div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded border border-[rgba(62,22,88,0.25)] bg-white/70 p-3 shadow-sm media-card">
                      <div className="font-bold text-[rgb(62,22,88)] mb-1">🖥️ Website Overhaul</div>
                      <p className="leading-relaxed">
                        The old csus website was expensive to host and annoying to maintain ($400/yr SquareSpace subscription). I helped redesign and rebuild it from the ground up, which cut costs, improved maintainability, and made room for custom features for the CSUS community.
                      </p>
                      <img src="/website.png" alt="Website Screenshot" className="w-full max-w-full mt-3 rounded border border-[rgba(62,22,88,0.2)]" />
                    </div>
                    <div className="rounded border border-[rgba(62,22,88,0.25)] bg-white/70 p-3 shadow-sm media-card">
                      <div className="font-bold text-[rgb(62,22,88)] mb-1">🔌 Embedded Systems Workshop</div>
                      <p className="leading-relaxed">
                        I collaborated with Space Concordia to create an engaging workshop on embedded system programming. It introduced students to embedded fundamentals and hands-on experience, and the event drew over 70 attendees with great feedback.
                      </p>
                      <img src="https://scontent.fykz2-1.fna.fbcdn.net/v/t1.15752-9/676892167_853630093662375_5239898216475648816_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOmNvbnRyb2wiXX0%3D&_nc_ohc=lEk6YspC2RgQ7kNvwGRzJBf&_nc_oc=Adqrpji1tpolyFPSiq461iLi3aazb9NQjEXsBIgM2sgHnzBNiChLMFbjRLVjKhxTGrQ&_nc_zt=23&_nc_ht=scontent.fykz2-1.fna&_nc_ss=7b6a8&oh=03_Q7cD5QHavRHTzSpfQifGVI_U4MRi270L-fPy_1jIhnldCOp0Uw&oe=6A1BAF09" alt="Workshop Screenshot" className="w-full max-w-full mt-3 rounded border border-[rgba(62,22,88,0.2)]" />
                    </div>
                    <div className="rounded border border-[rgba(62,22,88,0.25)] bg-white/70 p-3 shadow-sm media-card">
                      <div className="font-bold text-[rgb(62,22,88)] mb-1">⛏️ CSUS Minecraft Server</div>
                      <p className="leading-relaxed">
                        Towards the end of the year, I was approved to set up and manage a Minecraft server for the CSUS community. The goal is to create a fun, low-stakes space for members to connect and have fun.
                      </p>
                      <img
                        src="https://64.media.tumblr.com/d67b48150c438436bd2347deb205bac0/53d54e8ca4426511-05/s400x600/f46259ae64c1f4b66670f119e72be8a14071b4eb.gif"
                        alt="Minecraft gif"
                        className="w-full max-w-full mt-3 rounded border border-[rgba(62,22,88,0.2)]"
                      />
                    </div>
                    <div className="rounded border border-[rgba(62,22,88,0.25)] bg-white/70 p-3 shadow-sm media-card">
                      <div className="font-bold text-[rgb(62,22,88)] mb-1">🌐 Other Contributions</div>
                      <p className="leading-relaxed">
                        I helped revamp the CSUS Discord server, maintained bi-daily job postings, and coordinated with other execs on events such as the AI Ethics Panel and Women in Game Dev Panel.
                      </p>
                      <img src="https://i.pinimg.com/736x/c3/d2/63/c3d263389ca400f281c5fcb5d0bf8a42.jpg" alt="Discord screenshot" className="w-full max-w-full mt-3 rounded border border-[rgba(62,22,88,0.2)]" />
                    </div>
                  </div>
                </div>
              </Win95>
            </div>

            {/* Plans */}
            <div id="plans">
              <div className="reviewbar glitch-anim">🗺️ my plans</div>
              <Win95 title="plans_2026.txt">
                <div className="text-sm leading-relaxed space-y-3">
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>🌐 Expand the CSUS website:</b> ship a fully automated events calendar, better onboarding resources for first-year, and create technical guides to drive self-learning.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>🛠️ Build more student tools:</b> continue CSUS projects that are useful day-to-day such as the Discord bot, ATS Tracker, the resume database, and a portal to support council members.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>🎓 Run practical workshops:</b> host a broader set of workshops that introduce cool technologies and relevant CS subfields, from bioinformatics to cybersecurity to game development.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>⛏️ Grow community spaces:</b> launch and maintain low-stakes initiatives like the CSUS Minecraft server to keep members engaged.
                  </div>
                  <p className="text-[0.75em] mt-2 text-[rgb(80,80,80)]">
                    goal: keep building things that are practical, accessible, and fun for everyone in csus.
                  </p>
                </div>
              </Win95>
            </div>

            {/* Equity */}
            <div id="equity">
              <div className="reviewbar">⚖️ how i would implement equity</div>
              <Win95 title="equity_strategy.md" variant="secondary">
                <div className="text-sm leading-relaxed space-y-3">
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-white/70 p-3 shadow-sm media-card">
                    <b>🔓 Lower access barriers:</b> keep workshops free, provide beginner-friendly guides, and use low-cost alternatives like online simulators when possible.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-white/70 p-3 shadow-sm media-card">
                    <b>📋 Transparent opportunities:</b> post volunteer roles publicly with clear expectations, timelines, and simple application steps.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-white/70 p-3 shadow-sm media-card">
                    <b>🍱 Dietary accommodations:</b> for in-person events, provide vegetarian, vegan, dairy-free, or halal options and ask about allergens ahead of time.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-white/70 p-3 shadow-sm media-card">
                    <b>📊 Feedback:</b> track attendance trends and feedback so planning can better serve underrepresented groups.
                  </div>
                  <p className="text-[0.75em] mt-2 text-[rgb(80,80,80)]">
                    principle: equity means designing systems so everyone has a fair chance to participate, grow, and lead.
                  </p>
                </div>
              </Win95>
            </div>

            {/* Recruitment + tech team */}
            <div id="recruit">
              <div className="reviewbar glitch-anim">🛠️ leading recruitment and the tech team</div>
              <Win95 title="team_leadership.txt">
                <div className="text-sm leading-relaxed space-y-3">
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>📣 Recruitment:</b> I would help build a clear recruitment process. I have experience managing technical teams of around 15+ people as software lead for Vanier Robotics and McGill Robotics, so I know how important it is to have a thorough onboarding process that helps new members integrate smoothly.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>🔍 Interviewing:</b> I would interview applicants to assess their skills, interests, and fit. I look for enthusiasm, willingness to learn, proactiveness, problem-solving, and their potential to grow within the team.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>💻 Programming support:</b> I would organize the tech team around shared projects and break features into smaller tasks based on interest, skill, and availability.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>🗓️ Event planning:</b> I would keep programming, logistics, and promotion aligned so events feel coordinated instead of overwhelming.
                  </div>
                  <div className="rounded border border-[rgba(62,22,88,0.25)] bg-[rgba(255,255,255,0.6)] p-3 shadow-sm media-card">
                    <b>📖 Technical guides:</b> I would create and maintain step-by-step guides for setup, deployment, and recurring workflows so future members can onboard faster and keep projects running smoothly.
                  </div>
                  <p className="text-[0.75em] mt-2 text-[rgb(80,80,80)]">
                    goal: build up a well-organized, communicative, and supportive tech team that can execute cool projects, material, and events for the CSUS community.
                  </p>
                </div>
              </Win95>
            </div>

            {/* Music */}
            <div id="music">
              <div className="reviewbar">🎵 currently listening</div>
              <Win95 title="winamp.exe">
                <div className="bg-black text-[rgb(0,255,0)] p-2 text-xs font-mono" style={{ position: 'relative', overflow: 'hidden' }}>
                  <MatrixRain />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[rgb(0,200,255)]">WINAMP 2.95</span>
                      <span className="rainbowanim">★ PRO ★</span>
                    </div>
                    <div className="border border-[rgb(0,100,0)] p-1 mb-2 text-[rgb(255,200,0)]">
                      <div className="text-[rgb(0,255,0)] text-[9px] mb-0.5">NOW PLAYING:</div>
                      <div className="blink" style={{ animationDuration: '2s' }}>▶ Blink-182 — The Rock Show</div>
                      <div className="text-[rgb(0,180,0)] text-[10px]">Take Off Your Pants and Jacket (2001)</div>
                    </div>
                    <div className="flex gap-2 items-center text-[10px] mb-2">
                      <span>|◄◄</span><span>►</span><span>■</span><span>►►|</span>
                      <div className="flex-1 bg-[rgb(0,80,0)] h-2">
                        <div className="bg-[rgb(0,255,0)] h-full winamp-progress" />
                      </div>
                    </div>
                    <div className="reviewbar text-[10px] mt-2">📋 playlist</div>
                    {[
                      ['Blink-182',        'The Rock Show'],
                      ['Good Charlotte',   'The Anthem'],
                      ['Sum 41',           'In Too Deep'],
                      ['Yellowcard',       'Ocean Avenue'],
                      ['New Found Glory',  'My Friends Over You'],
                    ].map(([artist, track], i) => (
                      <div
                        key={track}
                        className="flex gap-2 px-1 py-0.5 text-[11px]"
                        style={{ background: i === 0 ? 'rgba(0,255,0,0.15)' : 'transparent' }}
                      >
                        <span style={{ color: i === 0 ? 'rgb(255,200,0)' : 'rgb(0,180,0)' }}>{i + 1}.</span>
                        <span className="text-[rgb(0,200,255)]">{artist}</span>
                        <span>— {track}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Win95>
            </div>

          </div>
        </div>

        {/* ── Footer ── */}
        <div className="winbody w-full mt-4">
          <div className="winbar">
            <span className="winbar-title">footer</span>
          </div>
          <div className="wincontent p-2 text-center text-xs text-[rgb(60,60,60)]">
            <p>thx 4 reading!!</p>
            {/* <p className="mt-0.5">made with <span className="heartbeat" style={{ display: 'inline-block' }}>💗</span> and notepad.exe — no stealing layouts pls</p> */}
          </div>
        </div>

      </div>
    </div>
  )
}

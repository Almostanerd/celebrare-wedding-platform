import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Monitor, 
  VolumeX, 
  Send, 
  Navigation, 
  RotateCcw,
  Sparkle,
  Sliders,
  RefreshCw,
  Save,
  Check,
  Users,
  X,
  Copy,
  PlusCircle,
  FolderOpen
} from 'lucide-react';

const rawApiUrl = import.meta.env.VITE_API_URL || 'https://celebrare-wedding-platform.onrender.com';
const API_BASE = rawApiUrl.replace(/\/+$/, '');
// Cultural SVG Ornaments
const GaneshaIcon = ({ className = "w-10 h-10", fill = "#D97706" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 8C43 8 38 13 38 20C38 25 41 29 45 31C42 34 38 39 36 46C33 43 28 41 24 43C19 45 17 50 18 55C19 61 24 64 29 63C31 62 33 60 34 58C35 67 40 76 48 80C46 83 45 87 46 90C47 93 50 94 53 93C56 92 57 88 56 84C62 82 67 77 70 70C73 72 77 72 81 69C85 66 86 60 84 55C82 50 77 47 72 49C70 45 66 40 62 37C66 34 68 30 68 25C68 17 60 8 50 8Z" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50 18V38M44 26C47 28 53 28 56 26" stroke={fill} strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="50" cy="14" r="2.5" fill={fill} />
    <path d="M48 48C48 55 52 64 50 72C48 80 43 82 40 80" stroke={fill} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const KalashIcon = ({ className = "w-8 h-8", fill = "#D97706" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="18" rx="8" ry="4" stroke={fill} strokeWidth="2" />
    <path d="M40 8L40 14M35 11L45 15M45 11L35 15" stroke={fill} strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 20C26 23 20 30 20 40C20 54 28 62 40 62C52 62 60 54 60 40C60 30 54 23 48 20" stroke={fill} strokeWidth="2.5"/>
    <circle cx="40" cy="35" r="3" fill={fill} />
  </svg>
);

const RoyalCornerMotif = ({ className = "w-12 h-12", color = "#D97706" }) => (
  <svg viewBox="0 0 100 100" className={`pointer-events-none ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6H94V14H14V94H6V6Z" fill={color} fillOpacity="0.85"/>
    <path d="M18 18H75C75 45 45 75 18 75V18Z" stroke={color} strokeWidth="2" strokeOpacity="0.4"/>
    <circle cx="28" cy="28" r="3.5" fill={color}/>
  </svg>
);

const AnimatedDiya = ({ lit = true, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative cursor-pointer select-none flex flex-col items-center justify-center p-1.5 transition-transform active:scale-95"
    title={lit ? "Click to extinguish Diya" : "Click to light auspicious Diya"}
  >
    <div className={`relative w-4 h-6 mb-0.5 transition-opacity duration-500 ${lit ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full blur-[1px] animate-[pulse_1.2s_ease-in-out_infinite]"></div>
      <div className="absolute -inset-1 bg-amber-400/30 rounded-full blur-md animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-stone-900 rounded-full"></div>
    </div>
    {!lit && <div className="h-6 w-4 flex items-center justify-center text-[10px] text-amber-500/40">🕯️</div>}
    <svg viewBox="0 0 60 30" className="w-9 h-4.5 filter drop-shadow" fill="none">
      <path d="M4 10C12 24 48 24 56 10C58 6 52 4 48 6C38 9 22 9 12 6C8 4 2 6 4 10Z" fill="#B45309" stroke="#F59E0B" strokeWidth="1.5"/>
      <ellipse cx="30" cy="8" rx="20" ry="3" fill="#92400E"/>
    </svg>
  </div>
);

// Ceremonies Data
const EVENTS_DATA = [
  {
    id: 'haldi',
    name: 'Haldi Ceremony',
    hindiName: 'हल्दी उत्सव',
    date: '2027-01-13',
    time24: '10:00',
    displayTime: '10:00 AM onwards',
    displayTimeHi: 'प्रातः 10:00 बजे से',
    venue: 'The Courtyard Lawn, Mayfair Heritage Resort',
    themeKey: 'marigoldZari',
    subText: 'उबटन और हल्दी का सगुन'
  },
  {
    id: 'sangeet',
    name: 'Mehendi & Sangeet',
    hindiName: 'मेहंदी एवं संगीत',
    date: '2027-01-14',
    time24: '18:30',
    displayTime: '06:30 PM onwards',
    displayTimeHi: 'सायं 06:30 बजे से',
    venue: 'Royal Peacock Ballroom, Mayfair Heritage',
    themeKey: 'emeraldMughal',
    subText: 'सुरों और ताल की महफ़िल'
  },
  {
    id: 'phere',
    name: 'Shubh Vivah (Phere)',
    hindiName: 'शुभ विवाह (सात फेरे)',
    date: '2027-01-15',
    time24: '19:30',
    displayTime: '07:30 PM (Shubh Lagna)',
    displayTimeHi: 'सायं 07:30 बजे (शुभ लग्न एवं हस्तमिलाप)',
    venue: 'पं. दीनदयाल उपाध्याय स्मृति कन्वेंशन सेंटर, बिलासा वैली रोड, रायपुर, छत्तीसगढ़ 492001',
    themeKey: 'royalSindoor',
    subText: 'सात वचनों का पावन बंधन'
  },
  {
    id: 'reception',
    name: 'Grand Royal Reception',
    hindiName: 'स्नेह मिलन एवं प्रीतिभोज',
    date: '2027-01-16',
    time24: '20:00',
    displayTime: '08:00 PM onwards',
    displayTimeHi: 'रात्रि 08:00 बजे से',
    venue: 'The Grand Imperial Palace, Civil Lines, Raipur',
    themeKey: 'midnightVelvet',
    subText: 'आशीर्वाद एवं प्रीतिभोज'
  }
];

const THEMES = {
  royalSindoor: {
    id: 'royalSindoor',
    name: 'Royal Sindoor & Gold',
    hindiName: 'शाही सिन्दूरी एवं स्वर्ण',
    bg: 'bg-[#FFFDF9]',
    border: '#B45309',
    goldAccent: '#D97706',
    textPrimary: 'text-stone-900',
    envelopeBg: 'from-red-950 via-rose-950 to-amber-950',
    bannerClass: 'bg-gradient-to-r from-red-600/15 via-rose-500/10 to-amber-600/15 border-amber-500/30'
  },
  marigoldZari: {
    id: 'marigoldZari',
    name: 'Marigold & Genda Fest',
    hindiName: 'गेंदा पुष्प उत्सव',
    bg: 'bg-[#FFFCF0]',
    border: '#D97706',
    goldAccent: '#F59E0B',
    textPrimary: 'text-amber-950',
    envelopeBg: 'from-amber-800 via-orange-900 to-amber-950',
    bannerClass: 'bg-gradient-to-r from-amber-500/15 via-yellow-400/10 to-amber-600/15 border-amber-400/40'
  },
  emeraldMughal: {
    id: 'emeraldMughal',
    name: 'Emerald Peacock Palace',
    hindiName: 'मयूर पन्ना महल',
    bg: 'bg-[#F6FAF8]',
    border: '#047857',
    goldAccent: '#059669',
    textPrimary: 'text-emerald-950',
    envelopeBg: 'from-emerald-950 via-teal-950 to-stone-950',
    bannerClass: 'bg-gradient-to-r from-emerald-600/15 via-teal-500/10 to-emerald-700/15 border-emerald-500/30'
  },
  midnightVelvet: {
    id: 'midnightVelvet',
    name: 'Midnight Royal Sangeet',
    hindiName: 'मध्यरात्रि सुर संगीत',
    bg: 'bg-[#0F172A]',
    border: '#38BDF8',
    goldAccent: '#F59E0B',
    textPrimary: 'text-slate-100',
    envelopeBg: 'from-slate-950 via-indigo-950 to-blue-950',
    bannerClass: 'bg-gradient-to-r from-indigo-950/60 via-blue-900/40 to-slate-900/80 border-sky-500/30'
  }
};

export default function App() {
  const [lang, setLang] = useState('hi');
  const [activeTheme, setActiveTheme] = useState('royalSindoor');
  const [selectedEventId, setSelectedEventId] = useState('phere');
  const [diyaLit, setDiyaLit] = useState(true);
  
  // Dynamic Slug & Automatic URL Routing State
  const [currentSlug, setCurrentSlug] = useState('');
  const [publishedUrl, setPublishedUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Couple Details State
  const [formData, setFormData] = useState({
    brideName: 'श्रेया शर्मा',
    groomName: 'अर्जुन वर्मा',
    shloka: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
    shlokaEn: '“Two souls united in sacred love and Vedic tradition, blessed with happiness and eternal light.”',
    hostsHindi: 'श्रीमती सुनीता एवं श्री राजेश शर्मा सपरिवार',
    hostsEn: 'Mrs. Sunita & Mr. Rajesh Sharma cordially invite you',
    groomParentsHindi: 'सुपुत्र श्रीमती रेखा एवं श्री महेंद्र वर्मा',
    groomParentsEn: 'Son of Mrs. Rekha & Mr. Mahendra Verma',
    venue: 'पं. दीनदयाल उपाध्याय स्मृति कन्वेंशन सेंटर, बिलासा वैली रोड, रायपुर, छत्तीसगढ़ 492001',
    venueEn: 'Pt. Deendayal Upadhyay Smriti Convention Center, Bilasa Valley Road, Raipur, CG',
    date: '2027-01-15',
    time24: '19:30',
    shubhMuhurat: 'सायं 07:30 बजे (शुभ लग्न एवं हस्तमिलाप)',
    shubhMuhuratEn: '07:30 PM (Auspicious Hastamelap)'
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [petalsActive, setPetalsActive] = useState(true);
  const [viewportMode, setViewportMode] = useState('360px');
  
  // Saving & Dashboard States
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [availableWeddings, setAvailableWeddings] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    metrics: { totalSubmissions: 0, totalAdults: 0, totalKids: 0, jainMeals: 0, pureVegMeals: 0, swaminarayanMeals: 0 },
    guests: []
  });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP Form State
  const [rsvp, setRsvp] = useState({
    guestName: '',
    phone: '',
    adults: '2',
    kids: '0',
    attendingEvents: ['phere'],
    diet: 'Pure Veg',
    wishes: ''
  });
  const [rsvpErrors, setRsvpErrors] = useState({});
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audioCtxRef = useRef(null);
  const synthNodesRef = useRef([]);
  const analyserRef = useRef(null);
  const [audioBars, setAudioBars] = useState([8, 14, 22, 10, 18]);

  const canvasRef = useRef(null);
  const fireworksRef = useRef([]);

  // Auto-load wedding if URL already has `?invite=<slug>`
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slugParam = params.get('invite');
    if (slugParam) {
      setCurrentSlug(slugParam);
      setPublishedUrl(window.location.href);
      fetch(`${API_BASE}/api/invites/${slugParam}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            const inv = json.data;
            setFormData(prev => ({
              ...prev,
              brideName: inv.brideName,
              groomName: inv.groomName,
              venue: inv.mainVenue,
              date: inv.mainDate,
              time24: inv.mainTime || '19:30'
            }));
            if (inv.theme) setActiveTheme(inv.theme);
          }
        })
        .catch(err => console.error("Could not fetch wedding invite:", err));
    }
  }, []);

  // Web Audio Synthesizer
  const toggleShehnaiMusic = () => {
    if (isAudioPlaying) {
      synthNodesRef.current.forEach(node => {
        try { node.stop(); } catch(e){}
        try { node.disconnect(); } catch(e){}
      });
      synthNodesRef.current = [];
      setIsAudioPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 32;
      analyserRef.current = analyser;

      const freqs = [146.83, 147.1, 220.00, 293.66];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      const activeOscs = [];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.18 + idx * 0.06, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.025, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.05, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        activeOscs.push(osc, lfo);
      });

      synthNodesRef.current = activeOscs;
      setIsAudioPlaying(true);
    } catch (err) {
      console.error("Audio error:", err);
    }
  };

  useEffect(() => {
    let animId;
    const updateWave = () => {
      if (isAudioPlaying && analyserRef.current) {
        const buffer = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(buffer);
        const bars = [
          Math.max(6, Math.floor(buffer[1] / 12)),
          Math.max(8, Math.floor(buffer[3] / 9)),
          Math.max(12, Math.floor(buffer[5] / 7)),
          Math.max(7, Math.floor(buffer[7] / 11)),
          Math.max(9, Math.floor(buffer[9] / 10)),
        ];
        setAudioBars(bars);
      }
      animId = requestAnimationFrame(updateWave);
    };
    updateWave();
    return () => cancelAnimationFrame(animId);
  }, [isAudioPlaying]);

  useEffect(() => {
    return () => {
      synthNodesRef.current.forEach(node => {
        try { node.stop(); } catch(e){}
        try { node.disconnect(); } catch(e){}
      });
    };
  }, []);

  // Countdown timer calculation
  useEffect(() => {
    const timeToParse = formData.time24 ? `${formData.time24}:00` : '19:30:00';
    const targetDate = new Date(`${formData.date}T${timeToParse}`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0 || isNaN(difference)) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [formData.date, formData.time24]);

  // Petals & Fireworks Canvas FX
  const triggerCelebration = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const colors = ['#F59E0B', '#DC2626', '#EAB308', '#F97316', '#38BDF8'];
    for (let i = 0; i < 45; i++) {
      fireworksRef.current.push({
        x: canvas.width / 2,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 2,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas.parentElement);

    const petals = Array.from({ length: 24 }).map(() => ({
      x: Math.random() * 360,
      y: Math.random() * 700 - 700,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.4 + 0.8,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 3,
      color: ['#F59E0B', '#D97706', '#EA580C', '#FBBF24'][Math.floor(Math.random() * 4)],
      opacity: Math.random() * 0.5 + 0.5
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (petalsActive) {
        petals.forEach(p => {
          p.y += p.speedY;
          p.x += Math.sin(p.y * 0.02) * 0.8;
          p.angle += p.spin;

          if (p.y > canvas.height + 20) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.angle * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.4, p.size * 0.7, p.size * 0.8, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.8, -p.size * 0.8, -p.size * 0.4, 0, -p.size);
          ctx.fill();
          ctx.restore();
        });
      }

      for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
        const fp = fireworksRef.current[i];
        fp.x += fp.vx;
        fp.y += fp.vy;
        fp.vy += 0.12;
        fp.life -= fp.decay;

        if (fp.life <= 0) {
          fireworksRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = fp.life;
        ctx.fillStyle = fp.color;
        ctx.beginPath();
        ctx.arc(fp.x, fp.y, fp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [petalsActive]);

  // Dynamic Family Compliments Line (Calculated from names)
  const familyCompliments = useMemo(() => {
    const extractLastName = (fullName) => {
      if (!fullName) return '';
      const parts = fullName.trim().split(/\s+/);
      return parts.length > 1 ? parts[parts.length - 1] : parts[0];
    };

    const bLast = extractLastName(formData.brideName);
    const gLast = extractLastName(formData.groomName);

    if (lang === 'hi') {
      if (bLast && gLast && bLast !== gLast) {
        return `दर्शनार्थी: समस्त ${bLast} एवं ${gLast} परिवार`;
      }
      return `दर्शनार्थी: समस्त स्वजन एवं परिवार`;
    } else {
      if (bLast && gLast && bLast !== gLast) {
        return `With Best Compliments from ${bLast} & ${gLast} Families`;
      }
      return `With Best Compliments from Both Families & Friends`;
    }
  }, [formData.brideName, formData.groomName, lang]);

  // WhatsApp Deep Link
  const whatsappUrl = useMemo(() => {
    const shareLink = publishedUrl || window.location.href;
    let text = "";
    if (lang === 'hi') {
      text = `🙏 *सादर आमंत्रण!* 🙏\n\n` +
        `अत्यंत हर्ष के साथ हम आपको हमारे परिवार के मांगलिक वैवाहिक उत्सव में आमंत्रित करते हैं:\n` +
        `💍 *${formData.brideName} संग ${formData.groomName}*\n\n` +
        `📅 *शुभ विवाह दिनांक:* ${formData.date}\n` +
        `⏰ *शुभ मुहूर्त:* ${formData.shubhMuhurat}\n` +
        `📍 *स्थान:* ${formData.venue}\n\n` +
        `💌 *डिजिटल पत्रिका लिंक:* ${shareLink}\n\n` +
        `✨ कृपया अपनी गरिमामयी उपस्थिति देकर वर-वधू को शुभाशीर्वाद प्रदान करें।\n` +
        `_${familyCompliments}_`;
    } else {
      text = `🙏 *Wedding Invitation!* 🙏\n\n` +
        `We cordially invite you to celebrate the auspicious wedding ceremonies of:\n` +
        `💍 *${formData.brideName} & ${formData.groomName}*\n\n` +
        `📅 *Date:* ${formData.date}\n` +
        `⏰ *Muhurat:* ${formData.shubhMuhuratEn}\n` +
        `📍 *Venue:* ${formData.venueEn}\n\n` +
        `💌 *View Digital Card:* ${shareLink}\n\n` +
        `_${familyCompliments}_`;
    }
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [formData, lang, publishedUrl, familyCompliments]);

  // Create brand new independent wedding
  const startFreshWedding = () => {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.pushState({}, '', cleanUrl);

    setCurrentSlug('');
    setPublishedUrl('');
    setRsvpSuccess(false);
    setDashboardData({
      metrics: { totalSubmissions: 0, totalAdults: 0, totalKids: 0, jainMeals: 0, pureVegMeals: 0, swaminarayanMeals: 0 },
      guests: []
    });
  };

  // Save & Publish
  const handleSaveInvitation = async () => {
    setIsSavingCard(true);
    setSaveSuccess(false);

    const cleanBride = formData.brideName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanGroom = formData.groomName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const prefix = (cleanBride && cleanGroom) ? `${cleanBride}-weds-${cleanGroom}` : 'vivah';
    const uniqueSuffix = `${Date.now().toString().slice(-5)}${Math.floor(100 + Math.random() * 900)}`;
    
    const targetSlug = currentSlug || `${prefix}-${uniqueSuffix}`;

    try {
      const response = await fetch(`${API_BASE}/api/invites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: targetSlug,
          brideName: formData.brideName,
          groomName: formData.groomName,
          parentsName: formData.hostsHindi,
          mainDate: formData.date,
          mainTime: formData.time24,
          mainVenue: formData.venue,
          theme: activeTheme,
          ceremonies: EVENTS_DATA.map(e => ({
            id: e.id,
            title: lang === 'hi' ? e.hindiName : e.name,
            date: e.date,
            time: lang === 'hi' ? e.displayTimeHi : e.displayTime,
            venue: e.venue
          }))
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save');

      const savedSlug = data.slug || targetSlug;
      setCurrentSlug(savedSlug);

      const generatedUrl = `${window.location.origin}${window.location.pathname}?invite=${savedSlug}`;
      window.history.pushState({ path: generatedUrl }, '', generatedUrl);

      setPublishedUrl(generatedUrl);
      setSaveSuccess(true);
      triggerCelebration();

      fetchDashboardData(savedSlug);
    } catch (err) {
      alert(`Could not save to MongoDB: ${err.message}. Ensure backend is running.`);
    } finally {
      setIsSavingCard(false);
    }
  };

  // Fetch all weddings from MongoDB for the selector dropdown
  const fetchAllWeddings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/invites`);
      const json = await res.json();
      if (json.success && json.data) {
        setAvailableWeddings(json.data);
      }
    } catch (err) {
      console.error("Could not fetch list of weddings:", err);
    }
  };

  // Fetch Guest Ledger strictly for the active couple ID
  const fetchDashboardData = async (slugParam) => {
    setIsLoadingDashboard(true);
    const activeSlug = slugParam || currentSlug;
    
    if (!activeSlug) {
      setDashboardData({
        metrics: { totalSubmissions: 0, totalAdults: 0, totalKids: 0, jainMeals: 0, pureVegMeals: 0, swaminarayanMeals: 0 },
        guests: []
      });
      setIsLoadingDashboard(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/invites/${activeSlug}/rsvp-stats`);
      const json = await res.json();
      if (json.success && json.data) {
        setDashboardData(json.data);
      } else {
        setDashboardData({
          metrics: { totalSubmissions: 0, totalAdults: 0, totalKids: 0, jainMeals: 0, pureVegMeals: 0, swaminarayanMeals: 0 },
          guests: []
        });
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  // Switch ledger view to a past/different wedding
  const handleSwitchWeddingLedger = (selectedSlug) => {
    setCurrentSlug(selectedSlug);
    const updatedUrl = `${window.location.origin}${window.location.pathname}?invite=${selectedSlug}`;
    window.history.pushState({}, '', updatedUrl);
    setPublishedUrl(updatedUrl);

    fetch(`${API_BASE}/api/invites/${selectedSlug}`)
      .then(r => r.json())
      .then(json => {
        if (json.success && json.data) {
          const inv = json.data;
          setFormData(prev => ({
            ...prev,
            brideName: inv.brideName,
            groomName: inv.groomName,
            venue: inv.mainVenue,
            date: inv.mainDate,
            time24: inv.mainTime || '19:30'
          }));
          if (inv.theme) setActiveTheme(inv.theme);
        }
      });

    fetchDashboardData(selectedSlug);
  };

  // Submit RSVP to MongoDB under active wedding slug
  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!rsvp.guestName.trim()) {
      errors.guestName = lang === 'hi' ? 'कृपया अपना शुभ नाम दर्ज करें' : 'Please enter guest name';
    }

    const cleanPhone = rsvp.phone.replace(/\D/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!cleanPhone) {
      errors.phone = lang === 'hi' ? '10-अंकों का मोबाइल नंबर अनिवार्य है' : '10-digit mobile number is required';
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      errors.phone = lang === 'hi' 
        ? 'अमान्य नंबर! कृपया 6-9 से शुरू होने वाला 10-अंकों का नंबर दर्ज करें' 
        : 'Invalid number! Enter valid 10-digit number starting with 6-9';
    }

    if (Object.keys(errors).length > 0) {
      setRsvpErrors(errors);
      setRsvpSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setRsvpErrors({});

    try {
      let activeSlug = currentSlug;
      if (!activeSlug) {
        const cleanBride = formData.brideName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanGroom = formData.groomName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        const prefix = (cleanBride && cleanGroom) ? `${cleanBride}-weds-${cleanGroom}` : 'vivah';
        activeSlug = `${prefix}-${Date.now().toString().slice(-5)}${Math.floor(100 + Math.random() * 900)}`;

        await fetch(`${API_BASE}/api/invites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: activeSlug,
            brideName: formData.brideName,
            groomName: formData.groomName,
            parentsName: formData.hostsHindi,
            mainDate: formData.date,
            mainTime: formData.time24,
            mainVenue: formData.venue,
            theme: activeTheme,
            ceremonies: EVENTS_DATA.map(e => ({
              id: e.id,
              title: lang === 'hi' ? e.hindiName : e.name,
              date: e.date,
              time: lang === 'hi' ? e.displayTimeHi : e.displayTime,
              venue: e.venue
            }))
          })
        });

        setCurrentSlug(activeSlug);
        const autoUrl = `${window.location.origin}${window.location.pathname}?invite=${activeSlug}`;
        window.history.pushState({}, '', autoUrl);
        setPublishedUrl(autoUrl);
      }

      const response = await fetch(`${API_BASE}/api/invites/${activeSlug}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: rsvp.guestName.trim(),
          phone: cleanPhone,
          adultsCount: Number(rsvp.adults),
          kidsCount: Number(rsvp.kids),
          dietaryPreference: rsvp.diet,
          attendingCeremonies: rsvp.attendingEvents,
          warmWishes: rsvp.wishes || 'हार्दिक शुभकामनाएं!'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit RSVP');
      }

      setRsvpSuccess(true);
      triggerCelebration();
    } catch (err) {
      setRsvpErrors({ phone: err.message || 'Server error. Is backend running?' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTheme = THEMES[activeTheme];
  const activeEvent = EVENTS_DATA.find(e => e.id === selectedEventId) || EVENTS_DATA[2];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white relative overflow-x-hidden">
      
      {/* Background Aura */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-rose-700 rounded-full blur-[140px]"></div>
      </div>

      {/* Header */}
      <header className="border-b border-amber-900/30 bg-stone-900/90 backdrop-blur-md sticky top-0 z-50 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-stone-950 via-amber-950 to-stone-900 border border-amber-400/40 flex items-center justify-center">
              <GaneshaIcon className="w-6 h-6 text-amber-300" fill="#F59E0B" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg text-amber-200 tracking-wide">
                  {lang === 'hi' ? 'सेलिब्रारे' : 'Celebrare'}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {lang === 'hi' ? 'डिजिटल स्टूडियो' : 'Wedding Studio'}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                {lang === 'hi' 
                  ? 'भारतीय वैवाहिक आमंत्रण पत्रिका • 360px मोबाइल अनुकूलित' 
                  : 'Indian Digital Wedding Invitations • 360px Mobile Proof'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Host Dashboard Button */}
            <button
              onClick={() => {
                setIsDashboardOpen(true);
                fetchAllWeddings();
                fetchDashboardData(currentSlug);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-600/20 border border-amber-500/50 text-amber-200 hover:bg-amber-600/30 transition shadow-sm"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'अतिथि सूची (RSVP डेटा)' : 'Guest Ledger'}</span>
            </button>

            {/* Diya Button */}
            <div className="flex items-center bg-stone-900/90 border border-amber-600/30 rounded-xl px-2 py-0.5">
              <AnimatedDiya lit={diyaLit} onClick={() => setDiyaLit(!diyaLit)} />
              <span className="text-[11px] text-amber-300/80 font-serif hidden md:inline ml-1">
                {diyaLit ? (lang === 'hi' ? 'मंगल दीप' : 'Diya Lit') : (lang === 'hi' ? 'दीप जलाएं' : 'Light Diya')}
              </span>
            </div>

            {/* Drone Synthesizer */}
            <button
              onClick={toggleShehnaiMusic}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-md ${
                isAudioPlaying 
                  ? 'bg-rose-950/80 border border-rose-500/60 text-rose-200 ring-2 ring-rose-500/30' 
                  : 'bg-stone-900 border border-stone-700 text-stone-300 hover:border-amber-500/50'
              }`}
            >
              {isAudioPlaying ? (
                <div className="flex items-end gap-0.5 h-3.5 w-4">
                  {audioBars.map((height, i) => (
                    <span key={i} className="w-0.5 bg-rose-400 rounded-full transition-all duration-75" style={{ height: `${height}px` }} />
                  ))}
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {isAudioPlaying ? (lang === 'hi' ? 'तानपुरा चालू' : 'Drone On') : (lang === 'hi' ? 'तानपुरा संगीत' : 'Play Drone')}
              </span>
            </button>

            {/* Petals Toggle */}
            <button
              onClick={() => setPetalsActive(!petalsActive)}
              className={`p-2 rounded-xl border text-xs transition ${
                petalsActive ? 'bg-amber-500/20 border-amber-500/60 text-amber-300' : 'bg-stone-900 border-stone-800 text-stone-500'
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="flex rounded-xl border border-amber-600/30 p-0.5 bg-stone-950">
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  lang === 'hi' ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white' : 'text-stone-400'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  lang === 'en' ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white' : 'text-stone-400'
                }`}
              >
                ENG
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">
          
          {/* Quick Templates with Reset */}
          <div className="bg-stone-900/95 border border-amber-500/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Sparkle className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-xs tracking-wide text-amber-200 uppercase">
                  {lang === 'hi' ? 'नमूना पत्रिका प्रारूप' : 'Quick Card Templates'}
                </h3>
              </div>
              <button
                onClick={startFreshWedding}
                className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'नया विवाह बनाएं' : 'Create New Card'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  startFreshWedding();
                  setFormData({
                    brideName: 'श्रेया शर्मा',
                    groomName: 'अर्जुन वर्मा',
                    shloka: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
                    shlokaEn: '“Two souls united in sacred love and Vedic tradition.”',
                    hostsHindi: 'श्रीमती सुनीता एवं श्री राजेश शर्मा सपरिवार',
                    hostsEn: 'Mrs. Sunita & Mr. Rajesh Sharma cordially invite you',
                    groomParentsHindi: 'सुपुत्र श्रीमती रेखा एवं श्री महेंद्र वर्मा',
                    groomParentsEn: 'Son of Mrs. Rekha & Mr. Mahendra Verma',
                    date: '2027-01-15',
                    time24: '19:30',
                    shubhMuhurat: 'सायं 07:30 बजे (शुभ लग्न एवं हस्तमिलाप)',
                    shubhMuhuratEn: '07:30 PM (Auspicious Hastamelap)',
                    venue: 'पं. दीनदयाल उपाध्याय स्मृति कन्वेंशन सेंटर, बिलासा वैली रोड, रायपुर, छत्तीसगढ़ 492001',
                    venueEn: 'Pt. Deendayal Upadhyay Smriti Convention Center, Raipur, CG'
                  });
                  setLang('hi');
                  setViewportMode('360px');
                  setActiveTheme('royalSindoor');
                  triggerCelebration();
                }}
                className="p-2.5 rounded-xl border border-amber-600/30 bg-stone-950/70 hover:bg-stone-800 text-left transition"
              >
                <div className="font-bold text-amber-300">
                  {lang === 'hi' ? '🌸 वैदिक देवनागरी' : '🌸 Vedic Devanagari'}
                </div>
                <div className="text-[11px] text-stone-400 truncate mt-0.5">
                  {lang === 'hi' ? 'श्रेया संग अर्जुन • 15 Jan' : 'Shreya & Arjun • 15 Jan'}
                </div>
              </button>

              <button
                onClick={() => {
                  startFreshWedding();
                  setFormData({
                    brideName: 'Dr. Radhika Joshi',
                    groomName: 'Capt. Vikramaditya Rathore',
                    shloka: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
                    shlokaEn: '“Two souls united in love and Vedic tradition, blessed with eternal light.”',
                    hostsHindi: 'डॉ. जोशी परिवार',
                    hostsEn: 'Dr. Joshi Family cordially invites you',
                    groomParentsHindi: 'कर्नल राठौर परिवार',
                    groomParentsEn: 'Son of Col. & Mrs. Rathore',
                    date: '2027-02-20',
                    time24: '20:00',
                    shubhMuhurat: 'रात्रि 08:00 बजे (हस्तमिलाप)',
                    shubhMuhuratEn: '08:00 PM (Auspicious Hastamelap)',
                    venue: 'The Grand Imperial Heritage Palace Ballroom, Near Airport Road, Bengaluru',
                    venueEn: 'The Grand Imperial Heritage Palace Ballroom, Near Airport Road, Bengaluru'
                  });
                  setLang('en');
                  setViewportMode('360px');
                  setActiveTheme('emeraldMughal');
                  triggerCelebration();
                }}
                className="p-2.5 rounded-xl border border-stone-800 bg-stone-950/70 hover:bg-stone-800 text-left transition"
              >
                <div className="font-bold text-emerald-300">
                  {lang === 'hi' ? '🌿 शाही समकालीन' : '🌿 Royal Contemporary'}
                </div>
                <div className="text-[11px] text-stone-400 truncate mt-0.5">
                  {lang === 'hi' ? 'राधिका एवं विक्रम • 20 Feb' : 'Radhika & Vikram • 20 Feb'}
                </div>
              </button>
            </div>
          </div>

          {/* Editor Form */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex-1 space-y-4">
            
            {/* Theme Picker */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-sm text-stone-200">
                  {lang === 'hi' ? 'रंग एवं शैली (थीम)' : 'Theme Palette'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {Object.keys(THEMES).map(tKey => (
                  <button
                    key={tKey}
                    onClick={() => setActiveTheme(tKey)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      activeTheme === tKey ? 'scale-110 border-white ring-2 ring-amber-500' : 'border-transparent opacity-60'
                    }`}
                    style={{ backgroundColor: THEMES[tKey].goldAccent }}
                  />
                ))}
              </div>
            </div>

            {/* Couple Names */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">
                  {lang === 'hi' ? 'वधू का नाम (Bride)' : 'Bride Name'}
                </label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-amber-200 focus:outline-none focus:border-amber-500 font-serif"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">
                  {lang === 'hi' ? 'वर का नाम (Groom)' : 'Groom Name'}
                </label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-amber-200 focus:outline-none focus:border-amber-500 font-serif"
                />
              </div>
            </div>

            {/* Dedicated Date & Time Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">
                  {lang === 'hi' ? 'विवाह तिथि (Date)' : 'Wedding Date'}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">
                  {lang === 'hi' ? 'मुहूर्त समय (Countdown Clock)' : '24h Time (Clock)'}
                </label>
                <input
                  type="time"
                  value={formData.time24}
                  onChange={(e) => setFormData({ ...formData, time24: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Custom Muhurat Label */}
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">
                {lang === 'hi' ? 'शुभ मुहूर्त विवरण (Display Muhurat / Time)' : 'Display Muhurat Time Label'}
              </label>
              <input
                type="text"
                value={lang === 'hi' ? formData.shubhMuhurat : formData.shubhMuhuratEn}
                onChange={(e) => {
                  if (lang === 'hi') setFormData({ ...formData, shubhMuhurat: e.target.value });
                  else setFormData({ ...formData, shubhMuhuratEn: e.target.value });
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-amber-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Venue Address */}
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1 flex justify-between">
                <span>{lang === 'hi' ? 'विवाह स्थल (Venue Address)' : 'Venue Address'}</span>
                <span className={`text-[10px] ${formData.venue.length > 40 ? 'text-rose-400 font-bold' : 'text-stone-500'}`}>
                  {formData.venue.length} {lang === 'hi' ? 'अक्षर' : 'chars'}
                </span>
              </label>
              <textarea
                rows={2}
                value={lang === 'hi' ? formData.venue : formData.venueEn}
                onChange={(e) => setFormData(lang === 'hi' ? { ...formData, venue: e.target.value } : { ...formData, venueEn: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Ceremonies Timeline */}
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-2">
                {lang === 'hi' ? 'मांगलिक कार्यक्रम (Ceremonies)' : 'Ceremonies Timeline'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EVENTS_DATA.map((evt) => (
                  <button
                    key={evt.id}
                    onClick={() => {
                      setSelectedEventId(evt.id);
                      if (evt.themeKey && THEMES[evt.themeKey]) setActiveTheme(evt.themeKey);
                      setFormData(prev => ({
                        ...prev,
                        date: evt.date,
                        time24: evt.time24,
                        shubhMuhurat: evt.displayTimeHi,
                        shubhMuhuratEn: evt.displayTime
                      }));
                      triggerCelebration();
                    }}
                    className={`p-2 rounded-xl border text-left transition ${
                      selectedEventId === evt.id ? 'bg-amber-600/20 border-amber-500 text-amber-200' : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    <div className="font-semibold text-xs">{lang === 'hi' ? evt.hindiName : evt.name}</div>
                    <div className="text-[10px] text-stone-400">
                      {lang === 'hi' ? evt.displayTimeHi : evt.displayTime}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Card & WhatsApp Links */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleSaveInvitation}
                disabled={isSavingCard}
                className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center gap-1.5 shadow-lg text-xs font-semibold transition"
              >
                {isSavingCard ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : saveSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>
                  {isSavingCard 
                    ? (lang === 'hi' ? 'सहेजा जा रहा है...' : 'Saving...') 
                    : saveSuccess 
                      ? (lang === 'hi' ? 'डेटाबेस में सहेजा गया!' : 'Saved to DB!') 
                      : (lang === 'hi' ? 'पत्रिका प्रकाशित करें' : 'Save & Publish')}
                </span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white flex items-center justify-center gap-1.5 shadow-lg text-xs font-semibold transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'व्हाट्सएप साझा करें' : 'Share WhatsApp'}</span>
              </a>
            </div>

            {/* Automatic Public URL Output */}
            {publishedUrl && (
              <div className="mt-3 p-3 bg-stone-950 border border-emerald-500/50 rounded-xl space-y-1.5 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                  <span>🎉 {lang === 'hi' ? 'आपकी लाइव पत्रिका लिंक:' : 'Published Wedding Link:'}</span>
                  <span className="font-mono text-[10px] text-stone-400">ID: {currentSlug}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    readOnly
                    value={publishedUrl}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-300 font-mono select-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(publishedUrl);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: 360px Live Simulator */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-md flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewportMode('360px')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                  viewportMode === '360px' ? 'bg-amber-600 text-white' : 'bg-stone-900 text-stone-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? '360px मोबाइल दृश्य' : '360px Mobile (Test Mode)'}</span>
              </button>
              <button
                onClick={() => setViewportMode('responsive')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                  viewportMode === 'responsive' ? 'bg-amber-600 text-white' : 'bg-stone-900 text-stone-400'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'पूर्ण आकार' : 'Fluid View'}</span>
              </button>
            </div>
            <div className="text-xs text-amber-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{lang === 'hi' ? 'लाइव प्रीव्यू' : 'Live Preview'}</span>
            </div>
          </div>

          {/* Golden Phone Frame */}
          <div className={`transition-all duration-300 relative ${viewportMode === '360px' ? 'w-[360px]' : 'w-full max-w-[420px]'}`}>
            <div className="relative rounded-[44px] p-3.5 bg-gradient-to-b from-amber-600 via-stone-800 to-amber-950 shadow-2xl border-2 border-amber-500/50">
              
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-950 rounded-full z-40 flex items-center justify-center space-x-2 border border-stone-800">
                <div className="w-2 h-2 rounded-full bg-stone-900"></div>
                <div className="w-8 h-1 bg-stone-800 rounded-full"></div>
              </div>

              <div className="relative rounded-[32px] overflow-hidden bg-stone-950 min-h-[660px] max-h-[760px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-700">
                
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

                {/* Envelope Seal */}
                {!isEnvelopeOpen ? (
                  <div className={`relative min-h-[660px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br ${currentTheme.envelopeBg} text-amber-100 select-none`}>
                    <div className="relative z-10 space-y-4 max-w-xs">
                      <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center shadow-lg">
                        <GaneshaIcon className="w-10 h-10 text-amber-300" fill="#F59E0B" />
                      </div>
                      <div className="font-serif">
                        <p className="text-amber-300 text-xs tracking-widest uppercase mb-1 font-semibold">
                          {lang === 'hi' ? '॥ श्री गणेशाय नमः ॥' : 'AUSPICIOUS WEDDING INVITATION'}
                        </p>
                        <h1 className="text-2xl font-bold text-amber-100 leading-tight">
                          {formData.brideName} <span className="text-amber-400 font-sans">&</span> {formData.groomName}
                        </h1>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setIsEnvelopeOpen(true);
                            triggerCelebration();
                            if (!isAudioPlaying) toggleShehnaiMusic();
                          }}
                          className="group relative inline-flex items-center justify-center"
                        >
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-900 border-2 border-amber-300 shadow-2xl flex flex-col items-center justify-center text-amber-100 transition-transform active:scale-95">
                            <span className="text-[9px] font-serif font-black tracking-widest text-amber-200">
                              {lang === 'hi' ? 'खोलें' : 'OPEN'}
                            </span>
                            <Heart className="w-5 h-5 text-amber-200 fill-amber-200 my-0.5" />
                            <span className="text-[8px] text-amber-200 font-bold">
                              {lang === 'hi' ? 'शुभ लग्न' : 'VIVAH'}
                            </span>
                          </div>
                        </button>
                        <p className="text-[11px] text-amber-300 font-medium mt-3 animate-bounce">
                          {lang === 'hi' ? 'मुहर छूकर पत्रिका खोलें ✨' : 'Tap seal to open card ✨'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  
                  /* Unfolded Card */
                  <div className={`relative ${currentTheme.bg} ${currentTheme.textPrimary} min-h-[660px] flex flex-col p-4 transition-colors`}>
                    
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 mb-3">
                      <button
                        onClick={() => setIsEnvelopeOpen(false)}
                        className="text-[11px] font-semibold text-amber-800 flex items-center gap-1 hover:underline"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{lang === 'hi' ? 'लिफाफा बंद करें' : 'Fold Envelope'}</span>
                      </button>
                      <span className="text-[10px] font-serif text-amber-800 tracking-wider font-bold">
                        ॥ मङ्गलम् भगवान विष्णुः ॥
                      </span>
                    </div>

                    <div className="relative border-2 border-amber-600/30 rounded-2xl p-4 bg-white/70 backdrop-blur-xs shadow-sm">
                      <RoyalCornerMotif className="absolute top-1 left-1 w-9 h-9" color={currentTheme.border} />
                      <RoyalCornerMotif className="absolute top-1 right-1 w-9 h-9 rotate-90" color={currentTheme.border} />
                      <RoyalCornerMotif className="absolute bottom-1 left-1 w-9 h-9 -rotate-90" color={currentTheme.border} />
                      <RoyalCornerMotif className="absolute bottom-1 right-1 w-9 h-9 rotate-180" color={currentTheme.border} />

                      <div className="text-center mb-2">
                        <GaneshaIcon className="w-9 h-9 mx-auto mb-1" fill={currentTheme.border} />
                        <p className="text-[11px] font-serif text-amber-900 font-bold tracking-wider">॥ श्री गणेशाय नमः ॥</p>
                        <p className="text-[11px] font-serif text-stone-700 italic mt-1 leading-snug px-3 break-words">
                          {lang === 'hi' ? formData.shloka : formData.shlokaEn}
                        </p>
                      </div>

                      {/* Couple Names */}
                      <div className="text-center my-3 py-3 border-y border-amber-600/20 bg-amber-50/50 rounded-xl">
                        <div className="text-2xl font-serif font-black text-amber-950 tracking-wide break-words">
                          {formData.brideName}
                        </div>
                        <div className="flex items-center justify-center my-1 gap-2">
                          <span className="h-[1px] w-6 bg-amber-400"></span>
                          <span className="text-xs font-serif text-amber-700 italic">
                            {lang === 'hi' ? 'संग' : 'Weds'}
                          </span>
                          <span className="h-[1px] w-6 bg-amber-400"></span>
                        </div>
                        <div className="text-2xl font-serif font-black text-amber-950 tracking-wide break-words">
                          {formData.groomName}
                        </div>
                      </div>

                      {/* Live Countdown Clock */}
                      <div className="my-3 p-2 rounded-xl bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-amber-600/10 border border-amber-400/40 text-center">
                        <span className="text-[9px] uppercase tracking-widest text-amber-900 font-bold block mb-1">
                          {lang === 'hi' ? '⏳ शुभ मुहूर्त शेष समय' : '⏳ Auspicious Muhurat Countdown'}
                        </span>
                        <div className="grid grid-cols-4 gap-1 text-center font-mono">
                          <div className="bg-white/80 rounded p-1 border border-amber-200">
                            <span className="text-sm font-bold text-amber-900">{timeLeft.days}</span>
                            <span className="text-[8px] block text-stone-500">{lang === 'hi' ? 'दिन' : 'Days'}</span>
                          </div>
                          <div className="bg-white/80 rounded p-1 border border-amber-200">
                            <span className="text-sm font-bold text-amber-900">{timeLeft.hours}</span>
                            <span className="text-[8px] block text-stone-500">{lang === 'hi' ? 'घंटे' : 'Hrs'}</span>
                          </div>
                          <div className="bg-white/80 rounded p-1 border border-amber-200">
                            <span className="text-sm font-bold text-amber-900">{timeLeft.minutes}</span>
                            <span className="text-[8px] block text-stone-500">{lang === 'hi' ? 'मिनट' : 'Mins'}</span>
                          </div>
                          <div className="bg-white/80 rounded p-1 border border-amber-200">
                            <span className="text-sm font-bold text-rose-600">{timeLeft.seconds}</span>
                            <span className="text-[8px] block text-stone-500">{lang === 'hi' ? 'सेकंड' : 'Secs'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Ceremony Details */}
                      <div className={`my-3 rounded-xl p-3 border ${currentTheme.bannerClass}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
                            {lang === 'hi' ? activeEvent.hindiName : activeEvent.name}
                          </span>
                          <span className="text-[10px] font-mono text-amber-900 font-semibold">
                            {lang === 'hi' ? formData.shubhMuhurat : formData.shubhMuhuratEn}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-xs text-stone-800 mt-2">
                          <div className="flex items-start gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                            <span className="font-semibold">{formData.date}</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                            <span>{lang === 'hi' ? formData.shubhMuhurat : formData.shubhMuhuratEn}</span>
                          </div>
                          <div className="flex items-start gap-1.5 pt-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-600 mt-0.5 flex-shrink-0" />
                            <div className="text-[11px] leading-snug font-medium text-stone-900 break-words">
                              {lang === 'hi' ? formData.venue : formData.venueEn}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Maps & WhatsApp */}
                      <div className="grid grid-cols-2 gap-2 my-3">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.venue)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold bg-amber-800 text-white shadow-sm"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Google Maps</span>
                        </a>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold bg-emerald-700 text-white shadow-sm"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {/* In-Card RSVP Form with Explicit Dark Text for High Contrast Across All Themes */}
                      <div className="mt-4 pt-3 border-t border-amber-600/20">
                        <div className="text-center mb-2.5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                            {lang === 'hi' ? 'उपस्थिति पुष्टि (RSVP)' : 'RSVP Confirmation'}
                          </h4>
                        </div>

                        {rsvpSuccess ? (
                          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-1">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                            <div className="text-xs font-bold text-emerald-900">
                              {lang === 'hi' ? 'हार्दिक धन्यवाद!' : 'RSVP Confirmed!'}
                            </div>
                            <p className="text-[11px] text-emerald-800">
                              {lang === 'hi' ? `हम ${rsvp.guestName} जी व परिवार का स्वागत करने के लिए उत्सुक हैं!` : `We look forward to hosting you, ${rsvp.guestName}!`}
                            </p>
                            <button
                              onClick={() => {
                                setRsvpSuccess(false);
                                setRsvp({ guestName: '', phone: '', adults: '2', kids: '0', attendingEvents: ['phere'], diet: 'Pure Veg', wishes: '' });
                              }}
                              className="text-[10px] text-emerald-700 underline mt-1 block mx-auto"
                            >
                              {lang === 'hi' ? 'अन्य प्रतिक्रिया दर्ज करें' : 'Submit another response'}
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleRsvpSubmit} className="space-y-2">
                            <div>
                              <input
                                type="text"
                                placeholder={lang === 'hi' ? 'अतिथि का नाम (Guest Name)' : 'Guest / Family Name'}
                                value={rsvp.guestName}
                                onChange={(e) => setRsvp({ ...rsvp, guestName: e.target.value })}
                                className={`w-full px-2.5 py-1.5 rounded-lg text-xs bg-white text-stone-900 placeholder:text-stone-400 border ${
                                  rsvpErrors.guestName ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                                } focus:outline-none focus:border-amber-600`}
                              />
                              {rsvpErrors.guestName && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                  <span>{rsvpErrors.guestName}</span>
                                </p>
                              )}
                            </div>

                            {/* 10-Digit Mobile Input */}
                            <div>
                              <div className="flex">
                                <span className="inline-flex items-center px-2 rounded-l-lg border border-r-0 border-stone-300 bg-stone-100 text-stone-700 text-xs font-medium">
                                  🇮🇳 +91
                                </span>
                                <input
                                  type="tel"
                                  placeholder="98765 43210"
                                  maxLength={10}
                                  value={rsvp.phone}
                                  onChange={(e) => {
                                    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setRsvp({ ...rsvp, phone: digitsOnly });
                                  }}
                                  className={`w-full px-2.5 py-1.5 rounded-r-lg text-xs bg-white text-stone-900 placeholder:text-stone-400 border ${
                                    rsvpErrors.phone ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                                  } focus:outline-none focus:border-amber-600`}
                                />
                              </div>
                              {rsvpErrors.phone && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                  <span>{rsvpErrors.phone}</span>
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <label className="text-[10px] text-stone-700 font-medium block mb-0.5">
                                  {lang === 'hi' ? 'वयस्क' : 'Adults'}
                                </label>
                                <select
                                  value={rsvp.adults}
                                  onChange={(e) => setRsvp({ ...rsvp, adults: e.target.value })}
                                  className="w-full bg-white border border-stone-300 rounded-lg p-1.5 text-xs text-stone-900"
                                >
                                  <option value="1">1 {lang === 'hi' ? 'व्यक्ति' : 'Person'}</option>
                                  <option value="2">2 {lang === 'hi' ? 'व्यक्ति (दम्पति)' : 'Persons'}</option>
                                  <option value="3">3 {lang === 'hi' ? 'व्यक्ति' : 'Persons'}</option>
                                  <option value="4">4+ {lang === 'hi' ? 'सपरिवार' : 'Family'}</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[10px] text-stone-700 font-medium block mb-0.5">
                                  {lang === 'hi' ? 'बाल-गोपाल' : 'Kids (Under 10)'}
                                </label>
                                <select
                                  value={rsvp.kids}
                                  onChange={(e) => setRsvp({ ...rsvp, kids: e.target.value })}
                                  className="w-full bg-white border border-stone-300 rounded-lg p-1.5 text-xs text-stone-900"
                                >
                                  <option value="0">{lang === 'hi' ? 'कोई नहीं' : 'None'}</option>
                                  <option value="1">1 {lang === 'hi' ? 'बच्चा' : 'Child'}</option>
                                  <option value="2">2 {lang === 'hi' ? 'बच्चे' : 'Children'}</option>
                                  <option value="3">3+ {lang === 'hi' ? 'बच्चे' : 'Kids'}</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="text-[10px] text-stone-700 font-medium block mb-0.5">
                                {lang === 'hi' ? 'भोजन प्राथमिकता' : 'Dietary Preference'}
                              </label>
                              <div className="grid grid-cols-3 gap-1 text-[11px]">
                                {[
                                  { id: 'Pure Veg', hi: 'शुद्ध शाकाहारी', en: 'Pure Veg' },
                                  { id: 'Jain Food', hi: 'जैन भोजन', en: 'Jain Food' },
                                  { id: 'Swaminarayan', hi: 'स्वामीनारायण', en: 'Swaminarayan' }
                                ].map((item) => (
                                  <button
                                    type="button"
                                    key={item.id}
                                    onClick={() => setRsvp({ ...rsvp, diet: item.id })}
                                    className={`py-1 px-1 rounded border text-center transition ${
                                      rsvp.diet === item.id ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold' : 'bg-white border-stone-200 text-stone-800'
                                    }`}
                                  >
                                    {lang === 'hi' ? item.hi : item.en}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 text-white font-medium text-xs shadow-md transition flex items-center justify-center gap-1.5"
                            >
                              {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                              <span>{lang === 'hi' ? 'उपस्थिति पुष्टि दर्ज करें' : 'Confirm Attendance'}</span>
                            </button>
                          </form>
                        )}
                      </div>

                      {/* Dynamic Family Compliments Line */}
                      <div className="text-center mt-4 pt-2 border-t border-amber-500/20">
                        <KalashIcon className="w-6 h-6 mx-auto mb-1 opacity-80" fill={currentTheme.border} />
                        <p className="text-[10px] text-amber-900 font-serif italic">
                          {familyCompliments}
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              </div>
              <div className="w-32 h-1 bg-amber-400/40 rounded-full mx-auto mt-2.5"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Host Dashboard Modal with Wedding Switcher */}
      {isDashboardOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            
            <div className="p-4 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-stone-950">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-serif font-bold text-base text-amber-200">
                    {lang === 'hi' ? 'अतिथि उपस्थिति एवं भोजन विवरण' : 'Host RSVP & Catering Ledger'}
                  </h3>
                  <p className="text-[10px] font-mono text-stone-400">
                    Active Wedding: <span className="text-amber-300 font-semibold">{currentSlug || 'Unsaved Card'}</span>
                  </p>
                </div>
              </div>

              {/* Past/Other Wedding Archive Switcher */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-stone-900 border border-stone-800 rounded-lg px-2 py-1">
                  <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                  <select
                    value={currentSlug}
                    onChange={(e) => handleSwitchWeddingLedger(e.target.value)}
                    className="bg-transparent text-xs text-stone-200 focus:outline-none max-w-[180px] sm:max-w-[220px] truncate"
                  >
                    <option value="" disabled>Switch Wedding Archive</option>
                    {availableWeddings.map((w) => (
                      <option key={w.slug} value={w.slug} className="bg-stone-900 text-stone-200">
                        {w.brideName} & {w.groomName} ({w.slug.slice(-6)})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setIsDashboardOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Total Responses</div>
                  <div className="text-xl font-bold text-amber-300 font-mono mt-0.5">
                    {dashboardData.metrics.totalSubmissions || 0}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Total Adults</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                    {dashboardData.metrics.totalAdults || 0}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Kids (Baal-Gopal)</div>
                  <div className="text-xl font-bold text-sky-400 font-mono mt-0.5">
                    {dashboardData.metrics.totalKids || 0}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Jain Meals</div>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                    {dashboardData.metrics.jainMeals || 0}
                  </div>
                </div>
              </div>

              {/* Guest Table */}
              <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
                <div className="px-3 py-2 border-b border-stone-800 font-semibold text-stone-300 flex items-center justify-between">
                  <span>Guest Entries ({dashboardData.guests.length})</span>
                  <button 
                    onClick={() => fetchDashboardData(currentSlug)}
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoadingDashboard ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                {isLoadingDashboard ? (
                  <div className="p-6 text-center text-stone-500">Loading guest records...</div>
                ) : dashboardData.guests.length === 0 ? (
                  <div className="p-6 text-center text-stone-500">
                    No RSVPs received yet for this wedding ID ({currentSlug || 'Unsaved'}). Submit the RSVP form on the card to see guest entries appear here live!
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-60">
                    <table className="w-full text-left">
                      <thead className="bg-stone-900 text-stone-400 text-[10px] uppercase">
                        <tr>
                          <th className="p-2.5">Guest Name</th>
                          <th className="p-2.5">Mobile</th>
                          <th className="p-2.5 text-center">Adults</th>
                          <th className="p-2.5 text-center">Kids</th>
                          <th className="p-2.5">Diet</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800">
                        {dashboardData.guests.map((g, idx) => (
                          <tr key={idx} className="hover:bg-stone-900/50">
                            <td className="p-2.5 font-medium text-stone-200">{g.guestName}</td>
                            <td className="p-2.5 font-mono text-stone-400">+91 {g.phone}</td>
                            <td className="p-2.5 text-center font-mono text-emerald-400">{g.adultsCount}</td>
                            <td className="p-2.5 text-center font-mono text-sky-400">{g.kidsCount}</td>
                            <td className="p-2.5">
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30">
                                {g.dietaryPreference}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

            <div className="p-3 bg-stone-950 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setIsDashboardOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
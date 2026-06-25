import { useState } from "react";
import {
  Home,
  Wind,
  BookOpen,
  Clock,
  User,
  Bell,
  ChevronRight,
  Thermometer,
  Droplets,
  MapPin,
  MessageCircle,
  Settings,
  LogOut,
  Check,
  AlertTriangle,
  Info,
  Filter,
  Activity,
  ArrowLeft,
  Eye,
  EyeOff,
  Send,
  Bluetooth,
  Moon,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const aqiData = [
  { time: "06:00", aqi: 45 },
  { time: "08:00", aqi: 62 },
  { time: "10:00", aqi: 78 },
  { time: "12:00", aqi: 65 },
  { time: "14:00", aqi: 58 },
  { time: "16:00", aqi: 55 },
];

const coughData = [
  { day: "Sen", count: 8 },
  { day: "Sel", count: 12 },
  { day: "Rab", count: 6 },
  { day: "Kam", count: 14 },
  { day: "Jum", count: 10 },
  { day: "Sab", count: 7 },
  { day: "Min", count: 14 },
];

const tempHistory = [
  { day: "18/6", temp: 36.5 },
  { day: "19/6", temp: 36.7 },
  { day: "20/6", temp: 37.1 },
  { day: "21/6", temp: 36.9 },
  { day: "22/6", temp: 36.6 },
  { day: "23/6", temp: 36.8 },
  { day: "24/6", temp: 36.8 },
];

const chatMessages = [
  { id: 1, sender: "doctor", text: "Halo Kireinasagarika, ada yang bisa saya bantu?" },
  { id: 2, sender: "user", text: "Dok, saya sering batuk dan sesak napas belakangan ini." },
  { id: 3, sender: "doctor", text: "Sudah berapa lama gejalanya? Apakah disertai demam?" },
  { id: 4, sender: "user", text: "Sekitar 3 hari, suhu badan 36.8°C. Tidak ada demam tapi batuk terus." },
  {
    id: 5,
    sender: "doctor",
    text: "Berdasarkan data sensor masker Anda, kualitas udara di area Anda memang sedang Moderate (AQI 65). Saya sarankan untuk menggunakan masker saat keluar, minum air yang cukup, dan hirup uap eucalyptus.",
  },
  { id: 6, sender: "user", text: "Baik Dok, terima kasih sarannya." },
  {
    id: 7,
    sender: "doctor",
    text: "Sama-sama. Pantau terus lewat aplikasi ya. Jika gejala memburuk dalam 2 hari, segera konsultasi lagi. 🌿",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getAqiColor(aqi: number) {
  if (aqi <= 50) return { bg: "#52B788", label: "Good", text: "white" };
  if (aqi <= 100) return { bg: "#F9C74F", label: "Moderate", text: "#7D5200" };
  return { bg: "#E63946", label: "Dangerous", text: "white" };
}

// ─── Shared Components ────────────────────────────────────────────────────────

function BottomNav({
  active,
  onNav,
}: {
  active: string;
  onNav: (s: string) => void;
}) {
  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "monitor", icon: Wind, label: "Monitor" },
    { id: "education", icon: BookOpen, label: "Edukasi" },
    { id: "history", icon: Clock, label: "Riwayat" },
    { id: "profile", icon: User, label: "Profil" },
  ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around px-2 pb-5 pt-2"
      style={{ borderColor: "rgba(27,67,50,0.1)" }}
    >
      {items.map(({ id, icon: Icon, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onNav(id)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all"
            style={{ minWidth: 52 }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={
                isActive
                  ? { background: "linear-gradient(135deg,#1B4332,#52B788)" }
                  : {}
              }
            >
              <Icon
                size={18}
                color={isActive ? "#fff" : "#52796F"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{ color: isActive ? "#1B4332" : "#52796F" }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GradientHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className}`}
      style={{ background: "linear-gradient(135deg,#1B4332 0%,#2D6A4F 50%,#52B788 100%)" }}
    >
      {children}
    </div>
  );
}

// ─── Screen: Onboarding ───────────────────────────────────────────────────────

function OnboardingScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(160deg,#1B4332 0%,#2D6A4F 45%,#52B788 100%)" }}>
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-10">
        {/* Logo */}
        <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center mb-6 shadow-lg">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-4 border-white/80 flex items-center justify-center">
              <Wind size={28} color="white" strokeWidth={2} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-300 border-2 border-white flex items-center justify-center">
              <Activity size={10} color="#1B4332" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          NaturBreath
        </h1>
        <div className="w-16 h-0.5 bg-white/40 rounded-full mb-5" />
        <p className="text-white/80 text-center text-sm leading-relaxed mb-3">
          Masker Cerdas untuk Kesehatan Pernapasan Optimal
        </p>
        <p className="text-white/60 text-center text-xs leading-relaxed mb-12">
          Pantau kualitas udara, frekuensi batuk, dan kesehatan pernapasan Anda secara real-time dengan teknologi IoT terdepan.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {["🌿 Bahan Alami", "📡 IoT Real-time", "🩺 Konsultasi Dokter"].map((f) => (
            <span
              key={f}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/15 border border-white/25"
            >
              {f}
            </span>
          ))}
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-bold text-base text-white shadow-xl transition-transform active:scale-95"
          style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.35)" }}
        >
          Mulai Sekarang →
        </button>
        <p className="text-white/50 text-xs mt-4">Sudah punya akun? <span className="text-white/80 font-semibold underline cursor-pointer" onClick={onNext}>Masuk</span></p>
      </div>
    </div>
  );
}

// ─── Screen: Login ────────────────────────────────────────────────────────────

function LoginScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="pt-2 pb-8 px-6">
        <div className="mt-4 mb-2">
          <div className="flex items-center gap-2 mb-1">
            <Wind size={20} color="white" />
            <span className="text-white font-extrabold text-lg tracking-tight">NaturBreath</span>
          </div>
          <h2 className="text-white text-2xl font-bold">Selamat Datang</h2>
          <p className="text-white/70 text-sm mt-0.5">Masuk untuk melanjutkan</p>
        </div>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-8">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
            <div className="relative">
              <input
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-accent"
                style={{ background: "#F0FBF2", border: "1.5px solid rgba(82,183,136,0.3)" }}
                defaultValue="kireina@gmail.com"
                type="email"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Password</label>
            <div className="relative">
              <input
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-foreground pr-12 outline-none focus:ring-2 focus:ring-accent"
                style={{ background: "#F0FBF2", border: "1.5px solid rgba(82,183,136,0.3)" }}
                type={showPw ? "text" : "password"}
                defaultValue="password123"
              />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-right text-xs text-accent font-semibold mt-1.5 cursor-pointer">Lupa Password?</p>
          </div>

          <button
            onClick={onLogin}
            className="w-full py-4 rounded-2xl font-bold text-white text-sm shadow-lg transition-transform active:scale-95 mt-2"
            style={{ background: "linear-gradient(135deg,#1B4332,#52B788)" }}
          >
            Masuk
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px" style={{ background: "rgba(27,67,50,0.1)" }} />
            <span className="text-xs text-muted-foreground font-medium">atau</span>
            <div className="flex-1 h-px" style={{ background: "rgba(27,67,50,0.1)" }} />
          </div>

          <button
            onClick={onRegister}
            className="w-full py-3.5 rounded-2xl font-bold text-sm transition-transform active:scale-95"
            style={{ background: "#D8F3DC", color: "#1B4332", border: "1.5px solid rgba(27,67,50,0.15)" }}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* Feature benefits */}
        <div className="mt-8 rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#D8F3DC,#B7E4C7)" }}>
          <p className="text-xs font-bold text-foreground mb-3">Dengan NaturBreath kamu bisa:</p>
          {["Pantau kualitas udara real-time", "Hitung frekuensi batuk otomatis", "Konsultasi langsung dengan dokter"].map((b) => (
            <div key={b} className="flex items-center gap-2 mb-1.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#52B788" }}>
                <Check size={9} color="white" strokeWidth={3} />
              </div>
              <span className="text-xs font-medium text-foreground">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Register ─────────────────────────────────────────────────────────

function RegisterScreen({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="pt-2 pb-8 px-6">
        <div className="flex items-center gap-3 mt-4 mb-1">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowLeft size={16} color="white" />
          </button>
          <div>
            <h2 className="text-white text-xl font-bold">Buat Akun</h2>
            <p className="text-white/70 text-xs">Bergabung dengan NaturBreath</p>
          </div>
        </div>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8 space-y-4">
        {[
          { label: "Nama Lengkap", value: "Kireinasagarika", type: "text" },
          { label: "Email", value: "kireina@gmail.com", type: "email" },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">{f.label}</label>
            <input
              className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-accent"
              style={{ background: "#F0FBF2", border: "1.5px solid rgba(82,183,136,0.3)" }}
              defaultValue={f.value}
              type={f.type}
            />
          </div>
        ))}

        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Password</label>
          <div className="relative">
            <input
              className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-foreground pr-12 outline-none focus:ring-2 focus:ring-accent"
              style={{ background: "#F0FBF2", border: "1.5px solid rgba(82,183,136,0.3)" }}
              type={showPw ? "text" : "password"}
              defaultValue="password123"
            />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Konfirmasi Password</label>
          <input
            className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-accent"
            style={{ background: "#F0FBF2", border: "1.5px solid rgba(82,183,136,0.3)" }}
            type="password"
            defaultValue="password123"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#52B788" }}>
            <Check size={11} color="white" strokeWidth={3} />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Saya menyetujui <span className="text-accent font-semibold">Syarat & Ketentuan</span> dan <span className="text-accent font-semibold">Kebijakan Privasi</span> NaturBreath.
          </p>
        </div>

        <button
          onClick={onDone}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm shadow-lg transition-transform active:scale-95"
          style={{ background: "linear-gradient(135deg,#1B4332,#52B788)" }}
        >
          Daftar Sekarang
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Sudah punya akun? <span className="text-accent font-bold cursor-pointer" onClick={onBack}>Masuk</span>
        </p>
      </div>
    </div>
  );
}

// ─── Screen: Home / Dashboard ─────────────────────────────────────────────────

function HomeScreen({ onNav }: { onNav: (s: string) => void }) {
  const aqi = 65;
  const aqiColor = getAqiColor(aqi);

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="px-5 pt-2 pb-8">
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-white/70 text-xs font-medium">Selamat pagi,</p>
            <h2 className="text-white text-lg font-extrabold leading-tight">Kireinasagarika 👋</h2>
          </div>
          <button onClick={() => onNav("notifications")} className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bell size={18} color="white" />
            </div>
            <div className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-red-400 border-2 border-white flex items-center justify-center">
              <span className="text-white text-[7px] font-bold">3</span>
            </div>
          </button>
        </div>

        {/* AQI Card in header */}
        <div
          className="mt-5 rounded-2xl p-4 flex items-center justify-between"
          style={{ background: aqiColor.bg, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
        >
          <div>
            <p className="text-xs font-bold mb-0.5" style={{ color: aqiColor.text, opacity: 0.8 }}>Kualitas Udara Sekarang</p>
            <p className="text-2xl font-extrabold" style={{ color: aqiColor.text }}>AQI {aqi}</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: "rgba(255,255,255,0.3)", color: aqiColor.text }}>{aqiColor.label}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Wind size={28} color={aqiColor.text} strokeWidth={1.5} />
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={10} color={aqiColor.text} />
              <span className="text-[10px] font-semibold" style={{ color: aqiColor.text }}>Surabaya</span>
            </div>
          </div>
        </div>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        {/* Quick stats */}
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Kondisi Hari Ini</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: Activity, label: "Jumlah Batuk", value: "14x", unit: "kali", color: "#E63946", bg: "#FFF0F1" },
            { icon: Thermometer, label: "Suhu Tubuh", value: "36.8", unit: "°C", color: "#F9C74F", bg: "#FFFBF0" },
            { icon: Thermometer, label: "Suhu Udara", value: "29", unit: "°C", color: "#52B788", bg: "#F0FBF5" },
            { icon: Droplets, label: "Kelembaban", value: "72", unit: "%", color: "#4CC9F0", bg: "#F0FAFF" },
          ].map(({ icon: Icon, label, value, unit, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: bg }}>
                <Icon size={16} color={color} />
              </div>
              <p className="text-muted-foreground text-[10px] font-semibold mb-0.5">{label}</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-foreground">{value}</span>
                <span className="text-xs font-bold text-muted-foreground">{unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Fitur Utama</p>
        <div className="space-y-2.5">
          {[
            { icon: Wind, label: "Monitor Kualitas Udara", desc: "AQI, PM2.5, NO₂, CO real-time", screen: "monitor", color: "#52B788" },
            { icon: Activity, label: "Detail Sensor Kesehatan", desc: "Suhu tubuh & frekuensi batuk", screen: "sensor", color: "#F9C74F" },
            { icon: MessageCircle, label: "Chat dengan Dokter", desc: "Dr. Budi siap membantu", screen: "chat", color: "#4CC9F0" },
            { icon: BookOpen, label: "Edukasi Kesehatan", desc: "Pelajari tentang ISPA", screen: "education", color: "#7B61FF" },
          ].map(({ icon: Icon, label, desc, screen, color }) => (
            <button
              key={label}
              onClick={() => onNav(screen)}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm transition-transform active:scale-95"
              style={{ border: "1px solid rgba(27,67,50,0.06)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + "20" }}>
                <Icon size={18} color={color} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight size={16} color="#52796F" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Air Quality & Cough Monitor ──────────────────────────────────────

function MonitorScreen() {
  const aqi = 65;
  const aqiColor = getAqiColor(aqi);

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="px-5 pt-2 pb-6">
        <div className="flex items-center gap-2 mt-3">
          <Wind size={18} color="white" />
          <h2 className="text-white text-lg font-extrabold">Monitor Udara & Batuk</h2>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={12} color="rgba(255,255,255,0.7)" />
          <span className="text-white/70 text-xs font-medium">Surabaya, Jawa Timur</span>
          <span className="text-white/50 text-xs">• 24 Jun 2026</span>
        </div>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        {/* AQI Main Card */}
        <div
          className="rounded-2xl p-4 mb-4 shadow-md"
          style={{ background: aqiColor.bg }}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-bold opacity-80" style={{ color: aqiColor.text }}>Indeks Kualitas Udara</p>
              <p className="text-4xl font-extrabold" style={{ color: aqiColor.text }}>{aqi}</p>
              <span className="text-sm font-bold" style={{ color: aqiColor.text }}>{aqiColor.label}</span>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/25 flex items-center justify-center">
              <Wind size={32} color={aqiColor.text} strokeWidth={1.5} />
            </div>
          </div>
          {/* AQI Bar */}
          <div className="w-full h-2 rounded-full bg-white/30 mb-1">
            <div className="h-2 rounded-full bg-white/80" style={{ width: `${(aqi / 200) * 100}%` }} />
          </div>
          <div className="flex justify-between text-[9px] font-bold opacity-70" style={{ color: aqiColor.text }}>
            <span>0</span><span>50</span><span>100</span><span>150</span><span>200+</span>
          </div>
        </div>

        {/* Pollutants */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { label: "PM2.5", value: "24.3", unit: "μg/m³", status: "Moderate", color: "#F9C74F" },
            { label: "NO₂", value: "18.7", unit: "ppb", status: "Good", color: "#52B788" },
            { label: "CO", value: "0.8", unit: "ppm", status: "Good", color: "#52B788" },
          ].map(({ label, value, unit, status, color }) => (
            <div key={label} className="bg-white rounded-xl p-3 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
              <p className="text-muted-foreground text-[10px] font-bold mb-0.5">{label}</p>
              <p className="text-base font-extrabold text-foreground">{value}</p>
              <p className="text-[9px] text-muted-foreground">{unit}</p>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 inline-block" style={{ background: color + "30", color }}>
                {status}
              </span>
            </div>
          ))}
        </div>

        {/* AQI Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold text-foreground">Tren AQI (6 Jam)</p>
            <span className="text-[10px] font-semibold text-muted-foreground">Hari ini</span>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={aqiData}>
              <defs>
                <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#52B788" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#52B788" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,67,50,0.06)" />
              <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#52796F" }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[30, 90]} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                labelStyle={{ color: "#1B4332", fontWeight: 700 }}
              />
              <Area type="monotone" dataKey="aqi" stroke="#52B788" strokeWidth={2.5} fill="url(#aqiGrad)" dot={{ fill: "#52B788", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Env conditions */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-2.5" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FFF0F1" }}>
              <Thermometer size={16} color="#E63946" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold">Suhu Udara</p>
              <p className="text-base font-extrabold text-foreground">29°C</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-2.5" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#F0FAFF" }}>
              <Droplets size={16} color="#4CC9F0" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold">Kelembaban</p>
              <p className="text-base font-extrabold text-foreground">72%</p>
            </div>
          </div>
        </div>

        {/* Cough Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-bold text-foreground">Frekuensi Batuk</p>
            <span className="text-lg font-extrabold" style={{ color: "#E63946" }}>14x <span className="text-xs font-medium text-muted-foreground">hari ini</span></span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">7 Hari Terakhir</p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={coughData} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,67,50,0.06)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#52796F" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="count" fill="#52B788" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Health Sensor Detail ─────────────────────────────────────────────

function SensorScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="px-5 pt-2 pb-6">
        <div className="flex items-center gap-3 mt-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowLeft size={16} color="white" />
          </button>
          <div>
            <h2 className="text-white text-lg font-extrabold">Detail Sensor Kesehatan</h2>
            <p className="text-white/70 text-xs">Terakhir diperbarui: 09:35, 24 Jun 2026</p>
          </div>
        </div>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-8 space-y-4">
        {/* Body temperature */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Suhu Tubuh</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-foreground">36.8</span>
                <span className="text-base font-bold text-muted-foreground">°C</span>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#D8F3DC", color: "#1B4332" }}>
              ✓ Normal
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Riwayat 7 Hari</p>
          <ResponsiveContainer width="100%" height={110}>
            <LineChart data={tempHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,67,50,0.06)" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#52796F" }} axisLine={false} tickLine={false} />
              <YAxis domain={[36, 38]} hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <Line type="monotone" dataKey="temp" stroke="#52B788" strokeWidth={2.5} dot={{ fill: "#52B788", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-2 mt-2 p-2.5 rounded-xl" style={{ background: "#F0FBF5" }}>
            <Info size={12} color="#52B788" />
            <p className="text-[10px] text-muted-foreground">Suhu tubuh normal berkisar 36.1–37.2°C</p>
          </div>
        </div>

        {/* Ambient sensors */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: "#FFF3E0" }}>
              <Thermometer size={16} color="#FF8C00" />
            </div>
            <p className="text-[10px] text-muted-foreground font-semibold">Suhu Ambient</p>
            <p className="text-2xl font-extrabold text-foreground">29°C</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#D8F3DC", color: "#1B4332" }}>Normal</span>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: "#E0F7FA" }}>
              <Droplets size={16} color="#00ACC1" />
            </div>
            <p className="text-[10px] text-muted-foreground font-semibold">Kelembaban</p>
            <p className="text-2xl font-extrabold text-foreground">72%</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#FFF9C4", color: "#8B6900" }}>Tinggi</span>
          </div>
        </div>

        {/* Cough trend */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-foreground">Tren Frekuensi Batuk</p>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "#FFF0F1", color: "#E63946" }}>
              ⚠ Perlu Perhatian
            </span>
          </div>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={coughData} barSize={12}>
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#52796F" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "none" }} />
              <Bar dataKey="count" fill="#E63946" radius={[3, 3, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status indicators */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          <p className="text-sm font-bold text-foreground mb-3">Status Sensor Masker</p>
          {[
            { label: "Sensor Suhu Tubuh", status: "Aktif", ok: true },
            { label: "Sensor Kualitas Udara", status: "Aktif", ok: true },
            { label: "Deteksi Batuk", status: "Aktif", ok: true },
            { label: "Koneksi Bluetooth", status: "Terhubung", ok: true },
            { label: "Baterai Masker", status: "78%", ok: true },
          ].map(({ label, status, ok }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "rgba(27,67,50,0.06)" }}>
              <span className="text-xs font-medium text-foreground">{label}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: ok ? "#D8F3DC" : "#FFF0F1", color: ok ? "#1B4332" : "#E63946" }}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Consultation History ─────────────────────────────────────────────

function HistoryScreen({ onNav }: { onNav: (s: string) => void }) {
  const consultations = [
    {
      id: 1,
      doctor: "Dr. Budi Santoso",
      specialty: "Sp. Paru",
      date: "20 Jun 2026",
      diagnosis: "Infeksi Saluran Pernapasan Atas ringan. Disarankan istirahat dan konsumsi obat batuk herbal.",
      status: "Selesai",
      ok: true,
    },
    {
      id: 2,
      doctor: "Dr. Anita Pratiwi",
      specialty: "Sp. THT",
      date: "10 Jun 2026",
      diagnosis: "Alergi debu menyebabkan hidung tersumbat dan batuk kronik. Saran: hindari area berdebu.",
      status: "Selesai",
      ok: true,
    },
    {
      id: 3,
      doctor: "Dr. Budi Santoso",
      specialty: "Sp. Paru",
      date: "28 Jun 2026",
      diagnosis: "Kontrol rutin pemantauan kualitas pernapasan pasca ISPA.",
      status: "Terjadwal",
      ok: false,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="px-5 pt-2 pb-6">
        <div className="flex items-center justify-between mt-3">
          <div>
            <h2 className="text-white text-lg font-extrabold">Riwayat Konsultasi</h2>
            <p className="text-white/70 text-xs">Kireinasagarika</p>
          </div>
          <button
            onClick={() => onNav("chat")}
            className="px-3 py-2 rounded-xl text-xs font-bold"
            style={{ background: "rgba(255,255,255,0.25)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            + Konsultasi
          </button>
        </div>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28 space-y-3">
        {/* Summary bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-4" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          {[{ label: "Total", val: "3" }, { label: "Selesai", val: "2" }, { label: "Terjadwal", val: "1" }].map(({ label, val }) => (
            <div key={label} className="flex-1 text-center">
              <p className="text-2xl font-extrabold text-foreground">{val}</p>
              <p className="text-[10px] font-semibold text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {consultations.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm text-white"
                  style={{ background: "linear-gradient(135deg,#1B4332,#52B788)" }}
                >
                  {c.doctor.split(" ")[1][0]}{c.doctor.split(" ")[2]?.[0] ?? ""}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{c.doctor}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">{c.specialty} • {c.date}</p>
                </div>
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                style={c.ok ? { background: "#D8F3DC", color: "#1B4332" } : { background: "#FFF9C4", color: "#7D5200" }}
              >
                {c.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed bg-background rounded-xl p-3">
              {c.diagnosis}
            </p>
            {!c.ok && (
              <div className="mt-2 flex items-center gap-1.5 pt-2 border-t" style={{ borderColor: "rgba(27,67,50,0.06)" }}>
                <Info size={11} color="#52B788" />
                <span className="text-[10px] text-accent font-semibold">Jadwal: 28 Jun 2026, 10:00 WIB</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Chat with Doctor ─────────────────────────────────────────────────

function ChatScreen({ onBack }: { onBack: () => void }) {
  const [msg, setMsg] = useState("");

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="px-5 pt-2 pb-5">
        <div className="flex items-center gap-3 mt-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowLeft size={16} color="white" />
          </button>
          <div className="flex items-center gap-2.5 flex-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white"
              style={{ background: "rgba(255,255,255,0.3)" }}
            >
              BS
            </div>
            <div>
              <p className="text-white font-bold text-sm">Dr. Budi Santoso</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                <p className="text-white/70 text-[10px]">Online • Sp. Paru</p>
              </div>
            </div>
          </div>
          <MessageCircle size={18} color="rgba(255,255,255,0.7)" />
        </div>
      </GradientHeader>

      {/* CTA Banner */}
      <div className="mx-5 mt-4 p-3 rounded-xl flex items-center gap-2.5" style={{ background: "linear-gradient(135deg,#D8F3DC,#B7E4C7)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#52B788" }}>
          <MessageCircle size={14} color="white" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-foreground">Chat dengan Dokter Sekarang</p>
          <p className="text-[10px] text-muted-foreground">Konsultasi real-time 24/7</p>
        </div>
        <ChevronRight size={14} color="#1B4332" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {chatMessages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            {m.sender === "doctor" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-white mr-2 flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#1B4332,#52B788)" }}
              >
                BS
              </div>
            )}
            <div
              className="max-w-[75%] rounded-2xl px-3.5 py-2.5 shadow-sm"
              style={
                m.sender === "user"
                  ? { background: "linear-gradient(135deg,#1B4332,#2D6A4F)", color: "white", borderBottomRightRadius: 4 }
                  : { background: "white", color: "#1B4332", borderBottomLeftRadius: 4, border: "1px solid rgba(27,67,50,0.08)" }
              }
            >
              <p className="text-xs leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-5 pb-6 pt-3" style={{ borderTop: "1px solid rgba(27,67,50,0.08)" }}>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
            style={{ background: "#F0FBF2", border: "1.5px solid rgba(82,183,136,0.3)", color: "#1B4332" }}
            placeholder="Ketik pesan..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md transition-transform active:scale-90"
            style={{ background: "linear-gradient(135deg,#1B4332,#52B788)" }}
          >
            <Send size={16} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Notifications ────────────────────────────────────────────────────

function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const notifications = [
    {
      icon: AlertTriangle,
      color: "#E63946",
      bg: "#FFF0F1",
      title: "Peringatan Dini ISPA",
      body: "Gejala ISPA terdeteksi: frekuensi batuk meningkat 40% dalam 24 jam terakhir.",
      time: "09:12",
      new: true,
    },
    {
      icon: Wind,
      color: "#F9C74F",
      bg: "#FFFBF0",
      title: "Penurunan Kualitas Udara",
      body: "AQI meningkat ke 65 (Moderate) di area Surabaya. Gunakan masker saat keluar rumah.",
      time: "08:45",
      new: true,
    },
    {
      icon: Droplets,
      color: "#4CC9F0",
      bg: "#F0FAFF",
      title: "Kelembaban Udara Tinggi",
      body: "Kelembaban mencapai 72%. Kondisi ini dapat memperburuk gejala pernapasan.",
      time: "07:30",
      new: true,
    },
    {
      icon: Filter,
      color: "#52B788",
      bg: "#F0FBF5",
      title: "Ganti Filter Masker",
      body: "Filter masker Anda telah digunakan selama 30 hari. Segera ganti untuk performa optimal.",
      time: "Kemarin",
      new: false,
    },
    {
      icon: Activity,
      color: "#7B61FF",
      bg: "#F4F0FF",
      title: "Pengingat Cek Kesehatan",
      body: "Jadwal kontrol kesehatan rutin Anda dengan Dr. Budi Santoso pada 28 Jun 2026.",
      time: "Kemarin",
      new: false,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="px-5 pt-2 pb-6">
        <div className="flex items-center gap-3 mt-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowLeft size={16} color="white" />
          </button>
          <div>
            <h2 className="text-white text-lg font-extrabold">Notifikasi</h2>
            <p className="text-white/70 text-xs">3 notifikasi baru</p>
          </div>
        </div>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-8 space-y-3">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3 relative overflow-hidden"
            style={{ border: n.new ? "1.5px solid rgba(82,183,136,0.3)" : "1px solid rgba(27,67,50,0.06)" }}
          >
            {n.new && <div className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full" style={{ background: "#52B788" }} />}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: n.bg }}>
              <n.icon size={18} color={n.color} />
            </div>
            <div className="flex-1 pr-2">
              <div className="flex items-start justify-between mb-0.5">
                <p className="text-sm font-bold text-foreground">{n.title}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{n.body}</p>
              <p className="text-[10px] font-semibold text-muted-foreground">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Education ────────────────────────────────────────────────────────

function EducationScreen() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const sections = [
    {
      title: "Apa itu ISPA?",
      icon: "🫁",
      content: (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Infeksi Saluran Pernapasan Atas (ISPA)</strong> adalah infeksi yang menyerang hidung, tenggorokan, faring, laring, dan saluran pernapasan atas lainnya.
          </p>
          <div className="rounded-xl p-3" style={{ background: "#F0FBF5" }}>
            <p className="text-xs font-bold text-foreground mb-1">Penyebab Utama:</p>
            {["Virus (Rhinovirus, Influenza, RSV)", "Bakteri (Streptococcus, Staphylococcus)", "Paparan polutan udara PM2.5 & NO₂", "Kelembaban tinggi & suhu ekstrem"].map((c) => (
              <div key={c} className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#52B788" }} />
                <span className="text-xs text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg,#1B4332,#2D6A4F)" }}>
            <span className="text-2xl">📊</span>
            <div>
              <p className="text-white text-xs font-bold">Prevalensi di Indonesia</p>
              <p className="text-white/80 text-xs"><strong>9,3%</strong> penduduk terpapar ISPA</p>
              <p className="text-white/60 text-[10px]">Sumber: Riskesdas 2018</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Gejala Terpapar ISPA",
      icon: "🌡️",
      content: (
        <div className="space-y-2">
          {[
            { icon: "🤧", name: "Batuk", desc: "Batuk kering atau berdahak berkepanjangan" },
            { icon: "🌡️", name: "Demam", desc: "Suhu tubuh di atas 37.5°C" },
            { icon: "😮‍💨", name: "Sesak Napas", desc: "Kesulitan bernapas, dada terasa berat" },
            { icon: "👃", name: "Hidung Tersumbat", desc: "Kongesti nasal, sulit bernapas lewat hidung" },
            { icon: "😣", name: "Nyeri Tenggorokan", desc: "Sakit saat menelan, tenggorokan gatal" },
          ].map(({ icon, name, desc }) => (
            <div key={name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#F8FFF9", border: "1px solid rgba(82,183,136,0.15)" }}>
              <span className="text-xl">{icon}</span>
              <div>
                <p className="text-sm font-bold text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Manfaat Bahan Alami",
      icon: "🌿",
      content: (
        <div className="space-y-3">
          <div className="rounded-2xl p-4 shadow-sm" style={{ background: "linear-gradient(135deg,#D8F3DC,#B7E4C7)", border: "1px solid rgba(82,183,136,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🌿</span>
              <div>
                <p className="text-sm font-extrabold text-foreground">Daun Sirih</p>
                <p className="text-[10px] text-muted-foreground font-medium">Piper betle L.</p>
              </div>
            </div>
            <div className="space-y-1">
              {["Antibakteri alami terhadap bakteri penyebab ISPA", "Antijamur yang efektif melindungi saluran napas", "Melawan berbagai mikroorganisme patogen", "Meningkatkan imunitas saluran pernapasan"].map((b) => (
                <div key={b} className="flex items-center gap-1.5">
                  <Check size={10} color="#1B4332" strokeWidth={3} />
                  <span className="text-xs text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4 shadow-sm" style={{ background: "linear-gradient(135deg,#E8F5E9,#C8E6C9)", border: "1px solid rgba(82,183,136,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="text-sm font-extrabold text-foreground">Eucalyptus</p>
                <p className="text-[10px] text-muted-foreground font-medium">Eucalyptus globulus</p>
              </div>
            </div>
            <div className="space-y-1">
              {["Bronkodilator alami — melebarkan saluran napas", "Aromaterapi penenang untuk pernapasan", "Melegakan hidung tersumbat & batuk", "Memiliki sifat antiseptik kuat"].map((b) => (
                <div key={b} className="flex items-center gap-1.5">
                  <Check size={10} color="#1B4332" strokeWidth={3} />
                  <span className="text-xs text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="px-5 pt-2 pb-6">
        
        
        <div className="flex items-center gap-2 mt-3">
          <BookOpen size={18} color="white" />
          <h2 className="text-white text-lg font-extrabold">Edukasi Kesehatan</h2>
        </div>
        <p className="text-white/70 text-xs mt-0.5">Pelajari ISPA dan cara pencegahannya</p>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28 space-y-3">
        {sections.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center gap-3 p-4"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#F0FBF5" }}>
                {s.icon}
              </div>
              <p className="flex-1 text-left text-sm font-bold text-foreground">{s.title}</p>
              <ChevronRight
                size={16}
                color="#52796F"
                className="transition-transform duration-200"
                style={{ transform: expanded === i ? "rotate(90deg)" : "rotate(0deg)" }}
              />
            </button>
            {expanded === i && (
              <div className="px-4 pb-4">
                {s.content}
              </div>
            )}
          </div>
        ))}

        {/* Tip card */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1B4332,#52B788)" }}>
          <p className="text-white font-bold text-sm mb-1">💡 Tips NaturBreath</p>
          <p className="text-white/80 text-xs leading-relaxed">
            Gunakan masker NaturBreath setiap hari untuk proteksi optimal. Filter bahan alami daun sirih dan eucalyptus membantu menyaring polutan dan memberikan aroma terapi pernapasan.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Profile / Settings ───────────────────────────────────────────────

function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const [notif, setNotif] = useState(true);
  const [bt, setBt] = useState(true);
  const [dark, setDark] = useState(false);

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        className="relative w-12 h-6 rounded-full transition-all duration-200 flex items-center"
        style={{ background: on ? "linear-gradient(135deg,#1B4332,#52B788)" : "#D1D5DB" }}
      >
        <div
          className="w-5 h-5 bg-white rounded-full shadow-md transition-all duration-200 absolute"
          style={{ left: on ? "calc(100% - 22px)" : "2px" }}
        />
      </button>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <GradientHeader className="px-5 pt-2 pb-10">
        <div className="flex flex-col items-center mt-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-extrabold text-white mb-3"
            style={{ background: "rgba(255,255,255,0.25)", border: "3px solid rgba(255,255,255,0.5)" }}
          >
            KS
          </div>
          <h2 className="text-white text-lg font-extrabold">Kireinasagarika</h2>
          <p className="text-white/70 text-xs">kireina@gmail.com</p>
          <span className="mt-2 px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            Pengguna Aktif
          </span>
        </div>
      </GradientHeader>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28 space-y-4">
        {/* Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          <div className="flex justify-around">
            {[{ label: "Konsultasi", val: "3" }, { label: "Batuk Hari Ini", val: "14" }, { label: "Hari Aktif", val: "28" }].map(({ label, val }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-extrabold text-foreground">{val}</p>
                <p className="text-[10px] font-semibold text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings toggles */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider px-4 pt-4 pb-2">Pengaturan</p>
          {[
            { icon: Bell, label: "Notifikasi", desc: "Peringatan kualitas udara & kesehatan", on: notif, toggle: () => setNotif(!notif) },
            { icon: Bluetooth, label: "Koneksi Bluetooth", desc: "Terhubung ke masker NaturBreath", on: bt, toggle: () => setBt(!bt) },
            { icon: Moon, label: "Mode Gelap", desc: "Tampilan antarmuka gelap", on: dark, toggle: () => setDark(!dark) },
          ].map(({ icon: Icon, label, desc, on, toggle }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3.5 border-t" style={{ borderColor: "rgba(27,67,50,0.06)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#F0FBF5" }}>
                <Icon size={16} color="#52B788" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{label}</p>
                <p className="text-[10px] text-muted-foreground">{desc}</p>
              </div>
              <Toggle on={on} onToggle={toggle} />
            </div>
          ))}
        </div>

        {/* Account */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
          <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider px-4 pt-4 pb-2">Akun</p>
          {[
            { icon: User, label: "Edit Profil" },
            { icon: Settings, label: "Preferensi Masker" },
            { icon: Info, label: "Tentang NaturBreath" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3.5 border-t" style={{ borderColor: "rgba(27,67,50,0.06)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#F0FBF5" }}>
                <Icon size={16} color="#52B788" />
              </div>
              <p className="flex-1 text-sm font-bold text-foreground">{label}</p>
              <ChevronRight size={14} color="#52796F" />
            </div>
          ))}
        </div>

        <button
          onClick={onLogout}
          className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
          style={{ background: "#FFF0F1", color: "#E63946", border: "1px solid rgba(230,57,70,0.2)" }}
        >
          <LogOut size={16} />
          Keluar dari Akun
        </button>

        <p className="text-center text-[10px] text-muted-foreground pb-2">NaturBreath v2.4.1 • © 2026 NaturBreath Indonesia</p>
      </div>
    </div>
  );
}



// ─── App Shell ────────────────────────────────────────────────────────────────

type Screen =
  | "onboarding"
  | "login"
  | "register"
  | "home"
  | "monitor"
  | "sensor"
  | "history"
  | "chat"
  | "notifications"
  | "education"
  | "profile";

const BOTTOM_NAV_SCREENS: Screen[] = ["home", "monitor", "education", "history", "profile"];

function AppShell() {
  const [screen, setScreen] = useState<Screen>("onboarding");

  function nav(s: string) {
    setScreen(s as Screen);
  }

  const showBottomNav = BOTTOM_NAV_SCREENS.includes(screen);
  const activeNav = BOTTOM_NAV_SCREENS.includes(screen) ? screen : "home";

  const renderScreen = () => {
    switch (screen) {
      case "onboarding":
        return <OnboardingScreen onNext={() => nav("login")} />;
      case "login":
        return <LoginScreen onLogin={() => nav("home")} onRegister={() => nav("register")} />;
      case "register":
        return <RegisterScreen onBack={() => nav("login")} onDone={() => nav("home")} />;
      case "home":
        return <HomeScreen onNav={nav} />;
      case "monitor":
        return <MonitorScreen />;
      case "sensor":
        return <SensorScreen onBack={() => nav("home")} />;
      case "history":
        return <HistoryScreen onNav={nav} />;
      case "chat":
        return <ChatScreen onBack={() => nav("history")} />;
      case "notifications":
        return <NotificationsScreen onBack={() => nav("home")} />;
      case "education":
        return <EducationScreen />;
      case "profile":
        return <ProfileScreen onLogout={() => nav("onboarding")} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative size-full flex flex-col overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {renderScreen()}
      {showBottomNav && (
        <BottomNav
          active={activeNav}
          onNav={(s) => {
            nav(s);
          }}
        />
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AppShell />
  );
}

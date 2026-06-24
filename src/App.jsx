import { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Rocket,
  Video,
  Menu,
  X,
  Zap,
  Palette,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const AnimatedSection = ({ children, variants = fadeUp, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-20">
        <nav className="glass rounded-lg border-b border-brand-primary/10 px-4 md:px-6 py-3 flex items-center justify-between relative">
          <a className="font-bold text-lg md:text-xl tracking-tight text-brand-primary" href="#hero">
            VIRALAI<span className="text-brand-primary/60">STUDIO</span>
          </a>

          <div className="hidden lg:flex items-center gap-4">
            <a className="px-4 py-2 text-sm font-medium hover:bg-black/5 rounded-md transition-colors" href="#layanan">Layanan</a>
            <a className="px-4 py-2 text-sm font-medium hover:bg-black/5 rounded-md transition-colors" href="#tentang">Tentang Kami</a>
            <a className="px-4 py-2 text-sm font-medium hover:bg-black/5 rounded-md transition-colors" href="#harga">Harga</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#order" className="hidden sm:inline-block bg-brand-primary text-neutral-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-brand-primary/90 transition-all">
              Pesan Sekarang
            </a>
            <button className="lg:hidden p-2 text-brand-primary" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-x-4 top-[calc(100%+1rem)] bg-neutral-bg border border-brand-primary/10 rounded-xl p-6 shadow-2xl lg:hidden"
              >
                <div className="flex flex-col gap-4">
                  <a className="p-3 text-lg font-semibold border-b border-brand-primary/5" href="#layanan" onClick={() => setIsOpen(false)}>Layanan</a>
                  <a className="p-3 text-lg font-semibold border-b border-brand-primary/5" href="#tentang" onClick={() => setIsOpen(false)}>Tentang Kami</a>
                  <a className="p-3 text-lg font-semibold border-b border-brand-primary/5" href="#harga" onClick={() => setIsOpen(false)}>Harga</a>
                  <a className="p-4 mt-2 bg-brand-primary text-neutral-white text-center rounded-lg font-bold" href="#order" onClick={() => setIsOpen(false)}>Pesan Sekarang</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="hero" className="relative min-h-screen bg-brand-primary flex flex-col justify-center items-center px-6 md:px-20 pt-28 md:pt-[150px] pb-32 md:pb-48">
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/40 via-brand-primary/70 to-brand-primary z-10" />
      <img
        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=1920&h=1080&fit=crop"
        alt="Hero background"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="relative z-20 max-w-7xl w-full flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-12">
      <AnimatedSection className="max-w-3xl space-y-6">
        <div className="inline-flex bg-neutral-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm border border-neutral-white/20">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-white">AI Video Marketing untuk UMKM</span>
        </div>
        <h1 className="text-brand-accent text-4xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
          Video Promosi<br />Sekelas Brand Besar,<br />Harga UMKM.
        </h1>
      </AnimatedSection>

      <AnimatedSection className="lg:max-w-xs md:pt-10" delay={0.2}>
        <p className="text-neutral-white text-base md:text-lg font-medium leading-relaxed opacity-90">
          Tingkatkan penjualan Anda dengan video AI profesional dalam 3-5 hari. Tanpa model, tanpa studio, tanpa mahal.
        </p>
      </AnimatedSection>
    </div>

    <div className="relative z-30 px-0 mt-20 md:mt-32 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <AnimatedSection className="bg-neutral-white p-8 md:p-10 rounded-xl shadow-card space-y-6 flex flex-col justify-between" delay={0.1}>
          <div className="space-y-1">
            <h3 className="text-brand-primary text-3xl md:text-4xl font-bold tracking-tighter">100+</h3>
            <p className="text-brand-primary text-xs font-medium uppercase tracking-wide">UMKM Sudah Percaya</p>
          </div>
          <div className="flex -space-x-3 mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-brand-primary/10" />
            ))}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-accent flex items-center justify-center text-[10px] font-bold border-2 border-white text-brand-primary">+96</div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="bg-black p-8 md:p-10 rounded-xl shadow-card flex flex-col justify-between min-h-[280px]" delay={0.2}>
          <div className="space-y-1">
            <h3 className="text-neutral-white text-3xl md:text-4xl font-bold tracking-tighter">3-5 Hari</h3>
            <p className="text-neutral-white/70 text-xs font-medium uppercase tracking-wide">Proses Pengerjaan Cepat</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Video className="w-12 h-12 text-brand-accent" />
          </div>
        </AnimatedSection>

        <AnimatedSection className="bg-brand-accent p-8 md:p-10 rounded-xl shadow-card relative overflow-hidden flex flex-col justify-between" delay={0.3}>
          <div className="relative z-10 space-y-1">
            <h3 className="text-brand-primary text-3xl md:text-4xl font-bold tracking-tighter">Mulai 50k</h3>
            <p className="text-brand-primary text-xs font-medium uppercase tracking-wide">Harga Terjangkau untuk UMKM</p>
          </div>
          <div className="mt-8 relative z-10">
            <Rocket className="w-12 h-12 text-brand-primary/40" />
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="tentang" className="bg-neutral-bg py-24 md:py-40 px-6 md:px-20 text-center">
    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
      <AnimatedSection>
        <span className="inline-block border border-brand-primary rounded-full px-4 py-1 font-mono text-[10px] tracking-widest text-brand-primary uppercase">Tentang Kami</span>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <h2 className="text-brand-primary text-2xl md:text-5xl font-bold leading-tight tracking-tight px-2">
          Kami adalah studio kreatif berbasis AI yang membantu UMKM Indonesia membuat video marketing profesional dengan harga terjangkau, proses cepat, dan hasil yang siap viral.
        </h2>
      </AnimatedSection>
    </div>
  </section>
);

const services = [
  {
    num: '01',
    title: 'Video Produk AI',
    desc: 'Tampilkan produk Anda dengan video berkualitas tinggi yang dihasilkan AI. Cocok untuk TikTok, Instagram Reels, dan marketplace.',
    icon: <Video className="w-8 h-8" />,
    bg: 'bg-brand-accent',
    textColor: 'text-brand-primary',
    numBg: 'bg-brand-primary text-brand-accent',
    img: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=800&h=600&fit=crop',
  },
  {
    num: '02',
    title: 'Konten Sosial Media',
    desc: 'Strategi dan konten video yang disesuaikan untuk meningkatkan engagement dan followers di platform sosial media Anda.',
    icon: <Palette className="w-8 h-8" />,
    bg: 'bg-neutral-white border border-brand-primary/10',
    textColor: 'text-brand-primary',
    numBg: 'bg-brand-primary text-neutral-white',
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=800&h=600&fit=crop',
  },
  {
    num: '03',
    title: 'Video Iklan & Promosi',
    desc: 'Video iklan yang dioptimalkan untuk konversi. Lengkap dengan caption, hashtag, dan strategi distribusi untuk hasil maksimal.',
    icon: <TrendingUp className="w-8 h-8" />,
    bg: 'bg-brand-primary',
    textColor: 'text-neutral-white',
    numBg: 'bg-brand-accent text-brand-primary',
    img: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?w=800&h=600&fit=crop',
  },
];

const Services = () => (
  <section id="layanan" className="bg-neutral-bg pb-12 md:pb-16">
    <div className="max-w-[1440px] mx-auto px-6 md:px-20">
      <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
        <AnimatedSection>
          <span className="inline-block border border-brand-primary rounded-full px-4 py-1 font-mono text-[10px] tracking-widest text-brand-primary uppercase">Layanan Kami</span>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="text-brand-primary text-3xl md:text-5xl font-bold tracking-tight">Solusi Video Marketing AI</h2>
        </AnimatedSection>
      </div>

      {services.map((svc, i) => (
        <AnimatedSection
          key={svc.num}
          variants={i % 2 === 0 ? fadeLeft : fadeRight}
          className={`sticky ${i === 0 ? 'top-24 md:top-32' : i === 1 ? 'top-28 md:top-40' : 'top-32 md:top-48'} ${svc.bg} rounded-xl p-8 md:p-20 mb-12 md:mb-20 h-auto md:h-[550px] flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden group shadow-2xl`}
        >
          <div className="space-y-6 md:space-y-8 flex-1 w-full">
            <span className={`${svc.numBg} px-4 py-1 rounded-full font-mono text-xs uppercase tracking-widest`}>{svc.num}</span>
            <div className="space-y-4">
              <h3 className={`${svc.textColor} text-2xl md:text-3xl font-bold`}>{svc.title}</h3>
              <p className={`${svc.textColor === 'text-neutral-white' ? 'text-neutral-white/80' : 'text-brand-primary/80'} text-base md:text-lg leading-relaxed max-w-md`}>
                {svc.desc}
              </p>
            </div>
          </div>
          <div className="flex-1 w-full h-[250px] md:h-full overflow-hidden rounded-lg">
            <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
        </AnimatedSection>
      ))}
    </div>
  </section>
);

const Values = () => (
  <section className="bg-neutral-bg py-12 md:py-16 px-6 md:px-20 overflow-hidden">
    <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
      <div className="text-center space-y-4 md:space-y-6">
        <AnimatedSection>
          <span className="inline-block border border-brand-primary rounded-full px-4 py-1 font-mono text-[10px] tracking-widest text-brand-primary uppercase">Kenapa Kami</span>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="text-brand-primary text-3xl md:text-5xl font-bold tracking-tight">Keunggulan ViralAI Studio</h2>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
        <AnimatedSection className="bg-neutral-white p-8 md:p-10 rounded-xl shadow-card md:-translate-x-[50px] md:-translate-y-[50px] md:-rotate-[4deg] flex flex-col justify-end min-h-[300px] md:min-h-[350px] z-10">
          <div className="space-y-4">
            <Zap className="w-10 h-10 text-brand-accent" />
            <h3 className="text-brand-primary text-xl md:text-2xl font-bold">Cepat & Efisien</h3>
            <p className="text-text-muted leading-relaxed text-sm md:text-base">
              Proses pengerjaan 3-5 hari kerja. Tanpa perlu sesi foto, model, atau studio mahal.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="rounded-xl overflow-hidden shadow-card h-[350px] md:h-[400px] z-20">
          <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=600&h=800&fit=crop" alt="Kolaborasi" className="w-full h-full object-cover" />
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="bg-brand-accent p-8 md:p-10 rounded-xl shadow-card md:translate-x-[50px] md:translate-y-[50px] md:rotate-[11deg] flex flex-col justify-end min-h-[300px] md:min-h-[350px] z-10">
          <div className="space-y-4">
            <TrendingUp className="w-10 h-10 text-brand-primary" />
            <h3 className="text-brand-primary text-xl md:text-2xl font-bold">Siap Viral</h3>
            <p className="text-brand-primary/70 leading-relaxed text-sm md:text-base">
              Video dioptimalkan untuk algoritma TikTok, Reels, dan Shorts agar konten Anda mudah viral.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

const Pricing = () => {
  const tiers = [
    { name: 'Starter', price: '50k', features: ['1 Video (15s)', '1 Revisi', 'Watermark', 'Format Vertikal'] },
    { name: 'Promo', price: '99k', features: ['1 Video (30s)', '2 Revisi', 'Tanpa Watermark', 'Vertikal + Horizontal'], recommended: true },
    { name: 'Viral', price: '175k', features: ['2 Video (30s)', '3 Revisi', 'Caption + Hashtag', 'Prioritas'] },
  ];

  return (
    <section id="harga" className="bg-brand-primary py-24 md:py-40 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
          <AnimatedSection>
            <span className="inline-block border border-neutral-white/30 rounded-full px-4 py-1 font-mono text-[10px] tracking-widest text-neutral-white uppercase">Harga</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-brand-accent text-3xl md:text-5xl font-bold tracking-tight">Investasi Terjangkau</h2>
            <p className="text-neutral-white/60 mt-4">Pilih paket yang sesuai dengan kebutuhan promosi Anda</p>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.1}>
              <div className={`relative p-8 md:p-10 rounded-xl flex flex-col h-full ${tier.recommended ? 'bg-brand-accent text-brand-primary' : 'bg-neutral-white/5 border border-neutral-white/10 text-neutral-white'}`}>
                {tier.recommended && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-brand-accent px-4 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider">
                    Terlaris
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-sm font-semibold">Rp</span>
                  <span className="text-5xl font-bold tracking-tighter">{tier.price}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${tier.recommended ? 'text-brand-primary' : 'text-brand-accent'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#order"
                  className={`w-full py-4 rounded-lg font-bold transition-all text-center block ${tier.recommended ? 'bg-brand-primary text-neutral-white hover:bg-brand-primary/90' : 'bg-neutral-white/10 hover:bg-neutral-white/20'}`}
                >
                  Pilih Paket {tier.name}
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderForm = () => {
  const [formData, setFormData] = useState({
    namaBisnis: '',
    deskripsi: '',
    paket: 'Promo',
    whatsapp: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Halo ViralAI Studio! Saya mau order paket ${formData.paket}.\n\nNama Bisnis: ${formData.namaBisnis}\nDeskripsi: ${formData.deskripsi}\nWA: ${formData.whatsapp}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/628123456789?text=${encoded}`, '_blank');
  };

  return (
    <section id="order" className="bg-neutral-bg py-24 md:py-32 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="bg-neutral-white rounded-xl p-8 md:p-12 shadow-card border border-brand-primary/5">
            <div className="text-center mb-10 space-y-4">
              <span className="inline-block border border-brand-primary rounded-full px-4 py-1 font-mono text-[10px] tracking-widest text-brand-primary uppercase">Order</span>
              <h2 className="text-brand-primary text-3xl md:text-4xl font-bold tracking-tight">Formulir Pesanan</h2>
              <p className="text-text-muted">Isi detail produk Anda dan kami akan hubungi via WhatsApp</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Nama Bisnis / Produk</label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-brand-primary/10 bg-neutral-bg focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30 outline-none transition-all"
                    placeholder="Contoh: Kripik Pedas Mak Ijah"
                    onChange={e => setFormData({ ...formData, namaBisnis: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Nomor WhatsApp</label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-brand-primary/10 bg-neutral-bg focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30 outline-none transition-all"
                    placeholder="0812xxxx"
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Pilih Paket</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-brand-primary/10 bg-neutral-bg focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30 outline-none transition-all"
                  value={formData.paket}
                  onChange={e => setFormData({ ...formData, paket: e.target.value })}
                >
                  <option value="Starter">Starter - Rp 50k</option>
                  <option value="Promo">Promo - Rp 99k (Terlaris)</option>
                  <option value="Viral">Viral - Rp 175k</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Deskripsi Produk & Keunggulan</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-brand-primary/10 bg-neutral-bg focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30 outline-none transition-all resize-none"
                  placeholder="Jelaskan produk Anda..."
                  onChange={e => setFormData({ ...formData, deskripsi: e.target.value })}
                />
              </div>
              <button type="submit" className="w-full btn-accent flex items-center justify-center gap-2 text-lg">
                Kirim Brief & Chat Admin <MessageCircle size={20} />
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="bg-brand-primary py-24 md:py-32 px-6 md:px-20 text-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=1920&h=1080&fit=crop" alt="Pattern" className="w-full h-full object-cover" />
    </div>
    <AnimatedSection className="max-w-4xl mx-auto space-y-12 relative z-10">
      <h2 className="text-brand-accent text-4xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
        Siap Buat Video yang Bikin Jualan Meledak?
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
        <a href="#order" className="bg-brand-accent text-brand-primary px-8 md:px-10 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg hover:brightness-110 transition-all">
          Pesan Video Sekarang
        </a>
        <a href="https://wa.me/628123456789" target="_blank" className="border border-neutral-white/30 text-neutral-white px-8 md:px-10 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg hover:bg-neutral-white/10 transition-all">
          Chat via WhatsApp
        </a>
      </div>
    </AnimatedSection>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-primary text-neutral-white pt-20 md:pt-32 pb-12 md:pb-20 px-6 md:px-20 overflow-hidden relative">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
      <div className="space-y-8 md:space-y-12">
        <div className="space-y-4">
          <h2 className="text-brand-accent text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
            Video AI untuk<br />UMKM Indonesia.
          </h2>
        </div>

        <div className="max-w-md space-y-6">
          <p className="text-neutral-white/80 font-medium">Dapatkan tips video marketing gratis</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Anda"
              className="bg-neutral-white/10 border-none rounded-lg px-4 py-3 flex-grow text-neutral-white focus:ring-2 focus:ring-brand-accent transition-all outline-none placeholder:text-neutral-white/40"
            />
            <button type="submit" className="bg-brand-accent text-brand-primary font-bold px-8 py-3 rounded-lg hover:brightness-110 transition-all">
              Langganan
            </button>
          </form>
          <p className="text-xs text-neutral-white/50">Kami menghargai privasi data Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h5 className="text-brand-accent font-bold text-lg">Menu</h5>
          <ul className="space-y-4 text-neutral-white/70">
            <li><a href="#layanan" className="hover:text-brand-accent transition-colors">Layanan</a></li>
            <li><a href="#harga" className="hover:text-brand-accent transition-colors">Harga</a></li>
            <li><a href="#tentang" className="hover:text-brand-accent transition-colors">Tentang Kami</a></li>
            <li><a href="#order" className="hover:text-brand-accent transition-colors">Order</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="text-brand-accent font-bold text-lg">Sosial Media</h5>
          <ul className="space-y-4 text-neutral-white/70">
            <li><a href="#" className="hover:text-brand-accent transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">TikTok</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">WhatsApp</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-20 md:mt-32 pt-8 border-t border-neutral-white/10 flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="text-neutral-white/60 text-sm">
        © 2026 ViralAI Studio. All Rights Reserved.
      </div>
      <p className="max-w-4xl text-neutral-white/40 text-[10px] leading-relaxed">
        ViralAI Studio adalah layanan jasa video marketing berbasis AI untuk UMKM Indonesia. Konten yang ditampilkan merupakan contoh dan hasil dapat bervariasi.
      </p>
    </div>
  </footer>
);

function App() {
  return (
    <div className="font-sans text-text-primary overflow-x-hidden min-h-screen flex flex-col w-full relative">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Values />
        <Pricing />
        <OrderForm />
        <CTA />
      </main>
      <Footer />

      <a
        href="https://wa.me/628123456789"
        target="_blank"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}

export default App;

import { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Video,
  Menu,
  X,
  Zap,
  Palette,
  TrendingUp,
  Sparkles,
  Play,
  ArrowRight,
  Star,
  Send,
  AtSign,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const AnimatedSection = ({ children, variants = fadeUp, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
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

const MarqueeText = () => (
  <div className="overflow-hidden py-4 bg-brand-accent">
    <motion.div
      className="flex gap-8 whitespace-nowrap"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-8 items-center">
          {['VIDEO AI', 'TIKTOK', 'REELS', 'SHORTS', 'VIRAL', 'UMKM', 'KONTEN', 'BRANDING'].map((text, j) => (
            <span key={j} className="text-brand-primary font-bold text-sm tracking-widest flex items-center gap-8">
              {text} <Star className="w-3 h-3 fill-brand-primary" />
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 md:py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav className={`${scrolled ? 'glass-dark' : 'bg-transparent'} rounded-2xl px-5 md:px-6 py-3 flex items-center justify-between relative transition-all duration-500 ${scrolled ? 'border border-neutral-white/5' : ''}`}>
          <a className="font-bold text-lg md:text-xl tracking-tight text-neutral-white flex items-center gap-2" href="#hero">
            <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-primary" />
            </div>
            VIRAL<span className="text-brand-accent">AI</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {[['#layanan', 'Layanan'], ['#tentang', 'Tentang'], ['#harga', 'Harga'], ['#portfolio', 'Portfolio']].map(([href, label]) => (
              <a key={href} className="px-4 py-2 text-sm font-medium text-neutral-white/70 hover:text-neutral-white rounded-full hover:bg-neutral-white/5 transition-all" href={href}>{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#order" className="hidden sm:inline-flex items-center gap-2 bg-brand-accent text-brand-primary text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-[0_0_30px_rgba(168,255,0,0.3)] transition-all hover:scale-105">
              Order Sekarang <ArrowRight className="w-4 h-4" />
            </a>
            <button className="lg:hidden p-2 text-neutral-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-x-4 top-[calc(100%+0.5rem)] glass-dark border border-neutral-white/10 rounded-2xl p-6 shadow-2xl lg:hidden"
              >
                <div className="flex flex-col gap-2">
                  {[['#layanan', 'Layanan'], ['#tentang', 'Tentang'], ['#harga', 'Harga'], ['#portfolio', 'Portfolio']].map(([href, label]) => (
                    <a key={href} className="p-3 text-lg font-semibold text-neutral-white hover:text-brand-accent transition-colors rounded-xl hover:bg-neutral-white/5" href={href} onClick={() => setIsOpen(false)}>{label}</a>
                  ))}
                  <a className="p-4 mt-2 bg-brand-accent text-brand-primary text-center rounded-xl font-bold" href="#order" onClick={() => setIsOpen(false)}>Order Sekarang</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen bg-brand-primary flex flex-col justify-center items-center px-4 md:px-8 pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 -right-20 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="absolute inset-0 z-[1]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-6xl w-full text-center space-y-8 md:space-y-10">
        <AnimatedSection>
          <motion.div
            className="inline-flex items-center gap-2 bg-neutral-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-semibold text-neutral-white/80 tracking-wide">AI-Powered Video Marketing</span>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tighter">
            <span className="text-neutral-white">Bikin Konten</span>
            <br />
            <span className="text-gradient">yang Bikin</span>
            <br />
            <span className="text-neutral-white">Orang </span>
            <span className="relative inline-block">
              <span className="text-brand-accent">Stop Scroll.</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-brand-accent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-neutral-white/50 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Video promosi AI yang bikin FYP. Mulai dari 50k aja.
            <br className="hidden md:block" />
            Tanpa ribet, tanpa mahal, langsung viral.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#order"
              className="btn-glow flex items-center gap-2 text-base md:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" /> Mulai Sekarang
            </motion.a>
            <a href="#layanan" className="btn-outline flex items-center gap-2 text-base">
              Lihat Layanan
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <motion.div style={{ y }} className="mt-8 md:mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
              {[
                { value: '100+', label: 'UMKM Percaya', color: 'from-brand-accent/20 to-brand-accent/5' },
                { value: '3-5', label: 'Hari Selesai', color: 'from-brand-blue/20 to-brand-blue/5' },
                { value: '50k', label: 'Mulai Dari', color: 'from-brand-pink/20 to-brand-pink/5' },
                { value: '95%', label: 'Puas', color: 'from-brand-purple/20 to-brand-purple/5' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className={`bg-gradient-to-br ${stat.color} border border-neutral-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-sm`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-neutral-white tracking-tight">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-neutral-white/50 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

const About = () => (
  <section id="tentang" className="bg-neutral-bg py-20 md:py-32 px-4 md:px-8">
    <div className="max-w-5xl mx-auto">
      <AnimatedSection>
        <div className="bg-neutral-white rounded-3xl p-8 md:p-16 border border-black/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-purple/10 rounded-full blur-[80px]" />

          <div className="relative z-10 space-y-6 md:space-y-8 text-center">
            <span className="inline-flex items-center gap-2 bg-brand-primary/5 px-4 py-2 rounded-full text-xs font-bold text-brand-primary uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Tentang Kami
            </span>
            <h2 className="text-2xl md:text-5xl font-bold leading-tight tracking-tight text-brand-primary">
              Studio kreatif berbasis AI yang bikin UMKM Indonesia punya
              <span className="text-gradient"> konten sekelas brand besar</span> — cepat, murah, dan siap viral.
            </h2>
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              {['TikTok Ready', 'Reels Optimized', 'Shorts Friendly', 'FYP Targeted'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-brand-primary/5 rounded-full text-sm font-semibold text-brand-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

const services = [
  {
    num: '01',
    title: 'Video Produk AI',
    desc: 'Tampilkan produk lo dengan video kece yang dibikin AI. Siap upload ke TikTok, Reels, dan marketplace.',
    icon: <Video className="w-6 h-6" />,
    gradient: 'from-brand-accent/20 to-brand-accent/5',
    iconBg: 'bg-brand-accent text-brand-primary',
    img: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=800&h=600&fit=crop',
  },
  {
    num: '02',
    title: 'Konten Sosmed',
    desc: 'Strategi konten + video yang bikin engagement naik dan followers nambah terus tiap hari.',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-brand-pink/20 to-brand-pink/5',
    iconBg: 'bg-brand-pink text-neutral-white',
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=800&h=600&fit=crop',
  },
  {
    num: '03',
    title: 'Video Iklan & Ads',
    desc: 'Video iklan yang dioptimasi buat konversi. Lengkap caption, hashtag, dan strategi distribusi.',
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: 'from-brand-purple/20 to-brand-purple/5',
    iconBg: 'bg-brand-purple text-neutral-white',
    img: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?w=800&h=600&fit=crop',
  },
];

const Services = () => (
  <section id="layanan" className="bg-neutral-bg pb-16 md:pb-24 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16 space-y-4">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 bg-brand-primary/5 px-4 py-2 rounded-full text-xs font-bold text-brand-primary uppercase tracking-widest">
            <Zap className="w-3 h-3" /> Layanan
          </span>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-brand-primary">
            Apa yang Kita <span className="text-gradient">Bisa Lakuin</span>
          </h2>
        </AnimatedSection>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <AnimatedSection key={svc.num} delay={i * 0.1} variants={scaleIn}>
            <motion.div
              className="group bg-neutral-white rounded-3xl overflow-hidden border border-black/5 h-full flex flex-col"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative h-52 md:h-64 overflow-hidden">
                <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className={`absolute top-4 left-4 ${svc.iconBg} w-10 h-10 rounded-xl flex items-center justify-center`}>
                  {svc.icon}
                </div>
                <span className="absolute top-4 right-4 bg-neutral-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-mono text-xs font-bold text-brand-primary">
                  {svc.num}
                </span>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-3">{svc.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm md:text-base flex-1">{svc.desc}</p>
                <a href="#order" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                  Order Sekarang <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

const Values = () => (
  <section className="bg-brand-primary py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-[150px]" />
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-12 md:mb-16 space-y-4">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 bg-neutral-white/5 px-4 py-2 rounded-full text-xs font-bold text-neutral-white/80 uppercase tracking-widest border border-neutral-white/10">
            Kenapa Kami
          </span>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-neutral-white">
            Kenapa <span className="text-brand-accent">ViralAI</span>?
          </h2>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Zap className="w-8 h-8" />, title: 'Super Cepat', desc: '3-5 hari jadi. Ga pake lama, ga pake ribet. Langsung upload!', color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
          { icon: <Sparkles className="w-8 h-8" />, title: 'Kualitas Pro', desc: 'Hasil video sekelas brand besar. AI + sentuhan kreatif manusia.', color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
          { icon: <TrendingUp className="w-8 h-8" />, title: 'FYP Ready', desc: 'Dioptimasi buat algoritma TikTok, Reels, dan Shorts. Siap viral!', color: 'text-brand-pink', bg: 'bg-brand-pink/10' },
        ].map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 0.1}>
            <motion.div
              className="bg-neutral-white/5 border border-neutral-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm group"
              whileHover={{ scale: 1.02, borderColor: 'rgba(168,255,0,0.2)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`${item.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-neutral-white text-xl md:text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-neutral-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="bg-neutral-bg py-20 md:py-32 px-4 md:px-8 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16 space-y-4">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 bg-brand-primary/5 px-4 py-2 rounded-full text-xs font-bold text-brand-primary uppercase tracking-widest">
            <Star className="w-3 h-3" /> Testimoni
          </span>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-brand-primary">
            Yang Udah <span className="text-gradient-pink">Coba Bilang...</span>
          </h2>
        </AnimatedSection>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: 'Rina S.', biz: 'Skincare Lokal', text: 'Gila sih, video produk dari ViralAI langsung bikin orderan naik 3x lipat. Worth it banget!', stars: 5 },
          { name: 'Adi P.', biz: 'Kedai Kopi', text: 'Baru pertama kali video promosi seharga ini tapi kualitasnya kayak brand gede. Mantap!', stars: 5 },
          { name: 'Maya K.', biz: 'Fashion Hijab', text: 'Videonya langsung FYP di TikTok! Followers nambah 2000 dalam seminggu. Recommended!', stars: 5 },
        ].map((t, idx) => (
          <AnimatedSection key={t.name} delay={idx * 0.1}>
            <div className="bg-neutral-white rounded-3xl p-8 border border-black/5 h-full flex flex-col card-hover">
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="text-brand-primary/80 leading-relaxed flex-1 text-sm md:text-base">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-brand-blue flex items-center justify-center text-sm font-bold text-brand-primary">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm text-brand-primary">{t.name}</div>
                  <div className="text-xs text-text-muted">{t.biz}</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => {
  const tiers = [
    { name: 'Starter', price: '50k', emoji: 'from-brand-blue/10 to-brand-blue/5', border: 'border-brand-blue/20', badge: 'bg-brand-blue/10 text-brand-blue', features: ['1 Video (15s)', '1 Revisi', 'Watermark', 'Format Vertikal'] },
    { name: 'Promo', price: '99k', emoji: 'from-brand-accent/10 to-brand-accent/5', border: 'border-brand-accent/30', badge: 'bg-brand-accent/10 text-brand-primary', features: ['1 Video (30s)', '2 Revisi', 'Tanpa Watermark', 'Vertikal + Horizontal'], recommended: true },
    { name: 'Viral', price: '175k', emoji: 'from-brand-purple/10 to-brand-purple/5', border: 'border-brand-purple/20', badge: 'bg-brand-purple/10 text-brand-purple', features: ['2 Video (30s)', '3 Revisi', 'Caption + Hashtag', 'Prioritas'] },
  ];

  return (
    <section id="harga" className="bg-neutral-bg py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-brand-primary/5 px-4 py-2 rounded-full text-xs font-bold text-brand-primary uppercase tracking-widest">
              Harga
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-brand-primary">
              Harga <span className="text-gradient">Super Friendly</span>
            </h2>
            <p className="text-text-muted mt-4 text-base md:text-lg">Ga perlu budget gede buat konten yang kece</p>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.1} variants={scaleIn}>
              <motion.div
                className={`relative bg-gradient-to-br ${tier.emoji} border ${tier.border} rounded-3xl p-8 flex flex-col h-full backdrop-blur-sm`}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {tier.recommended && (
                  <motion.span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse-glow"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Best Seller
                  </motion.span>
                )}
                <div className={`inline-flex self-start ${tier.badge} px-3 py-1 rounded-full text-xs font-bold mb-4`}>
                  {tier.name}
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm font-bold text-brand-primary/60">Rp</span>
                  <span className="text-5xl md:text-6xl font-bold tracking-tighter text-brand-primary">{tier.price}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                      <span className="text-brand-primary/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#order"
                  className={`w-full py-4 rounded-2xl font-bold transition-all text-center block text-sm ${tier.recommended ? 'bg-brand-accent text-brand-primary hover:shadow-[0_0_30px_rgba(168,255,0,0.3)]' : 'bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10'}`}
                >
                  Pilih {tier.name}
                </a>
              </motion.div>
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
    window.open(`https://wa.me/6285974107446?text=${encoded}`, '_blank');
  };

  return (
    <section id="order" className="bg-brand-primary py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="bg-neutral-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-neutral-white/10">
            <div className="text-center mb-8 space-y-4">
              <span className="inline-flex items-center gap-2 bg-brand-accent/10 px-4 py-2 rounded-full text-xs font-bold text-brand-accent uppercase tracking-widest">
                <Send className="w-3 h-3" /> Order
              </span>
              <h2 className="text-neutral-white text-3xl md:text-4xl font-bold tracking-tight">Yuk, Mulai Project-mu</h2>
              <p className="text-neutral-white/40">Isi form, kita langsung hubungi via WhatsApp</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-white/60 uppercase tracking-wider ml-1">Nama Bisnis</label>
                  <input
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-white/5 border border-neutral-white/10 text-neutral-white placeholder:text-neutral-white/20 focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/10 outline-none transition-all"
                    placeholder="Contoh: Kripik Pedas Mak Ijah"
                    onChange={e => setFormData({ ...formData, namaBisnis: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-white/60 uppercase tracking-wider ml-1">No. WhatsApp</label>
                  <input
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-white/5 border border-neutral-white/10 text-neutral-white placeholder:text-neutral-white/20 focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/10 outline-none transition-all"
                    placeholder="0812xxxx"
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-white/60 uppercase tracking-wider ml-1">Paket</label>
                <select
                  className="w-full px-4 py-3.5 rounded-xl bg-neutral-white/5 border border-neutral-white/10 text-neutral-white focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/10 outline-none transition-all"
                  value={formData.paket}
                  onChange={e => setFormData({ ...formData, paket: e.target.value })}
                >
                  <option value="Starter" className="bg-brand-primary">Starter - Rp 50k</option>
                  <option value="Promo" className="bg-brand-primary">Promo - Rp 99k (Best Seller)</option>
                  <option value="Viral" className="bg-brand-primary">Viral - Rp 175k</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-white/60 uppercase tracking-wider ml-1">Deskripsi Produk</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl bg-neutral-white/5 border border-neutral-white/10 text-neutral-white placeholder:text-neutral-white/20 focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/10 outline-none transition-all resize-none"
                  placeholder="Ceritain produk kamu..."
                  onChange={e => setFormData({ ...formData, deskripsi: e.target.value })}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full btn-glow flex items-center justify-center gap-2 text-base md:text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Kirim & Chat Admin <MessageCircle size={20} />
              </motion.button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="bg-neutral-bg py-20 md:py-32 px-4 md:px-8">
    <AnimatedSection>
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-brand-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-brand-purple/10 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-neutral-white">
            Udah Siap Bikin<br />
            <span className="text-brand-accent">Jualan Meledak</span>?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#order"
              className="btn-glow flex items-center justify-center gap-2 text-base md:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Mulai Sekarang <ArrowRight className="w-5 h-5" />
            </motion.a>
            <a href="https://wa.me/6285974107446" target="_blank" className="btn-outline flex items-center justify-center gap-2 text-base">
              <MessageCircle className="w-5 h-5" /> Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-primary text-neutral-white pt-16 md:pt-24 pb-8 md:pb-12 px-4 md:px-8 relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20">
        <div className="lg:col-span-5 space-y-6">
          <a href="#hero" className="font-bold text-2xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-primary" />
            </div>
            VIRAL<span className="text-brand-accent">AI</span>
          </a>
          <p className="text-neutral-white/40 leading-relaxed max-w-sm">
            Studio kreatif berbasis AI untuk UMKM Indonesia. Bikin konten viral jadi gampang dan terjangkau.
          </p>
          <div className="flex gap-3">
            {[
              { icon: <AtSign className="w-4 h-4" />, href: '#' },
              { icon: <Video className="w-4 h-4" />, href: '#' },
              { icon: <MessageCircle className="w-4 h-4" />, href: 'https://wa.me/6285974107446' },
            ].map((social, i) => (
              <a key={i} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} className="w-10 h-10 rounded-xl bg-neutral-white/5 border border-neutral-white/10 flex items-center justify-center text-neutral-white/60 hover:text-brand-accent hover:border-brand-accent/30 transition-all">
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h5 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Menu</h5>
          <ul className="space-y-3">
            {[['#layanan', 'Layanan'], ['#harga', 'Harga'], ['#tentang', 'Tentang'], ['#order', 'Order']].map(([href, label]) => (
              <li key={href}><a href={href} className="text-neutral-white/50 hover:text-brand-accent transition-colors text-sm">{label}</a></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <h5 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Newsletter</h5>
          <p className="text-neutral-white/40 text-sm">Tips video marketing gratis tiap minggu</p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email kamu"
              className="bg-neutral-white/5 border border-neutral-white/10 rounded-xl px-4 py-3 flex-grow text-sm text-neutral-white focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent/30 transition-all outline-none placeholder:text-neutral-white/30"
            />
            <button type="submit" className="bg-brand-accent text-brand-primary font-bold px-5 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(168,255,0,0.3)] transition-all text-sm">
              Go
            </button>
          </form>
        </div>
      </div>

      <div className="pt-8 border-t border-neutral-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-neutral-white/30 text-xs">
          &copy; 2026 ViralAI Studio. Made with AI.
        </div>
        <p className="text-neutral-white/20 text-[10px] text-center md:text-right max-w-md">
          ViralAI Studio adalah layanan jasa video marketing berbasis AI untuk UMKM Indonesia. Hasil dapat bervariasi.
        </p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="font-sans text-text-primary overflow-x-hidden min-h-screen flex flex-col w-full relative">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <MarqueeText />
        <About />
        <Services />
        <Values />
        <Testimonials />
        <Pricing />
        <OrderForm />
        <CTA />
      </main>
      <Footer />

      <motion.a
        href="https://wa.me/6285974107446"
        target="_blank"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] z-50"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <MessageCircle size={26} />
      </motion.a>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  ChevronRight,
  Phone,
  MapPin,
  X,
  Check,
  Calculator,
  ArrowRight,
  ZoomIn
} from 'lucide-react';

// --- Конфигурация и данные ---
const IMAGES = {
  hero: '/gallery/Image (6).png', // Самая эффектная
  tech: '/gallery/Image.png',
  process: [
    { title: 'Сканирование', desc: 'Сверхточный захват данных с интраоральных сканеров.', img: '/gallery/Image.png' },
    { title: 'Моделирование', desc: 'Архитектура будущей улыбки в EXOCAD с учетом гнатологии.', img: '/gallery/Image (7).png' },
    { title: 'Фрезеровка', desc: '5-осевые станки обеспечивают прилегание до 10 микрон.', img: '/gallery/Image (8).png' },
    { title: 'Финальная эстетика', desc: 'Ручная доработка и индивидуализация керамическими массами.', img: '/gallery/Image (5).png' }
  ],
  gallery: [
   '/gallery/Image (2).png',
  '/gallery/Image (3).png',
  '/gallery/Image (4).png',
  '/gallery/Image (5).png',
  '/gallery/Image (6).png',
  '/gallery/Image.png',
  ]
};

const CALCULATOR_PRICES = {
  zirconia: { name: 'Коронка из диоксида циркония', price: 7000 },
  emax: { name: 'Керамическая реставрация E.max', price: 9000 },
  veneer: { name: 'Винир рефракторный', price: 9000 },
  allOn4: { name: 'Балка All-on-4 (Titan/Zr)', price: 25000 }
};


// --- Компоненты ---

// 1. Анимированный счетчик
const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTime;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, to, from, duration]);

  return (
    <span ref={nodeRef}>
      {count}{suffix}
    </span>
  );
};

// 2. Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B0B0B] flex items-center justify-center">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-[#0B0B0B]/60 to-[#0B0B0B] z-10" />
        <img 
          src={IMAGES.hero} 
          alt="Precision Dental" 
          className="w-full h-full object-cover object-center scale-105"
        />
      </motion.div>

      <div className="relative z-20 container mx-auto px-6 text-center mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <span className="uppercase tracking-[0.3em] text-neutral-400 text-xs md:text-sm mb-6 block">
            Chigodaev Lab
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter mb-8"
        >
          ТОЧНОСТЬ В <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600 font-medium">МИКРОНАХ</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl mx-auto mb-12"
        >
          Цифровая зуботехническая лаборатория нового поколения. Бескомпромиссная эстетика и архитектурная точность.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button onClick={() => document.getElementById('gallery').scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-300 w-full sm:w-auto flex items-center justify-center gap-3 group">
            Посмотреть работы
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => document.getElementById('calculator').scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 border border-white/20 text-white text-sm uppercase tracking-widest hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto backdrop-blur-sm">
            Связаться
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-neutral-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
      </motion.div>
    </section>
  );
};

// 3. Tech Section
const TechSection = () => {
  return (
    <section className="py-32 bg-[#0B0B0B] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
            <img 
              src={IMAGES.tech} 
              alt="Dental Technology" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute bottom-8 left-8 z-20">
               <div className="w-12 h-[1px] bg-white/50 mb-4" />
               <p className="text-neutral-300 font-light tracking-wide text-sm">CAD/CAM Systems</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight tracking-tight">
              Технологии, которые <br/><span className="text-neutral-500">работают на эстетику</span>
            </h2>
            <div className="space-y-6 text-neutral-400 font-light text-lg">
              <p>
                Мы отказались от компромиссов. Полный цифровой протокол позволяет нам контролировать качество на каждом этапе — от интраорального скана до финального глейза.
              </p>
              <p>
                Используя премиальные диски диоксида циркония и передовые фрезерные центры, мы создаем реставрации, которые невозможно отличить от естественных зубов. Биомиметика в чистом виде.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl text-white font-light mb-2">
                  <AnimatedCounter to={10} suffix=" мкм" />
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">Точность прилегания</div>
              </div>
              <div>
                <div className="text-3xl text-white font-light mb-2">
                  <AnimatedCounter to={100} suffix="%" />
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">Цифровой протокол</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 4. Process Section
const ProcessSection = () => {
  return (
    <section className="py-32 bg-[#111111]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Производственный <span className="text-neutral-500">процесс</span>
            </h2>
          </div>
          <p className="text-neutral-400 font-light max-w-sm">
            Каждая работа проходит 4 стадии строгого контроля качества. Искусство, подкрепленное инженерией.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMAGES.process.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#181818] rounded-xl cursor-pointer"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500" />
              
              {/* Hover Glass Panel */}
              <div className="absolute inset-x-4 bottom-4 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-xs text-neutral-400 font-mono mb-2">0{idx + 1}</div>
                <h3 className="text-white text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-neutral-300 text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Default State Title */}
              <div className="absolute bottom-8 left-8 group-hover:opacity-0 transition-opacity duration-500">
                 <div className="text-xs text-neutral-400 font-mono mb-2">0{idx + 1}</div>
                 <h3 className="text-white text-xl font-light">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Gallery Section
const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-32 bg-[#0B0B0B] min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="uppercase tracking-[0.2em] text-neutral-500 text-xs mb-4 block">Портфолио</span>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Эстетика в деталях
          </h2>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.gallery.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              className="relative group overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt="Gallery item" 
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <ZoomIn className="text-white w-8 h-8 opacity-70" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Fullscreen" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// 6. Stats Section
const StatsSection = () => {
  const stats = [
    { num: 5000, suffix: '+', label: 'Работ выполнено' },
    { num: 10, suffix: '+', label: 'Лет опыта' },
    { num: 48, suffix: ' ч', label: 'Средний срок' },
    { num: 100, suffix: '%', label: 'Контроль качества' }
  ];

  return (
    <section className="py-24 bg-[#111111] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-white/5">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
                <AnimatedCounter to={stat.num} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-neutral-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 7. Calculator Section
const CalculatorSection = () => {
  const [type, setType] = useState('zirconia');
  const [quantity, setQuantity] = useState(1);
  const [urgency, setUrgency] = useState(false);

  const basePrice = CALCULATOR_PRICES[type].price;
  const total = (basePrice * quantity) * (urgency ? 1.3 : 1);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price)) + ' ₽';
  };

  const handleWhatsApp = () => {
    const text = `Здравствуйте! Интересует расчет: ${CALCULATOR_PRICES[type].name}, ${quantity} ед. ${urgency ? '(Срочно)' : ''}. Ориентировочная стоимость: ${formatPrice(total)}`;
    window.open(`https://wa.me/79186180507?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="calculator" className="py-32 bg-[#0B0B0B] relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-white/10 rounded-xl">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white">Калькулятор стоимости</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {/* Type Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-4">Тип конструкции</label>
                <div className="space-y-3">
                  {Object.entries(CALCULATOR_PRICES).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setType(key)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                        type === key 
                          ? 'border-white bg-white/10 text-white' 
                          : 'border-white/10 hover:border-white/30 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <span className="font-light">{value.name}</span>
                      {type === key && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                 <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-4">Количество единиц: {quantity}</label>
                 <input 
                    type="range" 
                    min="1" 
                    max="28" 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full accent-white h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                 />
              </div>

              {/* Options */}
              <div>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${urgency ? 'bg-white border-white text-black' : 'border-white/20 group-hover:border-white/50 text-transparent'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={urgency}
                    onChange={(e) => setUrgency(e.target.checked)}
                  />
                  <span className="text-neutral-300 font-light group-hover:text-white transition-colors">Срочное изготовление (+30%)</span>
                </label>
              </div>
            </div>

            {/* Total Block */}
            <div className="bg-[#111111] rounded-2xl p-8 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-sm text-neutral-500 uppercase tracking-widest block mb-4">Итоговая стоимость</span>
                <div className="text-5xl md:text-6xl font-light text-white tracking-tight mb-2">
                  {formatPrice(total)}
                </div>
                <p className="text-neutral-500 text-sm font-light">
                  * Окончательная стоимость формируется после изучения сканов и согласования плана лечения.
                </p>
              </div>

              <button 
                onClick={handleWhatsApp}
                className="w-full mt-12 px-8 py-5 bg-white text-black text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-300 font-medium flex items-center justify-center gap-3"
              >
                Отправить в WhatsApp
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 8. Footer
const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h3 className="text-2xl text-white font-light mb-6 tracking-tight">CHIGODAEV LAB</h3>
            <p className="text-neutral-500 font-light max-w-sm">
              Премиальная цифровая зуботехническая лаборатория. Создаем архитектуру идеальной улыбки.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-600 mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+79186180507" className="text-neutral-300 hover:text-white transition-colors font-light flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-500" />
                  +7 (918) 618-05-07
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors font-light flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  г. Сочи, Гагарина ул, 23а
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-600 mb-6">Соцсети</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors font-light flex items-center gap-3">
                <span className="w-4 h-4 text-neutral-500">IG</span>
                  InstagramIcon
                </a>
              </li>
              <li>
                <a href="#https://t.me/dzharimov3_3" className="text-neutral-300 hover:text-white transition-colors font-light flex items-center gap-3">
                  <svg className="w-4 h-4 text-neutral-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/>
                  </svg>
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-neutral-600 font-light">
          <p>© {new Date().getFullYear()} Chigodaev Lab. Все права защищены.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-300 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---
export default function App() {
  // Имитация Lenis / Smooth Scroll для всего приложения
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = '#0B0B0B';
    document.body.style.color = '#F5F5F5';
    // Для более кинематографичного отображения скрываем дефолтный скроллбар
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #0B0B0B; }
      ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #555; }
      body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="font-sans antialiased selection:bg-white/30 selection:text-white">
      <HeroSection />
      <TechSection />
      <ProcessSection />
      <GallerySection />
      <StatsSection />
      <CalculatorSection />
      <Footer />
    </div>
  );
}
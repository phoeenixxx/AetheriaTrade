import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Car,
  Crown,
  Search,
  Sparkles,
  Gauge,
  Zap,
  MapPin,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  Plus,
  ArrowUpRight,
  SlidersHorizontal,
  Wine,
  UserCheck,
  PhoneCall,
  Heart,
  GitCompareArrows,
  Headphones,
  Plane,
  ShieldAlert,
  Trash2,
  Eye,
} from 'lucide-react';
import { INITIAL_VEHICLES, TRANSLATIONS, Lang, Vehicle } from './data';

const TiltVehicleCard: React.FC<{
  vehicle: Vehicle;
  lang: Lang;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelect: (v: Vehicle) => void;
}> = ({
  vehicle,
  lang,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onSelect,
}) => {
  const t = TRANSLATIONS[lang];
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(vehicle)}
      className="group relative rounded-3xl glass-panel overflow-hidden cursor-pointer border border-white/10 hover:border-amber-500/50 transition-colors duration-500 shadow-2xl"
    >
      <div className="relative h-60 overflow-hidden">
        <motion.img
          src={vehicle.image}
          alt={vehicle.model}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                vehicle.mode === 'vip'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-sky-500/20 text-sky-300 border-sky-400/40'
              }`}
            >
              {vehicle.mode === 'vip' ? 'VIP' : 'SALE'}
            </span>
            {vehicle.badge && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/70 text-white/90 border border-white/15 backdrop-blur-md">
                {vehicle.badge[lang]}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onToggleCompare(vehicle.id)}
              title={t.compareBtn}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition ${
                isCompared
                  ? 'bg-amber-500 text-black border-amber-400'
                  : 'bg-black/60 text-white/80 border-white/15 hover:border-amber-400'
              }`}
            >
              <GitCompareArrows className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition ${
                isFavorite
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-black/60 text-white/80 border-white/15 hover:border-rose-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            {vehicle.brand} • {vehicle.year}
          </p>
          <h3 className="text-xl font-bold text-white leading-tight">{vehicle.model}</h3>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs">
          <div className="flex flex-col items-center text-center">
            <Zap className="w-3.5 h-3.5 text-amber-400 mb-1" />
            <span className="text-white/50 text-[10px]">{t.specsPower}</span>
            <span className="font-semibold text-white">{vehicle.horsepower} HP</span>
          </div>
          <div className="flex flex-col items-center text-center border-x border-white/10">
            <Gauge className="w-3.5 h-3.5 text-amber-400 mb-1" />
            <span className="text-white/50 text-[10px]">{t.specsAccel}</span>
            <span className="font-semibold text-white">{vehicle.zeroToHundred}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <MapPin className="w-3.5 h-3.5 text-amber-400 mb-1" />
            <span className="text-white/50 text-[10px]">Loc</span>
            <span className="font-semibold text-white truncate max-w-[75px]">
              {vehicle.location[lang].split(',')[0]}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            {vehicle.mode === 'vip' && vehicle.hourlyRate ? (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-amber-400">
                  ${vehicle.hourlyRate}
                </span>
                <span className="text-xs text-white/60">{t.perHour}</span>
              </div>
            ) : (
              <div className="text-2xl font-extrabold text-white">
                ${vehicle.price.toLocaleString()}
              </div>
            )}
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 group-hover:bg-amber-500 group-hover:text-black text-white text-xs font-bold transition-all duration-300">
            <span>{vehicle.mode === 'vip' ? t.bookChauffeur : t.buyNow}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export function App() {
  const [lang, setLang] = useState<Lang>('ka');
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [activeMode, setActiveMode] = useState<'all' | 'buy' | 'vip'>('all');
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<number>(450000);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [viewCabin, setViewCabin] = useState<boolean>(false);

  const [favorites, setFavorites] = useState<string[]>(['v1']);
  const [isGarageOpen, setIsGarageOpen] = useState<boolean>(false);

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const vipFleet = useMemo(() => vehicles.filter((v) => v.mode === 'vip'), [vehicles]);
  const [selectedVipId, setSelectedVipId] = useState<string>(vipFleet[0]?.id || 'v1');
  const [serviceTier, setServiceTier] = useState<'airport' | 'hourly' | 'intercity'>('hourly');
  const [hours, setHours] = useState<number>(4);
  const [withBodyguard, setWithBodyguard] = useState<boolean>(false);
  const [withChampagne, setWithChampagne] = useState<boolean>(true);

  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newYear, setNewYear] = useState('2024');
  const [newPrice, setNewPrice] = useState('85000');
  const [newMode, setNewMode] = useState<'buy' | 'vip'>('buy');
  const [newCategory, setNewCategory] = useState<'sedan' | 'suv' | 'sport' | 'limo'>('sedan');

  const t = TRANSLATIONS[lang];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) {
        triggerToast(
          lang === 'ka'
            ? 'შესაძლებელია მაქსიმუმ 3 ავტომობილის შედარება'
            : 'Maximum 3 vehicles can be compared at once'
        );
        return prev;
      }
      return [...prev, id];
    });
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesMode = activeMode === 'all' || v.mode === activeMode;
      const matchesCategory = category === 'all' || v.category === category;
      const matchesSearch =
        v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBudget = v.price <= maxBudget;
      return matchesMode && matchesCategory && matchesSearch && matchesBudget;
    });
  }, [vehicles, activeMode, category, searchQuery, maxBudget]);

  const comparedVehicles = useMemo(
    () => vehicles.filter((v) => compareIds.includes(v.id)),
    [vehicles, compareIds]
  );

  const favoriteVehicles = useMemo(
    () => vehicles.filter((v) => favorites.includes(v.id)),
    [vehicles, favorites]
  );

  const vipTotalCost = useMemo(() => {
    const car = vipFleet.find((c) => c.id === selectedVipId) || vipFleet[0];
    const baseRate = car?.hourlyRate || 150;
    let multiplier = 1;
    if (serviceTier === 'airport') multiplier = 1.2;
    if (serviceTier === 'intercity') multiplier = 1.5;

    let total = baseRate * hours * multiplier;
    if (withBodyguard) total += 150;
    if (withChampagne) total += 90;
    return Math.round(total);
  }, [vipFleet, selectedVipId, serviceTier, hours, withBodyguard, withChampagne]);

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.trim() || !newModel.trim()) return;

    const created: Vehicle = {
      id: `custom-${Date.now()}`,
      mode: newMode,
      brand: newBrand,
      model: newModel,
      year: Number(newYear) || 2024,
      price: Number(newPrice) || 75000,
      hourlyRate: newMode === 'vip' ? 160 : undefined,
      category: newCategory,
      fuel: { ka: 'ბენზინი / ჰიბრიდი', en: 'Petrol / Hybrid' },
      transmission: { ka: 'ავტომატიკა', en: 'Automatic' },
      mileage: '0 km',
      horsepower: 480,
      zeroToHundred: '4.1s',
      topSpeed: '280 km/h',
      location: { ka: 'თბილისი', en: 'Tbilisi' },
      image:
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=85',
      interiorImage:
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85',
      badge: { ka: 'ახალი დამატებული', en: 'JUST LISTED' },
      features: {
        ka: ['სრული კომპლექტაცია', 'პრემიუმ აუდიო', 'პანორამა'],
        en: ['Full Spec', 'Premium Audio', 'Panoramic Roof'],
      },
    };

    setVehicles([created, ...vehicles]);
    setIsAddModalOpen(false);
    setNewBrand('');
    setNewModel('');
    triggerToast(t.addedSuccess);
  };

  return (
    <div className="min-h-screen mesh-bg text-white relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, 45, 0], y: [0, -35, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-amber-500/10 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-sky-500/10 blur-[140px]"
        />
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-24 right-6 z-50 glass-gold px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md"
          >
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-sm font-medium text-white">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-40 bg-black/80 border-b border-white/10 py-1.5 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap gap-12 text-[11px] font-semibold tracking-widest uppercase text-amber-300/90"
        >
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span>• MAYBACH S680 VIP AIRPORT TRANSFER — $180/HR</span>
              <span>• PORSCHE 911 GT3 RS WEISSACH — VERIFIED IN TBILISI</span>
              <span>• ROLLS-ROYCE GHOST SERIES II — DIPLOMATIC ESCORT AVAILABLE</span>
              <span>• 0% COMMISSION ESCROW PROTECTION ON ALL MARKETPLACE DEALS</span>
            </div>
          ))}
        </motion.div>
      </div>

      <header className="sticky top-0 z-40 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20"
            >
              <Crown className="w-6 h-6 text-black" />
            </motion.div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent">
                AETHERIA
              </span>
              <p className="text-[10px] tracking-[0.2em] text-white/50 uppercase">{t.brandSub}</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/75">
            <a href="#marketplace" className="hover:text-amber-400 transition-colors">
              {t.navMarket}
            </a>
            <a href="#vip-configurator" className="hover:text-amber-400 transition-colors">
              {t.navVip}
            </a>
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              {t.navShowcase}
            </button>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsGarageOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold transition"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span className="hidden sm:inline">{t.garageBtn}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                {favorites.length}
              </span>
            </button>

            <div className="relative flex items-center p-1 rounded-full bg-white/5 border border-white/10">
              {(['ka', 'en'] as Lang[]).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`relative px-2.5 sm:px-3 py-1 text-xs font-bold uppercase rounded-full transition-colors z-10 ${
                    lang === code ? 'text-black' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {lang === code && (
                    <motion.span
                      layoutId="langPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-amber-400 rounded-full -z-10"
                    />
                  )}
                  {code === 'ka' ? 'ქარ' : 'ENG'}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 hover:brightness-110 transition"
            >
              {t.postAd}
            </motion.button>
          </div>
        </div>
      </header>

      <section className="relative z-10 pt-12 pb-14 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight">
              <span className="block text-white">{t.heroTitle1}</span>
              <span className="block bg-gradient-to-r from-amber-300 via-amber-500 to-orange-400 bg-clip-text text-transparent">
                {t.heroTitle2}
              </span>
            </h1>

            <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveMode('buy')}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  activeMode === 'buy'
                    ? 'bg-white text-black shadow-xl shadow-white/10'
                    : 'glass-panel text-white hover:border-white/30'
                }`}
              >
                <Car className="w-4 h-4" />
                {t.modeBuy}
              </button>

              <button
                onClick={() => setActiveMode('vip')}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  activeMode === 'vip'
                    ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/25'
                    : 'glass-gold text-amber-300 hover:border-amber-400/60'
                }`}
              >
                <Crown className="w-4 h-4" />
                {t.modeVip}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10 group">
              <img
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury Fleet"
                className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 glass-panel p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                    24/7 CONCIERGE & ESCROW
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {lang === 'ka'
                      ? 'დაზღვეული გარიგება & VIP პროტოკოლი'
                      : 'Verified Escrow & Diplomatic Fleet'}
                  </p>
                </div>
                <ShieldCheck className="w-8 h-8 text-amber-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 glass-panel p-5 sm:p-6 rounded-3xl border border-white/15 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-black/50 border border-white/10 focus:border-amber-500 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition"
              />
            </div>

            <div className="md:col-span-3">
              <div className="relative flex items-center">
                <SlidersHorizontal className="w-4 h-4 text-amber-400 absolute left-4 pointer-events-none" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 focus:border-amber-500 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white outline-none appearance-none cursor-pointer"
                >
                  <option value="all">{t.allCategories}</option>
                  <option value="sedan">{t.catSedan}</option>
                  <option value="suv">{t.catSuv}</option>
                  <option value="sport">{t.catSport}</option>
                  <option value="limo">{t.catLimo}</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-4 bg-black/40 border border-white/10 rounded-2xl px-4 py-2.5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">{t.maxPrice}</span>
                <span className="font-bold text-amber-400">${maxBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={450000}
                step={10000}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="marketplace" className="relative z-10 py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel">
            {[
              { id: 'all', label: lang === 'ka' ? 'ყველა' : 'All' },
              { id: 'buy', label: t.modeBuy },
              { id: 'vip', label: t.modeVip },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMode(tab.id as 'all' | 'buy' | 'vip')}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                  activeMode === tab.id ? 'text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                {activeMode === tab.id && (
                  <motion.span
                    layoutId="marketTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl -z-10"
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-white/60">
            <span className="text-amber-400 font-bold">{filteredVehicles.length}</span>{' '}
            {t.foundCars}
          </p>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <TiltVehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                lang={lang}
                isFavorite={favorites.includes(vehicle.id)}
                isCompared={compareIds.includes(vehicle.id)}
                onToggleFavorite={toggleFavorite}
                onToggleCompare={toggleCompare}
                onSelect={(v) => {
                  setViewCabin(false);
                  setSelectedVehicle(v);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section id="vip-configurator" className="relative z-10 py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="glass-gold rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Crown className="w-4 h-4" />
              <span>LIMO & EXECUTIVE DISPATCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t.vipTitle}</h2>
            <p className="text-white/65 text-sm sm:text-base mt-2">{t.vipSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-3 font-semibold">
                  {t.selectCar}
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {vipFleet.map((car) => (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => setSelectedVipId(car.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        selectedVipId === car.id
                          ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/10'
                          : 'bg-black/40 border-white/10 hover:border-white/25'
                      }`}
                    >
                      <p className="text-[11px] text-amber-400 font-bold">{car.brand}</p>
                      <p className="text-sm font-bold text-white truncate">{car.model}</p>
                      <p className="text-xs text-white/60 mt-1">
                        ${car.hourlyRate} {t.perHour}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-3 font-semibold">
                  {t.serviceType}
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: 'airport', label: t.airportTransfer },
                    { id: 'hourly', label: t.hourlyChauffeur },
                    { id: 'intercity', label: t.intercity },
                  ].map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setServiceTier(srv.id as 'airport' | 'hourly' | 'intercity')}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold transition-all ${
                        serviceTier === srv.id
                          ? 'bg-white text-black border-white'
                          : 'bg-black/40 text-white/80 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white/70 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {t.hoursLabel}
                    </span>
                    <span className="font-bold text-amber-400">{hours}h</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={24}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setWithBodyguard(!withBodyguard)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-medium transition ${
                      withBodyguard
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-black/40 border-white/10 text-white/70'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-amber-400" />
                      {t.bodyguardOption}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithChampagne(!withChampagne)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-medium transition ${
                      withChampagne
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-black/40 border-white/10 text-white/70'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Wine className="w-4 h-4 text-amber-400" />
                      {t.champagneOption}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/60">{t.totalEstimate}</span>
                <motion.span
                  key={vipTotalCost}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-extrabold text-amber-400"
                >
                  ${vipTotalCost}
                </motion.span>
              </div>

              <div className="space-y-3 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'ka'
                      ? 'მყისიერი მიწოდება 20 წუთში თბილისის მასშტაბით'
                      : 'Instant 20-minute dispatch across Tbilisi'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'ka'
                      ? 'პროტოკოლის სერტიფიცირებული მძღოლი'
                      : 'Diplomatic protocol certified chauffeur'}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => triggerToast(t.bookingSuccess)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 transition"
              >
                {t.confirmBooking}
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-10 px-4 sm:px-6 text-center text-xs text-white/45">
        <p>
          © {new Date().getFullYear()} AETHERIA AUTO & VIP FLEET GEORGIA. {t.footerRights}
        </p>
      </footer>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsConciergeOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-2xl shadow-amber-500/30 flex items-center justify-center"
      >
        <Headphones className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-gold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-amber-400/50"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <GitCompareArrows className="w-4 h-4" />
              <span>
                {compareIds.length} / 3 {t.compareBtn}
              </span>
            </div>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-extrabold hover:bg-amber-400 transition"
            >
              {t.compareNow}
            </button>

            <button
              onClick={() => setCompareIds([])}
              className="text-xs text-white/60 hover:text-white"
            >
              {t.clearCompare}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVehicle(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel border border-white/15 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative h-72">
                <motion.img
                  key={viewCabin ? 'cabin' : 'ext'}
                  initial={{ opacity: 0.4, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={viewCabin ? selectedVehicle.interiorImage : selectedVehicle.image}
                  alt={selectedVehicle.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/40" />

                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/65 backdrop-blur-md p-1 rounded-full border border-white/15">
                  <button
                    onClick={() => setViewCabin(false)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                      !viewCabin ? 'bg-amber-500 text-black' : 'text-white/75'
                    }`}
                  >
                    {t.exteriorView}
                  </button>
                  <button
                    onClick={() => setViewCabin(true)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition ${
                      viewCabin ? 'bg-amber-500 text-black' : 'text-white/75'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {t.interiorView}
                  </button>
                </div>

                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    {selectedVehicle.brand} • {selectedVehicle.year}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">{selectedVehicle.model}</h3>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white/50">{t.specsPower}</p>
                    <p className="font-bold text-white mt-0.5">{selectedVehicle.horsepower} HP</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white/50">{t.specsAccel}</p>
                    <p className="font-bold text-white mt-0.5">{selectedVehicle.zeroToHundred}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white/50">{t.specsSpeed}</p>
                    <p className="font-bold text-white mt-0.5">{selectedVehicle.topSpeed}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white/50">{t.specsMileage}</p>
                    <p className="font-bold text-white mt-0.5">{selectedVehicle.mileage}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2.5">
                    {lang === 'ka' ? 'კომპლექტაცია' : 'Key Highlights'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedVehicle.features[lang].map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <p className="text-xs text-white/50">
                      {selectedVehicle.mode === 'vip' ? 'VIP Rate' : 'Price'}
                    </p>
                    <p className="text-2xl font-extrabold text-amber-400">
                      {selectedVehicle.mode === 'vip'
                        ? `$${selectedVehicle.hourlyRate} ${t.perHour}`
                        : `$${selectedVehicle.price.toLocaleString()}`}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedVehicle(null);
                      triggerToast(t.bookingSuccess);
                    }}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    {t.contactSeller}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCompareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCompareOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel border border-white/15 rounded-3xl max-w-4xl w-full p-6 overflow-x-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <GitCompareArrows className="w-5 h-5 text-amber-400" />
                  {t.compareTitle}
                </h3>
                <button
                  onClick={() => setIsCompareOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {comparedVehicles.map((car) => (
                  <div
                    key={car.id}
                    className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-3"
                  >
                    <img
                      src={car.image}
                      alt={car.model}
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <div>
                      <p className="text-xs text-amber-400 font-bold">{car.brand}</p>
                      <h4 className="font-bold text-white">{car.model}</h4>
                    </div>
                    <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                      <div className="flex justify-between">
                        <span className="text-white/50">{t.specsPower}</span>
                        <span className="font-bold text-amber-300">{car.horsepower} HP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">{t.specsAccel}</span>
                        <span className="font-bold">{car.zeroToHundred}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">{t.specsSpeed}</span>
                        <span className="font-bold">{car.topSpeed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">{t.specsFuel}</span>
                        <span className="font-bold">{car.fuel[lang]}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-2">
                        <span className="text-white/50">Price</span>
                        <span className="font-extrabold text-amber-400">
                          ${car.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isGarageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGarageOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0b0b10] border-l border-white/10 h-full p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="text-lg font-extrabold flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    {t.garageTitle}
                  </h3>
                  <button onClick={() => setIsGarageOpen(false)}>
                    <X className="w-5 h-5 text-white/60 hover:text-white" />
                  </button>
                </div>

                <div className="mt-5 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {favoriteVehicles.length === 0 ? (
                    <p className="text-sm text-white/50 py-10 text-center">{t.garageEmpty}</p>
                  ) : (
                    favoriteVehicles.map((car) => (
                      <div
                        key={car.id}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10"
                      >
                        <img
                          src={car.image}
                          alt={car.model}
                          className="w-20 h-14 object-cover rounded-xl"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-amber-400 font-bold">{car.brand}</p>
                          <p className="text-sm font-bold text-white truncate">{car.model}</p>
                          <p className="text-xs text-white/60">${car.price.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => toggleFavorite(car.id)}
                          className="p-2 text-white/50 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {favoriteVehicles.length > 0 && (
                <button
                  onClick={() => {
                    setIsGarageOpen(false);
                    triggerToast(t.bookingSuccess);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 text-black font-bold text-sm"
                >
                  {t.contactSeller}
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isConciergeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsConciergeOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-gold rounded-3xl max-w-md w-full p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  {t.conciergeTitle}
                </h3>
                <button onClick={() => setIsConciergeOpen(false)}>
                  <X className="w-5 h-5 text-white/60 hover:text-white" />
                </button>
              </div>
              <p className="text-xs text-white/70">{t.conciergeDesc}</p>

              <div className="space-y-2.5">
                {[
                  {
                    icon: Plane,
                    title:
                      lang === 'ka'
                        ? 'კერძო თვითმფრინავის & ვერტმფრენის ტრანსფერი'
                        : 'Private Jet & Heli-Pad Tarmac Transfer',
                  },
                  {
                    icon: ShieldAlert,
                    title:
                      lang === 'ka'
                        ? 'ბრონირებული ავტომობილი & ესკორტი'
                        : 'B6/B7 Armored Fleet & Diplomatic Escort',
                  },
                  {
                    icon: Sparkles,
                    title:
                      lang === 'ka'
                        ? 'ექსკლუზიური ავტომობილის ჩამოყვანა შეკვეთით'
                        : 'Bespoke Off-Market Collector Sourcing',
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsConciergeOpen(false);
                      triggerToast(t.bookingSuccess);
                    }}
                    className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-black/50 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400 text-left transition"
                  >
                    <item.icon className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-xs font-semibold text-white">{item.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.form
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleAddVehicle}
              className="glass-panel border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" />
                  {t.addCarTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNewMode('buy')}
                  className={`py-2.5 rounded-xl text-xs font-bold border ${
                    newMode === 'buy'
                      ? 'bg-white text-black border-white'
                      : 'bg-black/40 text-white/70 border-white/10'
                  }`}
                >
                  {t.modeBuy}
                </button>
                <button
                  type="button"
                  onClick={() => setNewMode('vip')}
                  className={`py-2.5 rounded-xl text-xs font-bold border ${
                    newMode === 'vip'
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'bg-black/40 text-white/70 border-white/10'
                  }`}
                >
                  {t.modeVip}
                </button>
              </div>

              <input
                required
                placeholder="Brand (e.g. Audi, Ferrari)"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
              />
              <input
                required
                placeholder="Model (e.g. RS7 Performance)"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
              />

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Year"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-amber-500"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-amber-500"
                />
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as 'sedan' | 'suv' | 'sport' | 'limo')
                  }
                  className="bg-black/50 border border-white/10 rounded-xl px-2 py-3 text-xs text-white outline-none focus:border-amber-500"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="sport">Sport</option>
                  <option value="limo">Limo</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition"
              >
                {t.addCarBtn}
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
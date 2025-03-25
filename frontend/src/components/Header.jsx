import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GlobeAltIcon, 
  Bars3Icon, 
  XMarkIcon,
  SpeakerWaveIcon,
  MicrophoneIcon,
  KeyIcon,
  AcademicCapIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { path: '/', label: 'Home', icon: GlobeAltIcon },
  { path: '/text-to-speech', label: 'Text to Speech', icon: SpeakerWaveIcon },
  { path: '/speech-to-text', label: 'Speech to Text', icon: MicrophoneIcon },
  { path: '/keyword-abstractor', label: 'Keyword Abstractor', icon: KeyIcon },
  { path: '/english-quiz', label: 'English Quiz', icon: AcademicCapIcon },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-sky-500/10 py-2' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition duration-500"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <GlobeAltIcon className="h-8 w-8 text-sky-400 relative animate-spin-slow group-hover:animate-none transform group-hover:scale-110 transition-all duration-300" />
            </motion.div>
            <div className="relative">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400 group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-sky-400 transition-all duration-500">
                TranslaterHUB
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                icon={item.icon}
                text={item.label}
                isActive={location.pathname === item.path}
              />
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-300 flex items-center space-x-2 group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <SparklesIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-slate-800/50 rounded-lg group-hover:bg-slate-700/50 transition-colors duration-300" />
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <XMarkIcon className="h-6 w-6 text-sky-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <Bars3Icon className="h-6 w-6 text-sky-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden mt-4"
            >
              <motion.nav 
                className="grid gap-2 p-4 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50"
              >
                {navItems.map((item) => (
                  <motion.div key={item.path} variants={itemVariants}>
                    <MobileNavLink 
                      to={item.path} 
                      icon={item.icon}
                      text={item.label}
                      isActive={location.pathname === item.path}
                      onClick={() => setMenuOpen(false)}
                    />
                  </motion.div>
                ))}
                <motion.button
                  variants={itemVariants}
                  className="w-full px-6 py-3 mt-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <SparklesIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function NavLink({ to, icon: Icon, text, isActive }) {
  return (
    <Link 
      to={to} 
      className={`relative px-4 py-2 rounded-xl group transition-all duration-300 ${
        isActive ? 'text-sky-400' : 'text-gray-300 hover:text-sky-400'
      }`}
    >
      <motion.div
        className="absolute inset-0 bg-sky-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
      <div className="relative flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span>{text}</span>
      </div>
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"
          layoutId="activeNavIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({ to, icon: Icon, text, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-sky-500/20 text-sky-400' 
          : 'hover:bg-slate-700/50 text-gray-300 hover:text-sky-400'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </Link>
  );
}
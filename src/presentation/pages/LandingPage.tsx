import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/logosynergy.png';
import { KominfoDashboard } from '../components/dashboard';

const LandingPage = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleKlikHere = () => {
    setShowDashboard(true);
  };

  return (
    <div className="relative h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 to-green-50">
      {/* Background decorative elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-green-300"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute bottom-0 left-0 h-48 w-48 -translate-x-24 translate-y-24 rounded-full bg-green-200"
      />

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <div className="text-2xl font-extrabold text-[#707070] underline underline-offset-8">
          <span className="text-[#259d84]">MY</span>SYAMRABU
        </div>
        <div className="z-10 flex items-center justify-center">
          <img
            src={Logo}
            alt="SYNERGY Logo"
            className="h-14 w-14 object-contain"
          />
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <motion.div
            key="landing-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            {/* Main Content */}
            <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6 text-center text-[#373737]"
              >
                <h1 className="mb-4 text-5xl font-bold tracking-wide md:text-6xl">
                  DASHBOARD DATA
                </h1>
                <p className="text-2xl md:text-3xl">
                  RSUD SYARIFAH AMBAMI RATO EBU BANGKALAN
                </p>
              </motion.div>

              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleKlikHere}
                className="group flex transform cursor-pointer items-center space-x-3 rounded-2xl bg-gradient-to-r from-[#30c2b7] via-[#70e1a6] to-[#96efc1] px-5 py-2 text-white transition-all duration-300 hover:from-[#2ab3a8] hover:via-[#65d99b] hover:to-[#8aebb6] hover:shadow-lg"
              >
                <span className="text-lg">Click Here</span>
                <motion.svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </motion.button>
            </div>

            {/* Wave */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-full rotate-180 overflow-hidden leading-none"
            >
              <svg
                className="relative block h-20 w-full sm:h-24 md:h-32"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  fill="url(#wave-gradient-1)"
                />
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  fill="url(#wave-gradient-2)"
                />
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  fill="url(#wave-gradient-3)"
                />

                <defs>
                  <linearGradient
                    id="wave-gradient-1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#30c2b7', stopOpacity: 0.25 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#96efc1', stopOpacity: 0.25 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="wave-gradient-2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#70e1a6', stopOpacity: 0.5 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#30c2b7', stopOpacity: 0.5 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="wave-gradient-3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#96efc1', stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#70e1a6', stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex h-full w-full flex-col"
          >
            <div className="z-50 min-h-screen flex-1">
              <KominfoDashboard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;

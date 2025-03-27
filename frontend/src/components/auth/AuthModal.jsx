import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  EnvelopeIcon,
  KeyIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../stores/userStore";
import { motion, AnimatePresence } from "framer-motion";

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-br from-sky-400 to-purple-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            y: [null, -20, null],
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { login, signup, loginWithGoogle, isLoading, error, resetError } =
    useUserStore();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const success = await (mode === "login"
      ? login(data.email, data.password)
      : signup(data.email, data.password));
    if (success) {
      reset();
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    resetError();
    reset();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          onClose();
          resetError();
          reset();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-lg" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-slate-800/90 backdrop-blur-xl p-8 text-left align-middle shadow-xl transition-all border border-slate-700/50 relative">
                {/* Particle effects */}
                <Particles />

                {/* Background video with enhanced overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-10"
                  >
                    <source
                      src="https://assets.codepen.io/2621168/abstract_animation.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-slate-800/50 to-purple-500/10" />

                  {/* Animated gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-purple-500/20 animate-gradient-xy opacity-30" />
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left side - Login form */}
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                      <Dialog.Title as="div">
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative"
                        >
                          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500">
                            Welcome Back
                          </h3>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-2 h-px bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500"
                          />
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-slate-400 text-sm mt-3"
                        >
                          Enter your credentials to access your account
                        </motion.p>
                      </Dialog.Title>

                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-colors"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm"
                        >
                          <p className="text-sm text-red-400">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-300 mb-2"
                        >
                          Email
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 rounded-xl opacity-50 group-hover:opacity-100 blur transition-opacity duration-500" />
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                              className={`block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border ${
                                errors.email
                                  ? "border-red-500/50"
                                  : "border-slate-700/50"
                              } text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                                errors.email
                                  ? "focus:ring-red-500/50"
                                  : "focus:ring-sky-500/50"
                              } focus:border-transparent transition-all duration-200`}
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-400"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-slate-300 mb-2"
                        >
                          Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 rounded-xl opacity-50 group-hover:opacity-100 blur transition-opacity duration-500" />
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <KeyIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 6,
                                  message:
                                    "Password must be at least 6 characters",
                                },
                              })}
                              className={`block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border ${
                                errors.password
                                  ? "border-red-500/50"
                                  : "border-slate-700/50"
                              } text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                                errors.password
                                  ? "focus:ring-red-500/50"
                                  : "focus:ring-sky-500/50"
                              } focus:border-transparent transition-all duration-200`}
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              <SparklesIcon className="h-5 w-5 text-slate-400 hover:text-sky-400 transition-colors" />
                            </button>
                          </div>
                        </div>
                        {errors.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-400"
                          >
                            {errors.password.message}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full relative py-3 px-4 rounded-xl text-white overflow-hidden group transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-102" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {isLoading ? (
                          <div className="relative flex items-center justify-center">
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                        ) : (
                          <span className="relative font-medium">
                            Login to Dashboard
                          </span>
                        )}
                      </motion.button>
                    </form>
                  </div>

                  {/* Right side - Welcome animation */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="hidden md:flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-sky-500/5 via-blue-500/5 to-purple-500/5 border border-slate-700/30"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="relative w-32 h-32 mb-8"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 animate-spin-slow blur-md" />
                      <div className="relative w-full h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 p-1">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                          <span className="text-4xl animate-bounce-gentle">
                            👋
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 mb-4 text-center">
                      Welcome Back!
                    </h3>
                    <p className="text-slate-400 text-center">
                      Access your dashboard to manage translations and settings.
                    </p>
                  </motion.div>
                </div>

                {/* Social login */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10 mt-8 text-center space-y-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-700/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-slate-800/90 text-slate-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full max-w-sm mx-auto py-3 px-4 bg-white hover:bg-gray-50 rounded-xl text-gray-800 font-medium transition-all duration-200 flex items-center justify-center space-x-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 w-3 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 transition-all duration-500 ease-out -translate-x-full group-hover:translate-x-full" />
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="relative">Continue with Google</span>
                  </motion.button>

                  <motion.button
                    onClick={switchMode}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sky-400 hover:text-sky-300 transition-colors text-sm"
                  >
                    {mode === "login"
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Log in"}
                  </motion.button>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AuthModal;
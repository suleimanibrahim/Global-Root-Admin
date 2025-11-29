import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden group/design-root">
      <div className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          
          {/* Left Panel (Visual) */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-gray-100 dark:bg-black/20 p-12 relative overflow-hidden">
             {/* Decorative Background glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl"></div>

            <div className="max-w-md w-full text-center relative z-10">
              <div className="flex justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-7xl">groups</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 font-display">
                Community Operations Hub
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-display text-lg">
                Manage your community with powerful and intuitive tools.
              </p>
              <div className="mt-12 aspect-square w-full shadow-2xl rounded-2xl overflow-hidden border border-white/10">
                <img
                  alt="Community Network Abstract"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvTwglzbRdf2aoZ_P176VvHARHTkR52uQTAgIZsp_gQJ48GwpnsejkiNP1t4GFFxEZohkyhMs_Q7Zqk0JbnXwBZ058LkJ1T2kKwgHHFgIPTcVI-SuQcPZvcHD6PlTx3i19iMfRCT4INPiWKDxmGTMFQIn0LBEvtBUoMR9VrgpA1vEfQ0QCr_tGoNvS-7M7np4TYtEdVZODZwAKIjx3zypTrTOlAjFpA1V8aiilJuXucivrIY6bfw_hvuTcSL7ezFERPfvsnhjpG8ld"
                />
              </div>
            </div>
          </div>

          {/* Right Panel (Form) */}
          <div className="flex items-center justify-center p-6 sm:p-12 bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-md">
              <div className="flex justify-center lg:hidden mb-6">
                <span className="material-symbols-outlined text-primary text-5xl">groups</span>
              </div>
              
              <div className="text-left">
                <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight font-display">Admin Login</h1>
                <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal mt-2 font-display">Welcome back, please enter your details.</p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="text-gray-800 dark:text-white text-sm font-medium leading-normal pb-2 font-display" htmlFor="email">Email / Username</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl">person</span>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      defaultValue="admin@communityhq.com"
                      required
                      className="form-input flex w-full rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-white/10 bg-white dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10 px-4 text-base font-normal font-display transition-all"
                      placeholder="Enter your email or username"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-800 dark:text-white text-sm font-medium leading-normal pb-2 font-display" htmlFor="password">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl">lock</span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      defaultValue="password123"
                      required
                      className="form-input flex w-full rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-white/10 bg-white dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10 pr-10 px-4 text-base font-normal font-display transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover underline font-display">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-all shadow-lg shadow-primary/25"
                >
                  Login
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-display">© 2024 CommunityHQ, Inc. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
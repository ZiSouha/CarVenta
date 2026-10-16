import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Activity, Loader2 } from 'lucide-react';

const Login = () => {

    const { setShowLogin, axios, setToken, navigate } = useAppContext()
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const { data } = await axios.post(`/api/user/${state}`, { name, email, password })

            if (data.success) {
                navigate('/')
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
                toast.success(state === "register" ? "Registration completed successfully!" : "Logged in successfully!")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Operation failed. Please check network connection.";
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div onClick={() => !isLoading && setShowLogin(false)} className='fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4'>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[440px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative"
            >
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0891b2]" />

                <div className='p-10 md:p-12 space-y-10'>
                    <div className='flex justify-between items-start'>
                        <div className='space-y-2'>
                            <div className="inline-flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <ShieldCheck size={10} className="text-[#0891b2]" /> Secure Registry Node
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                {state === "login" ? "Authentication." : "Registration."}
                            </h2>
                            <p className='text-slate-500 text-sm font-medium'>
                                {state === "login" ? "Initialize secondary security layer." : "Establish new network identity credentials."}
                            </p>
                        </div>
                        <button
                            disabled={isLoading}
                            className='text-slate-300 hover:text-slate-900 transition-colors p-2 disabled:opacity-40 disabled:cursor-not-allowed'
                            onClick={() => setShowLogin(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={onSubmitHandler} className='space-y-6'>
                        {state === "register" && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operator Name</label>
                                <div className='relative'>
                                    <User size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        disabled={isLoading}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3.5 text-slate-900 text-sm font-bold outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all placeholder:text-slate-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                        type="text"
                                        placeholder="Full Legal Name"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Email</label>
                            <div className='relative'>
                                <Mail size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    disabled={isLoading}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3.5 text-slate-900 text-sm font-bold outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all placeholder:text-slate-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                    type="email"
                                    placeholder="id@network.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Password</label>
                            <div className='relative'>
                                <Lock size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    disabled={isLoading}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3.5 text-slate-900 text-sm font-bold outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all placeholder:text-slate-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {state === "login" && (
                                <div className="flex justify-end pt-1">
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => { setShowLogin(false); navigate('/forgot-password') }}
                                        className="text-[10px] font-bold text-[#0891b2] hover:underline uppercase tracking-widest disabled:opacity-50"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className='pt-4'>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-[#0891b2] text-white font-black text-[11px] py-4 rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] ${
                                    isLoading
                                        ? 'opacity-75 cursor-wait'
                                        : 'active:scale-[0.98] hover:bg-[#0e7490]'
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>{state === "register" ? "Confirming Registration..." : "Authenticating..."}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{state === "register" ? "Confirm Registration" : "Execute Authentication"}</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-center pt-2">
                            {state === "register" ? (
                                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                                    Credentialed? <button type="button" onClick={() => setState("login")} className="text-[#0891b2] font-black hover:underline ml-1">Log in Registry</button>
                                </p>
                            ) : (
                                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                                    New Operator? <button type="button" onClick={() => setState("register")} className="text-[#0891b2] font-black hover:underline ml-1">Request Access</button>
                                </p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Decorative Background Skew */}
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-slate-50 -z-10 skew-x-12 translate-x-10 translate-y-10" />
            </motion.div>
        </div>
    )
}

export default Login

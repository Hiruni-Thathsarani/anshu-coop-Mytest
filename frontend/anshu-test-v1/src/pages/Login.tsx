import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UserIcon, LockIcon, AlertCircleIcon } from 'lucide-react'
interface LoginProps {
    onLogin: () => void
}
const Login = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!username.trim() || !password.trim()) {
            setError('Username and password are required')
            return
        }
        // For demo purposes, accept any non-empty username/password
        onLogin()
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{
                            scale: 0.9,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        className="text-2xl font-bold text-gray-800"
                    >
                        Patient Management System
                    </motion.h1>
                    <p className="text-gray-600 mt-2">Login to access your dashboard</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                height: 'auto',
                            }}
                            className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center"
                        >
                            <AlertCircleIcon className="w-5 h-5 mr-2" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-medium mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-medium mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <motion.button
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </motion.button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Demo credentials: any username and password will work</p>
                </div>
            </motion.div>
        </div>
    )
}
export default Login

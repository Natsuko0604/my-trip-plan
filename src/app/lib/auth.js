"use client"
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../lib/firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)

    const login = async () => {
        try {
            setLoginLoading(true)
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error('ログインエラー:', error)
            alert('ログインに失敗しました: ' + error.message)
        } finally {
            setLoginLoading(false)
        }
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        setMounted(true)
        return onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    const value = {
        currentUser,
        login,
        logout,
        loginLoading
    }

    if (!mounted) {
        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        )
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <p>loading...</p> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
"use client"
import { useAuth } from "./lib/auth";

export default function Home() {
  const { currentUser, login, logout, loginLoading } = useAuth()

  const handleLoginButton = () => {
    login()
  }

  const handleLogoutButton = () => {
    logout()
  }

  return (
    <div>
      <h1>Hello, next-auth</h1>
      {currentUser &&
      <div>
        <h2>ログインしています.</h2>
        <button onClick={handleLogoutButton}>ログアウト</button>
      </div>
      }
      {!currentUser &&
      <div>
        <h2>ログインしていません.</h2>
        <button 
          onClick={handleLoginButton} 
          disabled={loginLoading}
        >
          {loginLoading ? 'ログイン中...' : 'ログイン'}
        </button>
      </div>}
    </div>
  )
}
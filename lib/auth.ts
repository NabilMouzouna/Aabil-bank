"use client"

// Types
type User = {
  id: string
  name: string
  email: string
  password: string
  balance: number
}

type JwtPayload = {
  id: string
  name: string
  email: string
  exp: number
}

// Constants
const TOKEN_KEY = "aabil_token"

// Auth functions
export const register = async (name: string, email: string, password: string, initialBalance = 0): Promise<void> => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        initialBalance,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Erreur lors de l'inscription")
    }

    const data = await response.json()
    localStorage.setItem(TOKEN_KEY, data.token)
  } catch (error: any) {
    throw new Error(error.message || "Erreur lors de l'inscription")
  }
}

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Email ou mot de passe incorrect")
    }

    const data = await response.json()
    localStorage.setItem(TOKEN_KEY, data.token)
  } catch (error: any) {
    throw new Error(error.message || "Email ou mot de passe incorrect")
  }
}

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return false

  try {
    // Parse token
    const [, payloadBase64] = token.split('.')
    const payload = JSON.parse(atob(payloadBase64)) as JwtPayload
    
    // Check if token is expired
    if (payload.exp < Date.now()) {
      localStorage.removeItem(TOKEN_KEY)
      return false
    }
    return true
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY)
    return false
  }
}


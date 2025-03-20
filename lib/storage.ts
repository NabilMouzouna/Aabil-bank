"use client"

// Types
type Transaction = {
  id: string
  userId: string
  type: "deposit" | "withdraw" | "transfer"
  amount: number
  date: string
  recipientId?: string
}

// Constants
const TOKEN_KEY = "aabil_token"

// Helper functions for client-side storage
export const getUserData = async (): Promise<{ id: string; name: string; email: string; balance: number } | null> => {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null

  try {
    // Parse token
    const payload = JSON.parse(atob(token.split('.')[1])) as { id: string; name: string; email: string; exp: number }
    // Check if token is expired
    if (payload.exp < Date.now()) {
      localStorage.removeItem(TOKEN_KEY)
      return null
    }

    // Fetch user data from API
    const response = await fetch(`/api/users/${payload.id}`)
    const data = await response.json()

    if (!data || data.message) {
      localStorage.removeItem(TOKEN_KEY)
      return null
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      balance: data.balance,
    }
  } catch (error) {
    console.error('Error getting user data:', error)
    localStorage.removeItem(TOKEN_KEY)
    return null
  }
}

// User functions
export const updateUserProfile = async (name: string, email: string): Promise<void> => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    throw new Error("Utilisateur non connecté")
  }

  try {
    const payload = JSON.parse(token) as { id: string }

    const response = await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: payload.id,
        name,
        email,
      }),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du profil")
    }
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour du profil")
  }
}

// Transaction functions
export const makeTransaction = async (
  type: "deposit" | "withdraw" | "transfer",
  amount: number,
  recipientId?: string,
): Promise<void> => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    throw new Error("Utilisateur non connecté")
  }

  try {
    // Parse JWT token
    const [, payloadBase64] = token.split('.')
    const payload = JSON.parse(atob(payloadBase64)) as { id: string }

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: payload.id,
        type,
        amount,
        recipientId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Une erreur s'est produite")
    }
  } catch (error: any) {
    throw new Error(error.message || "Une erreur s'est produite")
  }
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    return []
  }

  try {
    // Parse JWT token
    const [, payloadBase64] = token.split('.')
    const payload = JSON.parse(atob(payloadBase64)) as { id: string }

    const response = await fetch(`/api/transactions/${payload.id}`)
    if (!response.ok) {
      return []
    }

    const transactions = await response.json()
    return transactions
  } catch (error) {
    console.error('Error getting transactions:', error)
    return []
  }
}


import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// Helper function to create JWT token
function createJWT(payload: any): string {
  // Create JWT parts
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }
  
  // Base64 encode the parts
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  // For demo purposes, using a simple signature (in production, use a proper JWT library)
  const signature = Buffer.from('signature').toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  // Combine all parts
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Rechercher l'utilisateur
    const users = await query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`)

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ message: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    const user = users[0] as any

    // Générer un token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 jours
    }

    const token = createJWT(payload)

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return NextResponse.json({ message: "Erreur lors de la connexion" }, { status: 500 })
  }
}


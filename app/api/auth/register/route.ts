import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
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
    const { name, email, password, initialBalance } = await request.json()

    // Vérifier si l'utilisateur existe déjà
    const existingUsers = await query(`SELECT * FROM users WHERE email = '${email}'`)

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 400 })
    }

    // Créer un nouvel utilisateur
    const userId = uuidv4()
    await query(
      `INSERT INTO users (id, name, email, password, balance) 
       VALUES ('${userId}', '${name}', '${email}', '${password}', ${initialBalance})`,
    )

    // Générer un token
    const payload = {
      id: userId,
      name,
      email,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 jours
    }

    const token = createJWT(payload)

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json({ message: "Erreur lors de l'inscription" }, { status: 500 })
  }
}


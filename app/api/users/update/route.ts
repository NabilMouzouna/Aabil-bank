import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { id, name, email } = await request.json()

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    const existingUsers = await query(`SELECT * FROM users WHERE email = '${email}' AND id != '${id}'`)

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json({ message: "Cet email est déjà utilisé par un autre utilisateur" }, { status: 400 })
    }

    // Mettre à jour le profil utilisateur
    await query(`UPDATE users SET name = '${name}', email = '${email}' WHERE id = '${id}'`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error)
    return NextResponse.json({ message: "Erreur lors de la mise à jour du profil" }, { status: 500 })
  }
}


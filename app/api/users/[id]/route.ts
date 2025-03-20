import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)

    // Récupérer les données de l'utilisateur
    const users = await query(`SELECT * FROM users WHERE id = '${id}'`)

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    const user = users[0] as any

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      balance: Number.parseFloat(user.balance),
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur:", error)
    return NextResponse.json({ message: "Erreur lors de la récupération des données utilisateur" }, { status: 500 })
  }
}


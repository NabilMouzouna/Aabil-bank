import { NextResponse } from "next/server"
import { initDatabase } from "@/lib/db"

export async function GET() {
  try {
    await initDatabase()
    return NextResponse.json({ message: "Base de données initialisée avec succès" })
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error)
    return NextResponse.json({ message: "Erreur lors de l'initialisation de la base de données" }, { status: 500 })
  }
}


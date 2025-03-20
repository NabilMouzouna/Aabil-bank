import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { query } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, type, amount, recipientId } = await request.json()

    // Vérifier si l'utilisateur existe
    const users = await query(`SELECT * FROM users WHERE id = '${userId}'`)

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    const user = users[0] as any
    const userBalance = Number.parseFloat(user.balance)

    // Vérifier si l'utilisateur a suffisamment de solde pour un retrait ou un virement
    if ((type === "withdraw" || type === "transfer") && userBalance < amount) {
      return NextResponse.json({ message: "Solde insuffisant" }, { status: 400 })
    }

    // Pour les virements, vérifier si le destinataire existe
    if (type === "transfer") {
      if (!recipientId) {
        return NextResponse.json({ message: "ID du destinataire requis" }, { status: 400 })
      }

      if (recipientId === userId) {
        return NextResponse.json(
          { message: "Vous ne pouvez pas effectuer un virement vers votre propre compte" },
          { status: 400 },
        )
      }

      const recipients = await query(`SELECT * FROM users WHERE id = '${recipientId}'`)

      if (!Array.isArray(recipients) || recipients.length === 0) {
        return NextResponse.json({ message: "Destinataire non trouvé" }, { status: 404 })
      }
    }

    // Mettre à jour les soldes
    if (type === "deposit") {
      await query(`UPDATE users SET balance = balance + ${amount} WHERE id = '${userId}'`)
    } else if (type === "withdraw") {
      await query(`UPDATE users SET balance = balance - ${amount} WHERE id = '${userId}'`)
    } else if (type === "transfer") {
      // Update sender's balance
      await query(`UPDATE users SET balance = balance - ${amount} WHERE id = '${userId}'`)
      // Update recipient's balance
      await query(`UPDATE users SET balance = balance + ${amount} WHERE id = '${recipientId}'`)
    }

    // Créer l'enregistrement de transaction
    const transactionId = uuidv4()
    await query(
      `INSERT INTO transactions (id, user_id, type, amount, recipient_id) 
       VALUES ('${transactionId}', '${userId}', '${type}', ${amount}, ${recipientId ? `'${recipientId}'` : "NULL"})`,
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la transaction:", error)
    return NextResponse.json({ message: "Erreur lors de la transaction" }, { status: 500 })
  }
}


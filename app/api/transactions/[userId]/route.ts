import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params

    // Récupérer les transactions de l'utilisateur
    const transactions = await query(`
      SELECT t.*, 
             u.name as recipient_name 
      FROM transactions t 
      LEFT JOIN users u ON t.recipient_id = u.id 
      WHERE t.user_id = '${userId}' 
      ORDER BY t.date DESC
    `)

    if (!Array.isArray(transactions)) {
      return NextResponse.json([])
    }

    // Formater les transactions
    const formattedTransactions = transactions.map((transaction: any) => ({
      id: transaction.id,
      userId: transaction.user_id,
      type: transaction.type,
      amount: Number.parseFloat(transaction.amount),
      date: transaction.date,
      recipientId: transaction.recipient_id,
      recipientName: transaction.recipient_name
    }))

    return NextResponse.json(formattedTransactions)
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions:", error)
    return NextResponse.json({ message: "Erreur lors de la récupération des transactions" }, { status: 500 })
  }
}


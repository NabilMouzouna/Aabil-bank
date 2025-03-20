"use client"

import { jsPDF } from "jspdf"
import { getTransactions } from "./storage"

export const generatePDF = async (userData: { id: string; name: string; email: string; balance: number }) => {
  try {
    const doc = new jsPDF()
    const transactions = await getTransactions()
    const currentDate = new Date().toLocaleDateString("fr-FR")

    // Add bank logo and header
    doc.setFontSize(22)
    doc.setTextColor(41, 98, 255) // Primary color
    doc.text("Aabil Banking", 105, 20, { align: "center" })

    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text("Relevé de compte", 105, 30, { align: "center" })
    doc.text(`Date d'émission: ${currentDate}`, 105, 35, { align: "center" })

    // Add line separator
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 40, 190, 40)

    // Add account information
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text("Informations du compte", 20, 50)

    doc.setFontSize(10)
    doc.text(`Titulaire: ${userData.name}`, 20, 60)
    doc.text(`Email: ${userData.email}`, 20, 65)
    doc.text(`ID du compte: ${userData.id}`, 20, 70)
    doc.text(`Solde actuel: MAD ${userData.balance.toFixed(2)}`, 20, 75)

    // Add line separator
    doc.line(20, 85, 190, 85)

    // Add transactions
    doc.setFontSize(14)
    doc.text("Historique des transactions", 20, 95)

    if (transactions.length === 0) {
      doc.setFontSize(10)
      doc.text("Aucune transaction à afficher", 20, 105)
    } else {
      // Add table header
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("Date", 20, 105)
      doc.text("Type", 70, 105)
      doc.text("Montant (MAD)", 120, 105)
      doc.text("Détails", 160, 105)

      // Add line separator
      doc.line(20, 108, 190, 108)

      // Add transactions
      doc.setFont("helvetica", "normal")
      let y = 115

      // Only show up to 20 transactions to fit on the page
      const transactionsToShow = transactions.slice(0, 20)

      transactionsToShow.forEach((transaction) => {
        const date = new Date(transaction.date).toLocaleDateString("fr-FR")

        let type = ""
        if (transaction.type === "deposit") {
          type = "Dépôt"
        } else if (transaction.type === "withdraw") {
          type = "Retrait"
        } else {
          type = "Virement"
        }

        const amount = transaction.amount.toFixed(2)

        let details = ""
        if (transaction.type === "transfer" && transaction.recipientId) {
          details = `Vers: ${transaction.recipientId.substring(0, 8)}...`
        }

        doc.text(date, 20, y)
        doc.text(type, 70, y)
        doc.text(amount, 120, y)
        doc.text(details, 160, y)

        y += 8

        // Add a line separator between transactions
        if (y < 270) {
          // Ensure we don't draw lines off the page
          doc.setDrawColor(240, 240, 240)
          doc.line(20, y - 4, 190, y - 4)
        }
      })
    }

    // Add footer
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 270, 190, 270)

    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text("Aabil Banking - Document généré automatiquement", 105, 280, { align: "center" })

    // Save the PDF
    doc.save(`aabil_releve_${userData.name.replace(/\s+/g, "_")}_${currentDate.replace(/\//g, "-")}.pdf`)
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error)
    alert("Une erreur s'est produite lors de la génération du PDF. Veuillez réessayer.")
  }
}


"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { makeTransaction } from "@/lib/storage"

type TransactionType = "deposit" | "withdraw" | "transfer"

export function TransactionForm() {
  const router = useRouter()
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [transactionType, setTransactionType] = useState<TransactionType>("deposit")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const amount = Number.parseFloat(formData.get("amount") as string)
    const recipientId = formData.get("recipientId") as string

    if (isNaN(amount) || amount <= 0) {
      setError("Veuillez entrer un montant valide")
      setIsLoading(false)
      return
    }

    if (transactionType === "transfer" && !recipientId) {
      setError("Veuillez entrer l'ID du destinataire")
      setIsLoading(false)
      return
    }

    try {
      await makeTransaction(transactionType, amount, recipientId)

      // Reset form first, before any other operations
      if (formRef.current) {
        formRef.current.reset()
      }

      toast({
        title: "Transaction réussie",
        description: `Votre ${transactionType === "deposit" ? "dépôt" : transactionType === "withdraw" ? "retrait" : "virement"} de MAD ${amount.toFixed(2)} a été effectué avec succès.`,
        variant: "default",
      })

      // Force a refresh of the page to update all components
      router.refresh()
      window.location.reload()
    } catch (error: any) {
      setError(error.message || "Une erreur s'est produite")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-t-4 border-t-primary shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Nouvelle transaction</CardTitle>
        <CardDescription>Effectuez un dépôt, un retrait ou un virement</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 rounded-md flex items-center gap-2">
            <span className="bg-destructive/20 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 4V8M8 12H8.01M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {error}
          </div>
        )}
        <form id="transaction-form" ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Type de transaction</Label>
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                  transactionType === "deposit"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
                onClick={() => setTransactionType("deposit")}
              >
                <ArrowDownLeft
                  className={`h-5 w-5 mb-1 ${transactionType === "deposit" ? "text-primary" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-sm font-medium ${transactionType === "deposit" ? "text-primary" : "text-muted-foreground"}`}
                >
                  Dépôt
                </span>
              </div>
              <div
                className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                  transactionType === "withdraw"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
                onClick={() => setTransactionType("withdraw")}
              >
                <ArrowUpRight
                  className={`h-5 w-5 mb-1 ${transactionType === "withdraw" ? "text-primary" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-sm font-medium ${transactionType === "withdraw" ? "text-primary" : "text-muted-foreground"}`}
                >
                  Retrait
                </span>
              </div>
              <div
                className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                  transactionType === "transfer"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
                onClick={() => setTransactionType("transfer")}
              >
                <RefreshCw
                  className={`h-5 w-5 mb-1 ${transactionType === "transfer" ? "text-primary" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-sm font-medium ${transactionType === "transfer" ? "text-primary" : "text-muted-foreground"}`}
                >
                  Virement
                </span>
              </div>
              <input type="hidden" name="transactionType" value={transactionType} />
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-sm font-medium">
              Montant (MAD)
            </Label>
            <div className="relative">
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="pl-12 h-11 text-lg"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground font-medium">
                MAD
              </div>
            </div>
          </div>
          {transactionType === "transfer" && (
            <div className="space-y-3">
              <Label htmlFor="recipientId" className="text-sm font-medium">
                ID du destinataire
              </Label>
              <Input
                id="recipientId"
                name="recipientId"
                placeholder="Entrez l'ID du compte destinataire"
                className="h-11"
                required
              />
              <p className="text-xs text-muted-foreground">L'ID du compte se trouve sur le profil du destinataire.</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="pt-3">
        <Button
          type="submit"
          form="transaction-form"
          disabled={isLoading}
          className="w-full h-11 text-base font-medium"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Traitement en cours...
            </>
          ) : (
            `Confirmer la ${transactionType === "deposit" ? "dépôt" : transactionType === "withdraw" ? "retrait" : "virement"}`
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}


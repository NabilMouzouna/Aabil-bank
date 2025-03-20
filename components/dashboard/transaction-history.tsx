"use client"

import { useEffect, useState } from "react"
import { ArrowDownLeft, ArrowUpRight, RefreshCw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTransactions } from "@/lib/storage"

type Transaction = {
  id: string
  type: "deposit" | "withdraw" | "transfer"
  amount: number
  date: string
  recipientId?: string
  recipientName?: string
}

type TransactionFilter = "all" | "deposit" | "withdraw" | "transfer"

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<TransactionFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadTransactions()
  }, [])

  useEffect(() => {
    let filtered = [...transactions]

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter((t) => t.type === filter)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((t) => {
        const amount = t.amount.toString()
        const date = formatDate(t.date)
        const type = t.type === "deposit" ? "dépôt" : t.type === "withdraw" ? "retrait" : "virement"
        return amount.includes(query) || date.includes(query) || type.includes(query)
      })
    }

    setFilteredTransactions(filtered)
  }, [transactions, filter, searchQuery])

  const loadTransactions = async () => {
    setIsLoading(true)
    try {
      const data = await getTransactions()
      setTransactions(data)
    } catch (error) {
      console.error("Erreur lors du chargement des transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card className="border-t-4 border-t-primary shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-xl font-semibold">Historique des transactions</CardTitle>
          <CardDescription>Vos transactions récentes</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={loadTransactions}>
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Rafraîchir</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une transaction..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={(value: TransactionFilter) => setFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="deposit">Dépôts</SelectItem>
                <SelectItem value="withdraw">Retraits</SelectItem>
                <SelectItem value="transfer">Virements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <svg
              className="animate-spin h-6 w-6 text-primary"
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
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium">Aucune transaction</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery
                ? "Aucune transaction ne correspond à votre recherche."
                : filter !== "all"
                ? "Aucune transaction de ce type."
                : "Vous n'avez pas encore effectué de transactions."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`rounded-full p-2 ${
                      transaction.type === "deposit"
                        ? "bg-green-100 text-green-600"
                        : transaction.type === "withdraw"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {transaction.type === "deposit" ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : transaction.type === "withdraw" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {transaction.type === "deposit"
                        ? "Dépôt"
                        : transaction.type === "withdraw"
                          ? "Retrait"
                          : `Virement vers ${transaction.recipientName || transaction.recipientId?.substring(0, 8) + '...'}`}
                    </div>
                    <div className="text-xs text-muted-foreground">{formatDate(transaction.date)}</div>
                  </div>
                </div>
                <div className={`font-medium ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "deposit" ? "+" : "-"}MAD {transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


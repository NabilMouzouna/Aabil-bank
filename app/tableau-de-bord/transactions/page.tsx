import { TransactionForm } from "@/components/dashboard/transaction-form"
import { TransactionHistory } from "@/components/dashboard/transaction-history"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">
            Effectuez des virements, des dépôts ou des retraits et consultez votre historique de transactions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <TransactionForm />
          <TransactionHistory />
        </div>
      </div>
    </DashboardLayout>
  )
}


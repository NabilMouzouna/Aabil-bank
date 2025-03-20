import { AccountSummary } from "@/components/dashboard/account-summary"
import { TransactionForm } from "@/components/dashboard/transaction-form"
import { TransactionHistory } from "@/components/dashboard/transaction-history"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord. Consultez votre solde et effectuez des transactions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <AccountSummary />
            <TransactionForm />
          </div>
          <TransactionHistory />
        </div>
      </div>
    </DashboardLayout>
  )
}


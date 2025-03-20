import { ProfileForm } from "@/components/dashboard/profile-form"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profil</h2>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et téléchargez vos relevés bancaires.
          </p>
        </div>
        <ProfileForm />
      </div>
    </DashboardLayout>
  )
}


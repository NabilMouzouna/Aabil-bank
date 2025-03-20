"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, CreditCard, LogOut, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getUserData } from "@/lib/storage"
import { logout } from "@/lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData()
      if (!userData) {
        router.push("/connexion")
      } else {
        setUserName(userData.name)
      }
    }
    fetchUserData()
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/connexion")
  }

  const navigation = [
    {
      name: "Tableau de bord",
      href: "/tableau-de-bord",
      icon: BarChart3,
      current: pathname === "/tableau-de-bord",
    },
    {
      name: "Transactions",
      href: "/tableau-de-bord/transactions",
      icon: CreditCard,
      current: pathname === "/tableau-de-bord/transactions",
    },
    {
      name: "Profil",
      href: "/tableau-de-bord/profil",
      icon: User,
      current: pathname === "/tableau-de-bord/profil",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <CreditCard className="h-6 w-6 text-primary" />
            <span>Aabil</span>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex items-center gap-2 font-bold text-xl mb-8">
                <CreditCard className="h-6 w-6 text-primary" />
                <span>Aabil</span>
              </div>
              <nav className="grid gap-2 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md ${
                      item.current ? "bg-muted" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md text-destructive hover:bg-muted"
                >
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </button>
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  item.current ? "text-primary" : "hover:text-primary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm font-medium">Bonjour, {userName}</div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">{children}</main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <CreditCard className="h-6 w-6 text-primary" />
            <span>Aabil</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Aabil Banking. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}


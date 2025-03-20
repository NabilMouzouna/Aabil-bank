"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Download, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserData, updateUserProfile } from "@/lib/storage"
import { generatePDF } from "@/lib/pdf"

export function ProfileForm() {
  const { toast } = useToast()
  const [userData, setUserData] = useState<{
    name: string
    email: string
    id: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData()
      if (data) {
        setUserData(data)
      }
    }
    fetchUserData()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setMessage({ type: "", text: "" })

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    try {
      await updateUserProfile(name, email)
      setUserData((prev) => (prev ? { ...prev, name, email } : null))

      toast({
        title: "Profil mis à jour",
        description: "Vos informations personnelles ont été mises à jour avec succès.",
        variant: "default",
      })

      setMessage({ type: "success", text: "Profil mis à jour avec succès" })
    } catch (error) {
      setMessage({ type: "error", text: "Une erreur s'est produite" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (userData) {
      try {
        toast({
          title: "Génération du PDF",
          description: "Votre relevé est en cours de téléchargement...",
          variant: "default",
        })
        const currentData = await getUserData()
        if (currentData) {
          generatePDF({ ...userData, balance: currentData.balance })
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de générer le PDF. Veuillez réessayer.",
          variant: "destructive",
        })
      }
    }
  }

  if (!userData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chargement...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
        </CardHeader>
        <CardContent>
          {message.text && (
            <div
              className={`mb-4 p-3 text-sm rounded-md ${
                message.type === "success" ? "text-green-500 bg-green-500/10" : "text-destructive bg-destructive/10"
              }`}
            >
              {message.text}
            </div>
          )}
          <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID du compte</Label>
              <Input id="id" value={userData.id} disabled />
              <p className="text-sm text-muted-foreground">Votre identifiant unique pour recevoir des virements</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" name="name" defaultValue={userData.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={userData.email} required />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" form="profile-form" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents bancaires</CardTitle>
          <CardDescription>Téléchargez vos relevés et documents bancaires</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Relevé de compte</h3>
                  <p className="text-sm text-muted-foreground">Téléchargez un PDF avec vos informations bancaires</p>
                </div>
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


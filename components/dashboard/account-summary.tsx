"use client"

import { useEffect, useState } from "react"
import { Download, Wallet, Copy, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserData } from "@/lib/storage"
import { generatePDF } from "@/lib/pdf"

export function AccountSummary() {
  const { toast } = useToast()
  const [userData, setUserData] = useState<{
    name: string
    email: string
    balance: number
    id: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData()
      if (data) {
        setUserData(data)
      }
    }
    fetchUserData()
  }, [])

  const handleDownloadPDF = () => {
    if (userData) {
      try {
        toast({
          title: "Génération du PDF",
          description: "Votre relevé est en cours de téléchargement...",
          variant: "default",
        })
        generatePDF(userData)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de générer le PDF. Veuillez réessayer.",
          variant: "destructive",
        })
      }
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for non-HTTPS environments
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }

      setCopied(true)
      toast({
        title: "ID copié",
        description: "L'ID du compte a été copié dans le presse-papiers.",
        variant: "default",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
      toast({
        title: "Erreur",
        description: "Impossible de copier l'ID. Veuillez réessayer.",
        variant: "destructive",
      })
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
    <Card className="border-t-4 border-t-primary shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Résumé du compte</CardTitle>
            <CardDescription>Votre solde actuel et informations de compte</CardDescription>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Solde disponible</div>
          <div className="text-3xl font-bold text-primary">MAD {(userData?.balance ?? 0).toFixed(2)}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">ID du compte</div>
            <div
              className="font-medium bg-muted p-2 rounded-md text-sm overflow-hidden text-ellipsis flex items-center justify-between cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => copyToClipboard(userData.id)}
              title="Cliquer pour copier"
            >
              <span className="truncate">{userData.id}</span>
              {copied ? (
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Titulaire</div>
            <div className="font-medium bg-muted p-2 rounded-md text-sm">{userData.name}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDownloadPDF} className="w-full" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Télécharger le relevé
        </Button>
      </CardFooter>
    </Card>
  )
}


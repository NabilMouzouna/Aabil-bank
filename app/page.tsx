import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <CreditCard className="h-6 w-6 text-primary" />
            <span>Aabil</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Accueil
            </Link>
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Fonctionnalités
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Témoignages
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/connexion">
              <Button variant="outline">Connexion</Button>
            </Link>
            <Link href="/inscription">
              <Button>S'inscrire</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Bienvenue chez Aabil Banking
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Votre partenaire financier de confiance. Gérez vos finances en toute simplicité avec notre
                    plateforme bancaire sécurisée et élégante.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/inscription">
                    <Button size="lg" className="gap-1">
                      Commencer maintenant
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-background p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Solde du compte</div>
                      <div className="text-3xl font-bold">MAD 24,500.00</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Revenus</div>
                        <div className="text-xl font-medium text-green-500">+MAD 2,500.00</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Dépenses</div>
                        <div className="text-xl font-medium text-red-500">-MAD 1,200.00</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Transactions récentes</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Café Parisien</div>
                          <div className="text-sm font-medium text-red-500">-MAD 4.50</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Salaire</div>
                          <div className="text-sm font-medium text-green-500">+MAD 2,500.00</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Supermarché</div>
                          <div className="text-sm font-medium text-red-500">-MAD 78.25</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Fonctionnalités
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Tout ce dont vous avez besoin</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez les fonctionnalités qui font d'Aabil votre meilleur choix pour la gestion de vos finances.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Transactions Faciles</h3>
                  <p className="text-muted-foreground">
                    Effectuez des virements, des dépôts et des retraits en quelques clics.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Sécurité Maximale</h3>
                  <p className="text-muted-foreground">
                    Vos données sont protégées par les technologies de sécurité les plus avancées.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Suivi Financier</h3>
                  <p className="text-muted-foreground">
                    Visualisez et analysez vos finances avec des rapports détaillés et téléchargeables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Témoignages
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ce que disent nos clients</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez pourquoi nos clients nous font confiance pour leurs besoins bancaires.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "Aabil a complètement transformé ma façon de gérer mes finances. L'interface est intuitive et les
                    fonctionnalités sont exactement ce dont j'avais besoin."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted p-1">
                    <div className="h-8 w-8 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Sophie Martin</div>
                    <div className="text-sm text-muted-foreground">Entrepreneur</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "La sécurité et la facilité d'utilisation d'Aabil sont incomparables. Je peux gérer mon argent en
                    toute confiance et avec une grande simplicité."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted p-1">
                    <div className="h-8 w-8 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Thomas Dubois</div>
                    <div className="text-sm text-muted-foreground">Ingénieur</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Contactez-nous</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Vous avez des questions? Notre équipe est là pour vous aider. Contactez-nous dès aujourd'hui.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link href="mailto:contact@aabil.com">
                <Button size="lg">Envoyer un email</Button>
              </Link>
              <Link href="tel:+33123456789">
                <Button size="lg" variant="outline">
                  Appeler
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <CreditCard className="h-6 w-6 text-primary" />
            <span>Aabil</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Aabil Banking. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Conditions d'utilisation
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


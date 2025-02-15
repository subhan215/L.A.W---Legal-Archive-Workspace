import Button from "../../components/ui/CustomButton"
import Input from "@/components/ui/input"
import { CaseCard } from "@/components/ui/case-card"
import { DashboardHeader } from "../../components/ui/dashboard_headers"
import { Search } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Public Cases</h1>
          <Button>Create Collection</Button>
        </div>
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search cases by name, tags, or legal category..." className="pl-10" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CaseCard key={i} />
          ))}
        </div>
      </main>
    </div>
  )
}


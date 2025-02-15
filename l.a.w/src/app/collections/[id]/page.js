import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { Download, Lock, Globe } from "lucide-react"

export default function CollectionDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Smith vs. State of California</h1>
            <Badge variant="outline">
              <Lock className="w-3 h-3 mr-1" />
              Private
            </Badge>
          </div>
          <div className="flex gap-2 mb-4">
            <Badge>Criminal Law</Badge>
            <Badge>Supreme Court</Badge>
            <Badge>2023</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            A landmark case discussing the implications of digital privacy rights in modern law enforcement.
          </p>
          <div className="flex gap-4">
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download Documents
            </Button>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Make Public
            </Button>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Case Summary</h2>
            <p className="text-muted-foreground">
              This case examines the intersection of Fourth Amendment rights and digital surveillance, specifically
              addressing the use of advanced tracking technologies by law enforcement agencies. The Supreme Court's
              decision establishes new precedents for privacy protections in the digital age, balancing public safety
              concerns with individual privacy rights.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Document {i + 1}.pdf</h3>
                    <p className="text-sm text-muted-foreground">Added on Jan 15, 2024</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


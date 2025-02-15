import Button from "../../components/ui/CustomButton"
import Input from "../../components/ui/input"
import Label from "../../components/ui/label"
import { Separator } from "../../components/ui/seperator"
import { DashboardHeader } from "../../components/ui/dashboard_headers"
import { CaseCard } from "../../components/ui/case-card"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
          <div className="grid gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john@example.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input id="profession" defaultValue="Attorney" />
                </div>
                <Button className="w-fit">Update Profile</Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Recent Collections</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CaseCard key={i} isPrivate={i % 2 === 0} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


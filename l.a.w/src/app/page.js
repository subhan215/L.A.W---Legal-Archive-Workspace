import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/courthouse.jpg")',
      }}
    >
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">CaseVault</h1>
        <p className="text-xl md:text-2xl mb-8">Your Secure Legal Document Repository</p>
        <p className="text-lg md:text-xl mb-12 text-gray-200">
          Store, manage, and access your legal documents with confidence. Built for lawyers, law students, and legal
          professionals.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/dashboard">Explore Cases</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


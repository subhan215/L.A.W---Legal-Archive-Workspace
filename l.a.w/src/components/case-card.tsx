import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Lock, Globe } from "lucide-react"

interface CaseCardProps {
  isPrivate?: boolean
}

export function CaseCard({ isPrivate = false }: CaseCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Badge variant="outline">
          {isPrivate ? (
            <>
              <Lock className="w-3 h-3 mr-1" />
              Private
            </>
          ) : (
            <>
              <Globe className="w-3 h-3 mr-1" />
              Public
            </>
          )}
        </Badge>
        <Badge>Criminal Law</Badge>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">Smith vs. State of California</h3>
        <p className="text-sm text-muted-foreground">
          A landmark case discussing the implications of digital privacy rights in modern law enforcement.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/collections/1">View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


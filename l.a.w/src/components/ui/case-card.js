"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Button from "./CustomButton"
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Lock, Globe } from "lucide-react";

export function CaseCard({ title, isPrivate, link ,desc}) {
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
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
         {desc}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Link href={link}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

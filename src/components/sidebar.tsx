"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Settings, BarChart3, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "Booking",
    href: "/booking",
    icon: Calendar,
  },
  {
    name: "Customer",
    href: "/customer",
    icon: Users,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Setting",
    href: "/setting",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card shadow-sm border-r border-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold text-foreground">Booking System</span>
        </div>

        <nav className="space-y-2 mb-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const IconComponent = item.icon

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-3", isActive && "bg-secondary")}
                >
                  <IconComponent className="h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}

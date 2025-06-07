"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, DollarSign, TrendingUp, Bell, X, Plus, CreditCard, UserPlus } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("notification")

  const notifications = [
    {
      id: 1,
      type: "cancellation",
      title: "Booking Cancellation",
      description: "john smith has cancelled their booking for tommorrow at 2:00 PM",
      time: "10 minutes ago",
      icon: X,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: 2,
      type: "booking",
      title: "New Booking",
      description: "Sarah Johnson has made anew booking on friday 10:00 AM",
      time: "1 hour ago",
      icon: Plus,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      description: "You've received a payment of $ 150 from Micheal Brown",
      time: "3 hours ago",
      icon: CreditCard,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 4,
      type: "customer",
      title: "New Costumers",
      description: "Emma Wilson has created a new account",
      time: "5 hours ago",
      icon: UserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <Button size="icon" variant="outline" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Up coming bookings</CardTitle>
            <CalendarDays className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ 2,350</div>
            <p className="text-xs text-gray-500">3 payments awaiting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ 12,234</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={activeTab === "notification" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("notification")}
              >
                Notification
              </Button>
              <Button
                variant={activeTab === "today" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("today")}
              >
                Today booking
              </Button>
            </div>
            <Link href="/notifications">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Notification</h3>
              <span className="text-sm text-gray-500">You have 4 unread notifications</span>
            </div>

            <div className="space-y-4">
              {notifications.slice(0, 3).map((notification) => {
                const IconComponent = notification.icon
                return (
                  <div key={notification.id} className="flex items-start gap-4 p-4 rounded-lg border bg-white">
                    <div className={`p-2 rounded-full ${notification.iconBg}`}>
                      <IconComponent className={`h-5 w-5 ${notification.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{notification.title}</h4>
                        <Badge variant="secondary" className="bg-black text-white">
                          New
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      <p className="text-xs text-muted-foreground/60 mt-2">{notification.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-center">
              <Link href="/notifications">
                <Button variant="outline" size="sm">
                  View All Notifications
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

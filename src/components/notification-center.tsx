"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Bell,
  X,
  Plus,
  CreditCard,
  UserPlus,
  Check,
  Trash2,
  Search,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
} from "lucide-react"

interface Notification {
  id: number
  type: "cancellation" | "booking" | "payment" | "customer" | "reminder" | "system"
  title: string
  description: string
  time: string
  isRead: boolean
  isNew: boolean
  priority: "low" | "medium" | "high"
  actionRequired?: boolean
  relatedId?: number
  relatedType?: "booking" | "customer" | "payment"
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  bookingReminders: boolean
  paymentAlerts: boolean
  systemUpdates: boolean
  marketingEmails: boolean
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "cancellation",
      title: "Booking Cancellation",
      description: "john smith has cancelled their booking for tommorrow at 2:00 PM",
      time: "10 minutes ago",
      isRead: false,
      isNew: true,
      priority: "high",
      actionRequired: false,
      relatedId: 101,
      relatedType: "booking",
    },
    {
      id: 2,
      type: "booking",
      title: "New Booking Request",
      description: "Sarah Johnson has requested a new booking on friday 10:00 AM",
      time: "1 hour ago",
      isRead: false,
      isNew: true,
      priority: "medium",
      actionRequired: true,
      relatedId: 102,
      relatedType: "booking",
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      description: "You've received a payment of $ 150 from Micheal Brown",
      time: "3 hours ago",
      isRead: true,
      isNew: false,
      priority: "low",
      actionRequired: false,
      relatedId: 103,
      relatedType: "payment",
    },
    {
      id: 4,
      type: "customer",
      title: "New Customer Registration",
      description: "Emma Wilson has created a new account",
      time: "5 hours ago",
      isRead: false,
      isNew: true,
      priority: "low",
      actionRequired: false,
      relatedId: 104,
      relatedType: "customer",
    },
    {
      id: 5,
      type: "reminder",
      title: "Upcoming Appointment Reminder",
      description: "Reminder: John Smith has an appointment tomorrow at 10:00 AM",
      time: "6 hours ago",
      isRead: true,
      isNew: false,
      priority: "medium",
      actionRequired: false,
      relatedId: 105,
      relatedType: "booking",
    },
    {
      id: 6,
      type: "system",
      title: "System Maintenance",
      description: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
      time: "1 day ago",
      isRead: false,
      isNew: false,
      priority: "medium",
      actionRequired: false,
    },
  ])

  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    bookingReminders: true,
    paymentAlerts: true,
    systemUpdates: true,
    marketingEmails: false,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [formData, setFormData] = useState<Partial<Notification>>({})

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "read" && notification.isRead) ||
      (statusFilter === "unread" && !notification.isRead) ||
      (statusFilter === "new" && notification.isNew) ||
      (statusFilter === "action" && notification.actionRequired)
    const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "cancellation":
        return X
      case "booking":
        return Plus
      case "payment":
        return CreditCard
      case "customer":
        return UserPlus
      case "reminder":
        return Clock
      case "system":
        return Settings
      default:
        return Bell
    }
  }

  const getNotificationIconBg = (type: string) => {
    switch (type) {
      case "cancellation":
        return "bg-red-100"
      case "booking":
        return "bg-green-100"
      case "payment":
        return "bg-yellow-100"
      case "customer":
        return "bg-blue-100"
      case "reminder":
        return "bg-purple-100"
      case "system":
        return "bg-gray-100"
      default:
        return "bg-gray-100"
    }
  }

  const getNotificationIconColor = (type: string) => {
    switch (type) {
      case "cancellation":
        return "text-red-600"
      case "booking":
        return "text-green-600"
      case "payment":
        return "text-yellow-600"
      case "customer":
        return "text-blue-600"
      case "reminder":
        return "text-purple-600"
      case "system":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true, isNew: false } : n)))
  }

  const markAsUnread = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: false } : n)))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true, isNew: false })))
  }

  const deleteSelected = () => {
    setNotifications(notifications.filter((n) => !selectedNotifications.includes(n.id)))
    setSelectedNotifications([])
  }

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    }
  }

  const handleCreateNotification = () => {
    if (formData.title && formData.description) {
      const newNotification: Notification = {
        id: Math.max(...notifications.map((n) => n.id)) + 1,
        type: (formData.type as any) || "system",
        title: formData.title!,
        description: formData.description!,
        time: "Just now",
        isRead: false,
        isNew: true,
        priority: (formData.priority as any) || "medium",
        actionRequired: formData.actionRequired || false,
      }
      setNotifications([newNotification, ...notifications])
      setIsCreateOpen(false)
      setFormData({})
    }
  }

  const handleApproveBooking = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId
          ? { ...n, actionRequired: false, isRead: true, description: n.description.replace("requested", "confirmed") }
          : n,
      ),
    )
  }

  const handleRejectBooking = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId
          ? { ...n, actionRequired: false, isRead: true, description: n.description.replace("requested", "rejected") }
          : n,
      ),
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount} unread notifications
            {actionRequiredCount > 0 && `, ${actionRequiredCount} require action`}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Notification
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter notification title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter notification description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={formData.type || "system"}
                      onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="booking">Booking</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formData.priority || "medium"}
                      onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="actionRequired"
                    checked={formData.actionRequired || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, actionRequired: checked })}
                  />
                  <Label htmlFor="actionRequired">Requires Action</Label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateNotification}>Create Notification</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Notification Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label>Email Notifications</Label>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <Label>SMS Notifications</Label>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label>Push Notifications</Label>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <Label>Booking Reminders</Label>
                  </div>
                  <Switch
                    checked={settings.bookingReminders}
                    onCheckedChange={(checked) => setSettings({ ...settings, bookingReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <Label>Payment Alerts</Label>
                  </div>
                  <Switch
                    checked={settings.paymentAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, paymentAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <Label>System Updates</Label>
                  </div>
                  <Switch
                    checked={settings.systemUpdates}
                    onCheckedChange={(checked) => setSettings({ ...settings, systemUpdates: checked })}
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setIsSettingsOpen(false)}>Save Settings</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-sm text-muted-foreground">Total Notifications</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
            <p className="text-sm text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{actionRequiredCount}</div>
            <p className="text-sm text-muted-foreground">Action Required</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {notifications.filter((n) => n.priority === "high").length}
            </div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <Input
            placeholder="Search notifications..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="booking">Booking</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="reminder">Reminder</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="cancellation">Cancellation</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="action">Action Required</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedNotifications.length > 0 && (
        <div className="flex items-center gap-4 mb-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <span className="text-sm font-medium">{selectedNotifications.length} notification(s) selected</span>
          <Button size="sm" variant="outline" onClick={markAllAsRead}>
            Mark as Read
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-red-600">
                Delete Selected
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Notifications</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {selectedNotifications.length} notification(s)? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteSelected} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex items-center gap-2 mb-6">
        <Button size="sm" variant="outline" onClick={handleSelectAll}>
          {selectedNotifications.length === filteredNotifications.length ? "Deselect All" : "Select All"}
        </Button>
        <Button size="sm" variant="outline" onClick={markAllAsRead}>
          Mark All as Read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="bg-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No notifications found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.type)
            return (
              <Card
                key={notification.id}
                className={`${!notification.isRead ? "border-l-4 border-l-blue-500" : ""} bg-card border-border`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => handleSelectNotification(notification.id)}
                      className="mt-1"
                    />
                    <div className={`p-2 rounded-full ${getNotificationIconBg(notification.type)}`}>
                      <IconComponent className={`h-5 w-5 ${getNotificationIconColor(notification.type)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${!notification.isRead ? "font-semibold" : ""} text-foreground`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                          {notification.isNew && (
                            <Badge variant="secondary" className="bg-black text-white">
                              New
                            </Badge>
                          )}
                          {notification.actionRequired && (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
                      <p className="text-xs text-muted-foreground/60">{notification.time}</p>

                      {/* Action Buttons for Booking Requests */}
                      {notification.actionRequired && notification.type === "booking" && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="gap-1" onClick={() => handleApproveBooking(notification.id)}>
                            <CheckCircle className="h-3 w-3" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-red-600"
                            onClick={() => handleRejectBooking(notification.id)}
                          >
                            <XCircle className="h-3 w-3" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id)
                        }
                        className="gap-1"
                      >
                        {notification.isRead ? (
                          <>
                            <Bell className="h-3 w-3" />
                            Mark Unread
                          </>
                        ) : (
                          <>
                            <Check className="h-3 w-3" />
                            Mark Read
                          </>
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="gap-1 text-red-600">
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this notification? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteNotification(notification.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

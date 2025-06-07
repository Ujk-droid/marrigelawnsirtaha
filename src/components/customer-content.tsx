"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Phone, Mail, MapPin, Plus, Search, Calendar, Edit, Trash2, CreditCard } from "lucide-react"

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  city?: string
  postalCode?: string
  totalBookings: number
  totalSpent: number
  lastVisit: string
  status: "active" | "vip" | "inactive"
  notes?: string
  joinDate: string
}

interface CustomerBooking {
  id: number
  service: string
  date: string
  time: string
  price: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
}

export function CustomerContent() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      address: "123 Main St",
      city: "New York",
      postalCode: "10001",
      totalBookings: 12,
      totalSpent: 1250,
      lastVisit: "2024-01-10",
      status: "active",
      notes: "Prefers appointments in the morning",
      joinDate: "2023-03-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 234 567 8901",
      address: "456 Oak Ave",
      city: "Los Angeles",
      postalCode: "90001",
      totalBookings: 8,
      totalSpent: 780,
      lastVisit: "2024-01-08",
      status: "active",
      joinDate: "2023-05-22",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 234 567 8902",
      address: "789 Pine St",
      city: "Chicago",
      postalCode: "60007",
      totalBookings: 15,
      totalSpent: 2100,
      lastVisit: "2024-01-12",
      status: "vip",
      notes: "Premium member, offers special discounts",
      joinDate: "2022-11-05",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+1 234 567 8903",
      address: "321 Elm St",
      city: "Miami",
      postalCode: "33101",
      totalBookings: 3,
      totalSpent: 350,
      lastVisit: "2023-12-20",
      status: "inactive",
      joinDate: "2023-10-18",
    },
  ])

  const customerBookings: Record<number, CustomerBooking[]> = {
    1: [
      {
        id: 101,
        service: "Hair Cut",
        date: "2024-01-10",
        time: "10:00",
        price: 45,
        status: "completed",
      },
      {
        id: 102,
        service: "Hair Color",
        date: "2023-12-15",
        time: "14:30",
        price: 120,
        status: "completed",
      },
      {
        id: 103,
        service: "Hair Cut",
        date: "2024-01-25",
        time: "11:00",
        price: 45,
        status: "confirmed",
      },
    ],
    2: [
      {
        id: 201,
        service: "Massage Therapy",
        date: "2024-01-08",
        time: "15:00",
        price: 85,
        status: "completed",
      },
      {
        id: 202,
        service: "Facial Treatment",
        date: "2024-01-20",
        time: "13:00",
        price: 95,
        status: "confirmed",
      },
    ],
    3: [
      {
        id: 301,
        service: "Premium Package",
        date: "2024-01-12",
        time: "10:00",
        price: 250,
        status: "completed",
      },
      {
        id: 302,
        service: "Hair Cut & Style",
        date: "2023-12-28",
        time: "14:00",
        price: 85,
        status: "completed",
      },
      {
        id: 303,
        service: "Beard Trim",
        date: "2023-12-10",
        time: "11:30",
        price: 35,
        status: "completed",
      },
      {
        id: 304,
        service: "Premium Package",
        date: "2024-01-30",
        time: "10:00",
        price: 250,
        status: "confirmed",
      },
    ],
    4: [
      {
        id: 401,
        service: "Manicure",
        date: "2023-12-20",
        time: "16:00",
        price: 40,
        status: "completed",
      },
      {
        id: 402,
        service: "Pedicure",
        date: "2023-11-15",
        time: "14:30",
        price: 45,
        status: "completed",
      },
      {
        id: 403,
        service: "Manicure & Pedicure",
        date: "2024-01-22",
        time: "15:00",
        price: 75,
        status: "cancelled",
      },
    ],
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [formData, setFormData] = useState<Partial<Customer>>({})
  const [activeTab, setActiveTab] = useState("info")

  // Filter customers based on search and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.city && customer.city.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const resetForm = () => {
    setFormData({})
    setSelectedCustomer(null)
  }

  const handleAddCustomer = () => {
    if (formData.name && formData.email) {
      const newCustomer: Customer = {
        id: Math.max(...customers.map((c) => c.id)) + 1,
        name: formData.name!,
        email: formData.email!,
        phone: formData.phone || "",
        address: formData.address || "",
        city: formData.city || "",
        postalCode: formData.postalCode || "",
        totalBookings: 0,
        totalSpent: 0,
        lastVisit: "-",
        status: (formData.status as "active" | "vip" | "inactive") || "active",
        notes: formData.notes || "",
        joinDate: new Date().toISOString().split("T")[0],
      }
      setCustomers([...customers, newCustomer])
      setIsAddModalOpen(false)
      resetForm()
    }
  }

  const handleEditCustomer = () => {
    if (selectedCustomer && formData.name && formData.email) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === selectedCustomer.id
          ? {
              ...customer,
              name: formData.name!,
              email: formData.email!,
              phone: formData.phone || customer.phone,
              address: formData.address || customer.address,
              city: formData.city || customer.city,
              postalCode: formData.postalCode || customer.postalCode,
              status: (formData.status as "active" | "vip" | "inactive") || customer.status,
              notes: formData.notes || customer.notes,
            }
          : customer,
      )
      setCustomers(updatedCustomers)
      setIsEditModalOpen(false)
      resetForm()
    }
  }

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
  }

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer)
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      postalCode: customer.postalCode,
      status: customer.status,
      notes: customer.notes,
    })
    setIsEditModalOpen(true)
  }

  const openViewModal = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsViewModalOpen(true)
    setActiveTab("info")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "vip":
        return "bg-purple-100 text-purple-800"
      case "inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  const CustomerForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <Label htmlFor="status">Customer Status</Label>
          <Select
            value={formData.status || "active"}
            onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "vip" | "inactive" })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter street address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter city"
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={formData.postalCode || ""}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            placeholder="Enter postal code"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes || ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes about this customer..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setIsEditModalOpen(false)
            } else {
              setIsAddModalOpen(false)
            }
            resetForm()
          }}
        >
          Cancel
        </Button>
        <Button onClick={isEdit ? handleEditCustomer : handleAddCustomer}>
          {isEdit ? "Update Customer" : "Add Customer"}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer database</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <CustomerForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.status === "vip").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inactive Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.status === "inactive").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customers List */}
      <div className="grid gap-4">
        {filteredCustomers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No customers found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredCustomers.map((customer) => (
            <Card key={customer.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <p className="text-muted-foreground">Customer ID: #{customer.id.toString().padStart(4, "0")}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(customer.status)}>{customer.status.toUpperCase()}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground/60" />
                    <span className="text-sm text-muted-foreground">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground/60" />
                    <span className="text-sm text-muted-foreground">{customer.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground/60" />
                    <span className="text-sm text-muted-foreground">
                      {customer.city
                        ? `${customer.city}${customer.postalCode ? `, ${customer.postalCode}` : ""}`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground/60" />
                    <span className="text-sm text-muted-foreground">
                      Last visit: {customer.lastVisit !== "-" ? formatDate(customer.lastVisit) : "Never"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold">{customer.totalBookings}</span> bookings
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total spent: <span className="font-semibold">{formatCurrency(customer.totalSpent)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openViewModal(customer)}>
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => openEditModal(customer)} className="gap-1">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-1 text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {customer.name}? This will permanently remove their record
                            and cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button size="sm">Book Appointment</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm isEdit={true} />
        </DialogContent>
      </Dialog>

      {/* View Customer Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen} modal={false}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <DialogTitle>{selectedCustomer.name}</DialogTitle>
                </div>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="info">Customer Info</TabsTrigger>
                  <TabsTrigger value="bookings">Booking History</TabsTrigger>
                  <TabsTrigger value="payments">Payment History</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                          <span className="text-sm col-span-2">{selectedCustomer.name}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium text-muted-foreground">Email</span>
                          <span className="text-sm col-span-2">{selectedCustomer.email}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium text-muted-foreground">Phone</span>
                          <span className="text-sm col-span-2">{selectedCustomer.phone || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium text-muted-foreground">Status</span>
                          <span className="col-span-2">
                            <Badge className={getStatusColor(selectedCustomer.status)}>
                              {selectedCustomer.status.toUpperCase()}
                            </Badge>
                          </span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium text-muted-foreground">Join Date</span>
                          <span className="text-sm col-span-2">{formatDate(selectedCustomer.joinDate)}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Address Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium text-muted-foreground">Street Address</span>
                          <span className="text-sm col-span-2">{selectedCustomer.address || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium text-muted-foreground">City</span>
                          <span className="text-sm col-span-2">{selectedCustomer.city || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium text-muted-foreground">Postal Code</span>
                          <span className="text-sm col-span-2">{selectedCustomer.postalCode || "N/A"}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Customer Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Total Bookings</p>
                          <p className="text-2xl font-bold">{selectedCustomer.totalBookings}</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                          <p className="text-2xl font-bold">{formatCurrency(selectedCustomer.totalSpent)}</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Last Visit</p>
                          <p className="text-xl font-bold">
                            {selectedCustomer.lastVisit !== "-" ? formatDate(selectedCustomer.lastVisit) : "Never"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedCustomer.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedCustomer.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Booking History</span>
                        <Button size="sm">Book New Appointment</Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {customerBookings[selectedCustomer.id]?.length ? (
                        <div className="space-y-4">
                          {customerBookings[selectedCustomer.id].map((booking) => (
                            <div
                              key={booking.id}
                              className="flex items-center justify-between p-4 border rounded-lg bg-card"
                            >
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-50 rounded-full">
                                  <Calendar className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{booking.service}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(booking.date)} at {booking.time}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-medium">{formatCurrency(booking.price)}</span>
                                <Badge className={getBookingStatusColor(booking.status)}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No booking history available for this customer.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Payment History</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {customerBookings[selectedCustomer.id]?.filter((b) => b.status === "completed").length ? (
                        <div className="space-y-4">
                          {customerBookings[selectedCustomer.id]
                            .filter((b) => b.status === "completed")
                            .map((booking) => (
                              <div
                                key={booking.id}
                                className="flex items-center justify-between p-4 border rounded-lg bg-card"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="p-2 bg-green-50 rounded-full">
                                    <CreditCard className="h-4 w-4 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Payment for {booking.service}</h4>
                                    <p className="text-sm text-muted-foreground">{formatDate(booking.date)}</p>
                                  </div>
                                </div>
                                <div className="font-medium">{formatCurrency(booking.price)}</div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No payment history available for this customer.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, Search, Loader2 } from "lucide-react"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCustomers, updateCustomer, deleteCustomer, type Customer } from "@/services/customerService"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { CustomersTable } from "@/components/customers/CustomersTable"
import { EditCustomerDialog } from "@/components/customers/EditCustomerDialog"
import { AddCustomerForm } from "@/components/customers/AddCustomerForm"

const CustomerDatabasePage = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
    meta: {
      onError: (error: Error) => {
        toast({
          variant: "destructive",
          title: "Error fetching customers",
          description: error.message,
        })
      }
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Customer> }) => 
      updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast({
        title: "Success",
        description: "Customer updated successfully",
      })
      setShowEditDialog(false)
      setSelectedCustomer(null)
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast({
        title: "Success",
        description: "Customer deleted successfully",
      })
      setShowDeleteDialog(false)
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    },
  })

  const handleAddCustomer = async (customerData: unknown) => {
    try {
      // TODO: Implement API call to create customer
      toast({
        title: "Success",
        description: "Customer has been added successfully.",
      })
      setShowAddForm(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add customer. Please try again.",
      })
    }
  }

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowEditDialog(true)
  }

  const handleDeleteClick = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    if (selectedCustomer) {
      deleteMutation.mutate(selectedCustomer.id)
    }
  }

  const handleUpdateCustomer = (data: Partial<Customer>) => {
    if (selectedCustomer) {
      updateMutation.mutate({ 
        id: selectedCustomer.id, 
        data 
      })
    }
  }

  const filteredCustomers = customers.filter(customer => 
    customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading customers: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-900">Customer Database</h1>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </div>

      {showAddForm && (
        <AddCustomerForm
          onSubmit={handleAddCustomer}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Customer Records</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <>
              {filteredCustomers.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  {searchQuery ? "No matching customers found" : "No customers found"}
                </div>
              ) : (
                <CustomersTable 
                  customers={filteredCustomers}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer
              {selectedCustomer?.name && ` "${selectedCustomer.name}"`} and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditCustomerDialog 
        customer={selectedCustomer}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={handleUpdateCustomer}
        isLoading={updateMutation.isPending}
      />
    </div>
  )
}

export default CustomerDatabasePage
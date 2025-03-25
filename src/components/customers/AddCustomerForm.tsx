// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useState } from "react"

// interface AddCustomerFormProps {
//   onSubmit: (data: unknown) => void;
//   onCancel: () => void;
// }

// export function AddCustomerForm({ onSubmit, onCancel }: AddCustomerFormProps) {
//   const [newCustomer, setNewCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     mobile_number: "",
//     address1: "",
//     city: "",
//     country: "",
//     vat_no: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(newCustomer);
//   };

//   return (
//     <Card className="mb-6">
//       <CardHeader>
//         <CardTitle>Add New Customer</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label htmlFor="name" className="text-sm font-medium">Full Name</label>
//               <Input
//                 id="name"
//                 value={newCustomer.name}
//                 onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="email" className="text-sm font-medium">Email</label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={newCustomer.email}
//                 onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
//               <Input
//                 id="phone"
//                 value={newCustomer.phone}
//                 onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="mobile" className="text-sm font-medium">Mobile Number</label>
//               <Input
//                 id="mobile"
//                 value={newCustomer.mobile_number}
//                 onChange={(e) => setNewCustomer({ ...newCustomer, mobile_number: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="address" className="text-sm font-medium">Address</label>
//               <Input
//                 id="address"
//                 value={newCustomer.address1}
//                 onChange={(e) => setNewCustomer({ ...newCustomer, address1: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="city" className="text-sm font-medium">City</label>
//               <Input
//                 id="city"
//                 value={newCustomer.city}
//                 onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="country" className="text-sm font-medium">Country</label>
//               <Input
//                 id="country"
//                 value={newCustomer.country}
//                 onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="vat" className="text-sm font-medium">VAT Number</label>
//               <Input
//                 id="vat"
//                 value={newCustomer.vat_no}
//                 onChange={(e) => setNewCustomer({ ...newCustomer, vat_no: e.target.value })}
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2 pt-4">
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={onCancel}
//               className="w-24"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-32">
//               Add Customer
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddCustomerFormProps {
  onSubmit: (data: unknown) => void;
  onCancel: () => void;
}

export function AddCustomerForm({ onSubmit, onCancel }: AddCustomerFormProps) {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    mobile_number: "",
    address1: "",
    city: "",
    country: "",
    vat_no: "",
  });

  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState<string | null>(null); // To manage error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/customers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVfaWQiOjEsImV4cCI6MTczNTM4Njc4MX0.B-cu-F2eHAGfyr8myJEOIsPjj_4VaGGPrVoXAi-KvUQ`,
          accept: "application/json",
        },
        body: JSON.stringify({
          ...newCustomer,
          vat_no: newCustomer.vat_no,
          balance: 0, // Add any additional fields required
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add customer");
      }

      const data = await response.json();
      onSubmit(data); // Pass the response back to parent
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm font-medium">
                Mobile Number
              </label>
              <Input
                id="mobile"
                value={newCustomer.mobile_number}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, mobile_number: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Input
                id="address"
                value={newCustomer.address1}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, address1: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <Input
                id="city"
                value={newCustomer.city}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, city: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <Input
                id="country"
                value={newCustomer.country}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, country: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="vat" className="text-sm font-medium">
                VAT Number
              </label>
              <Input
                id="vat"
                value={newCustomer.vat_no}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, vat_no: e.target.value })
                }
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 w-32"
            >
              {loading ? "Adding..." : "Add Customer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

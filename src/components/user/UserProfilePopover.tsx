import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // Import the auth hook

export const UserProfilePopover = () => {
  // Retrieve the logged-in user from Auth context
  const { user } = useAuth();

  // If no user is logged in, you might want to show a placeholder or prompt for login
  if (!user) {
    return <div>Please log in to see profile details.</div>;
  }

  return (
    <Card className="w-[300px] border-purple-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user.name}</h4>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-purple-500" />
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-purple-500" />
              <span>{user.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

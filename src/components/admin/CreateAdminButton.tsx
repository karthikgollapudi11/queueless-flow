import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

export const CreateAdminButton = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const createAdmin = async () => {
    setIsCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-admin', {
        body: {
          email: 'Admin@gmail.com',
          password: '123456',
          fullName: 'Admin'
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button 
      onClick={createAdmin} 
      disabled={isCreating}
      variant="outline"
      size="sm"
    >
      <UserPlus className="mr-2 h-4 w-4" />
      Add Admin (Admin@gmail.com)
    </Button>
  );
};

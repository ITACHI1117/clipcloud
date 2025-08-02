import { Send } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { useRouter } from "next/navigation";
import { LogUserOut } from "@/store/AuthStore";
import { Button } from "./ui/button";

export const BottomDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  // log user out
  const handleLogOut = () => {
    router.push("auth/login");
    LogUserOut();
    console.log("logged out");
    // routerServerGlobal.
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>More Actions</DrawerTitle>
        </DrawerHeader>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-6 mb-6">
          <Button
            className="w-full h-11 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-medium shadow transition-all duration-300 group"
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomDrawer;

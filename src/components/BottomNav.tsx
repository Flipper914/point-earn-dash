import { Home, ListTodo, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activePage: "home" | "tasks" | "withdraw";
  onPageChange: (page: "home" | "tasks" | "withdraw") => void;
}

export const BottomNav = ({ activePage, onPageChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto bg-card border-t border-border z-50">
      <div className="flex justify-around py-2">
        <NavButton
          icon={<Home className="w-6 h-6" />}
          label="Home"
          active={activePage === "home"}
          onClick={() => onPageChange("home")}
        />
        <NavButton
          icon={<ListTodo className="w-6 h-6" />}
          label="Tasks"
          active={activePage === "tasks"}
          onClick={() => onPageChange("tasks")}
        />
        <NavButton
          icon={<Wallet className="w-6 h-6" />}
          label="Withdraw"
          active={activePage === "withdraw"}
          onClick={() => onPageChange("withdraw")}
        />
      </div>
    </nav>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton = ({ icon, label, active, onClick }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 px-4 py-2 transition-colors flex-1",
        active ? "text-primary font-bold" : "text-muted-foreground"
      )}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
};

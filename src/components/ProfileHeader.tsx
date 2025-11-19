import { CheckCircle, Coins } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  photoUrl?: string;
  name: string;
  balance: number;
}

export const ProfileHeader = ({ photoUrl, name, balance }: ProfileHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-4 py-5">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-primary">
          <AvatarImage src={photoUrl} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">{name}</h1>
            <CheckCircle className="w-5 h-5 text-primary fill-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">Balance:</span>
            <span className="text-lg font-bold text-foreground">${balance}</span>
            <Coins className="w-5 h-5 text-gold" />
          </div>
        </div>
      </div>
    </header>
  );
};

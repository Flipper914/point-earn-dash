import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  dailyAdsWatched: number;
  referralCount: number;
  referralLink: string;
}

export const Dashboard = ({ dailyAdsWatched, referralCount, referralLink }: DashboardProps) => {
  const { toast } = useToast();

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-3 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Daily Ads Watched
          </h3>
          <p className="text-3xl font-bold text-primary">
            {dailyAdsWatched}<span className="text-xl text-muted-foreground"> / 10000</span>
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-3 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Total Referrals
          </h3>
          <p className="text-3xl font-bold text-primary">{referralCount}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-card to-secondary border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-center text-foreground">Refer & Earn More!</h3>
        <p className="text-center text-muted-foreground text-sm">
          Share your link to get bonus points.
        </p>
        
        <div className="space-y-3">
          <Input 
            value={referralLink}
            readOnly
            className="text-center bg-background/50 font-mono text-sm"
          />
          <Button 
            onClick={copyReferralLink}
            className="w-full"
            size="lg"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Referral Link
          </Button>
        </div>
      </div>
    </div>
  );
};

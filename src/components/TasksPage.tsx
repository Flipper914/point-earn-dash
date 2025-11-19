import { Video, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TasksPageProps {
  onWatchAd: () => void;
  onJoinChannel: () => void;
  onJoinGroup: () => void;
  hasJoinedChannel: boolean;
  hasJoinedGroup: boolean;
  isWatchingAd: boolean;
}

export const TasksPage = ({ 
  onWatchAd, 
  onJoinChannel, 
  onJoinGroup,
  hasJoinedChannel,
  hasJoinedGroup,
  isWatchingAd
}: TasksPageProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Complete Tasks</h2>
      
      <div className="space-y-4">
        <TaskCard
          icon={<Video className="w-12 h-12 text-primary" />}
          title="Watch a Rewarded Ad"
          description="Earn 1 point for every ad."
          buttonText="Watch Ad"
          onClick={onWatchAd}
          loading={isWatchingAd}
        />
        
        <TaskCard
          icon={<Send className="w-12 h-12 text-primary" />}
          title="Join Our Channel"
          description="Get 5 bonus points."
          buttonText={hasJoinedChannel ? "Bonus Claimed" : "Join & Claim Bonus"}
          onClick={onJoinChannel}
          disabled={hasJoinedChannel}
        />
        
        <TaskCard
          icon={<Users className="w-12 h-12 text-primary" />}
          title="Join Our Group"
          description="Get 5 bonus points."
          buttonText={hasJoinedGroup ? "Bonus Claimed" : "Join & Claim Bonus"}
          onClick={onJoinGroup}
          disabled={hasJoinedGroup}
        />
      </div>
    </div>
  );
};

interface TaskCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const TaskCard = ({ icon, title, description, buttonText, onClick, disabled, loading }: TaskCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 text-center space-y-4 hover:shadow-lg transition-all">
      <div className="flex justify-center animate-pulse">{icon}</div>
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button 
        onClick={onClick}
        disabled={disabled || loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Loading...
          </>
        ) : buttonText}
      </Button>
    </div>
  );
};

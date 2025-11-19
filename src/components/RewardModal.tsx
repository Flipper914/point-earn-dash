import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

export const RewardModal = ({ isOpen, onClose, points }: RewardModalProps) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(10);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl p-8 mx-4 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-success/20 blur-2xl rounded-full animate-pulse" />
            <CheckCircle className="w-20 h-20 text-success relative z-10 animate-in zoom-in duration-500" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              Congratulations!
            </h3>
            <p className="text-lg font-semibold text-success">
              You've earned {points} point{points !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="pt-4 space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-primary/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" 
                   style={{ animationDuration: '1s' }} />
              <span className="text-2xl font-bold text-primary relative z-10">
                {countdown}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Please wait {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

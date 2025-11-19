import { useState } from "react";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Dashboard } from "@/components/Dashboard";
import { TasksPage } from "@/components/TasksPage";
import { WithdrawPage } from "@/components/WithdrawPage";
import { BottomNav } from "@/components/BottomNav";
import { RewardModal } from "@/components/RewardModal";
import { LoadingModal } from "@/components/LoadingModal";
import { useTelegram } from "@/hooks/useTelegram";
import { useUserState } from "@/hooks/useUserState";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { tg, user } = useTelegram();
  const { state, updateState } = useUserState(user?.id || null);
  const { toast } = useToast();
  const [activePage, setActivePage] = useState<"home" | "tasks" | "withdraw">("home");
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  // Configuration
  const BOT_TOKEN = "8478476342:AAGLSlHHPTdsLyt5r3nTqFWQ5imrK-es3XI";
  const BOT_USERNAME = "@cheap_treader_bot";
  const ADMIN_CHAT_ID = "YOUR_TG_ID";
  const CHANNEL_LINK = "https://t.me/cheap_treader";
  const GROUP_LINK = "https://t.me/cheap_treader_gp";
  const DAILY_AD_LIMIT = 10000;
  const POINTS_PER_AD = 1;
  const CHANNEL_JOIN_BONUS = 5;
  const GROUP_JOIN_BONUS = 5;

  const handleWatchAd = async () => {
    if (state.dailyAdWatchCount >= DAILY_AD_LIMIT) {
      tg?.showAlert("Limit ပြည့်ပြီနောက်နေ့မှကြည့်။");
      return;
    }

    setIsWatchingAd(true);
    setShowLoadingModal(true);

    // Simulate ad loading
    setTimeout(() => {
      setShowLoadingModal(false);
      
      const today = new Date().toISOString().slice(0, 10);
      updateState({
        points: state.points + POINTS_PER_AD,
        dailyAdWatchCount: state.dailyAdWatchCount + 1,
        lastAdWatchDate: today,
      });

      tg?.HapticFeedback.notificationOccurred("success");
      
      // Show custom reward modal instead of tg.showAlert
      setRewardPoints(POINTS_PER_AD);
      setShowRewardModal(true);
      setIsWatchingAd(false);
    }, 2000);
  };

  const handleJoinChannel = () => {
    if (state.hasJoinedChannel) {
      tg?.showAlert("You have already claimed this bonus.");
      return;
    }

    tg?.openTelegramLink(CHANNEL_LINK);
    
    setTimeout(() => {
      updateState({
        points: state.points + CHANNEL_JOIN_BONUS,
        hasJoinedChannel: true,
      });
      tg?.showAlert(`Thank you! You received ${CHANNEL_JOIN_BONUS} bonus points.`);
    }, 3000);
  };

  const handleJoinGroup = () => {
    if (state.hasJoinedGroup) {
      tg?.showAlert("You have already claimed this bonus.");
      return;
    }

    tg?.openTelegramLink(GROUP_LINK);
    
    setTimeout(() => {
      updateState({
        points: state.points + GROUP_JOIN_BONUS,
        hasJoinedGroup: true,
      });
      tg?.showAlert(`Thank you! You received ${GROUP_JOIN_BONUS} bonus points.`);
    }, 3000);
  };

  const handleWithdraw = async (method: string, accountNumber: string, amount: number) => {
    updateState({ points: state.points - amount });

    const message = `<b>New Withdraw Request!</b>\n-----------------------------------\n<b>User:</b> ${user?.first_name || ""} ${user?.last_name || ""} (@${user?.username || "N/A"})\n<b>User ID:</b> <code>${user?.id}</code>\n-----------------------------------\n<b>Method:</b> ${method}\n<b>Account:</b> <code>${accountNumber}</code>\n<b>Amount:</b> ${amount} Points\n-----------------------------------\n<b>Date:</b> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });

      const result = await response.json();
      
      if (result.ok) {
        tg?.HapticFeedback.notificationOccurred("success");
        toast({
          title: "Success!",
          description: "Withdrawal request submitted successfully!",
        });
      } else {
        throw new Error(result.description);
      }
    } catch (error) {
      tg?.HapticFeedback.notificationOccurred("error");
      toast({
        title: "Error",
        description: "Failed to submit request. Your points have been returned.",
        variant: "destructive",
      });
      updateState({ points: state.points + amount });
    }
  };

  const referralLink = `https://t.me/${BOT_USERNAME}?start=ref_${state.userId}`;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-[500px] mx-auto">
        <ProfileHeader
          photoUrl={user?.photo_url}
          name={user?.first_name || "Loading..."}
          balance={state.points}
        />

        <main className="p-4">
          {activePage === "home" && (
            <Dashboard
              dailyAdsWatched={state.dailyAdWatchCount}
              referralCount={state.referrals.length}
              referralLink={referralLink}
            />
          )}
          
          {activePage === "tasks" && (
            <TasksPage
              onWatchAd={handleWatchAd}
              onJoinChannel={handleJoinChannel}
              onJoinGroup={handleJoinGroup}
              hasJoinedChannel={state.hasJoinedChannel}
              hasJoinedGroup={state.hasJoinedGroup}
              isWatchingAd={isWatchingAd}
            />
          )}
          
          {activePage === "withdraw" && (
            <WithdrawPage
              onSubmit={handleWithdraw}
              userPoints={state.points}
            />
          )}
        </main>

        <BottomNav activePage={activePage} onPageChange={setActivePage} />
      </div>

      <RewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        points={rewardPoints}
      />

      <LoadingModal isOpen={showLoadingModal} />
    </div>
  );
};

export default Index;

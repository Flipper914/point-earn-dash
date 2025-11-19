import { useState, useEffect } from "react";

interface UserState {
  points: number;
  dailyAdWatchCount: number;
  lastAdWatchDate: string | null;
  referrals: string[];
  hasJoinedChannel: boolean;
  hasJoinedGroup: boolean;
  userId: number | null;
}

const initialState: UserState = {
  points: 0,
  dailyAdWatchCount: 0,
  lastAdWatchDate: null,
  referrals: [],
  hasJoinedChannel: false,
  hasJoinedGroup: false,
  userId: null,
};

export const useUserState = (userId: number | null) => {
  const [state, setState] = useState<UserState>(initialState);

  useEffect(() => {
    if (userId) {
      loadState(userId);
    }
  }, [userId]);

  const loadState = (id: number) => {
    const saved = localStorage.getItem(`userState_${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setState({ ...initialState, ...parsed, userId: id });
      
      // Reset daily count if new day
      const today = new Date().toISOString().slice(0, 10);
      if (parsed.lastAdWatchDate !== today) {
        updateState({ dailyAdWatchCount: 0, lastAdWatchDate: today });
      }
    } else {
      setState({ ...initialState, userId: id });
    }
  };

  const updateState = (updates: Partial<UserState>) => {
    setState((prev) => {
      const newState = { ...prev, ...updates };
      if (newState.userId) {
        localStorage.setItem(`userState_${newState.userId}`, JSON.stringify(newState));
      }
      return newState;
    });
  };

  return { state, updateState };
};

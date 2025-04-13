// src/hooks/useRefresh.js
import { useState } from 'react';

export const useRefresh = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  
  const triggerRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };
  
  return { refreshCount, triggerRefresh };
};
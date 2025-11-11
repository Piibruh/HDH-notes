import { useEffect, useRef } from 'react';

interface UseAutoSaveOptions {
  data: any;
  onSave: () => void;
  delay?: number;
  enabled?: boolean;
}

export const useAutoSave = ({ 
  data, 
  onSave, 
  delay = 2000,
  enabled = true 
}: UseAutoSaveOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousDataRef = useRef(data);

  useEffect(() => {
    if (!enabled) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Check if data has actually changed
    const dataChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);
    
    if (dataChanged && data) {
      // Set new timeout for auto-save
      timeoutRef.current = setTimeout(() => {
        onSave();
        previousDataRef.current = data;
      }, delay);
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, delay, enabled]);

  return null;
};

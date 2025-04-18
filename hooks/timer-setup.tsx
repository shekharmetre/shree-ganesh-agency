"use client";

import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

const FiveMinuteTimer = ({ onTick, onComplete, expiryTimestamp, children }: { 
  onTick?: (time: number) => void; 
  onComplete?: () => void; 
  expiryTimestamp: Date;
  children: React.ReactNode;
}) => {
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp,
    onExpire: onComplete,
  });

  useEffect(() => {
    if (onTick) {
      onTick(minutes * 60 + seconds);
    }
  }, [seconds, minutes, onTick]);

  return (
    <div>
      <h1>
        {isRunning ? (
          `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        ) : (
          children
        )}
      </h1>
    </div>
  );
};

export default FiveMinuteTimer;

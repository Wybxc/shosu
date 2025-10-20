import React, { useState, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box } from '@mui/material';
import SoundUtils from '../utils/SoundUtils';

interface ExecutionButtonProps {
  size?: number;
  onFinished?: () => void;
  soundUtils: SoundUtils;
  onPressStart?: () => void;
  onPressEnd?: () => void;
}

const ExecutionButton: React.FC<ExecutionButtonProps> = ({
  size = 240,
  onFinished = () => {},
  soundUtils,
  onPressStart = () => {},
  onPressEnd = () => {},
}) => {
  const [filled, setFilled] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  
  const scaleControls = useAnimation();
  const fillAnimationRef = useRef<number | null>(null);
  const pressStartTime = useRef<number>(0);
  const lastTapTime = useRef<number>(0);

  const handlePressStart = useCallback(() => {
    if (filled) return;

    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime.current;
    
    // Double tap detection (within 300ms)
    if (timeSinceLastTap < 300 && fillProgress > 0) {
      // Reset on double tap
      if (fillAnimationRef.current) {
        cancelAnimationFrame(fillAnimationRef.current);
        fillAnimationRef.current = null;
      }
      setFillProgress(0);
      setFilled(false);
      soundUtils.stopHoldSound();
      onPressEnd();
      scaleControls.start({ scale: 1 });
      lastTapTime.current = 0;
      return;
    }

    lastTapTime.current = now;
    setIsPressed(true);
    onPressStart();
    
    // Clear any existing animation
    if (fillAnimationRef.current) {
      cancelAnimationFrame(fillAnimationRef.current);
      fillAnimationRef.current = null;
    }
    
    // Start scale animation
    scaleControls.start({ scale: 0.94, transition: { duration: 0.15 } });
    
    // Start sound
    soundUtils.playHoldSound();
    
    // Start fill animation using requestAnimationFrame
    pressStartTime.current = Date.now();
    const fillDuration = 5500; // 5.5 seconds
    
    const animate = () => {
      const elapsed = Date.now() - pressStartTime.current;
      const progress = Math.min(elapsed / fillDuration, 1);
      
      setFillProgress(progress);
      
      if (progress >= 1) {
        fillAnimationRef.current = null;
        setFilled(true);
        soundUtils.stopHoldSound();
        soundUtils.playFinishSound();
        onFinished();
      } else {
        fillAnimationRef.current = requestAnimationFrame(animate);
      }
    };
    
    fillAnimationRef.current = requestAnimationFrame(animate);
  }, [filled, fillProgress, soundUtils, onPressStart, onPressEnd, onFinished, scaleControls]);

  const handlePressEnd = useCallback(() => {
    if (!isPressed) return;
    
    setIsPressed(false);
    onPressEnd();
    
    // Reset scale
    scaleControls.start({ scale: 1, transition: { duration: 0.2 } });
    
    if (!filled && fillAnimationRef.current) {
      // Stop animation and start decay
      cancelAnimationFrame(fillAnimationRef.current);
      fillAnimationRef.current = null;
      soundUtils.stopHoldSound();
      
      // Decay animation using requestAnimationFrame
      const currentProgress = fillProgress;
      const decayDuration = currentProgress * 1000; // proportional decay
      const decayStart = Date.now();
      
      const animateDecay = () => {
        const elapsed = Date.now() - decayStart;
        const decayProgress = Math.min(elapsed / decayDuration, 1);
        const newProgress = currentProgress * (1 - decayProgress);
        
        setFillProgress(newProgress);
        
        if (decayProgress >= 1) {
          setFillProgress(0);
        } else {
          requestAnimationFrame(animateDecay);
        }
      };
      
      requestAnimationFrame(animateDecay);
    }
  }, [isPressed, filled, fillProgress, soundUtils, onPressEnd, scaleControls]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        cursor: filled ? 'default' : 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
    >
      <motion.div
        animate={scaleControls}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Background image */}
        <img
          src="/button_bg.png"
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        
        {/* Fill animation */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${fillProgress * 100}%`,
            backgroundColor: '#953949',
            transition: isPressed ? 'none' : 'height 0.3s linear',
          }}
        />
        
        {/* Button overlay */}
        <img
          src="/button.png"
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        
        {/* Finish state */}
        {filled && (
          <img
            src="/finish.png"
            alt=""
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        )}
      </motion.div>
    </Box>
  );
};

export default ExecutionButton;

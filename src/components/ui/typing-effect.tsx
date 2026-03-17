"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingEffectProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  className = "",
  speed = 50,
  delay = 0,
  cursor = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started]);

  return (
    <span className={className}>
      {displayedText}
      <AnimatePresence>
        {cursor && !isComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
            className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
          />
        )}
      </AnimatePresence>
    </span>
  );
};

interface TypingWordsProps {
  words: string[];
  className?: string;
  speed?: number;
  pauseDuration?: number;
}

export const TypingWords: React.FC<TypingWordsProps> = ({
  words,
  className = "",
  speed = 100,
  pauseDuration = 2000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, words, speed, pauseDuration]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
};
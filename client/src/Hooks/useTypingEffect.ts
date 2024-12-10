import { useState, useEffect } from 'react';
import "./useTypingEffect.css"
export const useTypingEffect = (fullText: string, initialSpeed = 50) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(initialSpeed);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      let updatedText = '';

      if (!isDeleting) {
        updatedText = fullText.substring(0, text.length + 1);
        setText(updatedText);
        if (updatedText === fullText) {
          setIsComplete(true);
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      } else {
        setIsComplete(false);
        updatedText = fullText.substring(0, text.length - 1);
        setText(updatedText);
        if (updatedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }

      setTypingSpeed(isDeleting ? 30 : 50); // Adjust typing speed
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed, loopNum, fullText]);

  return { text, isComplete };
};

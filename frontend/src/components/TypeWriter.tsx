import { useState, useEffect } from "react";
import { motion } from "motion/react";

// テキストを1文字ずつ表示するコンポーネント
interface TypeWriterProps {
  text: string;
  speed?: number;
  characterName: string;
}

export const TypeWriter = ({ text, speed = 35, characterName }: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const setCharacter = () =>{
    switch (characterName){
      case "ツンデレちゃん":
        return "Tsundere";
      case "招きおっちゃん":
        return "ManekiOchan";
      case "":
        return "";
    }
  }
  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    const characters = Array.from(text);
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < characters.length) {
        setDisplayedText(characters.slice(0, currentIndex + 1).join(""));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <>
      <img
        src={`public/characters/${setCharacter()}.png`}
        alt={characterName}
        className="w-50 h-50 rounded-full mx-auto"
      />
      <div className="font-mono leading-relaxed whitespace-pre-wrap text-white/80">
        {displayedText}
        {!isComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-[1.2em] bg-white/80 ml-1 align-middle"
          ></motion.span>
        )}
      </div>
    </>
  );
};


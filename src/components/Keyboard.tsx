import { useEffect, useState } from "react";
const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export const Keyboard: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      setPressedKeys((keys) => [...keys, e.key]);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((keys) => keys.filter((key) => key !== e.key));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="w-96 mx-auto ">
      {keyboard.map((row, i) => (
        <div key={i} className="my-1 flex w-full justify-center gap-1">
          {row.map((key) => {
            const isPressed = pressedKeys.includes(key);

            return isPressed ? (
              <kbd key={key} className={"kbd bg-black bg-opacity-50"}>
                {key}
              </kbd>
            ) : (
              <kbd key={key} className={"kbd bg-opacity-0"}>
                {key}
              </kbd>
            );
          })}
        </div>
      ))}
      <div className=" flex justify-center">
        
        <kbd className={`kbd bg-opacity-0 w-1/2 ${pressedKeys.includes(' ') ? 'bg-black bg-opacity-50' : ''}`}></kbd>
      </div>
    </div>
  );
};

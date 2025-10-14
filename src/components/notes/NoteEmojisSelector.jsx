import { useEffect, useRef, useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { v4 as uuidv4 } from 'uuid';

export const NoteEmojisSelector = ({ formNote }) => {

  const [isEmojisVisible, setIsEmojisVisible] = useState(false);
  const containerRef = useRef(null)

  const handleEmoji = (e) => {
    const { native: emoji } = e;

    formNote.setOptionalData(prev => ({
      ...prev,
      emojis: [...prev.emojis, { emoji, id: uuidv4() }]
    }));

  };

  const deleteIcon = (emojiToDelete) => {
    formNote.setOptionalData(prev => ({
      ...prev,
      emojis: prev.emojis.filter(emoji => emoji.id !== emojiToDelete.id)
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsEmojisVisible(false);
      }
    };

    if (isEmojisVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEmojisVisible]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="p-3 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 cursor-pointer"
          aria-label="Elegir emoji"
          onClick={() => setIsEmojisVisible(!isEmojisVisible)}
        >
          <FaRegSmile />
        </button>

        <div className="flex flex-wrap">
          {formNote.optionalData.emojis.map((emoji) => (
            <div key={emoji.id} className="relative">
              <div
                className="cursor-pointer hover:bg-gray-300 mx-1 rounded transition-all "
                onClick={() => deleteIcon(emoji)}
              >
                { emoji.emoji }
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEmojisVisible && (
        <div className="absolute left-0  top-14 border border-gray-300 rounded shadow-lg z-50">
          <Picker
            data={data}
            categories={["frequent", "people", "foods", "nature", "activity"]}
            onEmojiSelect={handleEmoji}
            perLine={7}
            theme="light"
          />
        </div>
      )}
    </div>
  );
};

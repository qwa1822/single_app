import React from "react";

const EmotionItem = ({
  emotion_description,
  emotion_id,
  emotion_img,
  onClick,

  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "emotion_list_item",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img}></img>
      <span>{emotion_description}</span>
    </div>
  );
};

export default React.memo(EmotionItem);

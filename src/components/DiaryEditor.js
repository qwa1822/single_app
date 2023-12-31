import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDisPatchContext } from "../App";
import { emotionList } from "../utill/emotion";

const getStringDate = date => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const [content, setContent] = useState("");

  const { onCreate, onEdit, onRemove } = useContext(DiaryDisPatchContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      content.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까>"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  const emotionChange = useCallback(emotion => {
    setEmotion(emotion);
  }, []);

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton onClick={() => navigate(-1)} text={"< 뒤로가기"}></MyButton>
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              onClick={handleRemove}
              type={"negative"}
            ></MyButton>
          )
        }
      ></MyHeader>

      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={e => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>

        <section>
          <h4>오늘의감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map(item => (
              <EmotionItem
                onClick={emotionChange}
                key={item.id}
                {...item}
                isSelected={item.emotion_id === emotion}
              ></EmotionItem>
            ))}
          </div>
        </section>

        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              onChange={e => setContent(e.target.value)}
              value={content}
              placeholder="오늘은 어땠나요"
            ></textarea>
          </div>
        </section>

        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)}></MyButton>
            <MyButton
              text={"작성완료"}
              onClick={handleSubmit}
              type={"positive"}
            ></MyButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;

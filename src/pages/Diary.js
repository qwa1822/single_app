import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../utill/date";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { emotionList } from "../utill/emotion";

const Diary = () => {
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();

  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정일기장 - ${id}번 일기`;
  }, []);
  useEffect(() => {
    if (diaryList.length > 1) {
      const targetId = diaryList.find(item => Number(item.id) === Number(id));

      console.log(targetId);
      if (targetId) {
        // 일기존재

        setData(targetId);
      } else {
        // 일기 존재x
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다</div>;
  } else {
    const curEmotionData = emotionList.find(
      item => Number(item.emotion_id) === Number(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          leftChild={
            <MyButton
              text={"<뒤로가기"}
              onClick={() => navigate(-1)}
            ></MyButton>
          }
          headText={`${getStringDate(new Date(data.date))} 기록`}
          onClick={() => navigate(-1)}
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            ></MyButton>
          }
        ></MyHeader>

        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="" />

              <div className="emotion_descrion">
                {curEmotionData.emotion_description}
              </div>
            </div>
          </section>

          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;

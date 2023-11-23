import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();

  const diaryList = useContext(DiaryStateContext);
  const { id } = useParams();

  const [originData, setOriginData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정일기장 - ${id}번 일기수정`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        item => Number(item.id) === Number(id)
      );

      console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  console.log(id);
  return (
    <>
      <h2>Edit</h2>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </>
  );
};

export default Edit;

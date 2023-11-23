import React, { useContext, useEffect, useState } from "react";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const [curData, setCurdate] = useState(new Date());

  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (diaryList && diaryList.length >= 1) {
      const firstDay = new Date(
        curData.getFullYear(),
        curData.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curData.getFullYear(),
        curData.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter(item => item.date >= firstDay && item.date <= lastDay)
      );
    }
  }, [diaryList, curData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const headText = `${curData.getFullYear()}년 ${curData.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurdate(
      new Date(curData.getFullYear(), curData.getMonth() + 1),
      curData.getDate()
    );
  };

  const decreaseMonth = () => {
    setCurdate(
      new Date(curData.getFullYear(), curData.getMonth() - 1),
      curData.getDate()
    );
  };
  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth}></MyButton>}
        rightChild={<MyButton text={">"} onClick={increaseMonth}></MyButton>}
      />
      <DiaryList diaryList={data}></DiaryList>
    </div>
  );
};

export default Home;

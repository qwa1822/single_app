import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";
import React, { useEffect, useReducer, useRef } from "react";

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      newState = [action.data, ...state];

      break;
    }
    case "REMOVE": {
      newState = state.filter(item => item.id !== action.targetId);

      break;
    }
    case "EDIT": {
      newState = state.map(item =>
        item.id === action.data.id ? { ...action.data } : item
      );

      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDisPatchContext = React.createContext();

function App() {
  const dataId = useRef(0);

  const [data, dispatch] = useReducer(reducer, []);

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(diaryList[0].id) + 1;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  // Create
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  const onRemove = targetId => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  // remove

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDisPatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader
              headText={"app"}
              leftChild={
                <MyButton text={"왼쪽버튼"} onClick={() => alert("왼쪽클릭")} />
              }
              rightChild={
                <MyButton
                  text={"오른쪽버튼"}
                  onClick={() => alert("오른쪽클릭")}
                ></MyButton>
              }
            />
            <h2>App.jS</h2>

            <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`}></img>
            <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`}></img>
            <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`}></img>
            <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`}></img>
            <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`}></img>

            <MyButton
              type={"positive"}
              text={"버튼"}
              onClick={() => alert("버튼클릭")}
            ></MyButton>

            <MyButton
              type={"negative"}
              text={"버튼"}
              onClick={() => alert("버튼클릭")}
            ></MyButton>

            <MyButton
              text={"버튼"}
              onClick={() => alert("버튼클릭")}
            ></MyButton> */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDisPatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

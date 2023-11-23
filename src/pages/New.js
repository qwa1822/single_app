import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정일기장 - 새일기 `;
  }, []);

  return <DiaryEditor></DiaryEditor>;
};

export default New;

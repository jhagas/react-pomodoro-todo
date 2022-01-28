import React from "react";
import { useState } from "react";
import Pomo from "./Pomo";

const initSettings = {
  lapLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  sessionUntilLongBreak: 4,
};

export function Settings({ children }) {
  if (localStorage.getItem("settings") === null) {
    localStorage.setItem("settings", JSON.stringify(initSettings));
  }

  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings"))
  );

  localStorage.setItem("settings", JSON.stringify(settings));

  return (
      <Pomo setting={[settings, setSettings]}/>
  );
}


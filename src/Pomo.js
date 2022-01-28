import { useEffect, useState } from "react";
import {
  IoPlay,
  IoPlayForward,
  IoPause,
  IoArrowBackOutline,
} from "react-icons/io5";
import ModalSetting from "./Setting";
import ding from "./assets/ding.mp3";
import useSound from "use-sound";

export default function Pomo(props) {
  const [settings] = props.setting;
  const [run, setRun] = useState(false);
  const [remaining, setRemaining] = useState(settings.lapLength * 60);
  const [lap, setLap] = useState(1);
  const [coffee, setCoffee] = useState(true);
  const [display, setDisplay] = useState(`Lap ${lap}`);

  const [play] = useSound(ding, {
    sprite: {
      bellDing: [0, 3600],
      tick: [3636, 500],
      pluck: [4242, 722],
    },
  });

  const handleRunPomodoro = () => {
    setRun(!run);

    if (!run) {
      play({ id: "bellDing" });
    }
  };

  const handleSkipPomodoro = () => {
    setRemaining(0);
    if (lap < settings.sessionUntilLongBreak) {
      if (!coffee) {
        setRemaining(settings.lapLength * 60);
        setCoffee(true);
        setDisplay(`Lap ${lap}`);
      } else {
        setLap(lap + 1);
        setRemaining(settings.shortBreakLength * 60);
        setCoffee(false);
        setDisplay("Short Break");
      }
    } else {
      if (!coffee) {
        setRemaining(settings.lapLength * 60);
        setCoffee(true);
        setDisplay(`Lap ${lap}`);
      } else {
        setRemaining(settings.longBreakLength * 60);
        setCoffee(false);
        setDisplay("Long Break");
        setLap(1);
      }
    }
    play({ id: "pluck" });
  };

  useEffect(() => {
    if (remaining === 0 && !run) {
      setRemaining(settings.lapLength * 60);
    }
  }, [settings, run, remaining]);

  useEffect(() => {
    var remain = null;
    const start = () => {
      remain = setInterval(() => {
        setRemaining(remaining - 1);
        if (remaining <= 30) {
          play({ id: "tick" });
        }
        clearInterval(remain);
      }, 1000);
    };

    if (run) {
      if (remaining > 0) {
        start();
      }

      setTimeout(() => {
        if (remaining === 0) {
          if (lap < settings.sessionUntilLongBreak) {
            if (!coffee) {
              setRemaining(settings.lapLength * 60);
              setCoffee(true);
              setDisplay(`Lap ${lap}`);
              play({ id: "bellDing" });
            } else {
              setRemaining(settings.shortBreakLength * 60);
              setLap(lap + 1);
              setCoffee(false);
              setDisplay("Short Break");
              play({ id: "bellDing" });
            }
          } else {
            if (!coffee) {
              setRemaining(settings.lapLength * 60);
              setCoffee(true);
              setDisplay(`Lap ${lap}`);
              play({ id: "bellDing" });
            } else {
              setRemaining(settings.longBreakLength * 60);
              setLap(1);
              setCoffee(false);
              setDisplay("Long Break");
              play({ id: "bellDing" });
            }
          }
        }
      }, 1000);
    } else {
      clearInterval(remain);
    }
    return () => clearInterval(remain);
  });

  const Time = () => {
    const minute = Math.floor(remaining / 60);
    let second = remaining % 60;

    if (second < 10) {
      second = `0${second}`;
    }

    return `${minute}:${second}`;
  };

  return (
    <div className="w-full py-10 px-6 bg-black bg-opacity-50 rounded-xl">
      <div className="relative flex flex-row text-gray2 w-full justify-between mb-3 px-6">
        <div className="rounded-full bg-gray6 w-8 h-8 flex flex-column justify-center items-center">
          <IoArrowBackOutline size="18px" />
        </div>
        <p className="text-lg text-white text-center">{display}</p>
        <ModalSetting setting={props.setting} />
      </div>
      <p
        className={
          "text-7xl transition-colors font-bold text-center " +
          (run ? "text-white" : "text-mint animate-pulse")
        }
      >
        <Time />
      </p>

      <div className="flex flex-row w-full items-center justify-center mt-4 gap-2">
        <div
          className={
            "rounded-full w-12 h-12 flex flex-row items-center justify-center hover:bg-opacity-75 cursor-pointer transition-colors text-white " +
            (run ? "bg-gray2" : "bg-blue")
          }
          onClick={handleRunPomodoro}
        >
          {run ? <IoPause size="16px" /> : <IoPlay size="16px" />}
        </div>
        <div
          onClick={run ? null : handleSkipPomodoro}
          className={
            "bg-gray3 rounded-full w-11 h-11 flex flex-row items-center transition-colors justify-center text-white " +
            (run
              ? "opacity-40"
              : "opacity-100 hover:bg-opacity-75 cursor-pointer")
          }
        >
          <IoPlayForward size="14px" />
        </div>
      </div>
    </div>
  );
}

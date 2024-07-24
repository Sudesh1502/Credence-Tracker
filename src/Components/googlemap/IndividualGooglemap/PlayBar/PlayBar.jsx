
import { useState, useEffect } from "react";
import { FaForward, FaPause } from "react-icons/fa6";
import { FaFastBackward, FaPlay } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlayBar.css";
const PlayBar = ({
  setShowPlayBar,
  setIsCalender,
  setIsPlaybacking,
  startAnimation,
  currentIndex,
  pairedArray,
  setProgress,
  progress,
  setCurrentIndex,
  setIsAnimating,
  isAnimating,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    startAnimation();
  };

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };

  const handleCutHistory = () => {
    setShowPlayBar(false);
    setIsCalender(false);
    setIsPlaybacking(false);
    setIsAnimating(false);
  };

  useEffect(() => {
    const mySlider = document.getElementById("progress-bar");
    if (mySlider) {
      const valPercent = (progress / mySlider.max) * 100;
      mySlider.style.background = `linear-gradient(to right, #000000 ${valPercent}%, #d5d5d5 ${valPercent}%)`;
    }
  }, [progress]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      isAnimating &&
        setProgress((currentIndex / (pairedArray.length - 1)) * 100);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, pairedArray.length, isPlaying]);

  return (
    <>
      <hr />

      <div className="container">
        <div className="playbar-container">
        <button type="button" class="btn btn-outline-dark playBar-btn" style={{ marginLeft: "60px" }}>
        <FaFilter className="BtnIcon" />
          </button>
         
          <button type="button" class="btn btn-outline-dark playBar-btn">
            <FaFastBackward className="BtnIcon" />
          </button>

          <button className="play-pause-btn btn btn-outline-dark playBar-btn" onClick={togglePlay}>
            {isPlaying ? (
              <FaPause className="BtnIcon" />
            ) : (
              <FaPlay className="BtnIcon" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            id="progress-bar"
            onChange={handleProgressChange}
            style={{ backgroundColor: "#fff !important" }}
          />
          <span className="progress-percentage">
            <b>{progress.toFixed(2)}/100</b>
          </span>
          <button className="btn btn-outline-dark playBar-btn">
            <FaForward className="BtnIcon" />
          </button>
          <button className="btn btn-outline-dark playBar-btn">
            <MdSpeed className="BtnIcon" />
          </button>
        </div>

        <div className="playBarInfo">
          <div className="dataInfo">
            <div className="head">Speed</div>
            <div className="headData">10 kmph</div>
          </div>
          <div className="dataInfo">
            <div className="head">Distance</div>
            <div className="headData">21.40 km</div>
          </div>
          <div className="dataInfo">
            <div className="head">Time</div>
            <div className="headData">11/07/2024 07:45:11</div>
          </div>
          <div className="dataInfo">
            <div className="head">Total Distance</div>
            <div className="headData">33.50 km</div>
          </div>
          <div className="dataInfo">
            <div className="head">Avg.Speed (km/h)</div>
            <div className="headData">22.38 kmph</div>
          </div>
          <div className="dataInfo">
            <div className="head">Max.Speed (km/h)</div>
            <div className="headData">46 kmph</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayBar;

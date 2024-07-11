import "./PlayBar.css"
import { useState, useEffect } from 'react';
import { FaForward, FaPause } from "react-icons/fa6";
import { FaFastBackward, FaPlay } from "react-icons/fa";
const PlayBar = () => {


    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
  
    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };
  
    const handleProgressChange = (event) => {
      setProgress(event.target.value);
    };
  
    useEffect(() => {
      const mySlider = document.getElementById('progress-bar');
      if (mySlider) {
        const valPercent = (progress / mySlider.max) * 100;
        mySlider.style.background = `linear-gradient(to right, #2c3e50 ${valPercent}%, #d5d5d5 ${valPercent}%`;
      }
    }, [progress]);



  return (
    <div className="container">
        <div className="playbar-container">
          <button className=" playBar-btn">
            <FaFastBackward />
          </button>
          <button className="play-pause-btn playBar-btn" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            id="progress-bar"
            onChange={handleProgressChange}
          />
          <button className=" playBar-btn">
            <FaForward />
          </button>
        </div>

        <div className="playBarInfo">
          <div className="dataInfo">
            <div className="head">Speed</div>
            <div className="headData">10 kmph</div>
          </div>
          {/* END OF DATA INFO  */}
          <div className="dataInfo">
            <div className="head">Distance</div>
            <div className="headData">21.40 km</div>
          </div>
          {/* END OF DATA INFO  */}
          <div className="dataInfo">
            <div className="head">Time</div>
            <div className="headData">11/07/2024 07:45:11</div>
          </div>
          {/* END OF DATA INFO  */}
          <div className="dataInfo">
            <div className="head">Total Distance</div>
            <div className="headData">33.50 km</div>
          </div>
          {/* END OF DATA INFO  */}
          <div className="dataInfo">
            <div className="head">Avg.Speed (km/h)</div>
            <div className="headData">22.38 kmph</div>
          </div>
          {/* END OF DATA INFO  */}
          <div className="dataInfo">
            <div className="head">Max.Speed (km/h)</div>
            <div className="headData">46 kmph</div>
          </div>
          {/* END OF DATA INFO  */}
        </div>
        {/* CONTAINER ENDS HERE  */}
      </div>
  )
}

export default PlayBar
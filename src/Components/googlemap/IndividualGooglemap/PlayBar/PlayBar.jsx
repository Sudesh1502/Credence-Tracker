import "./PlayBar.css"
import { useState, useEffect } from 'react';
import { FaForward, FaPause } from "react-icons/fa6";
import { FaFastBackward, FaPlay } from "react-icons/fa";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SpeedIcon from '@mui/icons-material/Speed';

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
    isAnimating
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
    }
  
    useEffect(() => {
      const mySlider = document.getElementById('progress-bar');
      if (mySlider) {
        const valPercent = (progress / mySlider.max) * 100;
        mySlider.style.background = `linear-gradient(to right, #2c3e50 ${valPercent}%, #d5d5d5 ${valPercent}%)`;
      }
    }, [progress]);
    
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            isAnimating && setProgress((currentIndex / (pairedArray.length - 1)) * 100);
        }, 1000);
        return () => clearInterval(interval);
    }, [currentIndex, pairedArray.length, isPlaying]);



  return (
    <div className="container">
            <div className="playbar-container">
                <button className="playBar-btn">
                    <FilterAltIcon />
                </button>
                <button className="playBar-btn">
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
                <span className="progress-percentage"><b>{(progress).toFixed(2)}/100</b></span>
                <button className="playBar-btn">
                    <FaForward />
                </button>
                <button className="playBar-btn">
                    <SpeedIcon />
                </button>
                <button className="cutHistory" onClick={handleCutHistory}>X</button>
            </div>

    <br /><br />

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

  )
}

export default PlayBar;
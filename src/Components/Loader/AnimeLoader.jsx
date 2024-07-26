import React, { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import anime from "../../assets/LoadingPerson.json";

const AnimeLoader = ({message}) => {
  const phoneRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
        flexDirection: "column",
      }}
    >
      <div className="lottie-container">
        <Lottie
          onComplete={() => {
            phoneRef.current?.setDirection(-1);
            phoneRef.current?.play();
          }}
          lottieRef={phoneRef}
          animationData={anime}
          className="animation"
        />
      </div>
      <div className="message">
        {message}
      </div>
    </div>
  );
};

export default AnimeLoader;



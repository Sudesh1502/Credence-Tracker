import "./IndividualNav.css";
import Button from "@mui/material/Button";
import * as React from 'react';
import LiveTracking from "../LiveTracking/LiveTracking";

const IndividualNav = ({ showMyLocation, setIndividualMap, setShowPlayBar, individualDataObj, setIsCalender, livetrack, setLivetrack }) => {
  const [track, setTrack] = React.useState(false);

  const handleClose = () => {
    setIndividualMap(false);
  };

  const handleHistory = () => {
    setShowPlayBar(true);
    setIsCalender(true);
  };

  const startTracking = () => {
    setTrack(true); // Start tracking
    setLivetrack(true);
  };

  React.useEffect(() => {
    if (!track) {
      setLivetrack(false);
    }
  }, [track, setLivetrack]);

  return (
    <div className="individualNav">
      <div className="carNumber">{`${individualDataObj.name}`}</div>
      <div className="carInfo">
        <Button
          variant="outlined"
          onClick={startTracking} // Start tracking when clicked
          sx={{
            color: "#000000",
            fontWeight: "500",
            backgroundColor: "#f4e3c0",
            "&:hover": {
              backgroundColor: "#b5afa1",
            },
          }}
        >
          Track
        </Button>

        {track && (
          <LiveTracking individualDataObj={individualDataObj} setTrack={setTrack} />
        )}

        <Button
          variant="contained"
          sx={{
            color: "#000000",
            fontWeight: "500",
            backgroundColor: "#f4e3c0",
            "&:hover": {
              backgroundColor: "#b5afa1",
            },
          }}
          onClick={handleHistory}
        >
          History
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "#000000",
            fontWeight: "500",
            backgroundColor: "#f4e3c0",
            "&:hover": {
              backgroundColor: "#b5afa1",
            },
          }}
        >
          More
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "#000000",
            fontWeight: "500",
            backgroundColor: "#f4e3c0",
            "&:hover": {
              backgroundColor: "#b5afa1",
            },
          }}
          onClick={handleClose}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default IndividualNav;

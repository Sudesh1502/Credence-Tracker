import "./IndividualNav.css";
import Button from "@mui/material/Button";

const IndividualNav = ({ setIndividualMap, setShowPlayBar, individualDataObj, setIsCalender}) => {
  const handleClose = () => {
    setIndividualMap(false);
    
  };

  const handleHistory = ()=> {
    setShowPlayBar(true);
    setIsCalender(true);
  }

  return (
    <div className="individualNav">
      <div className="carNumber">{`${individualDataObj.name}`}</div>
      <div className="carInfo">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000000",
            "&:hover": {
              backgroundColor: "#1a242f",
            },
          }}
        >
          Track
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000000",
            "&:hover": {
              backgroundColor: "#1a242f",
            },
          }}

          onClick={handleHistory}
        >
          History
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000000",
            "&:hover": {
              backgroundColor: "#1a242f",
            },
          }}
        >
          More
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000000",
            "&:hover": {
              backgroundColor: "#1a242f",
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

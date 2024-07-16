import "./IndividualNav.css";
import Button from "@mui/material/Button";

const IndividualNav = ({ setIndividualMap, setShowPlayBar, individualDataObj}) => {
  const handleClose = () => {
    setIndividualMap(false);
  };

  const handleHistory = ()=> {
    setShowPlayBar(true);
  }

  return (
    <div className="individualNav">
      <div className="carNumber">{`${individualDataObj.name}`}</div>
      <div className="carInfo">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2c3e50",
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
            backgroundColor: "#2c3e50",
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
            backgroundColor: "#2c3e50",
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
            backgroundColor: "#2c3e50",
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

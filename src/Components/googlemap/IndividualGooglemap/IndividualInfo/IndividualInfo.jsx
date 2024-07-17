import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "./IndividualInfo.css";
import { SlSpeedometer } from "react-icons/sl";
import { GiPathDistance, GiBusStop  } from "react-icons/gi";
import { GrCar } from "react-icons/gr";
import { IoMdStopwatch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { FaCarSide } from "react-icons/fa";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomGrid = ({ individualDataObj }) => {
  // console.log("individualDataObj " + individualDataObj[0])
  return (
    <Box sx={{ flexGrow: 1 }} className="indiviudalInfo">
      <Grid container spacing={2} columns={4}>
        <Grid item xs={1}>
          <Item className="Infocontainer">
            <div className="gridDiv">
              <div className="icon">
                <FaCarSide />
              </div>
              <div className="info">
                <p className="infoHead">Speed</p>
                <p className="infoData">{`${individualDataObj.speed ?? 'N/A'} kmph`}</p>
              </div>
            </div>
          </Item>
        </Grid>
        {/* <Grid item xs={1}>
          <Item className="Infocontainer">
            <div className="gridDiv">
              <div className="icon">
                <SlSpeedometer />
              </div>
              <div className="info">
                <p className="infoHead">Odometer</p>
                <p className="infoData">{`${individualDataObj.attributes?.totalDistance ?? 'N/A'}`}</p>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={1}>
          <Item>
            <div className="gridDiv">
              <div className="icon">
                <GiBusStop />
              </div>
              <div className="info">
                <p className="infoHead">Total Distance</p>
                <p className="infoData">{`${individualDataObj.attributes?.totalDistance ?? 'N/A'} km`}</p>
              </div>
            </div>
          </Item>
        </Grid> */}
        <Grid item xs={1}>
          <Item>
            <div className="gridDiv">
              <div className="icon">
                <GrCar />
              </div>
              <div className="info">
                <p className="infoHead">Ododuration</p>
                <p className="infoData">N/A</p>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={1}>
          <Item>
            <div className="gridDiv">
              <div className="icon">
                <GiPathDistance />
              </div>
              <div className="info">
                <p className="infoHead">Distance from last stop</p>
                <p className="infoData">{`${individualDataObj.attributes?.distance ?? 'N/A'} km`}</p>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={1}>
          <Item>
            <div className="gridDiv">
              <div className="icon">
                <IoMdStopwatch />
              </div>
              <div className="info">
                <p className="infoHead">Duration from last stop</p>
                <p className="infoData">{`${individualDataObj.lastUpdate ?? 'N/A'}`}</p>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={1}>
          <Item>
            <div className="gridDiv">
              <div className="icon">
                <TbCurrentLocation />
              </div>
              <div className="info">
                <p className="infoHead">Co-ordinates</p>
                <p className="infoData">{`${individualDataObj.latitude ?? 'N/A'}, ${individualDataObj.longitude ?? 'N/A'}`}</p>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={1}>
          <Item>
            <div className="gridDiv">
              <div className="icon">
                <IoLocationOutline />
              </div>
              <div className="info">
                <p className="infoHead">Last Update</p>
                <p className="infoData">{`${individualDataObj.lastUpdate ?? 'N/A'}`}</p>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={1}>
          <Item>
            <div className="gridDiv">
              <div className="icon">
                <BsFillPersonVcardFill />
              </div>
              <div className="info">
                <p className="infoHead">Alias</p>
                <p className="infoData">N/A</p>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={1} style={{ width: '200px' }}>
          <Item>
            <div className="gridDiv">
              <div className="icon">
                <WiHumidity />
              </div>
              <div className="info">
                <p className="infoHead">Humidity</p>
                <p className="infoData">N/A</p>
              </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomGrid;

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { green, red, yellow, blue, grey, orange } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopIcon from '@mui/icons-material/Stop';
import SpeedIcon from '@mui/icons-material/Speed';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import "./Cards.css"
export const Cards = ({vehicleRunningCount, vehicleStoppedCount, vehicleOverspeedCount, vehicleIdleCount, vehicleUnreachableCount}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom:"35px", gap:"25px"}}>
      {/* Running */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor:"#fff", borderRadius:"6px", border:"1px solid black",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", backgroundColor: green[200], padding: '5px', borderRadius: 2, marginBottom: '5px', width:"100%"}}>
            <AccessTimeIcon sx={{ color: green[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Running</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: green[500], fontSize: "0.875rem" }}>{vehicleRunningCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Stopped */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor:"#fff", borderRadius:"6px", border:"1px solid black",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", backgroundColor: red[200], padding: '5px', borderRadius: 2, marginBottom: '5px', width:"100%" }}>
            <StopIcon sx={{ color: red[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Stopped</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: red[500], fontSize: "0.875rem" }}>{vehicleStoppedCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Overspeed */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor:"#fff", borderRadius:"6px", border:"1px solid black",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", backgroundColor: orange[200], padding: '5px', borderRadius: 2, marginBottom: '5px', width:"100%" }}>
            <SpeedIcon sx={{ color: orange[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Overspeed</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: orange[500], fontSize: "0.875rem" }}>{vehicleOverspeedCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Idle */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor:"#fff", borderRadius:"6px", border:"1px solid black",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", backgroundColor: yellow[200], padding: '5px', borderRadius: 2, marginBottom: '5px', width:"100%" }}>
            <HourglassEmptyIcon sx={{ color: yellow[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Idle</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: yellow[500], fontSize: "0.875rem" }}>{vehicleIdleCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Unreachable */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor:"#fff", borderRadius:"6px", border:"1px solid black",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", backgroundColor: blue[200], padding: '5px', borderRadius: 2, marginBottom: '5px', width:"100%" }}>
            <ErrorIcon sx={{ color: blue[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>Unreachable</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: blue[500], fontSize: "0.875rem" }}>{vehicleUnreachableCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* New */}
      <Card sx={{ width: 197, margin: '5px', backgroundColor:"#fff", borderRadius:"6px", border:"1px solid black",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center", backgroundColor: grey[200], padding: '5px', borderRadius: 2, marginBottom: '5px', width:"100%" }}>
            <NewReleasesIcon sx={{ color: grey[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: "1rem" }}>New</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: grey[500], fontSize: "0.875rem" }}>00/Assets</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

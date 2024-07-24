import React from 'react';
import { Button,TextField,FormControlLabel,Checkbox } from '@mui/material';


export const CreateRoute = () => {
    const [location, setLocation] = React.useState('');
    const [roundTrip, setRoundTrip ] = React.useState('');

    

  return (<>
  <h3>Create Route</h3>
    <TextField
            label="Select Landmark to add a location(Min Two Times)"
            variant="outlined"
            fullWidth
            sx={{width:500}}
            margin="normal"
            select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></TextField><br/>
           <Button
        variant="contained"
        onClick={{}}
        sx={{
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#1a242f',
          },
          alignItems: 'center',
          
        }}
      >
        Add Location</Button>
        <Button
        variant="contained"
        onClick={{}}
        sx={{
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#1a242f',
          },
          alignItems: 'center',
          marginLeft:5
        }}
      >
        Undo</Button>
        <Button
        variant="contained"
        onClick={()=>setLocation('')}
        sx={{
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#1a242f',
          },
          alignItems: 'center',
          marginLeft:5
        }}
      >
        Clear</Button><br/>
        
        <FormControlLabel
            control={<Checkbox checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)} />}
            label="Round Trip"
          /><br/>
          <label for="favcolor">Color:</label>
          <input type="color" id="favcolor" value="#ff0000" /><br/>
          <Button variant="contained"  sx={{
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#1a242f',
          },
          alignItems: 'center'}}>Get Directions</Button>
            
        </>
  )
}


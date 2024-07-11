import React, { useState, useEffect } from 'react';
import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const CustomTabs = ({ tabs, selectedTab, handleRemoveTab }) => {
  const [value, setValue] = useState(selectedTab);
  const [assetStatus,setAssetStatus] = useState();

  useEffect(() => {
    setValue(selectedTab);
  }, [selectedTab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabClose = (tab) => {
    handleRemoveTab(tab);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',display: 'flex', alignItems: 'center' }}>
        <MuiTabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
          {tabs.map((tab, index) => (
            <div style={{display:'flex', justifyContent:'space-between'}}>
            <Tab key={tab} label={tab} {...a11yProps(index)} />
            <IconButton onClick={()=>handleTabClose(tab)} sx={{ marginRight:5 }}>
            <CloseIcon />
            </IconButton>
            </div>
          ))}
        </MuiTabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={tab} value={value} index={index}>
        {tab === 'Dashboard' && (
          <>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <FormControl variant="outlined" fullWidth style={{width:300 }}>
                <InputLabel id="asset-status-label-1">Asset Status</InputLabel>
                <Select
                  labelId="asset-status-label-1"
                  id="asset-status-select-1"
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.target.value)}
                  label="Select Asset Status"
                >
                  <MenuItem value="All assets">All assets</MenuItem>
                  <MenuItem value="Running">Running</MenuItem>
                  <MenuItem value="Parked">Parked</MenuItem>
                  <MenuItem value="less than 10km">Less than 10km</MenuItem>
                  <MenuItem value="Out of Network">Out of Network</MenuItem>
                  <MenuItem value="Device Fault">Device Fault</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth style={{width:300, marginBottom: '16px' }}>
                <InputLabel id="asset-status-label-2">Assets</InputLabel>
                <Select
                  labelId="asset-status-label-2"
                  id="asset-status-select-2"
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.target.value)}
                  label="Select Asset Status"
                >
                  {/* Add your asset options here */}
                </Select>
              </FormControl>
            
            
              <FormControl variant="outlined" fullWidth style={{width:300, marginBottom: '16px'}}>
                <InputLabel id="asset-status-label-3">Users</InputLabel>
                <Select
                  labelId="asset-status-label-3"
                  id="asset-status-select-3"
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.target.value)}
                  label="Select Asset Status"
                >
              <MenuItem value="All users">All users</MenuItem>
              <MenuItem value="ankur(Ankur Jain)">ankur(Ankur Jain)</MenuItem>
              <MenuItem value="ashwini(Ashwini Gaikwad)">ashwini(Ashwini Gaikwad)</MenuItem>
              <MenuItem value="harshal(harshal harshal)">harshal(harshal harshal)</MenuItem>
              <MenuItem value="Harshal 123 (HARSHAL CREDANCE)">Harshal 123 (HARSHAL CREDANCE)</MenuItem>
              <MenuItem value="josh(josh JOSH)">josh(josh JOSH)</MenuItem>
              <MenuItem value="vts(CGS Company)">vts(CGS Company)</MenuItem>
              <MenuItem value="vtsdemo1 (chate global services)">vtsdemo1 (chate global services)</MenuItem>
              <MenuItem value="wcldemo(wcl wcl)">wcldemo(wcl wcl)</MenuItem>
                  {/* Add your user options here */}
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth style={{width:300, marginBottom: '16px' }}>
                <InputLabel id="asset-status-label-4">Groups</InputLabel>
                <Select
                  labelId="asset-status-label-4"
                  id="asset-status-select-4"
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.target.value)}
                  label="Select Asset Status"
                >
                  <MenuItem value="All Group">All Group</MenuItem>
                  <MenuItem value="Ankur asset">Ankur asset</MenuItem>
                  {/* Add your group options here */}
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth style={{width:300, marginBottom: '16px' }}>
                <InputLabel id="asset-status-label-5">Areas</InputLabel>
                <Select
                  labelId="asset-status-label-5"
                  id="asset-status-select-5"
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.target.value)}
                  label="Select Asset Status"
                >
                <MenuItem value="All Areas">All Areas</MenuItem>
              <MenuItem value="amanora">amanora</MenuItem>
              <MenuItem value="Ram Nager">Ram Nager</MenuItem>
                  {/* Add your area options here */}
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth style={{width:300, marginBottom: '16px' }}>
                <InputLabel id="asset-status-label-6">Landmarks</InputLabel>
                <Select
                  labelId="asset-status-label-6"
                  id="asset-status-select-6"
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.target.value)}
                  label="Select Asset Status"
                >
                <MenuItem value="All Landmarks">All Landmarks</MenuItem>
              <MenuItem value="API Corner">API Corner</MenuItem>
              <MenuItem value="LOADING POINT">LOADING POINT</MenuItem>
              <MenuItem value="Shivneri Lawns">Shivneri Lawns</MenuItem>
              <MenuItem value="UNLOADING POINT">UNLOADING POINT</MenuItem>
              <MenuItem value="weighing bridge">weighing bridge</MenuItem>
              <MenuItem value="yashwant nagar">yashwant nagar</MenuItem>
                  {/* Add your landmark options here */}
                </Select>
              </FormControl></div><br/>
              <div style={{display:'flex', justifyContent:'right'}}>
              <FormControl variant="outlined" fullWidth style={{ width:'300px', marginBottom: '16px' }}>
                <InputLabel id="asset-status-label-6">Select Vehicles</InputLabel>
                <Select
                  labelId="asset-status-label-6"
                  id="asset-status-select-6"
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.target.value)}
                  label="Select Asset Status"
                >
                <MenuItem value="MH40BL3039-BESA">MH40BL3039-BESA</MenuItem>
              <MenuItem value="MH40AT0461-HANSA">MH40AT0461-HANSA</MenuItem>
              <MenuItem value="MH04CU9077">MH04CU9077</MenuItem>
              <MenuItem value="MH34BG5552">MH34BG5552</MenuItem>
              <MenuItem value="MH31FC2330">MH31FC2330</MenuItem>
              <MenuItem value="MH31FC1100">MH31FC1100</MenuItem>
              <MenuItem value="MH31-EQ0455">MH31-EQ0455</MenuItem>
              <MenuItem value="Mixer">Mixer</MenuItem>
              <MenuItem value="MH29M8497-HANSA">MH29M8497-HANSA</MenuItem>

                  {/* Add your landmark options here */}
                </Select>
              </FormControl>
              </div>
            </>
        )}
      </TabPanel>
      ))}
    </Box>
  );
};

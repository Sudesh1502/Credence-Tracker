import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import * as XLSX from "xlsx";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  keyframes,
} from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
};

export const TravelSummaryReport = ({ data }) => {
  // console.log(data);
  const [page, setPage] = useState(0);
  const [individualDataObj,setIndividualDataObj] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [filteredRows, setFilteredRows] = useState(
    MOCK_DATA.map((row) => ({ ...row, isSelected: false }))
  );
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(COLUMNS.map((col) => [col.accessor, true]))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [vehicleRunningCount, setVehicleRunningCount] = useState(0);
  const [vehicleStoppedCount, setVehicleStoppedCount] = useState(0);
  const [vehicleOverspeedCount, setVehicleOverspeedCount] = useState(0);
  const [vehicleIdleCount, setVehicleIdleCount] = useState(0);
  const [vehicleUnreachableCount, setVehicleUnreachableCount] = useState(0);
  const [apiData, setAPIData] = useState([]);
  const [assetDetailsModalOpen, setAssetDetailsModalOpen] = useState(false);
  const [assetStatusValue, setAssetStatusValue] = useState("");
  const [assetsValue, setAssetsValue] = useState("");
  const [usersValue, setUsersValue] = useState("");
  const [groupsValue, setGroupsValue] = useState("");
  const [areasValue, setAreasValue] = useState("");
  const [landmarksValue, setLandmarksValue] = useState("");
  const [vehiclesValue, setVehiclesValue] = useState("");
  const [totDist, setTotDist] = useState(0);
  const [attributes1, setAttributes1] = useState("");
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [addressesValue, setAddressesValue] = useState();

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [lati, setLati] = useState(0);
  const [longi, setLongi] = useState(0);
  const [individualMap, setIndividualMap] = useState(false);
  const [lat, setLat]= useState(0);
  const [lng, setLng] = useState(0);
  const [startDateTimeValue, setStartDateTimeValue] = useState(null);
  const [endDateTimeValue, setEndDateTimeValue] = useState(null);


  const handleDateTimeChange = (newValue) => {
      const formattedStartDateTime = newValue[0] ? dayjs(newValue[0]).toISOString() : null;
      const formattedEndDateTime = newValue[1] ? dayjs(newValue[1]).toISOString() : null;
  
      setStartDateTimeValue(formattedStartDateTime);
      setEndDateTimeValue(formattedEndDateTime);
    };

  useEffect(() => {
    setFilteredRows(data.map((row) => ({ ...row, isSelected: false })));
  }, [data]);

  useEffect(() => {
    setLatitude(data.map((row) => row.latitude));
    // console.log(latitude);
  }, [data]);

  useEffect(() => {
    setLongitude(data.map((row) => row.longitude));
    //  console.log(longitude);
  }, [data]);

  useEffect(() => {
    // console.log(filteredRows);
    // for (let i = 0; i < filteredRows.length; i++) {
    //   let row = filteredRows[i];
    //   if (row.hasOwnProperty('attributes')) {
    //     for (let key in row.attributes) {
    //       if (key === 'totalDistance') {
    //         console.log(row.attributes[key]);
    //         // COLUMNS(row.attributes[key])
    //       } else {
    //         console.log('');
    //       }
    //     }
    //   }
    // }
  }, [filteredRows]);




  useEffect(()=>{
    const running = data.filter((row)=>row.speed>0).length;
    setVehicleRunningCount(running);

    const stopped = data.filter((row)=>row.speed===0 && row.status==='offline').length;
    setVehicleStoppedCount(stopped);

    const overspeed = data.filter((row)=>row.speed>140).length;
    setVehicleOverspeedCount(overspeed);

    const idle = data.filter((row)=>row.speed===0 && row.status==='online').length;
    setVehicleIdleCount(idle);

    const currentTime = new Date();
    const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;

    const unreachable = data.filter((row) => 
      row.status === 'offline' && 
        currentTime - new Date(row.lastUpdate) >twelveHoursInMilliseconds
    ).length;

    setVehicleUnreachableCount(unreachable);
  },[data])

  useEffect(() => {
    const getAddressFromLatLng = async (lat, lng) => {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
      try {
        const response = await axios.get(url);
        if (response.data.results.length > 0) {
          setAddressesValue(response.data.results[0].formatted_address);
        } else {
          setAddressesValue("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddressesValue("Error fetching address");
      }
    };
    
    

    const fetchAddresses = async () => {
      const addresses = await Promise.all(
        data.map(async (row) => {
          const address = await getAddressFromLatLng(
            row.latitude,
            row.longitude
          );
          // console.log('lat long value',row.latitude, row.longitude)
          return { ...row, address };
        })
      );
      setAddressesValue(addresses);
      // console.log(addresses);
    };

    fetchAddresses();
  }, [data]);

  useEffect(() => {
    filterData(filterText);
  }, [filterText]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const text = event.target.value;
    setFilterText(text);
  };

  const filterData = (text) => {
    const filteredData = MOCK_DATA.filter((row) =>
      Object.values(row).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(text.toLowerCase())
      )
    ).map((row) => ({ ...row, isSelected: false }));
    setFilteredRows(filteredData);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleVehicleClick = () => {
    setAssetDetailsModalOpen(true);
  };

  const handleLocationClick = (latitude, longitude) => {
    setIndividualMap(true);
    
    setLati (latitude);
    
    setLongi (longitude);
    
  };

  
  const handleData = (dataLat,dataLng,data) =>{
    for(let i = 0; i < data.length; i++){
      if(data[i].latitude === dataLat && data[i].longitude === dataLng){
        setIndividualDataObj( data[i]);
        // console.log(data[i]);
        
      }
    }
  }

  

  const handleExport = () => {
    const dataToExport = filteredRows.map((row) => {
      const { isSelected, ...rowData } = row;
      return rowData;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Dashboard.xlsx");
  };

  const handleColumnVisibilityChange = (accessor) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [accessor]: !prevState[accessor],
    }));
  };

  const handleRowSelect = (index) => {
    const newFilteredRows = [...filteredRows];
    newFilteredRows[index].isSelected = !newFilteredRows[index].isSelected;
    setFilteredRows(newFilteredRows);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const newFilteredRows = filteredRows.map((row) => ({
      ...row,
      isSelected: newSelectAll,
    }));
    setFilteredRows(newFilteredRows);
    setSelectAll(newSelectAll);
  };

  const sortedData = [...filteredRows];
  if (sortConfig.key !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const columns = COLUMNS.map((col) => ({
    ...col,
    Cell:
      col.accessor === "select"
        ? ({ row }) => (
            <input
              type="checkbox"
              checked={row.original.isSelected}
              onChange={() => handleRowSelect(row.index)}
            />
          )
        : col.Cell,
  }));

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimeRangePicker']}>
          <DateTimeRangePicker
            localeText={{ start: 'Check-in', end: 'Check-out' }}
            value={[startDateTimeValue ? dayjs(startDateTimeValue) : null, endDateTimeValue ? dayjs(endDateTimeValue) : null]}
            onChange={handleDateTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>
 <div style={{ marginTop: "5px" }}>
        {
          
          <>
          
        <br />
        <div style={{ display: "flex", justifyContent: "right" }}>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              width: 250,
              "& .MuiInputBase-root": { height: 40 },
              marginBottom: 2,
            }}
          >
            <InputLabel id="vehicles-label-6">Select Vehicles</InputLabel>
            
            <Select
  labelId="vehicles-label-6"
  id="vehicles-select-6"
  value={vehiclesValue}
  onChange={(e) => setVehiclesValue(e.target.value)}
  label="Select Asset Status"
>
  {data && data.length > 0 && data.map((row, index) => (
    <MenuItem key={index} value={row.name}>
      {row.name}
    </MenuItem>
  ))}
</Select>

          </FormControl>
        </div>
          </>
        }


        <br />
      </div>

      
      
      <br />

      <div>
      {individualMap ? (
          <></>
        ) : (
          <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
            sx={{
              marginRight: "10px",
              width: "200px",
              "& .MuiInputBase-root": { height: 40 },
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    marginRight: "5px",
                  }}
                />
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: "#2c3e50",
              "&:hover": {
                backgroundColor: "#1a242f",
              },
            }}
          >
            Manage Columns
          </Button>
        </div> 
        )}
        
            {/* GoogleMaps */}
        {individualMap ? (
          <></>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "16px" }}>
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    key="select-all"
                    align="left"
                    style={{
                      minWidth: 50,
                      borderRight: "1px solid #ddd",
                      backgroundColor: "#2c3e50",
                      color: "white",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {columns.map(
                    (column) =>
                      column.accessor !== "select" &&
                      columnVisibility[column.accessor] && (
                        <TableCell
                          key={column.Header}
                          align={
                            column.accessor === "date_of_birth"
                              ? "right"
                              : "left"
                          }
                          style={{
                            minWidth: column.minWidth,
                            borderRight: "1px solid #ddd",
                            backgroundColor: "#2c3e50",
                            color: "white",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => requestSort(column.accessor)}
                          >
                            {column.Header}
                            <ArrowUpwardIcon
                              style={{
                                width: "10px",
                                color:
                                  sortConfig.key === column.accessor &&
                                  sortConfig.direction === "ascending"
                                    ? "black"
                                    : "#bbb",
                              }}
                            />
                            <ArrowDownwardIcon
                              style={{
                                width: "10px",
                                color:
                                  sortConfig.key === column.accessor &&
                                  sortConfig.direction === "descending"
                                    ? "black"
                                    : "#bbb",
                              }}
                            />
                          </div>
                        </TableCell>
                      )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9",
                      }}
                    >
                      <TableCell
                        key={`select-${index}`}
                        align="left"
                        style={{
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={row.isSelected}
                          onChange={() => handleRowSelect(index)}
                        />
                      </TableCell>
                      {columns.map(
                        (column) =>
                          column.accessor !== "select" &&
                          columnVisibility[column.accessor] && (
                            <TableCell
                              key={column.accessor}
                              align={
                                column.accessor === "date_of_birth"
                                  ? "right"
                                  : "left"
                              }
                              style={{
                                borderRight: "1px solid #ddd",
                                cursor:
                                  column.accessor === "location"
                                    ? "pointer"
                                    : "default", // Add cursor style for indicating clickable element
                              }}
                              onClick={() => {

                                if (column.accessor === "location") {
                                  handleData(row.latitude, row.longitude, data);
                                  
                                  handleLocationClick(row.latitude, row.longitude)
                                  
                                } else if (column.accessor === "name") {
                                  handleVehicleClick();
                                }
                              }}
                            >
                              {column.Cell
                                ? column.Cell({
                                    value: row[column.accessor],
                                    row,
                                  })
                                : row[column.accessor]}
                            </TableCell>
                          )
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        )}

{individualMap ? (
          <></>
        ) : (
          <Button
          variant="contained"
          color="primary"
          startIcon={<ImportExportIcon />}
          onClick={handleExport}
          sx={{
            marginRight: "10px",
            backgroundColor: "#2c3e50",
            "&:hover": {
              backgroundColor: "#1a242f",
            },
          }}
        >
          Export
        </Button> 
        )}
        
        

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Manage Columns</h2>
            {columns.map((column) => (
              <div
                key={column.accessor}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{column.Header}</span>
                <Switch
                  checked={columnVisibility[column.accessor]}
                  onChange={() => handleColumnVisibilityChange(column.accessor)}
                />
              </div>
            ))}
          </Box>
        </Modal>
        <Modal
          open={assetDetailsModalOpen}
          onClose={() => setAssetDetailsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper>
                  <h3>Asset Details</h3>
                  <br />
                  <p>Asset Name</p>
                  <p>Device Id</p>
                  <p>Device Description</p>
                  <p>Device Status</p>
                  <p>SIM Number or SAT</p>
                  <p>Driver Name</p>
                  <p>Driver Mobile No</p>
                  <p>Battery Size</p>
                  <p>KM Reading</p>
                  <p>Max Speed Limit</p>
                  <p>Provider 3G or SAT</p>
                  <p>Engine Runtime</p>
                  <p>Sensor Type</p>
                  <p>Message Cause</p>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Current Location</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Distance Travel(Today)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Max Speed</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Distance Graph(Last 7 Days)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Speed Graph(Last 3 hours)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Landmark Report(Last 10 Records)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Distance Location(Last 10 Records)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>All Points(Last 20 Records)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Stop Report(Last 10 Records)</h3>
                  <br />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <h3>Area In/Out Report(Last 10 Records)</h3>
                  <br />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        {/* 
        <Modal
          open={locationModalOpen}
          onClose={() => setLocationModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
           
    <Box sx={style}>
    <div style={{ height: '500px', width: '100%' }}>
      <iframe
        src={`https://maps.google.com/maps?q=${latitude[1]},${longitude[1]}&z=${zoom}&output=embed`}
        style={{ border: 0, height: '100%', width: '100%' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="google map"
      ></iframe>
    </div>
          </Box>
    
        </Modal> */}
      </div>
    </>
  );
};

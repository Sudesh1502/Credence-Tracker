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
import GoogleMapComponent from "../googlemap/googlemap.jsx";
import { Cards } from "../Cards/Cards.jsx";
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
import IndividualGooglemap from "../googlemap/IndividualGooglemap/IndividualGooglemap.jsx";
import "./table.css";
import Loader from "../Loader/Loader.jsx";
import AnimeLoader from "../Loader/AnimeLoader.jsx";

//===================================================================================================================
//ANIMATION==========================================================================================================

import loadingPerson from "../../assets/LoadingPerson.json";
import waitingPerson from "../../assets/waitingPerson.json";

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

export const Tablee = ({ data }) => {
  // console.log(data);
  const [page, setPage] = useState(0);
  const [individualDataObj, setIndividualDataObj] = useState({});
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
  const [assetStatusValue, setAssetStatusValue] = useState("All assets");
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
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

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
    console.log(filteredRows);
    for (let i = 0; i < filteredRows.length; i++) {
      let row = filteredRows[i];
      if (row.hasOwnProperty("attributes")) {
        for (let key in row.attributes) {
          if (key === "totalDistance") {
            console.log(row.attributes[key]);
            // COLUMNS(row.attributes[key])
          } else {
            console.log("");
          }
        }
      }
    }
  }, [filteredRows]);

  useEffect(() => {
    const running = data.filter((row) => row.speed > 5).length;
    setVehicleRunningCount(running);

    const stopped = data.filter(
      (row) => row.speed === 0 && row.status === "offline"
    ).length;
    setVehicleStoppedCount(stopped);

    const overspeed = data.filter((row) => row.speed > 140).length;
    setVehicleOverspeedCount(overspeed);

    const idle = data.filter(
      (row) => row.speed < 5 && row.status === "online"
    ).length;
    setVehicleIdleCount(idle);

    const currentTime = new Date();
    const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;

    const unreachable = data.filter(
      (row) =>
        row.status === "offline" &&
        currentTime - new Date(row.lastUpdate) > twelveHoursInMilliseconds
    ).length;

    setVehicleUnreachableCount(unreachable);
  }, [data]);

  useEffect(() => {
    const getAddressFromLatLng = async (lat, lng) => {
      const apiKey = "AIzaSyAvHHoPKPwRFui0undeEUrz00-8w6qFtik";
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

  const handleLocationClick = (latitude, longitude, row) => {
    setIndividualMap(true);
    console.log("I am row .........................   ", row);
    setLati(latitude);

    setLongi(longitude);
  };

  const handleData = (dataLat, dataLng, data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].latitude === dataLat && data[i].longitude === dataLng) {
        setIndividualDataObj(data[i]);
        // console.log(data[i]);
      }
    }
  };

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
  // ===================================================handling the filter==================================================================

  const determineStatus = (vehicle) => {
    const currentTime = new Date();
    const lastUpdateTime = new Date(vehicle.lastUpdate); // Assuming vehicle has a lastUpdate property

    if (vehicle.ignition && vehicle.speed > 5) return "Running";
    if (vehicle.ignition && vehicle.speed <= 5) return "Ideal";
    if (!vehicle.ignition && vehicle.speed === 0) return "Stopped";
    if (!vehicle.ignition && currentTime - lastUpdateTime > 24 * 60 * 60 * 1000)
      return "Unreachable";
    return "New";
  };
  const [filteredAssets, setFilteredAssets] = useState(data);

  
  

  const filteredVehicles = filteredAssets.filter((vehicle) => {
    const status = determineStatus(vehicle);
    return assetStatusValue === "All assets" || status === assetStatusValue;
  });
  useEffect(() => {
    if (assetsValue === "All assets" || assetsValue === "") {
      setFilteredAssets(data);
    } else {
      const filteredData = data.filter(asset => asset.name === assetsValue);
      setFilteredAssets(filteredData);
    }
  }, [assetsValue, data]);
  
  // Update the filteredRows to use filteredAssets
  useEffect(() => {
    setFilteredRows(
      filteredAssets.map((row) => ({ ...row, isSelected: false }))
    );
  }, [filteredAssets]);



  useEffect(() => {
    let filteredData = data;
  
    if (vehiclesValue && vehiclesValue !== "All vehicles") {
      filteredData = filteredData.filter(asset => asset.category === vehiclesValue);
    }
  
    setFilteredAssets(filteredData);
  }, [vehiclesValue, data]);
  
  
  const handleSelectVehicle = (event) => {
    setVehiclesValue(event.target.value);
  };
  
  return (
    <>
      {/* {data?<Loader/>:<></>} */}
      <div style={{ marginTop: "-13px" }}>
        {individualMap ? (
          <></>
        ) : (
          <>
            {/* <hr /> */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "20px",
                padding: "0 5px",
              }}
            >
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="asset-status-label-1">Asset Status</InputLabel>
                <Select
                  labelId="asset-status-labezl-1"
                  id="asset-status-select-1"
                  value={assetStatusValue}
                  onChange={(e) => setAssetStatusValue(e.target.value)}
                  label="Select Asset Status"
                >
                  <MenuItem value="All assets">All assets</MenuItem>
                  <MenuItem value="Running">Running</MenuItem>
                  <MenuItem value="Stopped">Stopped</MenuItem>
                  <MenuItem value="Ideal">Ideal</MenuItem>
                  <MenuItem value="Unreachable">Unreachable</MenuItem>
                  <MenuItem value="New">New</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="asset-status-label-2">Assets</InputLabel>
                <Select
                  labelId="assets-label-2"
                  id="assets-select-2"
                  value={assetsValue}
                  onChange={(e) => {
                    setAssetsValue(e.target.value);
                    handleSelectVehicle()
                  }}
                  label="Select Assets"
                >
                  <MenuItem value="All assets">All assets</MenuItem>
                  {data.map((asset) => (
                    <MenuItem key={asset.name} value={asset.name}>
                      {asset.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="users-label-3">Users</InputLabel>
                <Select
                  labelId="users-label-3"
                  id="users-select-3"
                  value={usersValue}
                  onChange={(e) => setUsersValue(e.target.value)}
                  label="Select Users"
                >
                  <MenuItem value="All users">All users</MenuItem>
                  <MenuItem value="ankur(Ankur Jain)">
                    ankur(Ankur Jain)
                  </MenuItem>
                  <MenuItem value="ashwini(Ashwini Gaikwad)">
                    ashwini(Ashwini Gaikwad)
                  </MenuItem>
                  <MenuItem value="harshal(harshal harshal)">
                    harshal(harshal harshal)
                  </MenuItem>
                  <MenuItem value="Harshal 123 (HARSHAL CREDANCE)">
                    Harshal 123 (HARSHAL CREDANCE)
                  </MenuItem>
                  <MenuItem value="josh(josh JOSH)">josh(josh JOSH)</MenuItem>
                  <MenuItem value="vts(CGS Company)">vts(CGS Company)</MenuItem>
                  <MenuItem value="vtsdemo1 (chate global services)">
                    vtsdemo1 (chate global services)
                  </MenuItem>
                  <MenuItem value="wcldemo(wcl wcl)">wcldemo(wcl wcl)</MenuItem>
                  {/* Add your user options here */}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel
                  id="groups-label-4"
                  style={{ alignItems: "center" }}
                >
                  Groups
                </InputLabel>
                <Select
                  labelId="groups-label-4"
                  id="groups-select-4"
                  value={groupsValue}
                  onChange={(e) => setGroupsValue(e.target.value)}
                  label="Select Groups"
                >
                  <MenuItem value="All Group">All Group</MenuItem>
                  <MenuItem value="Ankur asset">Ankur asset</MenuItem>
                  {/* Add your group options here */}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="areas-label-5">Areas</InputLabel>
                <Select
                  labelId="areas-label-5"
                  id="areas-select-5"
                  value={areasValue}
                  onChange={(e) => setAreasValue(e.target.value)}
                  label="Select Areas"
                >
                  <MenuItem value="All Areas">All Areas</MenuItem>
                  <MenuItem value="amanora">amanora</MenuItem>
                  <MenuItem value="Ram Nager">Ram Nager</MenuItem>
                  {/* Add your area options here */}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ width: 250, "& .MuiInputBase-root": { height: 40 } }}
              >
                <InputLabel id="landmarks-label-6">Landmarks</InputLabel>
                <Select
                  labelId="landmarks-label-6"
                  id="landmarks-select-6"
                  value={landmarksValue}
                  onChange={(e) => setLandmarksValue(e.target.value)}
                  label="Select Landmarks"
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
              </FormControl>

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
                  // onChange={(e) => {
                  //   setVehiclesValue(e.target.value)
                  //   // handleSelectVehicle(e)
                  // }}
                  label="Select Asset Status"
                >
                  {/* Add your landmark options here */}
                  <MenuItem value="All assets">All Vehicles</MenuItem>
                  <MenuItem value="motorcycle">Bikes</MenuItem>
                  <MenuItem value="car">Cars</MenuItem>
                  <MenuItem value="Auto">Autos</MenuItem>
                  <MenuItem value="truck">Trucks</MenuItem>
                  <MenuItem value="tractor">Tractors</MenuItem>
                  <MenuItem value="jcb">Jcb</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* <br />
        <div style={{ display: "flex", justifyContent: "right" }}>
          
        </div> */}
          </>
        )}

        {/* GoogleMaps */}
        {individualMap ? (
          <IndividualGooglemap
            latitude={latitude}
            longitude={longitude}
            setIndividualMap={setIndividualMap}
            style={{ width: "100%" }}
            data={data}
            individualDataObj={individualDataObj}
          />
        ) : (
          <div
            className="gogo"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <GoogleMapComponent
              latitude={latitude}
              longitude={longitude}
              filteredVehicles={filteredVehicles}
            />
          </div>
        )}

        <br />
      </div>

      {individualMap ? (
        <></>
      ) : (
        <Cards
          vehicleRunningCount={vehicleRunningCount}
          vehicleStoppedCount={vehicleStoppedCount}
          vehicleOverspeedCount={vehicleOverspeedCount}
          vehicleIdleCount={vehicleIdleCount}
          vehicleUnreachableCount={vehicleUnreachableCount}
        />
      )}

      <br />

      {individualMap ? <></> : <hr />}
      <div>
        {individualMap ? (
          <></>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              marginLeft: "-0.5rem",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              value={filterText}
              onChange={handleFilterChange}
              sx={{
                marginRight: "10px",
                marginLeft: "20px",
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
                background: "linear-gradient(235deg, #f6e5c1, #8d8d8d)",
                "&:hover": {
                  backgroundColor: "#1a242f",
                },
                color: "#000000",
              }}
            >
              Manage Columns
            </Button>
          </div>
        )}

        {individualMap ? <></> : <hr />}

        {/* GoogleMaps */}
        {individualMap ? (
          <></>
        ) : (
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TableContainer
              sx={{
                maxHeight: "100%",
                width: "100%",
                borderRight: "2px solid black",
                borderTop: "2px solid black",
                borderRadius: "5px",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      key="select-all"
                      align="left"
                      style={{
                        minWidth: 50,
                        borderRight: "1px solid #ddd",
                        backgroundColor: "#a5a199",
                        color: "#000000",
                        fontWeight: "600",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    {columns ? <></> : <Loader />}
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
                              backgroundColor: "#a5a199",
                              color: "#000000",
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
                  {!sortedData || sortedData.length === 0 ? (
                    <AnimeLoader
                      message={
                        "Please hold on while we retrieve your information..."
                      }
                    />
                  ) : (
                    filteredVehicles
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "white" : "#f9f9f9",
                          }}
                          onClick={() => {
                            handleData(row.latitude, row.longitude, data);
                            handleLocationClick(row.latitude, row.longitude);
                          }}
                        >
                          <TableCell
                            className="tablecell"
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
                                  className="tablecell"
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
                                        : "default",
                                  }}
                                  onClick={() => {
                                    if (column.accessor === "location") {
                                      handleData(
                                        row.latitude,
                                        row.longitude,
                                        data
                                      );
                                      handleLocationClick(
                                        row.latitude,
                                        row.longitude,
                                        row
                                      );
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
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              style={{
                // background: "linear-gradient(135deg, #e0e0e0, #a0a0a0)",
                borderBottom: "1px solid black",
              }}
              rowsPerPageOptions={[10, 25, 10, 0]}
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
              background: "linear-gradient(235deg, #f6e5c1, #8d8d8d)",
              "&:hover": {
                backgroundColor: "#1a242f",
              },
              color: "#000000",
            }}
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              marginBottom: "20px",
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

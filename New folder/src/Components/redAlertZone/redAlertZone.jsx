import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { COLUMNS } from './columns'; // Import the columns
import MOCK_DATA from './MOCK_DATA.json'; // Import the mock data

export const RedAlertZone = () => {
  
    const columns = COLUMNS;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [filteredRows, setFilteredRows] = useState(MOCK_DATA);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [columnVisibility, setColumnVisibility] = useState(Object.fromEntries(columns.map(col => [col.accessor, true])));

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
    filterData(text);
  };

  const filterData = (text) => {
    const filteredData = MOCK_DATA.filter((row) =>
      Object.values(row).some(val => typeof val === 'string' && val.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredRows(filteredData);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleColumnVisibilityChange = (accessor) => {
    setColumnVisibility(prevState => ({
      ...prevState,
      [accessor]: !prevState[accessor]
    }));
  };

  const sortedData = [...filteredRows];
  if (sortConfig.key !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={filterText}
        onChange={handleFilterChange}
        sx={{ margin: '10px', width: '300px' }}
        InputProps={{
          startAdornment: (
            <SearchIcon style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '5px' }} />
          ),
        }}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  columnVisibility[column.accessor] && (
                    <TableCell
                      key={column.Header}
                      align={column.accessor === 'date_of_birth' ? 'right' : 'left'}
                      style={{
                        minWidth: column.minWidth,
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#2c3e50',
                        color: 'white',
                      }}
                    >
                      <div onClick={() => requestSort(column.accessor)}>
                        {column.Header}
                        {sortConfig.key === column.accessor && (
                          <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                        )}
                      </div>
                    </TableCell>
                  )
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => (
                      columnVisibility[column.accessor] && (
                        <TableCell
                          key={column.accessor}
                          align={column.accessor === 'date_of_birth' ? 'right' : 'left'}
                          style={{
                            borderRight: '1px solid #ddd',
                          }}
                        >
                          {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                        </TableCell>
                      )
                    ))}
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
    </div>
  );
};


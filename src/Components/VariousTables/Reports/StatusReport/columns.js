export const COLUMNS = [
    {
      Header: 'SN',
      accessor: 'sdfs',
    },
    {
      Header: 'Status',
      accessor: 'afda',
    },
    {
        Header: 'Status',
        accessor: 'deviceTime',
    },
    {
        Header: 'Start Address',
        accessor: 'dfghs'
    },
    {
        Header: 'Start Coordinate',
        accessor: 'coordinates', // This can be any string, as we are not using it directly.
        Cell: ({ row }) => {
          const lat = row.latitude;
          const long = row.longitude;
          return `${typeof lat === 'number' ? lat.toFixed(2) : 'N/A'}, ${typeof long === 'number' ? long.toFixed(2) : 'N/A'}`;
        },
      },
    {
        Header: 'End Date Time',
        accessor: 'fgsd'
    },
    {
        Header: 'End Address',
        accessor: 'dsfs'
    },
    {
        Header:'End Coordinate',
        accessor:'sada'
    },
    {
        Header:'S_Poi',
        accessor:'sdds'
    },
    {
        Header:'E_Poi',
        accessor:'wfw'
    },
    {
        Header:'Total Distance',
        accessor:'xsk'
    },
    {
        Header:'Duration',
        accessor:'ewgf'
    },
    {
        Header:'Driver Name',
        accessor:'lf'
    },
    {
        Header:'Driver Phone No.',
        accessor:'eth'
    },
    {
        Header:'Play',
        accessor:'asc'
    }
    
  ];
  
export const COLUMNS = () => [
    {
      Header: '',
      accessor: 'select',
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.isSelected}
          onChange={() => row.original.handleRowSelect(row.index)}
        />
      ),
    },
    {
      Header: 'SN',
      accessor: 'kjjg',
    },
    {
      Header: 'Cell',
      accessor: 'lk',
    },
    {
      Header: 'Lac',
      accessor: 'ljv',
    },
    {
      Header: 'Latitude',
      accessor: 'latitude',
    },
    {
        Header: 'Longitude',
        accessor: 'longitude',
      },
      {
        Header: 'Address',
        accessor: 'address',
      }
  ];
  
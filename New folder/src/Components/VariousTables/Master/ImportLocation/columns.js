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
      accessor: 'sdgsdfs',
    },
    {
      Header: 'Address',
      accessor: 'address',
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
        Header: 'Add Date',
        accessor: '',
      }
  ];
  
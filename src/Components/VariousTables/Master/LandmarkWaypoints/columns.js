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
      accessor: 'id',
    },
    {
      Header: 'Waypoint Name',
      accessor: '',
    },
    {
        Header: 'Landmark1',
        accessor: '',
      },
      {
        Header: 'Landmark2',
        accessor: '',
      },
  ];
  
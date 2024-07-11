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
      Header: 'Dispatch Date',
      accessor: '',
    },
    {
      Header: 'Start Date',
      accessor: '',
    },
    {
        Header: 'End Date',
        accessor: '',
      },
      {
        Header: 'Assets',
        accessor: '',
      },
      {
        Header: 'Users',
        accessor: '',
      },
      {
        Header: 'Mail',
        accessor: '',
      },
      {
        Header: 'Landmark',
        accessor: '',
      },
      {
        Header: 'Asset URL',
        accessor: '',
      }
  ];
  
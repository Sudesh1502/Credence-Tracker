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
      accessor: 'jhgk',
    },
    {
      Header: 'Driver Name',
      accessor: 'driver_name',
    },
    {
      Header: 'Asset Name',
      accessor:'name',
    },
    {
      Header: 'Driver Code',
      accessor: 'jg',
    },
    {
      Header: 'Address',
      accessor: 'iuyhb',
    },
    {
        Header: 'Mobile No',
        accessor: '875sa',
      },
      {
        Header: 'Email',
        accessor: 'jgg',
      },
      {
        Header: 'Send Mobile Alerts',
        accessor: 'lh',
      },
      {
        Header: 'Send Email Alerts',
        accessor: 'uyf',
      }
  ];
  
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
      Header: 'Name',
      accessor: '',
    },
    {
      Header: 'Email ID',
      accessor: '',
    },
    {
      Header: 'Mobile',
      accessor: '',
    },
    {
        Header: 'Mobile No',
        accessor: '',
      },
      {
        Header: 'Email Server Fail Address',
        accessor: '',
      },
      {
        Header: 'Email Status',
        accessor: '',
      },
      
  ];
  
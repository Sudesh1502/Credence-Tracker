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
      Header: 'RFID',
      accessor: '',
    },
    {
        Header: 'Person',
        accessor: '',
      },
      {
        Header: 'Assets',
        accessor: '',
      },
      {
        Header: 'Landmark',
        accessor: '',
      },
      {
        Header: 'Mobile',
        accessor: '',
      },
      {
        Header: 'Email Address',
        accessor: '',
      },
      {
        Header: 'Sms Alert',
        accessor: '',
      },
      {
        Header: 'Email Alert',
        accessor: '',
      },
      {
        Header: 'Comments',
        accessor: '',
      }
      
  ];
  
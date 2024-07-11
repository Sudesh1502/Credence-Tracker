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
      accessor: '',
    },
    {
      Header: 'Landmark',
      accessor: '',
    },
    {
      Header: 'Address',
      accessor: '',
    },
    {
      Header: 'Landmark Circle',
      accessor: '',
    },
    {
      Header: 'Assets',
      accessor: '',
    },
    {
      Header: 'Icon',
      accessor: '',
    },
    {
      Header: 'Comments',
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
      Header: 'Alert Before',
      accessor: '',
    }
    
  ];
  
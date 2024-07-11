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
      Header: 'Group Name',
      accessor: '',
    },
    {
      Header: 'Address',
      accessor: '',
    },
    {
      Header: 'Mobile Number',
      accessor: '',
    },
    {
      Header: 'Email',
      accessor: '',
    },
    {
      Header: 'Send SMS',
      accessor: '',
    },
    {
      Header: 'Send Email',
      accessor: '',
    }
  ];
  
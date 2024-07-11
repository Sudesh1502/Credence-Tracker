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
      Header: 'Menu Name',
      accessor: '',
    },
    {
        Header: 'Menu Link',
        accessor: '',
      },
      {
        Header: 'Where To Show',
        accessor: '',
      },
      {
        Header: 'Menu Sound',
        accessor: '',
      },
      {
        Header: 'Tab Title',
        accessor: '',
      },
      {
        Header: 'Menu Level',
        accessor: '',
      },
      {
        Header: 'Parent Menu',
        accessor: '',
      },
      {
        Header: 'Menu Image',
        accessor: '',
      },
      {
        Header: 'Priority',
        accessor: '',
      },
      {
        Header: 'Type',
        accessor: '',
      },
      {
        Header: 'Priority',
        accessor: '',
      },
  ];
  
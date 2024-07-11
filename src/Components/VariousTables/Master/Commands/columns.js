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
      accessor: 'kljl',
    },
    {
      Header: 'Device Type',
      accessor: 'jhkj',
    },
    {
      Header: 'Comments',
      accessor: 'ihoih',
    }
  ];
  
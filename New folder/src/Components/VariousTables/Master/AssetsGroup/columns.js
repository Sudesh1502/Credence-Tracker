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
      accessor: 'jhf',
    },
    {
      Header: 'Group Name',
      accessor: 'lkh',
    },
    {
        Header: 'Assets',
        accessor: 'kjjg',
      }
  ];
  
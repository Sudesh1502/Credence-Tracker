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
      accessor: 'sdfdsf',
    },
    {
      Header: 'Asset Command',
      accessor: 'sds',
    },
    {
      Header: 'Asset Class Name',
      accessor: 'asedas',
    },
  ];
  
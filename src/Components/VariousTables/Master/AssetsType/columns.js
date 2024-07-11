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
      accessor: 'jhhk',
    },
    {
      Header: 'Asset Type Name',
      accessor: 'category',
    },
    {
      Header: 'Comments',
      accessor: 'fsdf',
    }
  ];
  
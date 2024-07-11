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
      accessor: 'erye',
    },
    {
      Header: 'Landmark Group Name',
      accessor: 'ere',
    },
    {
      Header: 'Landmark Group List',
      accessor: 'ye5e',
    }
  ];
  
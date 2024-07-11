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
      accessor: 'dfsdfs',
    },
    {
      Header: 'Asset Category Name',
      accessor: '',
    },
    {
      Header: 'Type',
      accessor: 'category',
    },
    {
      Header: 'Assets Status',
      accessor: 'status',
    },
    {
      Header: 'Icon',
      accessor: 'efdf',
    }
  ];
  
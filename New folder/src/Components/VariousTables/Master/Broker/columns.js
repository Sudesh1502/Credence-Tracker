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
      Header: 'First Name',
      accessor: '',
    },
    {
      Header: 'Last Name',
      accessor: '',
    },
    {
        Header: 'Address',
        accessor: '',
      },
      {
        Header: 'City',
        accessor: '',
      },
      {
        Header: 'State',
        accessor: '',
      },
      {
        Header: 'Country',
        accessor: '',
      },
      {
        Header: 'Zip',
        accessor: '',
      },
      {
        Header: 'Phone NO',
        accessor: '',
      },
      {
        Header: 'Fax NO',
        accessor: '',
      },
      {
        Header: 'Mobile NO',
        accessor: '',
      },
      {
        Header: 'Email',
        accessor: '',
      },
      {
        Header: 'Company Name',
        accessor: '',
      }
  ];
  
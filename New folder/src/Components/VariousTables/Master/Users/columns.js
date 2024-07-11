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
      Header: 'Username',
      accessor: '',
    },
    {
      Header: 'D.O.B',
      accessor: '',
    },
    {
      Header: 'Admin',
      accessor: '',
    },
    {
      Header: 'Profile',
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
      Header: 'Phone No',
      accessor: '',
    },
    {
      Header: 'Fax No',
      accessor: '',
    },
    {
      Header: 'Mobile No',
      accessor: '',
    },
    {
      Header: 'Email',
      accessor: '',
    },
    {
      Header: 'Company Name',
      accessor: '',
    },
    {
        Header: 'User Registered Date',
        accessor: '',
      },
      {
        Header: 'Change Password',
        accessor: '',
      },
      {
        Header: 'History',
        accessor: '',
      },
      {
        Header: 'Allow Create User & Profile',
        accessor: '',
      },
      {
        Header: 'Allow Report View',
        accessor: '',
      },
      {
        Header: 'Allow Menu View',
        accessor: '',
      },
      {
        Header: 'Valid From',
        accessor: '',
      },
      {
        Header: 'Valid To',
        accessor: '',
      },
      {
        Header: 'Status',
        accessor: '',
      },
  ];
  
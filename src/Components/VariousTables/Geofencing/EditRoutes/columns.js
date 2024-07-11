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
      accessor: '',
    },
    {
      Header: 'Route Name',
      accessor: '',
    },
    {
      Header: 'Landmarks',
      accessor: '',
    },
    {
      Header: 'Assets',
      accessor: '',
    },
    {
      Header: 'Color',
      accessor: '',
    },
    {
      Header: 'Alert When Distance',
      accessor: '',
    },
    {
      Header: 'Distance(Total)',
      accessor: '',
    },
    {
      Header: 'Time(minutes)',
      accessor: '',
    },
    {
      Header: 'Round Trip',
      accessor: '',
    },
    {
      Header: 'Comments',
      accessor: '',
    },
    {
        
      Header: 'SMS Alert',
      accessor: '',
    },
    {
        
        Header: 'Email Alert',
        accessor: '',
      },
    
  ];
  
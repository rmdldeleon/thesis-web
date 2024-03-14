import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { alpha } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';

import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import { divide } from 'lodash';

const customCss = `
  .MuiDataGrid-cell:focus,
  .MuiDataGrid-cell:active {
    outline: none !important;
    border: none !important;
  }
`;

const columns = [
  { 
    field: 'id', 
    headerName: 'ID',
     width: 90 
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
   
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,

  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: false
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function HistoryTable() {
    const [selectedRows, setSelectedRows] = React.useState([]);

    const handleSelectionChange = (newSelection) => {
      setSelectedRows(newSelection.selectionModel);
    };
  
    const handleDelete = () => {
      console.log("Delete button clicked");
      // Perform delete action here
    };

    return (
        <>
        <div className='w-full h-full flex flex-col'>
            {/* Toolbar */}
            <EnhancedTableToolbar numSelected={1} />

            <style>{customCss}</style> {/* Inject custom CSS */}

            <DataGrid
                rows={rows}
                columns={columns}
                // initialState={{
                //     pagination: {
                //       paginationModel: { page: 0},
                //     },
                // }}

                // pageSizeOptions={[5, 10]}
                autoPageSize
       
              
                onSelectionModelChange={handleSelectionChange}
            />
        </div>
        </>
  );
}

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    
    const handleDeleteClick = () => {
        console.log("delete clicked")
    };

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
    );
}
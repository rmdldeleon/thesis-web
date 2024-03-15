import * as React from 'react';

import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { alpha } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid } from '@mui/x-data-grid';

// imported contexts
import { dstructuresContext } from "./mainpage";

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
    sortable: true,
    flex: 1
  },
  {
    field: 'batch',
    headerName: 'Batch',
    sortable: true,
    flex: 1
  },
  {
    field: 'datastructures',
    headerName: 'Data Structures',
    sortable: true,
    flex: 1
  },
  {
    field: 'sizecapacity',
    headerName: 'Size/Capacity',
    sortable: true,
    flex: 1
    //type: 'number',
  },
  {
    field: 'lastaction',
    headerName: 'Last Action',
    sortable: true,
    flex: 1
    //description: 'This column has a value getter and is not sortable.',
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'datecreated',
    headerName: 'Date Created',
    sortable: true,
    flex: 1
  },
  {
    field: 'lastupdated',
    headerName: 'Last Updated',
    sortable: true,
    flex: 1
  },
];

const rowsData = [
  { id: 1, batch: 1, datastructures: 3, sizecapacity: 0, lastaction: "Add", datecreated: "09/20/24 24:00PM", lastupdated: "09/20/24 24:00PM"},
];

export default function HistoryTable() {
    const [ dstructures, setdstructures ] = React.useContext(dstructuresContext)

    const [selectedRow, setSelectedRow] = React.useState([]);

    const [rows, setRows] = React.useState(rowsData)

    const handleSelectionChange = (selectedRow) => {
      setSelectedRow(selectedRow);
    };

    React.useEffect(() => { // this should run everytime i reset a datastructure 
      // create the rows and set
      for(let i = 0; i < dstructures.length; i++){
          if(dstructures[0].dsbatch){ // if dstructrures is not empty. needed because initial value of dstructures has emtpy objects
              let id =  i
              let batch = dstructures[i].dsbatch

          }

          let query = `SELECT * FROM datastructures
          LEFT JOIN actionresults ON datastructures.DSID = actionresults.DSID;`
      }
    }, [dstructures])

    return (
        <div className='w-full h-full flex flex-col'>
            {/* Toolbar */}
            <EnhancedTableToolbar numSelected={selectedRow ? selectedRow.length : 0} />

            <style>{customCss}</style> {/* Inject custom CSS */}

            <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize
                onSelectionModelChange={handleSelectionChange}        
            />
        </div>

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
            Batch {numSelected} selected <span className='text-gray-500 text-[.9rem]'>(CTRL + left click to deselect)</span>
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
          <Tooltip title="Recover">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}

        
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
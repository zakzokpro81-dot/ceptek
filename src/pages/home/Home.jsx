import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

export function Home() {

  function createData(id, model, piece, Quality, marka, Quantity, price) {
    return { id, model, piece, Quality, marka, Quantity, price };
  }

  const rows = [
    createData(1, 'iphone 15', 'lcd', 'original', 'apple', 5, 50),
    createData(2, 'iphone 14', 'lcd', 'original', 'apple', 10, 30),
    createData(3, 'iphone 13', 'lcd', 'copy', 'apple', 3, 20),
    createData(4, 'iphone 12', 'lcd', 'copy', 'apple', 7, 10),
  ];

  /* ===================== FILTER STATE (مضاف فقط) ===================== */
  const [filters, setFilters] = React.useState({
    model: '',
    piece: '',
    Quality: '',
    marka: '',
    Quantity: { min: '', max: '' },
    price: { min: '', max: '' },
  });

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const headCells = [
    { id: 'model', numeric: false, disablePadding: true, label: 'model' },
    { id: 'piece', numeric: false, disablePadding: false, label: 'parça' },
    { id: 'Quality', numeric: false, disablePadding: false, label: 'kalite' },
    { id: 'marka', numeric: false, disablePadding: false, label: 'marka' },
    { id: 'Quantity', numeric: true, disablePadding: false, label: 'adet' },
    { id: 'price', numeric: true, disablePadding: false, label: 'fiyat' },
  ];

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>

          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={(event) => onRequestSort(event, headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                )}
              </TableSortLabel>

              {/* ====== FILTER UI (إضافة فقط بدون كسر التصميم) ====== */}
              {!headCell.numeric ? (
                <TextField
                  variant="standard"
                  placeholder="ara"
                  value={filters[headCell.id]}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [headCell.id]: e.target.value }))
                  }
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                />
              ) : (
                <Box display="flex" gap={1}>
                  <TextField
                    variant="standard"
                    type="number"
                    placeholder="dan"
                    value={filters[headCell.id].min}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [headCell.id]: { ...prev[headCell.id], min: e.target.value },
                      }))
                    }
                    InputProps={{ disableUnderline: true }}
                  />
                  <TextField
                    variant="standard"
                    type="number"
                    placeholder="e"
                    value={filters[headCell.id].max}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [headCell.id]: { ...prev[headCell.id], max: e.target.value },
                      }))
                    }
                    InputProps={{ disableUnderline: true }}
                  />
                </Box>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar({ numSelected }) {
    return (
      <Toolbar
        sx={{
          pl: 2,
          bgcolor: numSelected > 0
            ? (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
            : 'inherit',
        }}
      >
        <Typography sx={{ flex: '1 1 100%' }}>
          {numSelected > 0 ? `${numSelected} seçildi` : 'Depo'}
        </Typography>
        <Tooltip title={numSelected > 0 ? 'Delete' : 'Filter list'}>
          <IconButton>
            {numSelected > 0 ? <DeleteIcon /> : <FilterListIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('model');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  /* ===================== FILTER LOGIC ===================== */
  const filteredRows = rows.filter((row) => {
    if (filters.model && !row.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
    if (filters.piece && !row.piece.toLowerCase().includes(filters.piece.toLowerCase())) return false;
    if (filters.Quality && !row.Quality.toLowerCase().includes(filters.Quality.toLowerCase())) return false;
    if (filters.marka && !row.marka.toLowerCase().includes(filters.marka.toLowerCase())) return false;

    if (filters.Quantity.min && row.Quantity < Number(filters.Quantity.min)) return false;
    if (filters.Quantity.max && row.Quantity > Number(filters.Quantity.max)) return false;

    if (filters.price.min && row.price < Number(filters.price.min)) return false;
    if (filters.price.max && row.price > Number(filters.price.max)) return false;

    return true;
  });

  /* ===================== SELECTION LOGIC (كما الأصل) ===================== */
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filters],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={(e, p) => {
                const isAsc = orderBy === p && order === 'asc';
                setOrder(isAsc ? 'desc' : 'asc');
                setOrderBy(p);
              }}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.indexOf(row.id) !== -1;
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.model}
                    </TableCell>
                    <TableCell>{row.piece}</TableCell>
                    <TableCell>{row.Quality}</TableCell>
                    <TableCell>{row.marka}</TableCell>
                    <TableCell align="right">{row.Quantity}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <FormControlLabel
        control={<Switch checked={dense} onChange={(e) => setDense(e.target.checked)} />}
        label="Yoğun dolgu"
      />
    </Box>
  );
}

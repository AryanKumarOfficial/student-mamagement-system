import { useQuery } from '@tanstack/react-query';
import React, { useState, useCallback } from 'react';

import MenuItem from '@mui/material/MenuItem';
import {
  Box,
  Card,
  Menu,
  Table,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import DialogForm from '../DialogForm';
import { EditStudentDialog } from './Update';
import { TableNoData } from '../table-no-data';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import useStudentStore from '../../../store/studentStore';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { StudentProps } from '../../../store/studentStore';

// ----------------------------------------------------------------------

export function StudentView() {
  const { students, getAllStudents } = useStudentStore();

  const fetchStudents = async () => {
    await getAllStudents();
    return null
  }

  // Use React Query to fetch students on load
  useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
    staleTime: Infinity, // Prevents unnecessary background refetching
  });

  const table = useTable();
  const [filterName, setFilterName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const dataFiltered: StudentProps[] = applyFilter({
    inputData: students,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Students
          </Typography>
          <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleClickOpen}
          >
            New student
          </Button>
        </Box>

        <Card>
          <UserTableToolbar
              numSelected={table.selected.length}
              filterName={filterName}
              onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilterName(event.target.value);
                table.onResetPage();
              }}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={students.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked: boolean) =>
                        table.onSelectAllRows(
                            checked,
                            students.map((user) => user.id).filter((id): id is string => id !== undefined) // Ensure IDs are valid
                        )
                    }
                    headLabel={[
                      { id: 'id', label: 'ID' },
                      { id: 'name', label: 'Name' },
                      { id: 'role', label: 'Class' },
                      { id: 'section', label: 'Section', align: 'center' },
                      { id: 'roll', label: 'Roll Number' },
                      { id: '' }, // For actions
                    ]}
                />
                <TableBody>
                  {dataFiltered
                      .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .filter((row): row is StudentProps => row.id !== undefined) // Ensure rows have valid IDs
                      .map((row) => (
                          <UserTableRow
                              key={row.id}
                              row={row}
                              selected={table.selected.includes(row.id as string)}
                              onSelectRow={() => table.onSelectRow(row.id)}
                          />
                      ))}

                  <TableEmptyRows
                      height={68}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, students.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
              component="div"
              page={table.page}
              count={students.length}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>

        <DialogForm open={open} handleClose={handleClose} />
      </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>('name');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
      (id: string) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      },
      [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
      (inputValue: string | undefined) => {
        if (!inputValue) return;

        const newSelected = selected.includes(inputValue)
            ? selected.filter((value) => value !== inputValue)
            : [...selected, inputValue];

        setSelected(newSelected);
      },
      [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        onResetPage();
      },
      [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

export function UserTableRow({
                               row,
                               selected,
                               onSelectRow,
                             }: {
  row: StudentProps;
  selected: boolean;
  onSelectRow: () => void;
}) {
  const { deleteStudent } = useStudentStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log(`Delete student with ID: ${row.id}`);
    deleteStudent(String(row.id)); // Assuming `deleteStudent` is implemented in your store
    handleCloseMenu();
  };

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const handleEditToggle = () => {
    setOpenEdit((prev) => !prev);
  };

  return (
      <>
        <TableRow hover>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.class}</TableCell>
          <TableCell align="center">{row.section}</TableCell>
          <TableCell>{row.roll}</TableCell>
          <TableCell align="right">
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
            >
              <MenuItem onClick={handleEditToggle}>
                <Iconify icon="material-symbols:edit" sx={{ mr: 1 }} />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <Iconify icon="material-symbols:delete" sx={{ mr: 1 }} />
                Delete
              </MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
        <EditStudentDialog open={openEdit} onClose={handleEditToggle} student={row} />
      </>
  );
}

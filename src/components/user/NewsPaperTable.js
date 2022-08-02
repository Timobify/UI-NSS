import {deleteNewsPaper, getAllNewsPapers} from "../../store/actions/newspaper";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Stack, Typography} from "@mui/material";
import AlertDialogSlide from "../AlertDialogSlide";
import { DataGrid } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import edit from '@iconify/icons-bx/edit';
import deleteFill from '@iconify/icons-bi/trash';
import NewsPaperEditModal from "./NewsPaperEditModal";
import AddNewsPaperModal from "./AddNewsPaperModal";
import ActionIcon from "../ActionIcon";

export default function NewsPaperTable() {
    const [pageSize, setPageSize] = useState(5);
    const [tableData, setTableData] = useState([]);
    const [rows, setRows] = useState(tableData);
    const dispatch = useDispatch();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [newspaperState, setNewsPaperState] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const { newspapers } = useSelector((state) => state.newspapers);

    const column = [
        { field: 'name', headerName: 'Publication Name', width: 300 },
        {
            field: 'fee',
            headerName: 'Subscription Fee',
            width: 300,
        },
        {
            field: 'edit',
            headerName: '',
            renderCell: (params) => (
                <ActionIcon
                    action={() => openEditNewsPaperAlert(params.row)}
                    icon={edit}
                    color="deepskyblue"
                />
            )
        },
        {
            field: 'delete',
            headerName: '',
            renderCell: (params) => (
                <ActionIcon
                    action={() => OpenDeleteNewsPaperAlert(params.row)}
                    icon={deleteFill}
                    color="red"
                />
            )
        }
    ];

    useEffect(() => {
        dispatch(getAllNewsPapers()).then((response) => {
            setTableData(response);
        });
    }, []);

    const OpenDeleteNewsPaperAlert = (newspaper) => {
        setNewsPaperState(newspaper);
        setDeleteOpen(true);
    };
    const openEditNewsPaperAlert = (newspaper) => {
        setNewsPaperState(newspaper);
        setEditOpen(true);
    };

    const deleteNewsPaperAction = (newspaper) => {
        console.log(`Deleting News Paper: ${newspaper.name}`);
        dispatch(deleteNewsPaper(newspaper));
    };

    const editNewspaperAction = (newspaper) => {
        console.log(`Editing News Paper: ${newspaper.name}`);
        setEditModalOpen(true);
    };

    function newspaperEdit() {
        console.log(`newspaper ${newspaperState.name} has been edited successfully`);
        setEditModalOpen(false);
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <NewsPaperEditModal
                action={() => newspaperEdit(newspaperState)}
                open={editModalOpen}
                setOpen={setEditModalOpen}
                newspaper={newspaperState}
            />
            <AddNewsPaperModal action={() => {}} open={addOpen} setOpen={setAddOpen} />
            <AlertDialogSlide
                action={() => editNewspaperAction(newspaperState)}
                open={editOpen}
                setOpen={setEditOpen}
                title="Edit News Paper"
                text={`Are you sure you want to edit News Paper: ${
                    newspaperState ? newspaperState.name : ''
                }?`}x
            />

            <AlertDialogSlide
                action={() => deleteNewsPaperAction(newspaperState)}
                open={deleteOpen}
                setOpen={setDeleteOpen}
                title="Delete News Paper"
                text={`Are you sure you want to delete News Paper: ${
                    newspaperState ? newspaperState.name : ''
                }?`}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    View News Papers
                </Typography>
                <Button onClick={() => setAddOpen(true)} variant="contained" component={RouterLink} to="#">
                    Add News Paper
                </Button>
            </Stack>
            <DataGrid
                getRowId={(r) => r.newsId}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                rows={tableData}
                columns={column}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = rows.filter((row) => selectedIDs.has(row.newsId));
                }}
                /* onSelectionModelChange={({ selectionModel }) => {
                          const rowIds = selectionModel.map((rowId) => parseInt(String(rowId), 10));
                          const rowsToDelete = tableData.filter((row) => rowIds.includes(row.schemeId));
                        }} */
            />
        </Box>
    );
}
import {createNewsPaper, getAllNewsPapers} from "../../store/actions/newspaper";
import * as Yup from "yup";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {LoadingButton} from "@mui/lab";

export default function AddNewsPaperModal({ action, open, setOpen }) {
    const { message } = useSelector((state) => state.message);
    const { newspapers } = useSelector((state) => state.newspapers);
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([]);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getAllNewsPapers())
            .then((response) => {
                console.log(`Medical Scheme Page: ${response}`);
            })
            .catch((error) => {
                console.log(`Medical Scheme Page: ${error}`);
            });
    }, []);

    const AddNewspaperSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'News Paper Name is Short!')
            .max(25, 'News Paper Name is too Long!')
            .required('News Paper Name is required'),
        fee: Yup.number().test(
            'is-decimal',
            'invalid decimal',
            value => (value + "").match(/^\d*\.{1}\d*$/))
    });
    const formik = useFormik({
        initialValues: {
            schemeName: '',
            institutionId: ''
        },
        validationSchema: AddNewspaperSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log(`AddSchemeModal OnSubmit: ${JSON.stringify(values)}`);
            setSubmitting(false);
            dispatch(createNewsPaper(values))
                .then((response) => {
                    console.log(`AddSchemeModal Response: ${response}`);
                    handleClose();
                    dispatch(getAllNewsPapers()).then((response) => {
                        setTableData(response);
                    });
                })
                .catch((error) => {
                    console.log(`AddSchemeModal Error: ${error}`);
                })
                .finally(() => {
                    setSubmitting(false);
                    resetForm();
                });
        }
    });
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>Add Medical Scheme</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Add Medical Scheme to the System</DialogContentText>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    autoComplete="News Paper Name"
                                    type="text"
                                    label="News Paper Name"
                                    {...getFieldProps('name')}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                <TextField
                                    fullWidth
                                    autoComplete="News Paper Fee"
                                    type="number"
                                    label="News Paper Fee"
                                    {...getFieldProps('fee')}
                                    error={Boolean(touched.fee && errors.fee)}
                                    helperText={touched.fee && errors.fee}
                                />

                                {message && message.length > 0 && (
                                    <Stack sx={{ mb: 5 }}>
                                        <Typography sx={{ color: 'red' }}>{message}</Typography>
                                    </Stack>
                                )}

                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Add Medical Scheme
                                </LoadingButton>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Form>
                </FormikProvider>
            </Dialog>
        </div>
    );
}

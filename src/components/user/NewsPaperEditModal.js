import {editNewsPaper, getAllNewsPapers} from "../../store/actions/newspaper";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {
    Button, Dialog,
    DialogActions, DialogContent,
    DialogContentText, DialogTitle,
    FormControl,
    InputLabel, MenuItem,
    Select,
    Stack, TextField,
    Typography
} from "@mui/material";
import {LoadingButton} from "@mui/lab";

export default function NewsPaperEditModal({ newspaper, open, setOpen }) {
    const { message } = useSelector((state) => state.message);
    const { newspapers } = useSelector((state) => state.newspapers);
    const dispatch = useDispatch();
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getAllNewsPapers())
            .then((response) => {
                console.log(`News Paper Page: ${response}`);
            })
            .catch((error) => {
                console.log(`News Paper Page: ${error}`);
            });
    }, []);

    const EditNewsPaperSchema = Yup.object().shape({
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
        enableReinitialize: true,
        initialValues: {
            name: newspaper ? newspaper.name || '' : '',
            fee: newspaper ? newspaper.fee || '' : ''
        },
        validationSchema: EditNewsPaperSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log(`NewsPaperEditModal OnSubmit: ${JSON.stringify(values)}`);
            setSubmitting(false);
            dispatch(editNewsPaper(newspaper.newsId, values.name, values.fee))
                .then((response) => {
                    console.log(`NewsPaperEditModal Response: ${response}`);
                    handleClose();
                    dispatch(getAllNewsPapers());
                })
                .catch((error) => {
                    console.log(`NewsPaperEditModal Error: ${error}`);
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
                        <DialogTitle>Edit News Paper</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Edit News Paper in the System</DialogContentText>
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
                                    Edit News Paper
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

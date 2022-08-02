import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import Page from "../components/Page";
import NewsPaperTable from "../components/user/NewsPaperTable";

export default function Newspaper() {
    return (
        <Page title="<Publication> | Minimal-UI">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Box sx={{ pb: 3 }}>
                        <Typography variant="h4">News Paper - NSS</Typography>
                    </Box>
                    <Typography variant="h4" gutterBottom />
                </Stack>
                <Grid container spacing={2} padding={2}>
                    <NewsPaperTable padding={0} />
                </Grid>
            </Container>
        </Page>
    );
}

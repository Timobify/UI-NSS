// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { AppNewsUpdate } from '../components/_dashboard/app';
import {
  AllUsers,
  ActiveUsers,
  OrganizationStats,
  UserActivity
} from '../components/_dashboard/admin';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3} padding={4}>
          <Grid container spacing={3} xs={12} md={8} item>
            <Grid item xs={6} sm={6} md={6}>
              <AllUsers />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <ActiveUsers />
            </Grid>
            <Grid paddingLeft={0} item xs={12} md={12} lg={12}>
              <UserActivity padding={0} />
            </Grid>
          </Grid>
          <Grid container sm={4} md={4} paddingLeft={3} item>
            <Grid item xs={12} sm={12} md={12}>
              <OrganizationStats />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

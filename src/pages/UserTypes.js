// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { AppNewsUpdate } from '../components/_dashboard/app';
import {
  AllUsers,
  ActiveUsers,
  OrganizationStats,
  UserStats,
  UserActivity
} from '../components/_dashboard/admin';

// ----------------------------------------------------------------------

export default function UserTypes() {
  return (
    <Page title="User Types | ERP">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">User Types</Typography>
        </Box>
        <Grid container spacing={3} padding={4}>
          <Grid container spacing={3} xs={12} md={12}>
            <Grid item xs={6} sm={6} md={4}>
              <UserStats statcount={12} statname="Employees" />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <UserStats statcount={25} statname="Human Resource" />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <UserStats statcount={3} statname="Adminstrators" />
            </Grid>
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <UserActivity />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <OrganizationStats />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h1" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi,
      </Typography>

      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
        <Grid
          container
          spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            top: '50%',
          }}
        >
          <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
            Welcome to the Student Management System
          </Typography>
          <Typography variant="h3" sx={{ mb: { xs: 3, md: 5 } }}>
            Sign In to get started
          </Typography>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

import dayjs from "dayjs";
import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import type {StudentProps} from "../../../store/studentStore";


type RightDrawerProps = {
  student: StudentProps;
  isOpen: boolean;
  toggleDrawer: () => void;
};

const Content = ({ student }: { student: StudentProps }) => (
  <Box
    component="section"
    sx={{
      width: '100%',
      maxWidth: 600,
      margin: '0 auto',
      padding: { xs: 2, sm: 4 },
      backgroundColor: 'background.paper',
      borderRadius: 2,
      mt: { xs: 5, sm: 8 },
    }}
  >
    <Stack spacing={3} alignItems="center">
      <Typography
        variant="h2"
        component="h1"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2,
        }}
      >
        Student Record
      </Typography>
      <Divider sx={{ width: '100%', bgcolor: 'primary.light' }} />
      <Grid container rowSpacing={2} columnSpacing={3} sx={{ width: '100%' }}>
        <Grid item xs={5} sm={4}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            Name:
          </Typography>
        </Grid>
        <Grid item xs={7} sm={8}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
            }}
          >
            {student.name}
          </Typography>
        </Grid>

        <Grid item xs={5} sm={4}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            Email:
          </Typography>
        </Grid>
        <Grid item xs={7} sm={8}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
            }}
          >
            {student.email}
          </Typography>
        </Grid>

        <Grid item xs={5} sm={4}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            Phone:
          </Typography>
        </Grid>
        <Grid item xs={7} sm={8}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
            }}
          >
            {student.phone}
          </Typography>
        </Grid>

          <Grid item xs={5} sm={4}>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            >
              Class:
            </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
              }}
            >
              {student.class}
            </Typography>
          </Grid>

          <Grid item xs={5} sm={4}>
              <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                  }}
              >
                  Section:
              </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
              <Typography
                  variant="body1"
                  sx={{
                      color: 'text.secondary',
                  }}
              >
                  {student.section}
              </Typography>
          </Grid>

          <Grid item xs={5} sm={4}>
              <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                  }}
              >
                  Roll Number:
              </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
              <Typography
                  variant="body1"
                  sx={{
                      color: 'text.secondary',
                  }}
              >
                  {student.roll}
              </Typography>
          </Grid>

          <Grid item xs={5} sm={4}>
              <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                  }}
              >
                  Grade:
              </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
              <Typography
                  variant="body1"
                  sx={{
                      color: 'text.secondary',
                  }}
              >
                  {student.grade}
              </Typography>
          </Grid>

          <Grid item xs={5} sm={4}>
              <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                  }}
              >
                  Gender:
              </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
              <Typography
                  variant="body1"
                  sx={{
                      color: 'text.secondary',
                  }}
              >
                  {student.gender}
              </Typography>
          </Grid>

          <Grid item xs={5} sm={4}>
              <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                  }}
              >
                  Date of Birth:
              </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
              <Typography
                  variant="body1"
                  sx={{
                      color: 'text.secondary',
                  }}
              >
                  {student.date ? dayjs(student.date).format('dddd, MMMM D, YYYY') : 'No date available'}
              </Typography>
          </Grid>

          <Grid item xs={5} sm={4}>
              <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                  }}
              >
                  Status:
              </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
              <Typography
                  variant="body1"
                  sx={{
                      color: 'text.secondary',
                  }}
              >
                  {student.status.toUpperCase()}
              </Typography>
          </Grid>

          <Grid item xs={5} sm={4}>
              <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                  }}
              >
                  School:
              </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
              <Typography
                  variant="body1"
                  sx={{
                      color: 'text.secondary',
                  }}
              >
                  {student.school}
              </Typography>
          </Grid>

          <Grid item xs={5} sm={4}>
              <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                  }}
              >
                  Address:
              </Typography>
          </Grid>
          <Grid item xs={7} sm={8}>
              <Typography
                  variant="body2"
                  sx={{
                      color:"text.secondary"
                  }}>
                  {student.address}
              </Typography>
          </Grid>

      </Grid>
    </Stack>
  </Box>
);

export default function ViewStudent({ student, isOpen, toggleDrawer }: RightDrawerProps) {
  return (
    <Drawer
      closeAfterTransition
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer}
      sx={{
        p: 4,
      }}
    >
      <Content student={student} />
    </Drawer>
  );
}

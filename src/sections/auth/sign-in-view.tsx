import toast from 'react-hot-toast';
import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import useAuthStore from '../../store/authstore';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        if (!formState.email || !formState.password) {
          toast.error('Please fill in all fields');
          return;
        }
        await login(formState.email, formState.password);
        toast.success('Successfully signed in');
        router.push('/students');
      } catch (e) {
        toast.error(e.message);
      }
    },
    [formState.email, formState.password, login, router]
  );

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <form onSubmit={handleSignIn}>
        <TextField
          fullWidth
          name="email"
          label="Email address"
          InputLabelProps={{ shrink: true }}
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          InputLabelProps={{ shrink: true }}
          type={showPassword ? 'text' : 'password'}
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <LoadingButton fullWidth size="large" type="submit" color="inherit" variant="contained">
          Sign in
        </LoadingButton>
      </form>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}

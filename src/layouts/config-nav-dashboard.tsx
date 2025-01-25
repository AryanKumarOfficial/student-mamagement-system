import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },

  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
];

export const AuthNavData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Students',
    path: '/students',
    icon: icon('ic-user'),
    info: (
      <Label color="secondary" variant="inverted">
        30
      </Label>
    ),
  },
  {
    title: 'Logout',
    path: '#',
    icon: icon('ic-lock'),
  },
];

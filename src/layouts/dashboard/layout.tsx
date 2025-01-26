import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';

import { Main } from './main';
import { layoutClasses } from '../classes';
import {Label} from "../../components/label";
import { NavMobile, NavDesktop } from './nav';
import useAuthStore from '../../store/authstore';
import { _workspaces } from '../config-nav-workspace';
import {icon, navData} from '../config-nav-dashboard';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import useStudentStore from '../../store/studentStore';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
    const {students} = useStudentStore()
     const AuthNavData = [
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
             {students.length}
           </Label>
         ),
       },
       {
         title: 'Logout',
         path: '#',
         icon: icon('ic-lock'),
       },
     ];
  const { authenticated } = useAuthStore();
  const theme = useTheme();

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';
  useEffect(() => {
    console.log('authenticated', authenticated);
  }, [authenticated]);

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={!authenticated ? navData : AuthNavData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                />
              </>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop
          data={!authenticated ? navData : AuthNavData}
          layoutQuery={layoutQuery}
          workspaces={_workspaces}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}

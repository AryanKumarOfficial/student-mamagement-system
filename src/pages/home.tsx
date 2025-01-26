import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="React application dashboard to manage Students using React, Material-UI, React Query, zustand and Firebase."
        />
        <meta
          name="keywords"
          content="React, Material-UI, React Query, zustand, Firebase, student, ERP, management, dashboard, collage, typescript"
        />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}

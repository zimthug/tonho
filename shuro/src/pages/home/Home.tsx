import * as React from 'react';
import Box from '@mui/joy/Box';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import PageHeader from '../../components/PageHeader';

const HomePage = () => {
  const breadcrumbsData = [
    { label: <HomeRoundedIcon />, href: "/", icon: <HomeRoundedIcon /> },
  ];

  return (
      <Box sx={{ flex: 1, width: '100%' }}>
        <Box
          sx={{
            position: 'sticky',
            top: { sm: -100, md: -110 },
            bgcolor: 'background.body',
            zIndex: 9995,
          }}
        >
          <PageHeader breadcrumbs={breadcrumbsData} title="Dashboard" />
        </Box>
      </Box>
      );
}

export default HomePage
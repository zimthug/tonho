import React from "react";
import PropTypes from "prop-types";
import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const PageHeader: React.FC<{ breadcrumbs: any[]; title: string }> = ({ breadcrumbs, title }) => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        size="sm"
        aria-label="breadcrumbs"
        separator={<ChevronRightRoundedIcon fontSize="small" />}
        sx={{ pl: 0 }}
      >
        {breadcrumbs.map((crumb, index) =>
          crumb.href ? (
            <Link
              key={index}
              underline="hover"
              color="neutral"
              href={crumb.href}
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              {crumb.icon || crumb.label}
            </Link>
          ) : (
            <Typography
              key={index}
              color="primary"
              sx={{ fontWeight: 500, fontSize: 12 }}
            >
              {crumb.label}
            </Typography>
          )
        )}
      </Breadcrumbs>

      {/* Header */}
      <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
        {title}
      </Typography>
    </Box>
  );
};

PageHeader.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default PageHeader;

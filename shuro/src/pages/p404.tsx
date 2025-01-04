import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';

const P404NotFoundPage = () => {
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
        <Container>
          <Box sx={{ py: 2 }}>
            <Typography level="h3" sx={{ textAlign: 'center' }}>
              Oops we can't find the page you're looking for
            </Typography>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography level="h4" sx={{ textAlign: 'center' }} color="primary">
                Go back to Home
              </Typography>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default P404NotFoundPage
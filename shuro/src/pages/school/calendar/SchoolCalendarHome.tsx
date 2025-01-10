import * as React from 'react';


import axios from 'axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {CheckCircle} from '@mui/icons-material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import IconButton from '@mui/joy/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import {
  Box,
  Divider,
  Dropdown,
  FormControl,
  FormLabel,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Table,
  Sheet,
  Select,
  Option
} from '@mui/joy';

import PageHeader from '../../../components/PageHeader';

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const SchoolCalendarHomePage = () => {

  const breadcrumbsData = [
    { label: <HomeRoundedIcon />, href: "/", icon: <HomeRoundedIcon /> },
    { label: "School", href: "#" },
    { label: "Calendar" },
  ];

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedTerm, setSelectedTerm] = React.useState(null);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const [terms, setTerms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [order, setOrder] = React.useState<Order>('desc');
  const [distinctYears, setDistinctYears] = React.useState<number[]>([]);

  // Fetch terms data from API
  React.useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/school/calendar');
        if (response.data.status === 'success') {
          setTerms(response.data.data);
          const years = [...new Set(response.data.data.map((term: any) => term.year))] as number[];
          setDistinctYears(years.sort((a, b) => b - a));
        } else {
          console.error('Failed to load terms');
        }
      } catch (error) {
        console.error('Error fetching terms data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

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
        <PageHeader breadcrumbs={breadcrumbsData} title="Calendar" />
        <Divider />
      </Box>

      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          mx: 1.5,
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl>
          <FormLabel>Year</FormLabel>
          <Select
            size="sm"
            defaultValue={""}
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
            onChange={(e: any) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
            sx={{
              overflow: 'visible',
              maxHeight: 'none',
              zIndex: 9999,
            }}
          >
            <Option value="">All</Option>
            {distinctYears.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
            mx: 1.5,
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 40, padding: '10px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Year
                </Link>
              </th>
              <th style={{ width: 60, padding: '10px 6px' }}>Name</th>
              <th style={{ width: 40, padding: '10px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Open
                </Link>
              </th>
              <th style={{ width: 40, padding: '10px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}>
                  Close
                </Link>
              </th>
              <th style={{ width: 40, padding: '10px 6px' }}>Enrollment Open</th>
              <th style={{ width: 40, padding: '10px 6px' }}>Enrollment Close</th>
              <th style={{ width: 40, padding: '10px 6px' }}>Active</th>
              <th style={{ width: 40, padding: '10px 6px' }}>Enrolling</th>
              <th style={{ width: 40, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(terms, getComparator(order, 'year')).map((term: any) => (
              <tr key={term.id}>
                <td style={{ padding: '10px 6px' }}>{term.year}</td>
                <td style={{ padding: '10px 6px' }}>{term.name}</td>
                <td style={{ padding: '10px 6px' }}>{term.start_date}</td>
                <td style={{ padding: '10px 6px' }}>{term.end_date}</td>
                <td style={{ padding: '10px 6px' }}>{term.enrollment_start_date}</td>
                <td style={{ padding: '10px 6px' }}>{term.enrollment_end_date}</td>
                <td style={{ padding: '10px 6px' }}>{term.is_active ? <CheckCircle color="success" /> : ''}</td>
                <td style={{ padding: '10px 6px' }}>{term.is_enrollment_active ? <CheckCircle color="success" /> : ''}</td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}

export default SchoolCalendarHomePage
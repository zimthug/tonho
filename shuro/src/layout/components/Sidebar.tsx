import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
// import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
// import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import MarkAsUnreadRoundedIcon from '@mui/icons-material/MarkAsUnreadRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import { Logo } from './Logo';
import routes from '../../routes';


function Toggler({
    defaultExpanded = false,
    renderToggle,
    children,
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={[
                    {
                        display: 'grid',
                        transition: '0.2s ease',
                        '& > *': {
                            overflow: 'hidden',
                        },
                    },
                    open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
                ]}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

function Sidebar() {
    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Logo /> 
                <Typography level="title-lg">Tonho</Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} />
            </Box>
            <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <HomeRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Home</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <DashboardRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Dashboard</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <AssignmentRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Class</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton>All tasks</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Backlog</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>In progress</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Done</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <LocalLibraryRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Student</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton>All tasks</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Backlog</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>In progress</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Done</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <MarkAsUnreadRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Enrollment</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton>All tasks</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Backlog</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>In progress</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Done</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <AccountBalanceRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Accounting</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton>All tasks</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Backlog</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>In progress</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Done</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <SchoolRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Exams</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton>All tasks</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Backlog</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>In progress</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Done</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <SupervisorAccountRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Staff</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton>All tasks</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Backlog</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>In progress</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Done</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            defaultExpanded
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <HomeWorkRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">School</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton selected
                                    component="a"
                                    href={routes.SCHOOL_CALENDAR}>Calendar</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Create a new user</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Roles & permission</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                </List>
                <List
                    size="sm"
                    sx={{
                        mt: 'auto',
                        flexGrow: 0,
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                        '--List-gap': '8px',
                        mb: 2,
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <SupportRoundedIcon />
                            Support
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <SettingsRoundedIcon />
                            Settings
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src=""
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">John Doe</Typography>
                    <Typography level="body-xs">jdoe@tonho.co.zw</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral">
                    <LogoutRoundedIcon />
                </IconButton>
            </Box>
        </Sheet>
    );
}

export default Sidebar;

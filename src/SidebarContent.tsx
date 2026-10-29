import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NavLink } from 'react-router-dom';
import { dashboardRoutes } from './MenuItems';
import useUserStore from './Store/AuthStore';

interface SidebarContentProps {
  onNavigate?: () => void;
}

export default function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { user } = useUserStore();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white p-4">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
            📊
          </div>
          <div>
            <Typography variant="subtitle1" className="font-bold text-gray-900 leading-tight">
              LedgerFlow
            </Typography>
            <Typography variant="caption" className="text-gray-400">
              Accounting workspace
            </Typography>
          </div>
        </div>

        <Divider className="my-2" />

        {/* Links */}
        <List className="space-y-1">
          {dashboardRoutes
            ?.filter((item) => item.showInSidebar)
            .map((item) => (
              <ListItem key={item.title} disablePadding className="mb-1">
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={onNavigate}
                  sx={{
                    borderRadius: '12px',
                    py: 1.2,
                    color: '#4b5563',
                    '& .nav-icon': { color: '#6b7280' },
                    '&:hover': { backgroundColor: '#f9fafb' },
                    '&.active': {
                      backgroundColor: '#4f46e5',
                      color: '#fff',
                      boxShadow: '0 10px 15px -3px rgb(199 210 254)',
                      '& .nav-icon': { color: '#fff' },
                    },
                    '&.active:hover': { backgroundColor: '#4338ca' },
                  }}
                >
                  <ListItemIcon className="nav-icon" sx={{ minWidth: '40px', color: 'inherit' }}>
                    {item.icon || <FolderOutlinedIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span className="font-medium text-sm">{item.title}</span>}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </div>

      {/* User box */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Typography variant="body2" className="font-bold text-gray-800 text-xs">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : 'Your Name'}
            </Typography>
            <Typography variant="caption" className="text-gray-400 text-[10px]">
              Finance lead
            </Typography>
          </div>
        </div>
        <IconButton size="small" className="text-gray-500">
          <SettingsOutlinedIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
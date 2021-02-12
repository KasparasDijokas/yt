import React from 'react';
import './sidebar.scss';
import SidebarLink from '../SidebarLink/SidebarLink';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import HistoryIcon from '@material-ui/icons/History';

const Sidebar = () => {
    return (
        <div className="sidebar">
                <SidebarLink linkTo="/" Icon={HomeIcon}>Home</SidebarLink>
                <SidebarLink linkTo="/trending" Icon={WhatshotIcon}>Trending</SidebarLink>
                <SidebarLink linkTo="/subscriptions" Icon={SubscriptionsIcon}>Subscriptions</SidebarLink>
                <SidebarLink linkTo="/library" Icon={LibraryAddCheckIcon}>Library</SidebarLink>
                <SidebarLink linkTo="/history" Icon={HistoryIcon}>History</SidebarLink>
        </div>
    )
}

export default Sidebar

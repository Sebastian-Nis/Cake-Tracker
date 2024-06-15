import React from 'react';
import Upcoming from './upcoming';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const showUpcoming = location.pathname === '/';

    return (
        <div style={{ display: 'flex' }}>
            {showUpcoming && (
                <div style={{ width: '20%', padding: '1em' }}>
                    <Upcoming />
                </div>
            )}
            <div style={{ width: showUpcoming ? '80%' : '100%', padding: '1em' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;

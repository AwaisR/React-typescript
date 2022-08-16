import { Box } from '@mui/material';
import React from 'react';
import Header from '../Header/Header';

interface LayoutPropsInterface {
    children?: React.ReactNode;
}

const Layout = ({ children }: LayoutPropsInterface) => {
    return (
        <Box sx={{
            minHeight: '100vh'
        }}>
            <Header />
            <main>{children}</main>
        </Box>
    )
}

export default Layout;

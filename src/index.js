import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import DashboardPage from './containers/DashboardPage'
import JournalPage from './containers/JournalPage'
import BRSPage from './containers/BRSPage'
import UsersPage from './containers/UsersPage'
import GroupsPage from './containers/GroupsPage'
import ExportPage from './containers/ExportPage'
import theme from './theme'
import Layout from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="dashboard" element={<Layout><DashboardPage /></Layout>} />
                        <Route path="journal" element={<Layout><JournalPage /></Layout>} />
                        <Route path="brs" element={<Layout><BRSPage /></Layout>} />
                        <Route path="groups" element={<Layout><GroupsPage /></Layout>} />
                        <Route path="users" element={<Layout><UsersPage /></Layout>} />
                        <Route path="export" element={<Layout><ExportPage /></Layout>} />
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider, Heading } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import DashboardPage from './containers/DashboardPage'
import JournalPage from './containers/JournalPage'
import BRSPage from './containers/BRSPage'
import UsersPage from './containers/UsersPage'
import GroupsPage from './containers/GroupsPage'
import GroupItemPage from './components/GroupItemPage'
import Logout from './containers/Logout'
import TeachersPage from './containers/TeachersPage'
import theme from './theme'
import UserDetailPage from './components/users/UserDetailPage'
import Layout from './components/Layout'
import DashboardGroupItemPage from './components/dashboard/DashboardGroupItemPage'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route
                            path="dashboard"
                            element={
                                <Layout>
                                    <DashboardPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="dashboard/groups/:groupId"
                            element={
                                <Layout>
                                    <DashboardGroupItemPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="journal"
                            element={
                                <Layout>
                                    <JournalPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="brs"
                            element={
                                <Layout>
                                    <BRSPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="groups"
                            element={
                                <Layout>
                                    <GroupsPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="groups/:groupId"
                            element={
                                <Layout>
                                    <GroupItemPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="users"
                            element={
                                <Layout>
                                    <UsersPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="teachers"
                            element={
                                <Layout>
                                    <TeachersPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="users/:userId"
                            element={
                                <Layout>
                                    <UserDetailPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="logout"
                            element={
                                <Layout>
                                    <Logout />
                                </Layout>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <Layout>
                                    <Heading>Здесь ничего нет</Heading>
                                </Layout>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
)

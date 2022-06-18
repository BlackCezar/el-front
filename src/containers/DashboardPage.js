import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Center, Spinner } from '@chakra-ui/react'
import DashboardStudent from '../components/dashboard/DashboardStudent'
import DashboardParent from '../components/dashboard/DashboardParent'
import DashboardDeputy from '../components/dashboard/DashboardDeputy'

export default function DashboardPage() {
    const user = useSelector((state) => state.user.object)

    if (user && user.role) {
        if (['Student', 'Parent', 'Deputy'].includes(user.role)) {
            if (user.role === 'Student') {
                return <DashboardStudent user={user} />
            }
            if (user.role === 'Parent') {
                return <DashboardParent user={user} />
            }
            if (user.role === 'Deputy') {
                return <DashboardDeputy user={user} />
            }
            return <Navigate to="/404" />
        }
    }
    return <Center><Center><Spinner size='xs' /></Center></Center>

}

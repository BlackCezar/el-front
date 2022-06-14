import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import DashboardStudent from '../components/dashboard/DashboardStudent'
import DashboardTeacher from '../components/dashboard/DashboardTeacher'
import DashboardParent from '../components/dashboard/DashboardParent'
import DashboardDeputy from '../components/dashboard/DashboardDeputy'

export default function DashboardPage() {
    const user = useSelector((state) => state.user.object)

    if (['Student', 'Teacher', 'Parent', 'Deputy'].includes(user.role)) {
        if (user.role === 'Student') {
            return <DashboardStudent user={user} />
        }
        if (user.role === 'Teacher') {
            return <DashboardTeacher user={user} />
        }
        if (user.role === 'Parent') {
            return <DashboardParent user={user} />
        }
        if (user.role === 'Parent') {
            return <DashboardDeputy user={user} />
        }
    }

    return <Navigate to="404" />
}

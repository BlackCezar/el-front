import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ExportPage() {
    const user = useSelector((state) => state.user.object)

    if (['ClassRoomTeacher'].includes(user.role)) {
        return <div>Export</div>
    }
    return <Navigate to="404" />
}

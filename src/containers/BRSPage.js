import {
    Center,
    Spinner,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import BRSClassRoomTeacher from '../components/brs/BRSClassRoomTeacher'
import BRSStudent from '../components/brs/BRSStudent'

export default function BRSPage() {
    const user = useSelector((state) => state.user.object)

    if (user && user.role) {
        if (['Student', 'ClassRoomTeacher'].includes(user.role)) {
            if (user.role === 'ClassRoomTeacher') return <BRSClassRoomTeacher user={user} />
            if (user.role === 'Student') return <BRSStudent user={user} />
          
        }
        return <Navigate to="/404" />
    }
    return <Center><Center><Spinner size='xs' /></Center></Center>
}

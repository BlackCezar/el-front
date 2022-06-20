import React, { useMemo } from 'react'
import { Center, Spinner } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetLessonsQuery } from '../store/services/LessonsService'
import JournalTeacher from '../components/journal/JournalTeacher'
import JournalStudent from '../components/journal/JournalStudent'

export default function BRSPage() {
    const user = useSelector((state) => state.user.object)
    const { data: lessons, refetch: refetchLessons } = useGetLessonsQuery({
        teacher: user._id
    })
    const groupdLesson = useMemo(() => {
        const list = {}
        if (lessons) {
            lessons.forEach((l) => {
                const gn = l.group.name
                if (!list[`${gn}-${l.subject}`])
                    list[`${gn}-${l.subject}`] = {
                        ...l.group,
                        subject: l.subject
                    }
            })
        }
        return list
    }, [lessons])

    const refeetch = () => {
        refetchLessons({ teacher: user._id })
    }

    if (user && user.role) {
        if (user.role === 'Teacher')
            return (
                <JournalTeacher
                    refetchLessons={refeetch}
                    groupdLesson={groupdLesson}
                    lessons={lessons}
                />
            )
        if (user.role === 'Student') return <JournalStudent />

        return <Navigate to="/404" />
    }
    return (
        <Center>
            <Center>
                <Spinner size="xs" />
            </Center>
        </Center>
    )
}

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/user'
import { useLogoutUserQuery } from '../store/services/UserService'

export default function Logout() {
    const dispatch = useDispatch()
    const { error, isLoading, data, isSuccess } = useLogoutUserQuery()
    const navigation = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            dispatch(logoutUser())
            navigation('/')
        }
    }, [isSuccess])

    return (
        <div>
            {error && <>Oh no, there was an </>}
            {isLoading && <>Loading</>}
            {data && <>Data</>}
        </div>
    )
}

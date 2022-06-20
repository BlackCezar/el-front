import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Box,
    Divider,
    Flex,
    Heading,
    IconButton,
    Spinner,
    Text
} from '@chakra-ui/react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserQuery } from '../../store/services/UserService'

export default function GroupItemPage() {
    const params = useParams()
    const navigation = useNavigate()
    const { data: user, isLoading } = useGetUserQuery(params.userId)

    return isLoading ? (
        <Spinner />
    ) : (
        <div>
            <Heading mb={3}>
                <IconButton
                    mr="3"
                    icon={<ArrowBackIcon />}
                    onClick={() => navigation(-1)}
                />
                {user.fullname}
            </Heading>
            <Box m={3} p={4} ml={0} borderWidth="1px">
               
                <Flex mb={4} mt={4} alignItems="center">
                    <Text w="200px" mr={4} borderRight="1px solid blue">
                        <b>Родитель</b>
                    </Text>
                    <Text mr={3}>
                        {user.parent ? user.parent.fullname : '-'}
                    </Text>
                </Flex>
                <Divider />
               
            </Box>
        </div>
    )
}

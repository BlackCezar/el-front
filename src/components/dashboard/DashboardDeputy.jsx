import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useGetGroupsQuery } from "../../store/services/GroupsService"

export default function DashboardDeputy() {
    const navigate = useNavigate()
    const { data: groups, isSuccess } = useGetGroupsQuery()

    return <div>
        <Heading>
            <Flex alignItems="center">
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    mr={2}
                />
                Классы
            </Flex></Heading>
        <Box mt={3}
            mb={3}
            w='fit-content'
            borderWidth="1px"
            borderRadius="10"
            boxShadow="sm">
            {groups && isSuccess && groups.length && groups.map(g => (
                <NavLink key={g._id} to={'/dashboard/groups/' + g._id}>
                    <Text p={3}>
                        Открыть {g.name}</Text>
                </NavLink>
            ))}

        </Box>
    </div>
}
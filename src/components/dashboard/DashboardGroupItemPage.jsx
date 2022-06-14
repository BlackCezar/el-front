import { ArrowBackIcon } from "@chakra-ui/icons"
import {  Flex, Heading, IconButton } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"

export default function DashboardDeputy() {
    const navigate = useNavigate()
    // const { data: groups, isSuccess } = useGetGroupsQuery()

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
    
    </div>
}
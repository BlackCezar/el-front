import { ArrowBackIcon, CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
    Box,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Heading,
    IconButton,
    Input,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useEditableControls
} from '@chakra-ui/react'
import React from 'react'
// import { useSelector } from 'react-redux'
import {
    useCreateGradeMutation,
    useLazyGetGradesQuery,
    useUpdateGradeMutation
} from '../../store/services/GradesService'
import '../../assets/scss/Journal.scss'
import { useUpdateLessonMutation } from '../../store/services/LessonsService'
import { useEffect } from 'react'

export default function JournalStudent({ lessons }) {
    const user = useSelector((state) => state.user.object)
    const [group, setGroup] = useState(null)
    useEffect(() => {
        if (user && user.group && user.group._id) setGroup(user.group)
    }, [user])
    const [subject, setSubject] = React.useState(false)
    const [getGrades, { data: grades }] = useLazyGetGradesQuery()
    const [createGrade] = useCreateGradeMutation()
    const [updateGrade] = useUpdateGradeMutation()
    const [updateLesson] = useUpdateLessonMutation()
    const [field, selectField] = React.useState(null)
    const [grade, setGrade] = React.useState({
        student: '',
        lesson: '',
        number: '',
        date: new Date().toLocaleDateString('ru-RU')
    })
    const getColSpan = React.useCallback(
        (day, gradesL) => {
            if (gradesL) {
                const list = gradesL.filter((g) => g.date === day)
                const students = []
                list.forEach((g) => {
                    if (students[g.student._id]) students[g.student._id] += 1
                    else students[g.student._id] = 1
                })
                return Object.values(students).sort()[0] + 1
            }
            return 1
        },
        [grades]
    )

    const days = React.useMemo(() => {
        const arr = []
        if (activeLessons && Array.isArray(activeLessons)) {
            for (let i = 0; i < activeLessons.length; i += 1) {
                arr.push(activeLessons[i].date)
            }
        }
        return arr
    }, [activeLessons])
    return (
        <div>
            <Heading mb={5}>
                <IconButton
                    onClick={() => setSubject(false)}
                    icon={<ArrowBackIcon />}
                />{' '}
                {subject.name} - {subject.subject}
            </Heading>

            <Box borderWidth="1px" borderColor="blue">
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr borderWidth={1}>
                                <Th>Ученик / дата</Th>
                                {days.map((day) => {
                                    return (
                                        <Th
                                            colSpan={getColSpan(day, grades)}
                                            borderWidth="1px"
                                            className={
                                                field && field.date === day
                                                    ? 'journal-date active '
                                                    : 'journal-date'
                                            }
                                            onClick={() => {
                                                const d = lessons.find(
                                                    (l) => l.date === day
                                                )
                                                selectField(d)
                                            }}
                                        >
                                            {day}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {group && group.students ? (
                                group.students.map((s) => (
                                    <Tr p="6px">
                                        <Td borderWidth={1}>{s.fullname}</Td>
                                        {days.map((day) => {
                                            const d = activeLessons.find(
                                                (l) => l.date === day
                                            )
                                            const gradesList = grades
                                                ? grades.filter(
                                                      (g) =>
                                                          g.date === day &&
                                                          g.student._id ===
                                                              s._id &&
                                                          g.lesson._id === d._id
                                                  )
                                                : []
                                            return gradesList.map((g) => (
                                                <Td borderWidth={1}>
                                                    <Editable
                                                        submitOnBlur
                                                        onSubmit={(val) =>
                                                            updateGrade({
                                                                data: {
                                                                    ...field,
                                                                    number: val
                                                                },
                                                                id: g._id
                                                            })
                                                        }
                                                        defaultValue={g.number}
                                                    >
                                                        <EditablePreview />
                                                        <Input
                                                            as={EditableInput}
                                                        />
                                                        <EditableControls />
                                                    </Editable>
                                                </Td>
                                            ))
                                        })}
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td>Нет студентов</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            {field && (
                <Box boxShadow="md" mt={20} p={4}>
                    <Flex justifyContent="space-between">
                        <Box w="100%" mr="5" borderRight="1px solid blue">
                            <Heading mb="5" textAlign="center">
                                Тема урока
                            </Heading>

                            <Editable
                                submitOnBlur
                                onChange={(val) =>
                                    selectField({
                                        ...field,
                                        topic: val
                                    })
                                }
                                onSubmit={(val) =>
                                    updateLesson({
                                        data: {
                                            ...field,
                                            topic: val
                                        },
                                        id: field._id
                                    })
                                }
                                defaultValue="Введите тему урока"
                                value={field.topic}
                            >
                                <EditablePreview />
                                <Input as={EditableInput} />{' '}
                                <EditableControls />
                            </Editable>
                        </Box>
                        <Box w="100%">
                            <Heading mb="5" textAlign="center">
                                Домашнее задание
                            </Heading>
                            <Editable
                                submitOnBlur
                                onChange={(val) =>
                                    selectField({
                                        ...field,
                                        homework: val
                                    })
                                }
                                onSubmit={(val) =>
                                    updateLesson({
                                        data: {
                                            ...field,
                                            homework: val
                                        },
                                        id: field._id
                                    })
                                }
                                value={field.homework}
                                defaultValue="Введите домашнее задание"
                            >
                                <EditablePreview />
                                <Input as={EditableInput} />{' '}
                                <EditableControls />
                            </Editable>
                        </Box>
                    </Flex>
                </Box>
            )}
        </div>
    )
}

function EditableControls() {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
            <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
    ) : (
        <Flex justifyContent="center">
            <IconButton
                size="sm"
                icon={<EditIcon />}
                {...getEditButtonProps()}
            />
        </Flex>
    )
}

import { ArrowBackIcon, CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Heading,
    IconButton,
    Input,
    List,
    ListItem,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useEditableControls
} from '@chakra-ui/react'
import React from 'react'
// import { useSelector } from 'react-redux'
import {
    useCreateGradeMutation,
    useLazyGetGradesQuery,
    useUpdateGradeMutation
} from '../../store/services/GradesService'
import { useLazyGetGroupQuery } from '../../store/services/GroupsService'
import AddGrade from './AddGrade'
import '../../assets/scss/Journal.scss'
import { useUpdateLessonMutation } from '../../store/services/LessonsService'

export default function JournalTeacher({ groupdLesson, lessons }) {
    // const user = useSelector(state => state.user.object)
    const [subject, setSubject] = React.useState(false)
    const [activeLessons, setActiveLessons] = React.useState([])
    const [getGrades, { data: grades }] = useLazyGetGradesQuery()
    const [getGroup, { data: group }] = useLazyGetGroupQuery()
    const [createGrade] = useCreateGradeMutation()
    const [updateGrade] = useUpdateGradeMutation()
    const [updateLesson] = useUpdateLessonMutation()
    const [field, selectField] = React.useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
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
    const goTo = (obj) => {
        setActiveLessons(lessons.filter((l) => l.subject === obj.subject))
        setSubject(obj)
        getGrades({ group: obj._id })
        getGroup(obj._id)
    }
    const days = React.useMemo(() => {
        const arr = []
        if (activeLessons && Array.isArray(activeLessons)) {
            for (let i = 0; i < activeLessons.length; i += 1) {
                arr.push(activeLessons[i].date)
            }
        }
        return arr
    }, [activeLessons])
    return subject && subject.name ? (
        <div>
            <Heading mb={5}>
                <IconButton
                    onClick={() => setSubject(false)}
                    icon={<ArrowBackIcon />}
                />{' '}
                {subject.name} - {subject.subject}
                <Button float="right" onClick={onOpen}>
                    Добавить оценку
                </Button>
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
                                                <Td
                                                    borderWidth={1}
                                                    className="journal-date"
                                                    onClick={() => {
                                                        selectField(d)
                                                    }}
                                                >
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
                <AddGrade
                    object={grade}
                    students={group && group.students ? group.students : []}
                    setObject={setGrade}
                    lessons={activeLessons}
                    action={createGrade}
                    isOpen={isOpen}
                    onClose={onClose}
                />
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
                                onChange={val => selectField({
                                    ...field,
                                    topic: val
                                })}
                                onSubmit={(val) =>
                                    updateLesson({
                                        data: {
                                            ...field,
                                            topic: val
                                        },
                                        id: field._id
                                    })
                                }
                                defaultValue='Введите тему урока'
                                value={field.topic}
                            >
                                <EditablePreview />
                                                        <Input
                                                            as={EditableInput}
                                                        /> <EditableControls />
                            </Editable>
                        </Box>
                        <Box w="100%">
                            <Heading mb="5" textAlign="center">
                                Домашнее задание
                            </Heading>
                            <Editable
                                submitOnBlur
                                onChange={val => selectField({
                                    ...field,
                                    homework: val
                                })}
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
                                defaultValue='Введите домашнее задание'
                            >
                                <EditablePreview />
                                                        <Input
                                                            as={EditableInput}
                                                        /> <EditableControls />
                            </Editable>
                        </Box>
                    </Flex>
                </Box>
            )}
        </div>
    ) : (
        <div>
            <Heading>Выберите класс с дисциплиной</Heading>

            <List>
                {groupdLesson &&
                    Object.keys(groupdLesson).map((l) => (
                        <ListItem
                            className="link-group"
                            onClick={() => goTo(groupdLesson[l])}
                            mb={3}
                        >
                            {l.replace('-', '  ')}
                        </ListItem>
                    ))}
            </List>
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

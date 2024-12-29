import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Container,
  Flex,
  IconButton,
  useColorModeValue,
  useColorMode,
  Textarea,
  Badge,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaPlus, FaTrash } from 'react-icons/fa';

const TaskList = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
          headers: { 'x-auth-token': token },
          params: filter ? { completed: filter === 'completed' } : {}
        });
        setTasks(response.data.reverse());
      } catch (error) {
        toast.error('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [filter, isAuthenticated, navigate]);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error('Task title cannot be empty');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        { title: newTaskTitle, description: newTaskDescription },
        { headers: { 'x-auth-token': token } }
      );
      setTasks([response.data, ...tasks]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleToggleTask = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`,
        { completed: !completed },
        { headers: { 'x-auth-token': token } }
      );
      setTasks(
        tasks.map((task) => (task._id === id ? { ...task, completed: !completed } : task))
      );
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box minH="100vh" bg={bgColor} py={10}>
        <Container maxW="container.md">
          <Flex justify="space-between" align="center" mb={8}>
            <Heading size="xl" color={textColor}>Task Manager</Heading>
            <HStack>
              <IconButton
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
                variant="ghost"
                aria-label="Toggle color mode"
              />
              <Button colorScheme="red" onClick={logout}>
                Logout
              </Button>
            </HStack>
          </Flex>
          
          {user && (
            <Text mb={6} fontSize="lg" color={textColor}>
              Welcome, <strong>{user.email}</strong>
            </Text>
          )}

          <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md" mb={8}>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <Textarea
                placeholder="Task Description (optional)"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
              <Button
                leftIcon={<FaPlus />}
                onClick={handleAddTask}
                colorScheme="teal"
                isFullWidth
              >
                Add Task
              </Button>
            </VStack>
          </Box>

          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md" color={textColor}>Your Tasks</Heading>
            <Select
              w="200px"
              onChange={(e) => setFilter(e.target.value)}
              bg={cardBgColor}
              color={textColor}
            >
              <option value="">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </Select>
          </Flex>

          <VStack spacing={4} align="stretch">
            {tasks.map((task) => (
              <Box
                key={task._id}
                p={4}
                bg={cardBgColor}
                borderRadius="md"
                boxShadow="sm"
                _hover={{ boxShadow: 'md' }}
                transition="all 0.2s"
              >
                <Flex justify="space-between" align="center">
                  <HStack spacing={4}>
                    <Checkbox
                      isChecked={task.completed}
                      onChange={() => handleToggleTask(task._id, task.completed)}
                      colorScheme="green"
                    />
                    <Text
                      onClick={() => handleTaskClick(task)}
                      cursor="pointer"
                      color={textColor}
                      textDecoration={task.completed ? 'line-through' : 'none'}
                    >
                      {task.title}
                    </Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme={task.completed ? 'green' : 'yellow'}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </Badge>
                    <IconButton
                      icon={<FaTrash />}
                      onClick={() => handleDeleteTask(task._id)}
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                      aria-label="Delete task"
                    />
                  </HStack>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={cardBgColor}>
          <ModalHeader color={textColor}>Task Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTask && (
              <VStack align="start" spacing={4}>
                <Text color={textColor}><strong>Title:</strong> {selectedTask.title}</Text>
                <Text color={textColor}><strong>Description:</strong> {selectedTask.description || 'No description provided'}</Text>
                <Text color={textColor}>
                  <strong>Status:</strong>{' '}
                  <Badge colorScheme={selectedTask.completed ? 'green' : 'yellow'}>
                    {selectedTask.completed ? 'Completed' : 'Pending'}
                  </Badge>
                </Text>
                <Text color={textColor}><strong>Created At:</strong> {new Date(selectedTask.createdAt).toLocaleString()}</Text>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default TaskList;


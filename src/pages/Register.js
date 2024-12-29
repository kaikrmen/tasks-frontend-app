import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputLeftElement,
  useColorMode,
  Link,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      // Here you could add error handling, such as displaying an error message to the user
    }
  };

  const formBackground = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg={useColorModeValue("purple.50", "gray.900")}>
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg={formBackground}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg" color={textColor}>Register</Heading>
          <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />
        </Flex>
        <VStack spacing={6} align="stretch">
          <Text color={textColor} textAlign="center">
            Create your account to start managing tasks.
          </Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaEnvelope color="gray.300" />} />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <Button type="submit" colorScheme="teal" width="full" leftIcon={<FaUserPlus />}>
                Register
              </Button>
            </VStack>
          </form>
          <Link as={RouterLink} to="/" color="teal.500" textAlign="center">
            Already have an account? Login
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Register;


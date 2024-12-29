import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSun, FaMoon, FaEnvelope, FaLock } from "react-icons/fa";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/tasks");
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthenticated) {
    navigate("/tasks");
  }

  const formBackground = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg={useColorModeValue("gray.100", "gray.900")}>
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg={formBackground}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg" color={textColor}>Task Manager</Heading>
          <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />
        </Flex>
        <VStack spacing={6} align="stretch">
          <Text color={textColor} textAlign="center">
            Manage your tasks efficiently and effectively.
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
              <Button type="submit" colorScheme="teal" width="full">
                Login
              </Button>
            </VStack>
          </form>
          <Button as={Link} to="/register" variant="link" colorScheme="teal" width="full">
            Don't have an account? Register
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Home;


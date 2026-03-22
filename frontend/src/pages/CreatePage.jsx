import { Box, Container, Heading, VStack, Button, useColorModeValue, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore(); // use the store function
  const toast = useToast();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      // Reset form after successful creation
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const inputBorder = useColorModeValue("gray.300", "gray.600");

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" color={textColor}>
          Create New Product
        </Heading>

        <Box w="full" bg={bgColor} p={6} rounded="lg" shadow="md">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color={textColor}>Product Name</FormLabel>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                bg={inputBg}
                borderColor={inputBorder}
                color={textColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor}>Price</FormLabel>
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                bg={inputBg}
                borderColor={inputBorder}
                color={textColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor}>Image URL</FormLabel>
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                bg={inputBg}
                borderColor={inputBorder}
                color={textColor}
              />
            </FormControl>

            <Button colorScheme="blue" onClick={handleAddProduct} w="full" size="lg" mt={4}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

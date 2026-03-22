import { 
  Box, 
  Image, 
  Heading, 
  Text, 
  HStack, 
  IconButton, 
  useColorModeValue, 
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  VStack,
  useDisclosure,
  Input,
  Button
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, selectedProduct, setSelectedProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      w="full"
    >
      <Image
        src={product.image}
        alt={product.name}
        h={{ base: 48, md: 56, lg: 64 }}
        w="full"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/400x300?text=No+Image"
      />

      <Box p={{ base: 3, md: 4 }}>
        <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2} noOfLines={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2} justify="flex-end">
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            aria-label="Edit product"
            onClick={() => {
              setSelectedProduct(product);
              onOpen();
            }}
            size={{ base: "sm", md: "md" }}
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
            aria-label="Delete product"
            size={{ base: "sm", md: "md" }}
          />
        </HStack>
      </Box>

      {/* Modal for Editing */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="400px">
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />

          <VStack p={3} spacing={2} align="stretch">
            {/* Product Name */}
            <Box>
              <Text mb={1} fontWeight="medium" fontSize="sm">Product Name</Text>
              <Input
                placeholder="Enter product name"
                value={selectedProduct?.name || ""}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
                size="sm"
              />
            </Box>

            {/* Price */}
            <Box>
              <Text mb={1} fontWeight="medium" fontSize="sm">Price</Text>
              <Input
                type="number"
                placeholder="Enter price"
                value={selectedProduct?.price || ""}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: e.target.value })
                }
                size="sm"
              />
            </Box>

            {/* Image URL */}
            <Box>
              <Text mb={1} fontWeight="medium" fontSize="sm">Image URL</Text>
              <Input
                placeholder="Enter image URL"
                value={selectedProduct?.image || ""}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, image: e.target.value })
                }
                size="sm"
              />
            </Box>

            {/* Buttons */}
            <HStack justify="flex-end" pt={2}>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={async () => {
                  const { success, message } = await updateProduct(
                    selectedProduct._id,
                    selectedProduct
                  );
                  toast({
                    title: success ? "Updated" : "Error",
                    description: message,
                    status: success ? "success" : "error",
                    duration: 3000,
                    isClosable: true,
                  });
                  if (success) onClose();
                }}
              >
                Update
              </Button>
            </HStack>
          </VStack>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
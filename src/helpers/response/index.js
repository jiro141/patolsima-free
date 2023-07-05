import { useToast } from "@chakra-ui/react";

export function showToast({ title }) {
  const toast = useToast();
  return toast({
    title: title,
    description: "We've created your account for you.",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
}

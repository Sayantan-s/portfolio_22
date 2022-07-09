import { Heading, Stack, View } from "@stories/atoms";
import React from "react";

export const Blogs = () => {
  return (
    <View>
      <Stack
        h="h-full"
        display="flex"
        alignItems="items-center"
        justifyContent="justify-center"
        flexDirection="flex-col"
        maxW="max-w-screen-2xl"
        position="relative"
        m="mx-auto"
      >
        <Heading
          maxW="max-w-xl"
          textAlign="text-center"
          color="text-gray-700"
          fontWeight="font-medium"
          level="3"
        >
          Stuff I&apos;ve Written
        </Heading>
      </Stack>
    </View>
  );
};

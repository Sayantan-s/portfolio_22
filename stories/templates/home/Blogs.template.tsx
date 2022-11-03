import { Heading, Stack, Text, View } from '@stories/atoms';
import Image from 'next/image';
import React from 'react';

export const Blogs = () => {
  return (
    <View bgColor="bg-white" color="text-gray-500">
      <Stack h="h-full" display="flex" maxW="max-w-screen-2xl" position="relative" m="mx-auto">
        <View w="w-7/12" h="h-full">
          Blogs
        </View>
        <View w="w-5/12">
          <View>hgsdhsgdh</View>
          <View>hgsdhsgdh</View>
        </View>
      </Stack>
    </View>
  );
};

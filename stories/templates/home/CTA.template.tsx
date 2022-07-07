import { Heading, Text, Stack, View } from "@stories/atoms";
import React from "react";
import Image from "next/image";

export const CTA = () => {
  return (
    <View h="h-screen">
      <Stack
        h="h-full"
        display="flex"
        alignItems="items-center"
        justifyContent="justify-center"
        flexDirection="flex-col"
      >
        <Stack
          w="w-28"
          h="h-28"
          display="flex"
          alignItems="items-center"
          justifyContent="justify-center"
          bgColor="bg-orange-50"
          rounded="rounded-full"
        >
          <Image
            src="/face.png"
            width={120}
            height={120}
            alt="cta_dp_image"
            layout="intrinsic"
            className="transform translate-x-1 translate-y-1"
          />
        </Stack>
        <Heading
          m="mt-4"
          level="5"
          color="text-gray-300"
          fontWeight="font-medium"
          textAlign="text-center"
        >
          Hi, I am{" "}
          <Text
            as="span"
            fontSize="text-xl"
            color="text-gray-600"
            fontWeight="font-medium"
          >
            Sayantan
          </Text>
          .{""}
          <Image
            src="/cta_hand.png"
            width={26}
            height={26}
            alt="cta_hand_image"
            layout="intrinsic"
          />
        </Heading>
        <Heading
          maxW="max-w-xl"
          textAlign="text-center"
          color="text-gray-700"
          m="mt-6"
          fontWeight="font-medium"
        >
          Building Delightful Experiences for Web & Mobile.
        </Heading>
        <Text
          m="mt-6"
          maxW="max-w-xl"
          textAlign="text-center"
          color="text-gray-400"
        >
          A Software Engineer based in Bengaluru, Karnataka whom you might find
          bridging the gap between design and code or maybe writing serverside
          logic. I enjoy playing around with various scripting language such as
          CPP, Go & Javascript.
        </Text>
      </Stack>
    </View>
  );
};

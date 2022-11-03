import { Button, Heading, Stack, Text, View } from '@stories/atoms';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const CTA = () => {
  return (
    <View h="h-screen" className="ctagradient">
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
        <Stack
          w="w-28"
          h="h-28"
          display="flex"
          alignItems="items-center"
          justifyContent="justify-center"
          bgColor="bg-orange-100"
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
          color="text-gray-400"
          fontWeight="font-medium"
          textAlign="text-center"
        >
          Hi, I am{' '}
          <Text as="span" fontSize="text-xl" color="text-gray-600" fontWeight="font-medium">
            Sayantan
          </Text>
          .{''}
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
          Building
          <Text
            position="relative"
            as="span"
            fontSize="text-5xl"
            fontWeight="font-medium"
            color="text-gray-700"
            w="w-max"
          >
            <svg
              className="absolute -top-7 -right-14"
              width={32 * 0.35}
              height={32 * 0.35}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0406 32C15.536 32 15.1094 31.6346 14.9872 31.145C14.5976 29.5845 13.8519 27.925 12.75 26.1667C11.4444 24.0555 9.58333 22.0973 7.16667 20.2917C5.06478 18.703 2.9629 17.6197 0.861021 17.0418C0.363208 16.905 0 16.4635 0 15.9472C0 15.4411 0.349237 15.0047 0.835957 14.8657C2.89672 14.2774 4.88195 13.3221 6.79166 12C8.98611 10.4722 10.8194 8.63888 12.2917 6.5C13.5941 4.59464 14.4881 2.71021 14.9738 0.846731C15.101 0.358552 15.5308 0 16.0354 0C16.5454 0 16.9782 0.366493 17.1024 0.861328C17.3827 1.97846 17.8208 3.12192 18.4166 4.29166C19.1667 5.73611 20.125 7.12499 21.2917 8.45834C22.4861 9.76389 23.8195 10.9444 25.2917 12C27.2155 13.3637 29.1712 14.3218 31.159 14.8742C31.6467 15.0097 32 15.4439 32 15.95C32 16.4637 31.636 16.9014 31.1406 17.0373C29.8806 17.3827 28.5837 17.9398 27.2501 18.7083C25.6389 19.6528 24.1389 20.7778 22.7499 22.0834C21.3611 23.3611 20.2222 24.7083 19.3333 26.125C18.2293 27.8869 17.4827 29.5592 17.0939 31.1422C16.9733 31.6333 16.5461 32 16.0406 32Z"
                className="fill-yellow-300/90"
              />
            </svg>
            <svg
              className="absolute -top-12 -right-8"
              width={32 * 0.4}
              height={32 * 0.4}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0406 32C15.536 32 15.1094 31.6346 14.9872 31.145C14.5976 29.5845 13.8519 27.925 12.75 26.1667C11.4444 24.0555 9.58333 22.0973 7.16667 20.2917C5.06478 18.703 2.9629 17.6197 0.861021 17.0418C0.363208 16.905 0 16.4635 0 15.9472C0 15.4411 0.349237 15.0047 0.835957 14.8657C2.89672 14.2774 4.88195 13.3221 6.79166 12C8.98611 10.4722 10.8194 8.63888 12.2917 6.5C13.5941 4.59464 14.4881 2.71021 14.9738 0.846731C15.101 0.358552 15.5308 0 16.0354 0C16.5454 0 16.9782 0.366493 17.1024 0.861328C17.3827 1.97846 17.8208 3.12192 18.4166 4.29166C19.1667 5.73611 20.125 7.12499 21.2917 8.45834C22.4861 9.76389 23.8195 10.9444 25.2917 12C27.2155 13.3637 29.1712 14.3218 31.159 14.8742C31.6467 15.0097 32 15.4439 32 15.95C32 16.4637 31.636 16.9014 31.1406 17.0373C29.8806 17.3827 28.5837 17.9398 27.2501 18.7083C25.6389 19.6528 24.1389 20.7778 22.7499 22.0834C21.3611 23.3611 20.2222 24.7083 19.3333 26.125C18.2293 27.8869 17.4827 29.5592 17.0939 31.1422C16.9733 31.6333 16.5461 32 16.0406 32Z"
                className="fill-yellow-300/80"
              />
            </svg>
            <svg
              className="absolute -top-5 -right-6"
              width={32 * 0.45}
              height={32 * 0.45}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0406 32C15.536 32 15.1094 31.6346 14.9872 31.145C14.5976 29.5845 13.8519 27.925 12.75 26.1667C11.4444 24.0555 9.58333 22.0973 7.16667 20.2917C5.06478 18.703 2.9629 17.6197 0.861021 17.0418C0.363208 16.905 0 16.4635 0 15.9472C0 15.4411 0.349237 15.0047 0.835957 14.8657C2.89672 14.2774 4.88195 13.3221 6.79166 12C8.98611 10.4722 10.8194 8.63888 12.2917 6.5C13.5941 4.59464 14.4881 2.71021 14.9738 0.846731C15.101 0.358552 15.5308 0 16.0354 0C16.5454 0 16.9782 0.366493 17.1024 0.861328C17.3827 1.97846 17.8208 3.12192 18.4166 4.29166C19.1667 5.73611 20.125 7.12499 21.2917 8.45834C22.4861 9.76389 23.8195 10.9444 25.2917 12C27.2155 13.3637 29.1712 14.3218 31.159 14.8742C31.6467 15.0097 32 15.4439 32 15.95C32 16.4637 31.636 16.9014 31.1406 17.0373C29.8806 17.3827 28.5837 17.9398 27.2501 18.7083C25.6389 19.6528 24.1389 20.7778 22.7499 22.0834C21.3611 23.3611 20.2222 24.7083 19.3333 26.125C18.2293 27.8869 17.4827 29.5592 17.0939 31.1422C16.9733 31.6333 16.5461 32 16.0406 32Z"
                className="fill-yellow-300"
              />
            </svg>{' '}
            Delightful
          </Text>
          <br />
          <Text
            position="relative"
            as="span"
            fontSize="text-5xl"
            fontWeight="font-medium"
            color="text-gray-700"
            w="w-max"
          >
            <svg
              className="absolute -top-7 -left-14"
              width={32 * 0.35}
              height={32 * 0.35}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0406 32C15.536 32 15.1094 31.6346 14.9872 31.145C14.5976 29.5845 13.8519 27.925 12.75 26.1667C11.4444 24.0555 9.58333 22.0973 7.16667 20.2917C5.06478 18.703 2.9629 17.6197 0.861021 17.0418C0.363208 16.905 0 16.4635 0 15.9472C0 15.4411 0.349237 15.0047 0.835957 14.8657C2.89672 14.2774 4.88195 13.3221 6.79166 12C8.98611 10.4722 10.8194 8.63888 12.2917 6.5C13.5941 4.59464 14.4881 2.71021 14.9738 0.846731C15.101 0.358552 15.5308 0 16.0354 0C16.5454 0 16.9782 0.366493 17.1024 0.861328C17.3827 1.97846 17.8208 3.12192 18.4166 4.29166C19.1667 5.73611 20.125 7.12499 21.2917 8.45834C22.4861 9.76389 23.8195 10.9444 25.2917 12C27.2155 13.3637 29.1712 14.3218 31.159 14.8742C31.6467 15.0097 32 15.4439 32 15.95C32 16.4637 31.636 16.9014 31.1406 17.0373C29.8806 17.3827 28.5837 17.9398 27.2501 18.7083C25.6389 19.6528 24.1389 20.7778 22.7499 22.0834C21.3611 23.3611 20.2222 24.7083 19.3333 26.125C18.2293 27.8869 17.4827 29.5592 17.0939 31.1422C16.9733 31.6333 16.5461 32 16.0406 32Z"
                className="fill-yellow-300/90"
              />
            </svg>
            <svg
              className="absolute -top-12 -left-8"
              width={32 * 0.4}
              height={32 * 0.4}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0406 32C15.536 32 15.1094 31.6346 14.9872 31.145C14.5976 29.5845 13.8519 27.925 12.75 26.1667C11.4444 24.0555 9.58333 22.0973 7.16667 20.2917C5.06478 18.703 2.9629 17.6197 0.861021 17.0418C0.363208 16.905 0 16.4635 0 15.9472C0 15.4411 0.349237 15.0047 0.835957 14.8657C2.89672 14.2774 4.88195 13.3221 6.79166 12C8.98611 10.4722 10.8194 8.63888 12.2917 6.5C13.5941 4.59464 14.4881 2.71021 14.9738 0.846731C15.101 0.358552 15.5308 0 16.0354 0C16.5454 0 16.9782 0.366493 17.1024 0.861328C17.3827 1.97846 17.8208 3.12192 18.4166 4.29166C19.1667 5.73611 20.125 7.12499 21.2917 8.45834C22.4861 9.76389 23.8195 10.9444 25.2917 12C27.2155 13.3637 29.1712 14.3218 31.159 14.8742C31.6467 15.0097 32 15.4439 32 15.95C32 16.4637 31.636 16.9014 31.1406 17.0373C29.8806 17.3827 28.5837 17.9398 27.2501 18.7083C25.6389 19.6528 24.1389 20.7778 22.7499 22.0834C21.3611 23.3611 20.2222 24.7083 19.3333 26.125C18.2293 27.8869 17.4827 29.5592 17.0939 31.1422C16.9733 31.6333 16.5461 32 16.0406 32Z"
                className="fill-yellow-300/80"
              />
            </svg>
            <svg
              className="absolute -top-5 -left-6"
              width={32 * 0.45}
              height={32 * 0.45}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0406 32C15.536 32 15.1094 31.6346 14.9872 31.145C14.5976 29.5845 13.8519 27.925 12.75 26.1667C11.4444 24.0555 9.58333 22.0973 7.16667 20.2917C5.06478 18.703 2.9629 17.6197 0.861021 17.0418C0.363208 16.905 0 16.4635 0 15.9472C0 15.4411 0.349237 15.0047 0.835957 14.8657C2.89672 14.2774 4.88195 13.3221 6.79166 12C8.98611 10.4722 10.8194 8.63888 12.2917 6.5C13.5941 4.59464 14.4881 2.71021 14.9738 0.846731C15.101 0.358552 15.5308 0 16.0354 0C16.5454 0 16.9782 0.366493 17.1024 0.861328C17.3827 1.97846 17.8208 3.12192 18.4166 4.29166C19.1667 5.73611 20.125 7.12499 21.2917 8.45834C22.4861 9.76389 23.8195 10.9444 25.2917 12C27.2155 13.3637 29.1712 14.3218 31.159 14.8742C31.6467 15.0097 32 15.4439 32 15.95C32 16.4637 31.636 16.9014 31.1406 17.0373C29.8806 17.3827 28.5837 17.9398 27.2501 18.7083C25.6389 19.6528 24.1389 20.7778 22.7499 22.0834C21.3611 23.3611 20.2222 24.7083 19.3333 26.125C18.2293 27.8869 17.4827 29.5592 17.0939 31.1422C16.9733 31.6333 16.5461 32 16.0406 32Z"
                className="fill-yellow-300"
              />
            </svg>
            Experiences
          </Text>{' '}
          for Mobile and
          <Text
            position="relative"
            as="span"
            fontSize="text-5xl"
            fontWeight="font-medium"
            color="text-gray-700"
            w="w-max"
          >
            <svg
              className="absolute -bottom-4 right-3 transform rotate-3"
              width={100}
              height={24}
              viewBox="0 0 146 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 22.7391C3.2493 18.6212 9.36901 3.15474 13.1781 13.8771C13.5772 15.0005 14.5729 21.0983 15.773 21.2495C16.8445 21.3844 18.9903 7.78201 22.1436 5.98981C26.938 3.26488 28.4723 10.151 30.0999 13.0396C35.0639 21.8494 33.2842 15.9415 35.8594 9.90254C38.3383 4.0895 41.493 12.3267 42.889 14.4125C46.0529 19.1395 46.437 9.45775 49.1634 6.60421C51.8321 3.81116 54.3934 5.2678 55.9596 8.11779C59.2847 14.1687 59.9155 15.1943 62.2752 7.79515C65.2247 -1.45377 68.0072 10.2381 70.3173 13.4171C73.7248 18.1065 73.9382 1.87789 77.8068 2.98317C78.9914 3.32163 84.5475 17.5554 86.2093 13.9697C89.5418 6.77907 88.7822 9.75336 92.3498 16.1423C96.5607 23.6832 98.8714 6.9014 101.109 5.39262C103.359 3.87582 104.814 19.0214 109.258 8.66009C114.387 -3.29835 113.063 3.08672 118.261 10.2046C122.705 16.2905 123.024 -5.82656 127.697 3.19256C132.875 13.1865 134.911 9.78693 144.275 11.4333"
                className="stroke-gray-700/10"
                strokeWidth={6}
                strokeLinecap="round"
              />
            </svg>{' '}
            Web.
          </Text>
        </Heading>
        <Text
          m="mt-6"
          maxW="max-w-2xl"
          textAlign="text-center"
          color="text-gray-400"
          fontWeight="font-normal"
          fontSize="text-base"
        >
          A{' '}
          <Text as="span" color="text-gray-500" fontWeight="font-medium" fontSize="text-base">
            Software Engineer
          </Text>{' '}
          based in India whose job primarily involves bridging the gap between design and code or
          maybe writing server-side logic. Apart from Engineering, there is a baller side which
          cries over,{' '}
          <Text as="span" color="text-gray-500" fontWeight="font-medium" fontSize="text-base">
            &quot;Why Leo left Barca!&quot;
          </Text>{' '}
        </Text>
        <Stack m="mt-6" display="flex" spacing="space-x-2" alignItems="items-center">
          <Button isAnimated whileTap={{ scale: 0.98 }} className="flex items-center">
            <Text
              color="text-gray-50"
              fontWeight="font-semibold"
              fontSize="text-base"
              as="span"
              className="transform translate-y-[0.3px]"
            >
              Let&apos;s Talk
            </Text>
          </Button>
          <motion.button
            whileTap={{ scale: 0.98, rotate: 360, transition: { duration: 0.3 } }}
            className="aspect-square rounded-full p-1.5 border-2 border-gray-100"
          >
            <View
              as="span"
              position="relative"
              w="w-full"
              h="h-full"
              className="flex items-center justify-center"
            >
              <Image src="/logo.png" width={24} height={24} alt="cta_dp_image" layout="intrinsic" />
            </View>
          </motion.button>
        </Stack>
      </Stack>
    </View>
  );
};

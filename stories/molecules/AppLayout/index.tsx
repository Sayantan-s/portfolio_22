import { View } from '@stories/atoms';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Props } from './interface';

export const AppLayout = ({ children }: Props) => {
  const [toggleMode, setToggle] = useState<boolean>(false);
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      {children}
      <motion.button
        whileTap={{ scale: 0.98, rotate: 360, transition: { duration: 0.3 } }}
        onClick={prevState => setToggle(!prevState)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full"
      >
        <View
          as="span"
          position="relative"
          w="w-full"
          h="h-full"
          className="flex items-center justify-center"
        >
          <Image src="/logo.png" width={35} height={35} alt="cta_dp_image" layout="intrinsic" />
        </View>
      </motion.button>
    </React.Fragment>
  );
};

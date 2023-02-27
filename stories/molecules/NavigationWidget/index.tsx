import { svgArr } from '@stories/templates/home';
import { motion } from 'framer-motion';

interface Props {
  data: typeof svgArr;
  isHovered: boolean;
}

const NavigationWidget = ({ data, isHovered }: Props) => {
  return (
    <div className="z-10 ">
      {data.map(({ icon, link, ...rest }, index) => (
        <motion.a
          {...rest}
          href={link}
          target={'_blank'}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer absolute top-1/2 left-1/2 bg-white w-10 h-10 rounded-full flex justify-center items-center shadow-lg shadow-slate-500/10"
          key={index}
          initial={{ x: '-50%', y: '-50%', scale: 0 }}
          animate={{
            x: isHovered ? -100 + index * 50 : '-50%',
            y: isHovered ? -70 : '-50%',
            transition: {
              delay: 0.0 + index * 0.03
            },
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
        >
          {icon}
        </motion.a>
      ))}
      ;
    </div>
  );
};

export default NavigationWidget;

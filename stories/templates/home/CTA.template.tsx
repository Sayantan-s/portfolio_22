import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  onConnectClick: () => void;
}

export const CTA = ({ onConnectClick }: Props) => {
  const [isHovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (eve: MouseEvent) =>
      !ref.current?.contains(eve.target as Node) && setHovered(false);
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const svgArr = useMemo(
    () => [
      {
        link: 'https://github.com/Sayantan-s',
        icon: (
          <svg
            width={17}
            height={17}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.9983 0C8.05881 0 0 8.05881 0 18.0006C0 25.9533 5.15706 32.6993 12.3098 35.0806C13.2103 35.2453 13.5385 34.6895 13.5385 34.2121C13.5385 33.7856 13.5231 32.6529 13.5142 31.1512C8.50744 32.2386 7.45106 28.7379 7.45106 28.7379C6.63225 26.6594 5.4521 26.1058 5.4521 26.1058C3.8178 24.9886 5.57586 25.0107 5.57586 25.0107C7.38255 25.1389 8.33285 26.866 8.33285 26.866C9.93843 29.6164 12.5462 28.8219 13.5717 28.3622C13.7352 27.1986 14.1993 26.4052 14.7143 25.9555C10.7175 25.5013 6.51512 23.9565 6.51512 17.0591C6.51512 15.0944 7.2168 13.4877 8.36821 12.2291C8.18257 11.7738 7.56487 9.94395 8.54391 7.46542C8.54391 7.46542 10.0556 6.98143 13.4943 9.31078C14.9297 8.91187 16.4701 8.71187 18.0006 8.70524C19.5288 8.71187 21.0692 8.91187 22.5068 9.31078C25.9433 6.98143 27.4517 7.46542 27.4517 7.46542C28.434 9.94395 27.8163 11.7738 27.6307 12.2291C28.7843 13.4877 29.4816 15.0944 29.4816 17.0591C29.4816 23.9742 25.2726 25.4958 21.2625 25.9411C21.909 26.4969 22.4847 27.5953 22.4847 29.2749C22.4847 31.6805 22.4626 33.622 22.4626 34.2121C22.4626 34.6939 22.7863 35.2541 23.7002 35.0784C30.8474 32.6927 36 25.9511 36 18.0006C36 8.05881 27.9401 0 17.9983 0Z"
              className="fill-slate-800"
            />
          </svg>
        )
      },
      {
        link: 'https://www.instagram.com/sayantan__s/',
        icon: (
          <svg
            width={17}
            height={17}
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4555 0C12.7153 0 12.1204 0.0207276 10.2586 0.105455C8.40047 0.190546 7.13215 0.484727 6.02236 0.916364C4.8744 1.36218 3.90061 1.95855 2.93046 2.92909C1.95958 3.89927 1.36323 4.87309 0.915972 6.02073C0.483258 7.13091 0.188721 8.39964 0.105088 10.2571C0.0218174 12.1189 0 12.7142 0 17.4545C0 22.1949 0.0210906 22.788 0.105452 24.6498C0.190904 26.508 0.485076 27.7764 0.916336 28.8862C1.3625 30.0342 1.95885 31.008 2.92937 31.9782C3.89915 32.9491 4.87294 33.5469 6.02018 33.9927C7.13069 34.4244 8.39938 34.7185 10.2571 34.8036C12.1189 34.8884 12.7134 34.9091 17.4533 34.9091C22.1939 34.9091 22.7869 34.8884 24.6487 34.8036C26.5068 34.7185 27.7766 34.4244 28.8871 33.9927C30.0347 33.5469 31.0071 32.9491 31.9769 31.9782C32.9477 31.008 33.5441 30.0342 33.9913 28.8865C34.4204 27.7764 34.7149 26.5076 34.8022 24.6502C34.8859 22.7884 34.9077 22.1949 34.9077 17.4545C34.9077 12.7142 34.8859 12.1193 34.8022 10.2575C34.7149 8.39927 34.4204 7.13091 33.9913 6.02109C33.5441 4.87309 32.9477 3.89927 31.9769 2.92909C31.006 1.95818 30.0351 1.36182 28.886 0.916364C27.7733 0.484727 26.5043 0.190546 24.6462 0.105455C22.7844 0.0207276 22.1917 0 17.45 0H17.4555ZM15.8897 3.14545C16.3544 3.14473 16.8729 3.14545 17.4555 3.14545C22.1157 3.14545 22.668 3.16218 24.5083 3.24582C26.2101 3.32364 27.1337 3.608 27.749 3.84691C28.5635 4.16327 29.1442 4.54145 29.7547 5.15236C30.3656 5.76327 30.7438 6.34509 31.0609 7.15964C31.2998 7.77418 31.5845 8.69782 31.6619 10.3996C31.7456 12.2396 31.7638 12.7924 31.7638 17.4505C31.7638 22.1087 31.7456 22.6615 31.6619 24.5015C31.5841 26.2033 31.2998 27.1269 31.0609 27.7415C30.7445 28.556 30.3656 29.136 29.7547 29.7465C29.1438 30.3575 28.5639 30.7356 27.749 31.052C27.1344 31.292 26.2101 31.5756 24.5083 31.6535C22.6684 31.7371 22.1157 31.7553 17.4555 31.7553C12.7949 31.7553 12.2425 31.7371 10.4026 31.6535C8.70083 31.5749 7.77722 31.2905 7.1616 31.0516C6.34708 30.7353 5.76528 30.3571 5.15439 29.7462C4.5435 29.1353 4.16533 28.5549 3.84825 27.74C3.60935 27.1255 3.32463 26.2018 3.24717 24.5C3.16354 22.66 3.14681 22.1073 3.14681 17.4462C3.14681 12.7851 3.16354 12.2353 3.24717 10.3953C3.32499 8.69345 3.60935 7.76982 3.84825 7.15454C4.1646 6.34 4.5435 5.75818 5.15439 5.14727C5.76528 4.53636 6.34708 4.15818 7.1616 3.84109C7.77686 3.60109 8.70083 3.31745 10.4026 3.23927C12.0127 3.16655 12.6367 3.14473 15.8897 3.14109V3.14545ZM26.7723 6.04364C25.616 6.04364 24.6778 6.98073 24.6778 8.13745C24.6778 9.29382 25.616 10.232 26.7723 10.232C27.9286 10.232 28.8668 9.29382 28.8668 8.13745C28.8668 6.98109 27.9286 6.04291 26.7723 6.04291V6.04364ZM17.4555 8.49091C12.5054 8.49091 8.49211 12.5044 8.49211 17.4545C8.49211 22.4047 12.5054 26.4164 17.4555 26.4164C22.4055 26.4164 26.4174 22.4047 26.4174 17.4545C26.4174 12.5044 22.4051 8.49091 17.4551 8.49091H17.4555ZM17.4555 11.6364C20.6685 11.6364 23.2735 14.2411 23.2735 17.4545C23.2735 20.6676 20.6685 23.2727 17.4555 23.2727C14.2421 23.2727 11.6375 20.6676 11.6375 17.4545C11.6375 14.2411 14.2421 11.6364 17.4555 11.6364V11.6364Z"
              className="fill-slate-800"
            />
          </svg>
        )
      },
      {
        link: 'https://www.linkedin.com/in/sayantan-s-554bb117a/',
        icon: (
          <svg
            width={17}
            height={17}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.41333 0C1.08048 0 0 1.08048 0 2.41333V31.5866C0 32.9194 1.08049 33.9999 2.41333 33.9999H31.5867C32.9195 33.9999 34 32.9194 34 31.5866V2.41333C34 1.08048 32.9195 0 31.5867 0H2.41333ZM7.63144 10.5587C9.2604 10.5587 10.5809 9.23818 10.5809 7.60922C10.5809 5.98026 9.2604 4.65973 7.63144 4.65973C6.00248 4.65973 4.68195 5.98026 4.68195 7.60922C4.68195 9.23818 6.00248 10.5587 7.63144 10.5587ZM13.2822 12.7385H18.1704V14.9778C18.1704 14.9778 19.4969 12.3248 23.1061 12.3248C26.3257 12.3248 28.9928 13.9109 28.9928 18.7452V28.9395H23.9271V19.9805C23.9271 17.1287 22.4046 16.815 21.2444 16.815C18.8367 16.815 18.4245 18.8919 18.4245 20.3525V28.9395H13.2822V12.7385ZM10.2026 12.7385H5.06029V28.9395H10.2026V12.7385Z"
              className="fill-slate-800"
            />
          </svg>
        )
      },
      {
        link: '/cv.pdf',
        download: 'resume_sayantan',
        icon: (
          <svg
            width={17}
            height={17}
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5 23.5L14.5 27M14.5 27L10.5 23.5M14.5 27L14.5 17"
              className="stroke-orange-500"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.73204 7.99794C8.73204 7.99794 8.33375 9.20243 8.33451 9.99937C8.33526 10.7961 8.42914 11.2643 8.73563 11.9999"
              stroke="#212135"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-orange-300"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 0C13.594 0 9.93803 2.62781 8.23155 6.35395C8.14559 6.54164 7.95644 6.66094 7.75 6.66094C3.45041 6.66094 0 10.277 0 14.4884C0 18.4604 3.22474 21.481 7.00214 21.9396C7.5504 22.0061 8 21.5523 8 21C8 20.4477 7.54928 20.0081 7.00369 19.9224C4.19589 19.4814 2 17.2128 2 14.4884C2 11.3424 4.59375 8.66094 7.75 8.66094C8.04252 8.66094 8.32981 8.68246 8.61035 8.72391C9.08754 8.79441 9.54705 8.51422 9.70289 8.05772C10.9087 4.52542 14.1102 2 18 2C22.9391 2 27 6.05451 27 10.9914C27 14.598 24.7932 17.8013 21.6754 19.2225C21.609 19.2527 21.5758 19.2678 21.5665 19.2723C21.2007 19.4483 21.0086 19.747 21.0002 20.1528C21 20.1632 21 20.1842 21 20.2262C21 20.248 21 20.1935 21.0006 20.2114C21.0234 20.8473 21.7687 21.3382 22.3619 21.1079C22.3785 21.1014 22.2342 21.1635 22.2919 21.1387C26.2256 19.4475 29 15.4673 29 10.9914C29 4.9477 24.0414 0 18 0ZM18.2297 22H17.9943C18.073 22.0009 18.1514 22.0009 18.2297 22Z"
              className="fill-orange-300"
            />
          </svg>
        )
      }
    ],
    []
  );

  return (
    <div
      className="h-screen md:p-10 xs:p-4 p-3 bg-white dark:bg-slate-900 select-none"
      style={{
        backgroundImage:
          'radial-gradient(at 100% 0%, hsla(32, 98%, 83%, 0.4) 0px, transparent 50%),radial-gradient(at 40% 1%, hsla(32, 98%, 83%, 0.2) 0px, transparent 50%),radial-gradient(at 70% 60%, hsla(152, 75%, 80%, 0.3) 0px, transparent 50%),radial-gradient(at 0% 1%, hsla(152, 75%, 80%, 0.4) 0px, transparent 50%),radial-gradient(at 30% 40%, hsla(32, 98%, 83%, 0.3) 0px, transparent 30%)'
      }}
    >
      <div className="h-full flex items-center justify-center flex-col max-w-screen-2xl relative mx-auto">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0,
              duration: 0.5
            }
          }}
          className="sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full"
        >
          <Image
            src="/me/face.png"
            width={120}
            height={120}
            alt="cta_dp_image"
            priority
            className="transform translate-x-1 translate-y-1"
          />
        </motion.div>
        <motion.h5
          initial={{ y: 25, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.05,
              duration: 0.5
            }
          }}
          className="mt-6 text-gray-400 md:text-base text-sm font-medium text-center bg-gradient-to-br from-white to-slate-50 px-4 py-2 rounded-full shadow-2xl shadow-slate-700/30"
        >
          Hi, I am <span className="md:text-xl text-base text-gray-600 font-medium">Sayantan</span>.
          {''}
          <Image
            width={20}
            height={20}
            src="/cta_hand.png"
            alt="cta_hand_image"
            className="inline-block transform -translate-y-[6px] md:w-[22px] md:h-[22px] w-18px h-18px"
          />
        </motion.h5>
        <motion.div className="max-w-xl md:text-5xl sm:text-4xl xs:text-3xl text-2xl text-center text-gray-700 mt-6 xs:font-medium font-semibold">
          <div>
            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.1,
                  duration: 0.5
                }
              }}
            >
              Building&nbsp;
              <span className="relative md:text-5xl sm:text-4xl xs:text-3xl text-2xl xs:font-medium font-semibold text-gray-700 w-max">
                <svg
                  className="absolute -top-7 xs:-right-14 -right-8 xs:w-[11.2px] xs:h-[11.2px] w-[9.6px] h-[9.6px]"
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
                  className="absolute -top-12 xs:-right-8 -right-4 xs:w-[12.8px] xs:h-[12.8px] w-[11.2px] h-[11.2px]"
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
                  className="absolute xs:-top-5 -top-6 xs:-right-6 -right-2 xs:w-[14.4px] xs:h-[14.4px] w-[12.8px] h-[12.8px]"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0406 32C15.536 32 15.1094 31.6346 14.9872 31.145C14.5976 29.5845 13.8519 27.925 12.75 26.1667C11.4444 24.0555 9.58333 22.0973 7.16667 20.2917C5.06478 18.703 2.9629 17.6197 0.861021 17.0418C0.363208 16.905 0 16.4635 0 15.9472C0 15.4411 0.349237 15.0047 0.835957 14.8657C2.89672 14.2774 4.88195 13.3221 6.79166 12C8.98611 10.4722 10.8194 8.63888 12.2917 6.5C13.5941 4.59464 14.4881 2.71021 14.9738 0.846731C15.101 0.358552 15.5308 0 16.0354 0C16.5454 0 16.9782 0.366493 17.1024 0.861328C17.3827 1.97846 17.8208 3.12192 18.4166 4.29166C19.1667 5.73611 20.125 7.12499 21.2917 8.45834C22.4861 9.76389 23.8195 10.9444 25.2917 12C27.2155 13.3637 29.1712 14.3218 31.159 14.8742C31.6467 15.0097 32 15.4439 32 15.95C32 16.4637 31.636 16.9014 31.1406 17.0373C29.8806 17.3827 28.5837 17.9398 27.2501 18.7083C25.6389 19.6528 24.1389 20.7778 22.7499 22.0834C21.3611 23.3611 20.2222 24.7083 19.3333 26.125C18.2293 27.8869 17.4827 29.5592 17.0939 31.1422C16.9733 31.6333 16.5461 32 16.0406 32Z"
                    className="fill-yellow-300"
                  />
                </svg>
                Delightful
              </span>
            </motion.h1>
          </div>
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.15,
                duration: 0.5
              }
            }}
            className="relative md:text-5xl sm:text-4xl xs:text-3xl text-2xl xs:font-medium font-semibold text-gray-700 w-max"
          >
            <svg
              className="absolute -top-7 xs:-left-14 -left-8 xs:w-[11.2px] xs:h-[11.2px] w-[9.6px] h-[9.6px]"
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
              className="absolute -top-12 xs:-left-8 -left-4 xs:w-[12.8px] xs:h-[12.8px] w-[11.2px] h-[11.2px]"
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
              className="absolute xs:-top-5 -top-6 xs:-left-6 -left-2 xs:w-[14.4px] xs:h-[14.4px] w-[12.8px] h-[12.8px]"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0406 32C15.536 32 15.1094 31.6346 14.9872 31.145C14.5976 29.5845 13.8519 27.925 12.75 26.1667C11.4444 24.0555 9.58333 22.0973 7.16667 20.2917C5.06478 18.703 2.9629 17.6197 0.861021 17.0418C0.363208 16.905 0 16.4635 0 15.9472C0 15.4411 0.349237 15.0047 0.835957 14.8657C2.89672 14.2774 4.88195 13.3221 6.79166 12C8.98611 10.4722 10.8194 8.63888 12.2917 6.5C13.5941 4.59464 14.4881 2.71021 14.9738 0.846731C15.101 0.358552 15.5308 0 16.0354 0C16.5454 0 16.9782 0.366493 17.1024 0.861328C17.3827 1.97846 17.8208 3.12192 18.4166 4.29166C19.1667 5.73611 20.125 7.12499 21.2917 8.45834C22.4861 9.76389 23.8195 10.9444 25.2917 12C27.2155 13.3637 29.1712 14.3218 31.159 14.8742C31.6467 15.0097 32 15.4439 32 15.95C32 16.4637 31.636 16.9014 31.1406 17.0373C29.8806 17.3827 28.5837 17.9398 27.2501 18.7083C25.6389 19.6528 24.1389 20.7778 22.7499 22.0834C21.3611 23.3611 20.2222 24.7083 19.3333 26.125C18.2293 27.8869 17.4827 29.5592 17.0939 31.1422C16.9733 31.6333 16.5461 32 16.0406 32Z"
                className="fill-yellow-300"
              />
            </svg>
            Experiences for Mobile
          </motion.h1>{' '}
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.2,
                duration: 0.5
              }
            }}
            className="relative md:text-5xl sm:text-4xl xs:text-3xl text-2xl text-center xs:font-medium font-semibold text-gray-700 w-max mx-auto"
          >
            and
            <svg
              className="absolute md:w-[100px] sm:w-[80px] xs:w-[70px] w-[60px] h-[24px] md:right-3 right-0 xs:-bottom-4 -bottom-3 transform rotate-3"
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
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.25,
              duration: 0.5
            }
          }}
          className="md:text-base text-sm mt-6 md:max-w-2xl sm:max-w-lg xs:max-w-md max-w-[340px] text-center text-gray-400 font-normal"
        >
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.5
              }
            }}
            className="md:block inline"
          >
            A <span className="text-gray-500 font-medium text-base">Software Engineer</span> based
            in India whose job primarily involves bridging the gap between
          </motion.p>{' '}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.35,
                duration: 0.5
              }
            }}
            className="md:block inline"
          >
            design and code or maybe writing server-side logic. Apart from Engineering, there is a
            baller
          </motion.p>{' '}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.4,
                duration: 0.5
              }
            }}
            className="md:block inline"
          >
            side which cries over,{' '}
            <span className="text-gray-500 font-medium text-base">
              &quot;Why Leo left Barca!&quot;
            </span>
          </motion.p>{' '}
        </motion.div>
        <div className="mt-6 flex space-x-2 items-center">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="flex items-center bg-slate-900 px-5 py-2 rounded-full"
            onClick={onConnectClick}
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.45,
                duration: 0.5
              }
            }}
          >
            <span className="text-gray-50 font-semibold sm:text-base text-sm">Let&apos;s Talk</span>
          </motion.button>
          <div className="relative" ref={ref}>
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.5
                }
              }}
              onClick={() => setHovered(prevState => !prevState)}
              whileTap={{ rotate: 360, transition: { duration: 0.3 } }}
              whileHover={{ rotate: 360, transition: { duration: 0.3 } }}
              className="w-[36px] h-[36px] rounded-full p-1.5 border border-slate-200/90 z-50 bg-white"
            >
              <span className="flex items-center justify-center w-full h-full relative">
                <Image src="/logo.png" width={24} height={24} alt="cta_dp_image" priority />
              </span>
            </motion.button>
            <div className="z-10">
              {svgArr.map(({ icon, link, ...rest }, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

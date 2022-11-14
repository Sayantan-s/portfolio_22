import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  show?: boolean;
  onHide: () => void;
}

const ContactModal = ({ show, onHide }: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    email: '',
    content: ''
  });

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#modals');
    setMounted(true);
  }, [mounted]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = eve => {
    eve.preventDefault();
    setForm({
      email: '',
      content: ''
    });
    onHide();
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = eve => {
    const { name, value } = eve.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return mounted && ref.current
    ? createPortal(
        <AnimatePresence>
          {show ? (
            <>
              <motion.div
                initial={{ y: '-40%', x: '-50%', opacity: 0 }}
                animate={{ y: '-50%', x: '-50%', opacity: 1 }}
                exit={{ y: '-40%', x: '-50%', opacity: 0 }}
                className="max-w-md xs:min-w-[380px] min-w-[300px] overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white sm:px-8 xs:px-6 px-5 pt-16 sm:pb-12 pb-6 shadow-2xl shadow-gray-900/20 rounded-xl"
              >
                <div className="absolute left-0 top-0 w-full h-40 overflow-hidden">
                  <svg
                    width={440}
                    height={440}
                    className="absolute left-1/2 -top-[110px] transform -translate-x-1/2 "
                    viewBox="0 0 4276 4276"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2138 4103.09C3223.29 4103.09 4103.09 3223.29 4103.09 2138C4103.09 1052.71 3223.29 172.912 2138 172.912C1052.71 172.912 172.912 1052.71 172.912 2138C172.912 3223.29 1052.71 4103.09 2138 4103.09Z"
                      className="stroke-slate-300/80"
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M2138 3593.23C2941.7 3593.23 3593.23 2941.7 3593.23 2138C3593.23 1334.3 2941.7 682.774 2138 682.774C1334.3 682.774 682.775 1334.3 682.775 2138C682.775 2941.7 1334.3 3593.23 2138 3593.23Z"
                      className="stroke-slate-300/80"
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M2138 3083.43C2660.14 3083.43 3083.43 2660.15 3083.43 2138C3083.43 1615.85 2660.14 1192.57 2138 1192.57C1615.85 1192.57 1192.57 1615.85 1192.57 2138C1192.57 2660.15 1615.85 3083.43 2138 3083.43Z"
                      className="stroke-slate-300/80"
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="bg-gradient-to-b absolute left-0 top-0 w-full h-40 overflow-hidden from-white/20 to-white" />
                <div className="z-50">
                  <div className="flex w-max mx-auto">
                    <div className="mx-auto rounded-full bg-orange-100 flex items-center justify-center xs:w-20 xs:h-20 w-[70px] h-[70px] z-10 border-2 border-white">
                      <Image
                        src="/think.png"
                        width={120}
                        height={120}
                        alt="cta_dp_image"
                        className="transform translate-y-1"
                        priority
                      />
                    </div>
                    <div className="mx-auto rounded-full bg-orange-100 flex items-center justify-center xs:w-20 xs:h-20 w-[70px] h-[70px] -ml-8 z-10 border-2 border-white">
                      <Image
                        src="/unknown.png"
                        width={120}
                        height={120}
                        alt="cta_dp_image"
                        className="transform translate-x-1"
                        priority
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex-[0.5] text-center">
                      <h5 className="text-slate-900 font-semibold xs:text-xl text-lg">
                        Write me your thoughts!{' '}
                      </h5>
                      <h6 className="text-slate-400 xs:text-sm text-xs font-normal max-w-[320px] mx-auto mt-2">
                        Feel free to write me a letter letting me know what you think! I would love
                        to hear from you!
                      </h6>
                    </div>
                    <form className="flex-[0.5] xs:mt-8 mt-5 space-y-3" onSubmit={handleSubmit}>
                      <input
                        className="font-normal xs:text-sm text-xs w-full bg-white px-4 py-2 border border-slate-200/80 rounded-xl placeholder-slate-300 focus:outline-none focus:border-slate-200 text-slate-600"
                        placeholder={`Ken Adams...`}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                      <textarea
                        className="font-normal xs:text-sm text-xs w-full resize-none bg-white px-4 py-2 border border-slate-200/80 rounded-xl placeholder-slate-300 focus:outline-none focus:border-slate-200 text-slate-600"
                        placeholder={`They don't know that we know that they know!`}
                        name="content"
                        rows={3}
                        value={form.content}
                        onChange={handleChange}
                      />
                      <motion.button
                        disabled={form.content.trim() === '' || form.email.trim() === ''}
                        whileTap={{ scale: 0.98 }}
                        className="bg-slate-900 disabled:bg-slate-800 px-5 py-2 rounded-full w-full font-semibold xs:text-base text-sm"
                      >
                        Send
                      </motion.button>
                    </form>
                  </div>
                </div>
              </motion.div>
              <div
                className="fixed top-0 left-0 w-full h-full bg-slate-900/40 z-40"
                onClick={onHide}
              />
            </>
          ) : null}
        </AnimatePresence>,
        ref.current
      )
    : null;
};

export default ContactModal;

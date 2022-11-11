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
                className="max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 shadow-2xl shadow-gray-900/20 rounded-xl"
              >
                <div className="flex w-max mx-auto">
                  <div className="mx-auto rounded-full bg-orange-100 flex items-center justify-center w-20 h-20 border-2 border-white">
                    <Image
                      src="/think.png"
                      width={120}
                      height={120}
                      alt="cta_dp_image"
                      layout="intrinsic"
                      className="transform translate-y-1"
                    />
                  </div>
                  <div className="mx-auto rounded-full bg-orange-100 flex items-center justify-center w-20 h-20 -ml-8 z-10 border-2 border-white">
                    <Image
                      src="/unknown.png"
                      width={120}
                      height={120}
                      alt="cta_dp_image"
                      layout="intrinsic"
                      className="transform translate-x-1"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex-[0.5] text-center">
                    <h5 className="text-gray-900 font-semibold text-lg">
                      Hey, wanna get to know each other ?
                    </h5>
                    <h6 className="text-gray-300 text-base">Please write something to me!</h6>
                  </div>
                  <form className="flex-[0.5] mt-4 space-y-3" onSubmit={handleSubmit}>
                    <input
                      className="font-medium w-full bg-white p-2 border-2 border-gray-100 rounded-2xl placeholder-slate-300 focus:outline-none focus:border-gray-200 text-gray-600"
                      placeholder={`John 'Who' Snow`}
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <textarea
                      className="font-medium w-full resize-none bg-white p-2 border-2 border-gray-100 rounded-2xl placeholder-slate-300 focus:outline-none focus:border-gray-200 text-gray-600"
                      placeholder={`There was a brown cro... `}
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                    />
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className=" bg-slate-900 px-5 py-2 rounded-full w-full font-semibold text-base"
                    >
                      Send
                    </motion.button>
                  </form>
                </div>
              </motion.div>
              <div
                className="fixed top-0 left-0 w-full h-full bg-gray-900/40 z-40"
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

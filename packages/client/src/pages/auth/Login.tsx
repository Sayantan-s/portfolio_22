import { Logo } from "@components/shared";
import { Page } from "@components/ui";
import { authApi } from "@store/services/auth";
import { useState } from "react";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [message, setMessage] = useState("");
  const [login, loginState] = authApi.useLoginMutation();
  const [dummyLogin, dummyLoginState] = authApi.useEasyMutation();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (eve) => {
    const { name, value } = eve.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit: React.FormEventHandler = async (eve) => {
    eve.preventDefault();
    const res = await login(form).unwrap();
    if (res.statusCode === 201 || res.statusCode === 200) {
      setMessage("Please check your entered mail!");
      setForm((prevState) => ({ ...prevState, name: "", email: "" }));
    }
  };

  const onDummyLogin = async () => {
    await dummyLogin({
      email: import.meta.env.VITE_FREE_ACCESS_EMAIL,
    }).unwrap();
  };

  return (
    <Page className="mx-auto max-w-7xl">
      <div className="relative top-1/2 transform -translate-y-1/2">
        <div>
          <Logo className="mx-auto" />
          <p className="text-4xl text-center mt-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800">
            One stop platform for your
            <span className=" block leading-relaxed text-4xl text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-teal-300">
              product promotions!
            </span>
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <form onSubmit={onSubmit} className="flex flex-col space-y-4 mt-8">
            <input
              type={"email"}
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder={"gavi.fcb@gmail.com"}
              className="py-2.5 px-3.5 text-base border border-slate-300 rounded-lg focus:outline-none focus:border-slate-400"
            />
            <button
              disabled={loginState.isLoading || dummyLoginState.isLoading}
              className={
                "p-3.5 bg-slate-800 text-slate-50 disabled:opacity-50 rounded-xl font-medium border border-slate-400"
              }
            >
              Let's gowww
            </button>
          </form>
          <p className="text-center my-6 flex justify-center items-center gap-2 after:w-7 after:h-[1px] after:bg-slate-300 before:w-7 before:h-[1px] before:bg-slate-300">
            OR
          </p>
          <button
            disabled={loginState.isLoading || dummyLoginState.isLoading}
            className={
              "p-3.5 w-full text-slate-900 border-2 border-slate-100 disabled:opacity-50 rounded-xl font-medium"
            }
            onClick={onDummyLogin}
          >
            Try for free
          </button>
        </div>
        <div className="relative">
          {message ? <div className="absolute">{message}</div> : null}{" "}
        </div>
      </div>
    </Page>
  );
};

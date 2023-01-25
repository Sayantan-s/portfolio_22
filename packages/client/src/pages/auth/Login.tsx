import { Logo } from "@components/shared";
import { Page } from "@components/ui";
import { authApi } from "@store/services/auth";
import { useState } from "react";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
  });

  const [message, setMessage] = useState("");
  const [login, { isLoading }] = authApi.useLoginMutation();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (eve) => {
    const { name, value } = eve.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit: React.FormEventHandler = async (eve) => {
    eve.preventDefault();
    const res = await login(form).unwrap();
    if (res.status === 201 || res.status === 200)
      setMessage("Please check your entered mail!");
  };

  return (
    <Page className="mx-auto max-w-7xl">
      <div className="relative top-1/2 transform -translate-y-1/2">
        <div>
          <Logo className="mx-auto" />
          <p className="text-4xl text-center mt-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-500 via-slate-600 to-slate-800">
            Getting hired is as easy as{" "}
            <span className=" block leading-relaxed text-4xl text-transparent bg-clip-text bg-gradient-to-b from-sky-100 via-emerald-300 to-sky-400">
              Tweeting!
            </span>
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <form onSubmit={onSubmit} className="flex flex-col space-y-4 mt-8">
            <input
              type={"text"}
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder={"Pablo G..."}
              className="py-2.5 px-3.5 text-base border border-slate-300 rounded-lg"
            />
            <input
              type={"email"}
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder={"gavi.fcb@gmail.com"}
              className="py-2.5 px-3.5 text-base border border-slate-300 rounded-lg"
            />
            <button
              disabled={isLoading}
              className={
                "p-3.5 bg-slate-800 text-slate-50 disabled:opacity-50 rounded-xl font-medium"
              }
            >
              Let's gowww
            </button>
          </form>
          <p className="text-center my-6 flex justify-center items-center gap-2 after:w-7 after:h-[1px] after:bg-slate-300 before:w-7 before:h-[1px] before:bg-slate-300">
            OR
          </p>
          <button
            disabled={isLoading}
            className={
              "p-3.5 w-full text-slate-900 border-2 border-slate-100 disabled:opacity-50 rounded-xl font-medium"
            }
          >
            Easy join
          </button>
        </div>
        <div className="relative">
          {message ? <div className="absolute">{message}</div> : null}{" "}
        </div>
      </div>
    </Page>
  );
};

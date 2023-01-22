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

  const testSession = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/test`);
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="relative">
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder={"Pablo G..."}
          className="p-4 text-lg border border-slate-300"
        />
        <input
          type={"email"}
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder={"gavi.fcb@gmail.com"}
          className="p-4 text-lg border border-slate-300"
        />
        <button
          disabled={isLoading}
          className={isLoading ? "bg-yellow-100" : "bg-slate-100"}
        >
          Create user
        </button>
      </form>
      {message ? <div className="absolute">{message}</div> : null}{" "}
      <button onClick={testSession} className="z-20 mt-20">
        TEST
      </button>
    </div>
  );
};

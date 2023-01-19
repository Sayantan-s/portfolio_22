import { useState } from "react";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
  });

  const [message, setMessage] = useState("");

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (eve) => {
    const { name, value } = eve.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit: React.FormEventHandler = async (eve) => {
    eve.preventDefault();
    const res = await fetch(
      import.meta.env.VITE_SERVER_ORIGIN + "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(form),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.status);
    if (res.status === 201 || res.status === 200)
      setMessage("Please check your entered mail!");
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
        <button>Create user</button>
      </form>
      {message ? <div className="absolute bottom-0">{message}</div> : null}{" "}
    </div>
  );
};

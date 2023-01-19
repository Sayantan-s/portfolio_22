export const Login = () => {
  const onJoin = async () => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "sssamanta789@gmail.com",
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={onJoin}>Create user</button>
    </div>
  );
};

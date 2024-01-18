import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
        <h1 className="font-bold text-3xl mb-3">Register</h1>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="w-[40%] p-5 shadow-lg mb-5">
          <form onSubmit={handleSubmit} className="flex justify-center flex-col">
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="border-none outline-none bg-slate-100 mt-1 w-full p-2"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fullname">Full Name</label>
              <input
                className="border-none outline-none bg-slate-100 mt-1 w-full p-2"
                type="text"
                name="fullname"
                id="fullname"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="border-none outline-none bg-slate-100 mt-1 w-full p-2"
                type="number"
                name="phone"
                id="phone"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password">Password</label>
              <input
                className="border-none outline-none bg-slate-100 mt-1 w-full p-2"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <button
              type="submit"
              className="border hover:bg-orange-600 bg-orange-500 font-semibold text-white py-1 px-2"
            >
              {isLoading ? "Loading...." : "Register"}
            </button>
          </form>
        </div>
        <p>
          Have an account? Sign in{" "}
          <Link className="text-orange-600 font-medium" href="/auth/login">
            here
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterView;

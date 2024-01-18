import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or Password is incorrect");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
        <h1 className="font-bold text-3xl mb-3">Login</h1>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="w-[40%] py-5 px-8 shadow-lg mb-5 border-2 border-gray-300">
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
              className="border hover:bg-orange-600 bg-orange-500 font-semibold text-white py-1 px-2 mb-3"
            >
              {isLoading ? "Loading...." : "Login"}
            </button>
          </form>
        </div>
        <p>
          Don{"'"}t have an account? Sign up{" "}
          <Link className="text-orange-600 font-medium" href="/auth/register">
            here
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginView;

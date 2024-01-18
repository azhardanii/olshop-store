import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="flex items-center justify-end w-full h-[80px] bg-black text-white px-6">
      <button
        onClick={() => (data ? signOut() : signIn())}
        className="bg-white border-none text-black px-3 py-2 rounded-md font-semibold
      "
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;

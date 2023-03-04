import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="navbar bg-primary text-primary-content">
      <div className="flex-1 font-semibold text-2xl">
        {sessionData ? (
          <span>{sessionData.user?.name}`s notes </span>
        ) : (
          <span>Notaker</span>
        )}
      </div>

      {sessionData?.user && (
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <img
                src={
                  sessionData.user.image ||
                  "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
                alt="avatar"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <button onClick={() => void signOut()} >
                <span className="text-primary-content">Sign out</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      {!sessionData?.user && (
        <div className="flex-none">
          <button className="btn-primary btn" onClick={() => void signIn()}>
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
};

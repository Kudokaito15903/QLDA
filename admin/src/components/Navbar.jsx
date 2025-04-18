import { BiBell, BiMenuAltLeft } from "react-icons/bi";
import useSidebarContext from "../context/SidebarContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
export default function Navbar() {
  return (
    <div className="flex lg:gap-20 sm:justify-between py-2 px-4 mb-2 bg-white shadow-md sticky top-0 z-10">
      <NavbarFirstSection visible={true} />
      <div className="flex items-center md:gap-6 gap-4">
        <NotificationButton />
        <TodayDate />
      </div>
    </div>
  );
}

function NotificationButton() {
  return (
    <button className=" btn btn-ghost btn-circle">
    <div className="indicator z-0">
      <BiBell className="text-2xl " />
      <span className="badge badge-xs bg-red-500 border-red-500 indicator-item text-white py-2">
        2
      </span>
    </div>
  </button>
  );
}

export function NavbarFirstSection({ visible = true }) {
  const {url, LoginData} = useContext(LoginContext);
  const { toggle } = useSidebarContext();

  
  return (
    <div className="flex items-center gap-3">
      {url !== "/login" && (
        <button className="btn btn-ghost btn-circle" onClick={toggle}>
          <BiMenuAltLeft className="text-2xl text-gray-600 hover:text-primary transition-all" />
        </button>
      )}
      <div
        className={`font-bold text-xl ${visible ? "block" : "hidden"} sm:block`}
      >
        <span className=" text-blue-400">{LoginData.username}</span> 
      </div>
    </div>
  );
}

const TodayDate = () => {
  const day = new Date();
  const today = day.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-700">
      <p className="flex items-center gap-2 font-semibold">
        {day.getHours() >= 12 ? (
          <>
            <FaMoon className="text-xl text-blue-600" />
            Good Evening
          </>
        ) : (
          <>
            <FaSun className="text-xl text-yellow-500" />
            Good Morning
          </>
        )}
      </p>
      <div className="text-sm text-gray-500">
        <p>{today}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

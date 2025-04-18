import { NavbarFirstSection } from "./Navbar"
import { sidebarSmall, mainMenuItem, productItem, adminItem } from "../until/constants"
import { Link } from "react-router-dom"
import useSidebarContext from "../context/SidebarContext"
import { MdLogout } from "react-icons/md"
import LoginContext from "../context/LoginContext"
import { useContext } from "react"

export default function Sidebar() {
  const { isSmallOpen, isLargeOpen, close } = useSidebarContext()
  const { selectedPageURL, setSelectedPageURL } = useSidebarContext()
  
  return (
    <>
      {/* Sidebar nhỏ */}
      <aside
        className={`bg-white shadow-lg sticky top-0 overflow-auto pb-0 flex flex-col ml-1 gap-4 h-[calc(100vh-64px)] hidden ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        {sidebarSmall.map(item => (
          <SmallSideBarButton
            key={item.name}
            name={item.name}
            url={item.url}
            icon={item.icon}
            isActive={selectedPageURL === item.url}
            setSelectedPageURL={setSelectedPageURL}
          />
        ))}
        <LogoutButton isLarge />
      </aside>

      {/* Overlay */}
      {isSmallOpen && (
        <div onClick={close} className="lg:hidden fixed inset-0 z-40 bg-gray-700 opacity-50" />
      )}

      {/* Sidebar lớn */}
      <aside
        className={`bg-white w-64 shadow-xl lg:sticky fixed top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-4 px-4 ${
          isSmallOpen ? "flex z-50 bg-white inset-0" : "hidden"
        } ${isLargeOpen ? "lg:flex" : "lg:hidden"}`}
      >
        <div className="lg:hidden pt-4 pb-4 px-2 bg-white sticky top-0 shadow-md">
          <NavbarFirstSection />
        </div>

        {/* Phần chính */}
        <SidebarSection title="MAIN MENU" items={mainMenuItem} selectedPageURL={selectedPageURL} setSelectedPageURL={setSelectedPageURL} />
        <SidebarSection title="PRODUCTS" items={productItem} selectedPageURL={selectedPageURL} setSelectedPageURL={setSelectedPageURL} />
        <SidebarSection title="ADMIN" items={adminItem} selectedPageURL={selectedPageURL} setSelectedPageURL={setSelectedPageURL} />
        
        <LogoutButton />
      </aside>
    </>
  )
}

function SmallSideBarButton({ name, url, icon, isActive, setSelectedPageURL }) {
  return (
    <Link
      to={url}
      onClick={() => setSelectedPageURL(url)}
      className={`btn btn-ghost btn-lg w-16 font-normal mr-2 transition-all duration-300 ${
        isActive ? "text-primary bg-gray-100 shadow-md" : "hover:bg-gray-50"
      }`}
    >
      <div className="flex flex-col gap-2 items-center">
        <div>{icon({ size: 25 })}</div>
        <div className="text-xs">{name}</div>
      </div>
    </Link>
  )
}

function LargeSideBarButton({ name, url, icon, isActive, setSelectedPageURL }) {
  return (
    <Link
      to={url}
      className="btn btn-ghost justify-start font-semibold w-full px-4 transition-all duration-300"
      onClick={() => setSelectedPageURL(url)}
    >
      <div className="flex gap-4 items-center justify-start" >
        <div className={isActive ? "text-primary" : "text-gray-500"}>{icon({ size: 25 })}</div>
        <div className={isActive ? "text-primary" : "text-gray-500"}>{name}</div>
      </div>
    </Link>
  )
}


function SidebarSection({ title, items, selectedPageURL, setSelectedPageURL }) {
  return (
    <div>
      <div className="font-bold ml-2 text-blue-500 text-sm mt-4">{title}</div>
      {items.map(item => (
        <LargeSideBarButton
          key={item.name}
          name={item.name}
          url={item.url}
          icon={item.icon}
          isActive={selectedPageURL === item.url}
          setSelectedPageURL={setSelectedPageURL}
        />
      ))}
    </div>
  )
}

function LogoutButton({ isLarge }) {
  const {LoginData} = useContext(LoginContext)
  const handleLogout = () =>{
    LoginData.logout();
  }
  return (
    <button className={`btn btn-ghost justify-start font-semibold w-full ${isLarge ? "w-16 mr-2" : ""}` } onClick={handleLogout}>
      <div className="flex gap-4 items-center justify-center">
        <MdLogout className="text-2xl text-red-500" />
        {!isLarge && <div className="text-md text-red-500">Log out</div>}
      </div>
    </button>
  )
}



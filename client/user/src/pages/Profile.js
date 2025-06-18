import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";
export const Profile = () => {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <UserProfile></UserProfile>
      <Footer></Footer>
    </div>
  );
};

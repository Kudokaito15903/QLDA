import ChatbotInterface from "../components/ChatbotInterface";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Chatbot() {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <ChatbotInterface></ChatbotInterface>
      <Footer></Footer>
    </div>
  );
}
export default Chatbot;

import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchResult from "../components/SearchResult";

const SearchPage = () => {
  return (
    <div className="component-container">
      <Navbar />
      <Banner />
      <SearchResult />
      <Footer />
    </div>
  );
};

export default SearchPage;


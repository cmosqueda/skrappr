import Header from "./components/Header";
import { Route, Routes } from "react-router";
import Home from "./routes/Home";
import HowToUse from "./routes/HowToUse";
import About from "./routes/About";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/how-to-use" element={<HowToUse></HowToUse>}></Route>
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;

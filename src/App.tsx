import { Routes,Route } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import PostAd from "./components/PostAd"

const App = () => {
  return (
   <>
   <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/details" element={<Details/>} />
    <Route path="/post-ad" element={<PostAd/>} />
   </Routes>

   </>
  )
}

export default App
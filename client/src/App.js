import "./App.css";
import CustomersList from "./componenets/CustomersList";
import Home from "./pages/Home";
function App() {
  return(
     <div className="App">
    <h1>Bus Management</h1>
    {/* <Home /> */}
    <CustomersList />
  </div>
  )
 
}

export default App;

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="min-h-screen w-full text-white">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
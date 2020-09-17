import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./hoc/Layout/Layout";
import { AuthContextProvider } from './context/auth-context';
import AppRoutes from './AppRoutes';



function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthContextProvider>
    </div>
  );
}

export default App;

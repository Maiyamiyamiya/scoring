import React from "react";
import { Route, Routes,  } from "react-router-dom";



import Tatami1FormNilai from "./components/tatami1/FormNilai";
import Tatami1PapanScore from "./components/tatami1/PapanScore";
import Tatami1Start from "./components/tatami1/Start";

import Tatami2FormNilai from "./components/tatami2/FormNilai";
import Tatami2PapanScore from "./components/tatami2/PapanScore";
import Tatami2Start from "./components/tatami2/Start";

import Tatami3FormNilai from "./components/tatami3/FormNilai";
import Tatami3PapanScore from "./components/tatami3/PapanScore";
import Tatami3Start from "./components/tatami3/Start";

import Tatami4FormNilai from "./components/tatami4/FormNilai";
import Tatami4PapanScore from "./components/tatami4/PapanScore";
import Tatami4Start from "./components/tatami4/Start";



import Login from "./components/Login";
import Users from "./components/Users";
import {UserAuthContextProvider} from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {  

  return (
    <div className="App">

          <UserAuthContextProvider>    
            <Routes>
            <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={ <Login />} />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/tatami1/admin"
                  element={
                    <ProtectedRoute>
                      <Tatami1Start />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tatami1/juri"
                  element={
                    <ProtectedRoute>
                      <Tatami1FormNilai />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tatami1/papan-score"
                  element={
                    <ProtectedRoute>
                      <Tatami1PapanScore />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/tatami2/admin"
                  element={
                    <ProtectedRoute>
                      <Tatami2Start />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tatami2/juri"
                  element={
                    <ProtectedRoute>
                      <Tatami2FormNilai />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tatami2/papan-score"
                  element={
                    <ProtectedRoute>
                      <Tatami2PapanScore />
                    </ProtectedRoute>
                  }
                />


                <Route
                  path="/tatami3/admin"
                  element={
                    <ProtectedRoute>
                      <Tatami3Start />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tatami3/juri"
                  element={
                    <ProtectedRoute>
                      <Tatami3FormNilai />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tatami3/papan-score"
                  element={
                    <ProtectedRoute>
                      <Tatami3PapanScore />
                    </ProtectedRoute>
                  }
                />


                <Route
                  path="/tatami4/admin"
                  element={
                    <ProtectedRoute>
                      <Tatami4Start />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tatami4/juri"
                  element={
                    <ProtectedRoute>
                      <Tatami4FormNilai />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tatami4/papan-score"
                  element={
                    <ProtectedRoute>
                      <Tatami4PapanScore />
                    </ProtectedRoute>
                  }
                />
            </Routes>
          </UserAuthContextProvider>

    </div>
  );
}

export default App;
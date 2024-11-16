import './App.css'
import animationData from "./assets/lotties/bat.json"
import Lottie from "lottie-react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import {StartContainer} from "./components/StartContainer/StartContainer.jsx";
import {SearchUsersContainer} from "./components/SearchUsersContainer/SearchUsersContainer.jsx";
import {RegisterContainer} from "./components/RegisterContainer/RegisterContainer.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ChatContainer} from "./components/ChatContainer/ChatContainer.jsx";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {GenericError} from "./components/GenericError/GenericError.jsx";
import {firebaseConfig} from "./firebaseConfig.js";


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const isAuthenticated = () => sessionStorage.getItem("userID") !== null;
const ProtectedRoute = ({ children }) => (!isAuthenticated() ? children : <GenericError/>);

function App() {

  return (
      <>
          <Container style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "95vh",
              width: "100vw"
          }}>
              <Row>
                  <Col>
                      <Lottie
                          className={"lottie-bat"}
                          animationData={animationData}
                          loop={false}
                          autoplay={true}
                          style={{
                              height: "18vh",
                              position: "absolute",
                              top: "0",
                              left: "50%",
                              transform: "translateX(-50%)"
                          }}
                      />
                      <h1 style={{
                          fontFamily: "Light, fantasy",
                          fontSize: "72px",
                          color: "white"
                      }}>Goth4Goth</h1>
                  </Col>
              </Row>
              <Row style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
              }}>
                  <Col xs={12} md={8} lg={8}>
                      <div className={"container-main"}
                           style={{
                              background: "rgba(98, 24, 139, 0.5)",
                           }}>
                          <BrowserRouter>
                              <Routes>
                                  <Route path="/goth4goth" element={<StartContainer/>}/>
                                  <Route
                                      path="/"
                                      element={<Navigate to="/goth4goth" replace />}
                                  />
                                  <Route path="/goth4goth/register" element={<RegisterContainer/>}/>
                                  <Route path="/goth4goth/home" element={<ProtectedRoute><ChatContainer/></ProtectedRoute>}/>
                                  <Route path="/goth4goth/online" element={<ProtectedRoute><SearchUsersContainer/></ProtectedRoute>}/>
                              </Routes>
                          </BrowserRouter>
                      </div>
                  </Col>
              </Row>
          </Container>
      </>
  )
}

export default App

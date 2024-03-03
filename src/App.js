import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import axios from 'axios';

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';

import "./css/App.css";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function App() {
    return (
        <main> homepage... </main>
    );
}

export default App;

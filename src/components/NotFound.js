import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
      <div className="flex flex-col gap-2">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for does not exist.</p>
        <Link to="/">Home</Link>
      </div>
    );
};

export default NotFound;

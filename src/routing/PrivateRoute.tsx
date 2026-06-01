import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { decodeJWT, redirectionLink } from "../../helpers/functions";

interface routesProps {
  children: React.ReactNode;
  allowedRoles: any;
}

const PrivateRoute = ({ children, allowedRoles }: routesProps) => {
  const getToken = useSelector(
    (state: any) => state?.auth?.login?.access_token
  );

  const roleId = getToken ? decodeJWT(getToken, "payload")?.roleId : null;

  const hasAccess = roleId !== null && allowedRoles.includes(roleId);
  const link = redirectionLink(roleId);

  if (!getToken) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess) {
    return <Navigate to={link} replace />;
  }
  return children;
};

export default PrivateRoute;

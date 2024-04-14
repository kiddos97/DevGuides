import React, { createContext, useContext } from 'react';

const RouteParamsContext = createContext();

const RouteParamsProvider = ({childern, routeParams}) => {
  return (
   <RouteParamsContext.Provider value={routeParams}>
    {childern}
   </RouteParamsContext.Provider>
  )
}

export default RouteParamsProvider

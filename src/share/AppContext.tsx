import React from 'react';


export const AppContext = React.createContext({
  doSomething: (e:boolean) =>{
    console.log(e)
  }
})

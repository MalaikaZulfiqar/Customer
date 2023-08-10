import React, {createContext, useState} from 'react';
const Context = createContext(false);

function AppProvider({children}) {
  const [accountType, setAccountType] = useState('');

  return (
    <Context.Provider value={{accountType, setAccountType}}>
      {children}
    </Context.Provider>
  );
}

export {AppProvider, Context};

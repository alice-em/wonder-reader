import React, { context, useState } from 'react';

const createContext = state => context(state);

const generateDisplayName = s => `${s[0].toUpperCase()}${s.slice(1)}Context`;

const Context = (initState, displayName) => {
  const [state, setState] = useState(initState);

  const ContextWrapper = createContext(initState);
  ContextWrapper.displayName = generateDisplayName(displayName);

  return [
    Component => (
      <ContextWrapper.Provider value={{ state, setState }}>
        {Component}
      </ContextWrapper.Provider>
    ),
    ContextWrapper,
  ];
};

export default Context;

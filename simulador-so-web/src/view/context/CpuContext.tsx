import { useEffect, useState, createContext } from 'react';

import { CPU } from '../../simulator/model/cpu';
import { cpus, ios, main } from '../../simulator/main';
import { IO } from '../../simulator/model/io';

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
}

type cpuContext = {
  cpus: Array<CPU> | null;
  io: IO | null;
  forceUpdate: Function;
};

export const cpuContext = createContext<cpuContext>({
  cpus: null,
  io: null,
  forceUpdate: () => {},
});

type ProviderProps = {
  children: JSX.Element;
};

export const CpuProvider = ({ children }: ProviderProps) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    main(forceUpdate, 2);
  }, []);

  return (
    <cpuContext.Provider
      value={{
        // cpu: cpus && cpus[0] ? cpus[0] : null,
        cpus,
        io: ios && ios[0] ? ios[0] : null,
        forceUpdate,
      }}
    >
      {children}
    </cpuContext.Provider>
  );
};

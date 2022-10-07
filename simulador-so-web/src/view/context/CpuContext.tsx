import { useEffect, useState, createContext } from 'react';

import { CPU } from '../../simulator/model/cpu';
import { cpu, io, main } from '../../simulator/main';
import { IO } from '../../simulator/model/io';

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
}

type cpuContext = {
  cpu: CPU | null;
  io: IO | null;
  forceUpdate: Function;
};

export const cpuContext = createContext<cpuContext>({ cpu: null, io: null, forceUpdate: () => {} });

type ProviderProps = {
  children: JSX.Element;
};

export const CpuProvider = ({ children }: ProviderProps) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    main(forceUpdate);
  }, []);

  return <cpuContext.Provider value={{ cpu, io, forceUpdate }}>{children}</cpuContext.Provider>;
};

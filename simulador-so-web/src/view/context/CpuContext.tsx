import { useEffect, useState, createContext } from 'react';

import { clusters, main } from '../../simulator/main';
import { Cluster } from '../../simulator/model/cluster';

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
}

type cpuContext = {
  clusters: Array<Cluster> | null;
  forceUpdate: Function;
};

export const cpuContext = createContext<cpuContext>({
  clusters: null,
  forceUpdate: () => {},
});

type ProviderProps = {
  children: JSX.Element;
};

export const CpuProvider = ({ children }: ProviderProps) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!clusters) main(forceUpdate);
  }, []);

  return (
    <cpuContext.Provider
      value={{
        // cpu: cpus && cpus[0] ? cpus[0] : null,
        clusters,
        forceUpdate,
      }}
    >
      {children}
    </cpuContext.Provider>
  );
};

import { createContext, useContext } from 'react';
import { Store } from './store';

let store;
export const StoreContext = createContext({});

export default function useStore(): Store {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context as any;
}

export function StoreProvider({ children, initialState: initialData }) {
  const store = initializeStore();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store();

  if (initialData) {
    _store.hydrate(initialData);
  }
  if (typeof window === 'undefined') return _store;
  if (!_store) store = _store;

  return _store;
}

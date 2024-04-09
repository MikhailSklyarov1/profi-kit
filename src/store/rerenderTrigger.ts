import { create } from 'zustand';

type Store = {
    stateRer: boolean,
    rer: () => void
}

const useRerenderTrigger = create<Store>()((set) => ({
    stateRer: false,

    rer: () => set((state) => ({ stateRer: !state.stateRer })),
}))

export default useRerenderTrigger;
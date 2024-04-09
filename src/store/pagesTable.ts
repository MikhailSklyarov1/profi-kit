import { create } from 'zustand';

type Store = {
    pagination: {current: number, pageSize: number},
    setPaginationVal: (paginationVal: {current: number, pageSize: number}) => void
}

const usePagesTable = create<Store>()((set) => ({
    pagination: {current: 1, pageSize: 100},

    setPaginationVal: (paginationVal: {current: number, pageSize: number}) => set(() => ({ pagination: paginationVal })),
}))

export default usePagesTable;
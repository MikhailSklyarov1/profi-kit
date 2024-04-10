import { create } from 'zustand';
import axios from 'axios';


type DataItem = {
    id: string;
    name: string;
    measurement_units?: string;
    code?: string;
    description?: string;
    key: string;
};

type Store = {
    items: DataItem[],
    count: number,
    getItems: (pagination: {current: number, pageSize: number}) => void,
    editItems: (item: DataItem) => void;
    createItems: (item: DataItem) => void;
}


const jwtToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxMjc4MjgwMH0.HVB0WHIquHlu8k7qKVVPW1ies5uVtqOyHqW3Bjsuuq36Ks-Z12GPdN2-kuv7DE2WGYk51pQq0bUfzvsREcOoWQ'; // Лучше перенести, например, в localstorage

const useStore = create<Store>()((set) => ({
    items: [{ id: '', name: '', measurement_units: '', code: '', description:'', key:'' }],
    count: 0,

    getItems: (pagination: {current: number, pageSize: number}) => {
        const headers = {
            Authorization: `${jwtToken}`
        };
        axios.get(`https://hcateringback-dev.unitbeandev.com/api/items?page=${pagination.current}&pageSize=${pagination.pageSize}`, { headers })
            .then((res: any) => {

                const selectedFields = res.data.result.map(({ 
                    id, name, measurement_units, code, description 
                }: DataItem) => ({ 
                    id, key: id, name, measurement_units, code, description 
                }));

                set(() => ({ items: selectedFields }))
                set(() => ({count: res.data.total}))
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    },

    editItems: (item: DataItem) => {
        const headers = {
            Authorization: `${jwtToken}`
        };
        axios.patch(`https://hcateringback-dev.unitbeandev.com/api/items/${item.id}`, 
        {name: item.name, code: item.code, measurement_units: item.measurement_units, description: item.description}, 
        { headers })
            .then((res: any) => {
                set((state) => ({ items: [...state.items, res.data] }))
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    },

    createItems: (item: DataItem) => {
        const headers = {
            Authorization: `${jwtToken}`
        };
        axios.post('https://hcateringback-dev.unitbeandev.com/api/items', 
        {name: item.name, code: item.code, measurement_units: item.measurement_units, description: item.description}, 
        { headers })
            .then((res: any) => {
                set((state) => ({ items: [...state.items, res.data] }))
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    },
}))

export default useStore;
import { create } from "zustand";

interface IPState {
    address: string,
}

export const useIPStore = create<IPState>()(
    () => ({
        address: "192.168.1.65"
    }),
)
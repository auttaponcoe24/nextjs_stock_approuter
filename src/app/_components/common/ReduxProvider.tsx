"use client";
import { store } from "@/src/store/store";
import { Provider } from "react-redux";

type Props = {
	children: React.ReactNode;
};

export default function ReduxProvider({ children }: Props) {
	return <Provider store={store}>{children}</Provider>;
}
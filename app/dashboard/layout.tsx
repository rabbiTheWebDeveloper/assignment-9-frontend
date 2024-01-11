"use client";
import store from "@/redux/Store";
import UserRole from "@/types/UserRole";
import { checkUserAuthenticationFromCLientSide } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function AuthUI({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const auth_check = checkUserAuthenticationFromCLientSide();

	useEffect(() => {
		if (
			!auth_check?.is_logged_in ||
			auth_check?.user_details?.role !== UserRole.CUSTOMER
		) {
			router.push("/signin");
		}
	}, [auth_check, router]);

	return <Provider store={store}>{children}</Provider>;
}


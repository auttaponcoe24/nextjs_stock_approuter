"use client";

import { IntlProvider } from "react-intl";
import th_TH from "@/lang/th-TH.json";
import en_US from "@/lang/en-US.json";
import { useRouter } from "next/navigation";

const messages = {
	"th-TH": th_TH,
	"en-US": en_US,
} as Record<string, Record<string, string>>;

type Props = {
	children: React.ReactNode;
};

export default function IntlProviders({ children }: Props) {
	const { locale = "th-TH" }: any = useRouter();
	const router = useRouter();

	console.log("locale", locale);
	console.log("router", router);

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			{children}
		</IntlProvider>
	);
}

// <IntlProvider locale={usersLocale} messages={translationsForUsersLocale}>
//     <App />
//   </IntlProvider>,

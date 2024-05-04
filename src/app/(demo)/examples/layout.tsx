import Link from "next/link";
import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function ExamplesLayout({ children }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<nav className="flex gap-1">
				<span className="text-red-600">Tag a :</span>
				<div className="flex gap-2">
					<a href="/examples/dashboard">Dashboard</a>
					<a href="/examples/aboutus">About Us</a>
				</div>
			</nav>
			<div>
				ต่างกันที่รอโหลดหน้า และ Link จะเป็นการใช้งานตรงฝั่ง server site
			</div>
			<nav className="flex gap-1">
				<span className="text-red-600">Tag Link :</span>
				<div className="flex gap-2">
					<Link href="/examples/dashboard">Dashboard</Link>
					<Link href="/examples/aboutus">About Us</Link>
				</div>
			</nav>

			{children}
		</div>
	);
}

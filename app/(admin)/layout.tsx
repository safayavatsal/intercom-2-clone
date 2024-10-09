import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <div className="flex flex-col lg:flex-row flex-1 bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex justify-center lg:justify-start items-start max-w-5xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
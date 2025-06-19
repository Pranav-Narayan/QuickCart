import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { headers } from 'next/headers'

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "QuickCart",
  description: "E-Commerce with Next.js ",
};

export default async function RootLayout({ children }) {

  let userId = null;
  let userName = null;

  // Use try/catch because headers() is not always safe (e.g. /_not-found)
  try {
    // Workaround: avoid calling await headers() when it's not during real request
    const headersList = await headers();
    if (headersList) {
      userId = headersList.get('x-user-id');
      userName = headersList.get('x-user-name');
    }
  } catch (err) {
    // If headers() fails (like in /_not-found), ignore
    console.log("⚠️ headers() not available in this context:", err.message);
  }

  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`} >
        <Toaster />
        <AppContextProvider userName={userName} userId={userId}>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}

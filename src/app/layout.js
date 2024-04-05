import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Games Load",
  description:
    "Web site of videogames using  react,redux,node,express,sequelize",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

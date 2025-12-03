import { SessionProvider } from "next-auth/react";
import PageHome from "@/components/PageHome";

export default function Home() {
  return (
    <SessionProvider>
      <PageHome />
    </SessionProvider>
  );
}
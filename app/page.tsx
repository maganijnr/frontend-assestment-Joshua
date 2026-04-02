"use client";
import PageLoader from "@/components/molecules/page-loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  }, []);

  return <PageLoader />;
}

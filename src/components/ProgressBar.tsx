"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({ showSpinner: false });

const ProgressBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleStart = () => NProgress.start();
        const handleComplete = () => NProgress.done();

        router.events?.on("routeChangeStart", handleStart);
        router.events?.on("routeChangeComplete", handleComplete);
        router.events?.on("routeChangeError", handleComplete);

        return () => {
            router.events?.off("routeChangeStart", handleStart);
            router.events?.off("routeChangeComplete", handleComplete);
            router.events?.off("routeChangeError", handleComplete);
        };
    }, [router]);

    return null;
};

export default ProgressBar;
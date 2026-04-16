"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ProfileProvider, useProfile } from "@/lib/profile-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isOnboarded, isLoading } = useProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isOnboarded && pathname !== "/onboarding") {
      router.push("/onboarding");
    }
  }, [isOnboarded, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-8 w-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!isOnboarded && pathname !== "/onboarding") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-20 md:ml-64 transition-all duration-300 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ProfileProvider>
  );
}

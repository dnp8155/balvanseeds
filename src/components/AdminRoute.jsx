import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

/**
 * Gates a route for admin users only. If the visitor is not authenticated,
 * redirects to the platform login; if authenticated but not an admin, shows
 * a "not authorized" message instead of the protected content.
 */
export default function AdminRoute({ children }) {
  const { isAuthenticated, isLoadingAuth, authChecked, user, authError, checkUserAuth, navigateToLogin } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) checkUserAuth();
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  useEffect(() => {
    if (authChecked && !isLoadingAuth && (authError || !isAuthenticated)) {
      navigateToLogin();
    }
  }, [authChecked, isLoadingAuth, authError, isAuthenticated, navigateToLogin]);

  if (isLoadingAuth || !authChecked) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (authError || !isAuthenticated) {
    return null;
  }

  if (user?.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-400 text-foreground">Access restricted</h1>
        <p className="mt-3 text-sm text-muted-foreground">This area is for administrators only.</p>
      </div>
    );
  }

  return children;
}
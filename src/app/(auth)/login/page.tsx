import { Suspense } from "react";
import LoginPage from "./LoginContent";

function LoginFallback() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900">
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-pulse h-96 w-full max-w-md bg-white/10 rounded-2xl" />
            </div>
        </div>
    );
}

export default function LoginPageWrapper() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <LoginPage />
        </Suspense>
    );
}

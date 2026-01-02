import { Suspense } from "react";
import SignupPage from "./SignupContent";

function SignupFallback() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900">
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-pulse h-[500px] w-full max-w-md bg-white/10 rounded-2xl" />
            </div>
        </div>
    );
}

export default function SignupPageWrapper() {
    return (
        <Suspense fallback={<SignupFallback />}>
            <SignupPage />
        </Suspense>
    );
}

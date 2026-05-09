import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Wallet } from "lucide-react";

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Wallet className="h-8 w-8" aria-hidden="true" />
            <span className="text-2xl font-bold">FinanceTracker</span>
          </div>
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
            <div className="px-6">
              <div className="font-semibold text-2xl">Login</div>
              <div className="text-muted-foreground text-sm mt-1">Enter your email below to login to your account</div>
            </div>
            <div className="px-6">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <label
                      className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <label
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground">
                        Forgot your password?
                      </a>
                    </div>
                    <input
                      type="password"
                      id="password"
                      className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="px-6 pb-2 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="underline underline-offset-4 hover:text-foreground">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

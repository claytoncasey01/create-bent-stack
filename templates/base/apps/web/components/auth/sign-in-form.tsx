"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export type SignInState = {
  error?: string;
  success?: boolean;
};

type SignInAction = (
  prevState: SignInState,
  formData: FormData
) => Promise<SignInState>;

export function SignInForm({
  redirectTo,
  action,
}: {
  redirectTo?: string;
  action: SignInAction;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<SignInState, FormData>(
    action,
    {}
  );

  useEffect(() => {
    if (state.success) {
      router.push(redirectTo || "/dashboard");
    }
  }, [state.success, redirectTo, router]);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {state.error}
        </div>
      )}

      <input type="hidden" name="redirect" value={redirectTo || ""} />

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
          required
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}

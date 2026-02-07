import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
import { signInAction } from "./actions";

type SearchParams = Promise<{ redirect?: string }>;

export default async function SignInPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { redirect } = await searchParams;

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <SignInForm redirectTo={redirect} action={signInAction} />

      <p className="px-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="underline underline-offset-4 hover:text-primary transition-colors"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}

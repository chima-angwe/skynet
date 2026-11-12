import { useState, type FormEvent } from "react";
import styles from "./AuthPage.module.css";
type Mode = "signin" | "signup" | "reset";
type Props = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onComplete: () => void;
};
export function AuthPage({ mode, onModeChange, onComplete }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (mode !== "reset") onComplete();
  };
  const title =
    mode === "signup"
      ? "Create your account"
      : mode === "reset"
        ? "Reset your password"
        : "Welcome back";
  const caption =
    mode === "signup"
      ? "Start building on infrastructure that scales with you."
      : mode === "reset"
        ? "Enter the email linked to your account and we’ll send a reset link."
        : "Sign in to manage your infrastructure.";
  return (
    <main className={styles.auth}>
      <section className={styles.story}>
        <div className={styles.brand}>
          <img src="/skynet-logo.png" alt="Skynet" />
        </div>
        <div className={styles.storyBody}>
          <div className={styles.kicker}>
            <i /> BUILT FOR WHAT’S NEXT
          </div>
          <h1>
            Infrastructure
            <br />
            should feel
            <br />
            <em>effortless.</em>
          </h1>
          <p>
            Compute, domains and developer tools, together in one considered
            platform.
          </p>
         
        </div>
        <div className={styles.orbit}>
          <i />
          <i />
          <i />
          <b />
        </div>
        <div className={styles.sideNote}>
          SKYNET CLOUD PLATFORM <span>·</span> EST. 2025
        </div>
      </section>
      <section className={styles.formSide}>
        <div className={styles.topLinks}>
          <span>
            {mode === "signin" ? "New to Skynet?" : "Already a customer?"}
          </span>
          <button
            onClick={() =>
              onModeChange(mode === "signin" ? "signup" : "signin")
            }
          >
            {mode === "signin" ? "Create account" : "Sign in"} <span>↗</span>
          </button>
        </div>
        <div className={styles.formWrap}>
          <h2>
            {title}
            <span>.</span>
          </h2>
          <p className={styles.caption}>{caption}</p>
          {mode === "reset" && submitted ? (
            <div className={styles.success}>
              <b>Check your inbox.</b>
              <span>
                If an account exists for that email, you’ll receive a password
                reset link shortly.
              </span>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onModeChange("signin");
                }}
              >
                Back to sign in →
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              {mode === "signup" && (
                <label>
                  Full name
                  <input autoComplete="name" placeholder="Jane Doe" required />
                </label>
              )}
              <label>
                Work email
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                />
              </label>
              {mode !== "reset" && (
                <label>
                  Password
                  <span className={styles.password}>
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete={
                        mode === "signin" ? "current-password" : "new-password"
                      }
                      placeholder={
                        mode === "signup"
                          ? "At least 8 characters"
                          : "Enter your password"
                      }
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </label>
              )}
              {mode === "signin" && (
                <div className={styles.formOptions}>
                  <label className={styles.remember}>
                    <input type="checkbox" /> Keep me signed in
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      onModeChange("reset");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              {mode === "signup" && (
                <label className={styles.terms}>
                  <input type="checkbox" required />{" "}
                  <span>
                    I agree to the <a href="#terms">Terms of Service</a> and{" "}
                    <a href="#privacy">Privacy Policy</a>.
                  </span>
                </label>
              )}
              <button className={styles.submit} type="submit">
                {mode === "reset"
                  ? "Send reset link"
                  : mode === "signup"
                    ? "Create account"
                    : "Sign in"}{" "}
                <span>→</span>
              </button>
              {submitted && mode === "reset" && (
                <small className={styles.validation}>
                  Enter a valid email address to continue.
                </small>
              )}
            </form>
          )}
          {mode !== "reset" && (
            <div className={styles.switch}>
              {mode === "signin" ? (
                <>
                  New to Skynet?{" "}
                  <button onClick={() => onModeChange("signup")}>
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => onModeChange("signin")}>
                    Sign in
                  </button>
                </>
              )}
            </div>
          )}
          <div className={styles.security}>
            <span>⌑</span> Your connection is encrypted and secure.
          </div>
        </div>
        <footer className={styles.footer}>
          <span>© 2026 Skynet Africa</span>
          <div>
            <a href="#help">Help center</a>
            <a href="#status">
              System status <i />
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}

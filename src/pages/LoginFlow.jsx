import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/1pass_logo.jpg";
import * as PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const PhoneInput = PhoneInputModule.default || PhoneInputModule;

// ─── Brand tokens (matches dashboard) ───────────────────────────────────────
const BRAND = "#1B3631";
const BRAND_LIGHT = "#e8f0ee";
const GRAY_50 = "#f7f8f9";
const GRAY_100 = "#f0f2f4";
const GRAY_200 = "#e3e5e8";
const GRAY_400 = "#9da2ab";
const GRAY_500 = "#6b7280";
const GRAY_600 = "#4b5563";
const GRAY_700 = "#374151";
const GRAY_800 = "#1f2937";
const WHITE = "#ffffff";
const RED_TEXT = "#991b1b";
const RED_BG = "#fef2f2";
const GREEN_BG = "#ecfdf5";
const GREEN_TEXT = "#065f46";

// ─── Shared card wrapper ─────────────────────────────────────────────────────
function Card({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: GRAY_50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        padding: "24px",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        input:focus { outline: none; }
        button:focus { outline: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-6px); }
          40%     { transform: translateX(6px); }
          60%     { transform: translateX(-4px); }
          80%     { transform: translateX(4px); }
        }
        .shake { animation: shake 0.4s ease; }
        .card-anim { animation: fadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>
      <div
        className="card-anim"
        style={{
          background: WHITE,
          borderRadius: 18,
          padding: "48px 44px 44px",
          width: "100%",
          maxWidth: 440,
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.06), 0 24px 60px -8px rgba(27,54,49,0.12)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Logo ────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}
    >
      <img
        src={logo}
        alt="1Pass"
        style={{
          width: 80,
          height: 80,
          objectFit: "contain",
          borderRadius: 14,
        }}
      />
    </div>
  );
}

// ─── STEP 1 — Phone Number ───────────────────────────────────────────────────
// function PhoneStep({ onNext }) {
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [shake, setShake] = useState(false);
//   const [focused, setFocused] = useState(false);

//   function handleSend() {
//     const cleaned = phone.replace(/\D/g, "");
//     if (cleaned.length !== 10) {
//       setError("Please enter a valid 10-digit mobile number.");
//       setShake(true);
//       setTimeout(() => setShake(false), 400);
//       return;
//     }
//     setError("");
//     setLoading(true);
//     // Simulate OTP send (replace with real API call)
//     setTimeout(() => {
//       setLoading(false);
//       onNext(cleaned);
//     }, 1200);
//   }

//   return (
//     <Card>
//       <Logo />
//       <h1
//         style={{
//           fontFamily: "system-ui, -apple-system, sans-serif",
//           fontSize: 28,
//           fontWeight: 400,
//           color: GRAY_800,
//           textAlign: "center",
//           margin: "0 0 8px",
//           letterSpacing: "-0.3px",
//         }}
//       >
//         Welcome Back
//       </h1>
//       <p
//         style={{
//           fontSize: 14,
//           color: GRAY_500,
//           textAlign: "center",
//           margin: "0 0 32px",
//           lineHeight: 1.5,
//         }}
//       >
//         Sign in to your 1Pass account to continue
//       </p>

//       <div style={{ marginBottom: 20 }}>
//         <label
//           style={{
//             display: "block",
//             fontSize: 13,
//             fontWeight: 600,
//             color: GRAY_700,
//             marginBottom: 8,
//           }}
//         >
//           Mobile Number
//         </label>
//         <div
//           className={shake ? "shake" : ""}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             border: `1.5px solid ${error ? "#fca5a5" : focused ? BRAND : GRAY_200}`,
//             borderRadius: 10,
//             overflow: "hidden",
//             background: error ? RED_BG : WHITE,
//             transition: "border-color 0.2s",
//           }}
//         >
//           {/* Country code */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 6,
//               padding: "0 14px",
//               borderRight: "1.5px solid " + (error ? "#fca5a5" : GRAY_200),
//               height: 48,
//               flexShrink: 0,
//             }}
//           >
//             <span style={{ fontSize: 18 }}>🇮🇳</span>
//             <span style={{ fontSize: 13, fontWeight: 600, color: GRAY_700 }}>
//               +91
//             </span>
//           </div>
//           <input
//             type="tel"
//             maxLength={10}
//             value={phone}
//             onChange={(e) => {
//               setPhone(e.target.value.replace(/\D/g, ""));
//               setError("");
//             }}
//             onFocus={() => setFocused(true)}
//             onBlur={() => setFocused(false)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Enter your mobile number"
//             style={{
//               flex: 1,
//               height: 48,
//               padding: "0 16px",
//               border: "none",
//               fontSize: 15,
//               color: GRAY_800,
//               background: "transparent",
//               fontFamily: "inherit",
//               letterSpacing: "0.5px",
//             }}
//           />
//         </div>
//         {error && (
//           <p
//             style={{
//               fontSize: 12,
//               color: RED_TEXT,
//               margin: "6px 0 0",
//               display: "flex",
//               alignItems: "center",
//               gap: 4,
//             }}
//           >
//             <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//               <circle cx="6" cy="6" r="5.5" stroke={RED_TEXT} />
//               <path
//                 d="M6 3.5V6.5M6 8.5V8.6"
//                 stroke={RED_TEXT}
//                 strokeWidth="1.3"
//                 strokeLinecap="round"
//               />
//             </svg>
//             {error}
//           </p>
//         )}
//       </div>

//       <p
//         style={{
//           fontSize: 12,
//           color: GRAY_400,
//           textAlign: "center",
//           margin: "0 0 20px",
//           lineHeight: 1.5,
//         }}
//       >
//         We'll send a one-time password to this number for verification.
//       </p>

//       <button
//         onClick={handleSend}
//         disabled={loading}
//         style={{
//           width: "100%",
//           height: 50,
//           borderRadius: 10,
//           border: "none",
//           background: loading ? GRAY_400 : BRAND,
//           color: WHITE,
//           fontSize: 15,
//           fontWeight: 600,
//           cursor: loading ? "not-allowed" : "pointer",
//           fontFamily: "inherit",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 8,
//           transition: "background 0.2s, transform 0.1s",
//         }}
//         onMouseEnter={(e) =>
//           !loading && (e.currentTarget.style.background = "#142b27")
//         }
//         onMouseLeave={(e) =>
//           !loading && (e.currentTarget.style.background = BRAND)
//         }
//         onMouseDown={(e) =>
//           !loading && (e.currentTarget.style.transform = "scale(0.98)")
//         }
//         onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
//       >
//         {loading ? (
//           <>
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               style={{ animation: "spin 0.8s linear infinite" }}
//             >
//               <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//               <circle
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="rgba(255,255,255,0.3)"
//                 strokeWidth="2.5"
//               />
//               <path
//                 d="M12 2a10 10 0 0 1 10 10"
//                 stroke="white"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//               />
//             </svg>
//             Sending OTP…
//           </>
//         ) : (
//           <>
//             Send OTP <span style={{ fontSize: 18 }}>→</span>
//           </>
//         )}
//       </button>

//       <p
//         style={{
//           fontSize: 12,
//           color: GRAY_400,
//           textAlign: "center",
//           margin: "20px 0 0",
//           lineHeight: 1.6,
//         }}
//       >
//         By continuing, you agree to 1Pass's{" "}
//         <span style={{ color: BRAND, fontWeight: 600, cursor: "pointer" }}>
//           Terms of Service
//         </span>{" "}
//         and{" "}
//         <span style={{ color: BRAND, fontWeight: 600, cursor: "pointer" }}>
//           Privacy Policy
//         </span>
//         .
//       </p>
//     </Card>
//   );
// }

function PhoneStep({ onNext }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSend() {
    // Remove country code (91) — get last 10 digits
    const local = phone.replace(/^91/, "");
    if (local.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext(local);
    }, 1200);
  }

  return (
    <Card>
      <Logo />
      <h1
        style={{
          fontSize: 28,
          fontWeight: 400,
          color: GRAY_800,
          textAlign: "center",
          margin: "0 0 8px",
          letterSpacing: "-0.3px",
        }}
      >
        Welcome Back
      </h1>
      <p
        style={{
          fontSize: 14,
          color: GRAY_500,
          textAlign: "center",
          margin: "0 0 32px",
          lineHeight: 1.5,
        }}
      >
        Sign in to your 1Pass account to continue
      </p>

      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            color: GRAY_700,
            marginBottom: 8,
          }}
        >
          Mobile Number
        </label>

        {/* ── PhoneInput ── */}
        <div className={shake ? "shake" : ""}>
          <style>{`
            .phone-input-container .react-tel-input .form-control {
              width: 100% !important;
              height: 48px !important;
              font-size: 15px !important;
              border: 1.5px solid ${error ? "#fca5a5" : GRAY_200} !important;
              border-radius: 10px !important;
              padding-left: 52px !important;
              font-family: inherit !important;
              color: ${GRAY_800} !important;
              background: ${error ? RED_BG : WHITE} !important;
            }
            .phone-input-container .react-tel-input .form-control:focus {
              border-color: ${BRAND} !important;
              box-shadow: none !important;
              outline: none !important;
            }
            .phone-input-container .react-tel-input .flag-dropdown {
              border: 1.5px solid ${error ? "#fca5a5" : GRAY_200} !important;
              border-right: none !important;
              border-radius: 10px 0 0 10px !important;
              background: ${WHITE} !important;
            }
            .phone-input-container .react-tel-input .flag-dropdown.open {
              border-radius: 10px 0 0 10px !important;
            }
            .phone-input-container .react-tel-input .selected-flag {
              border-radius: 10px 0 0 10px !important;
              padding: 0 8px 0 12px !important;
            }
            .phone-input-container .react-tel-input .country-list {
              border-radius: 10px !important;
              box-shadow: 0 8px 30px rgba(0,0,0,0.12) !important;
              border: 1px solid ${GRAY_200} !important;
              margin-top: 4px !important;
            }
            .phone-input-container .react-tel-input .country-list .country.highlight,
            .phone-input-container .react-tel-input .country-list .country:hover {
              background: ${BRAND_LIGHT} !important;
            }
          `}</style>
          <div className="phone-input-container">
            <PhoneInput.default
              country="in"
              value={phone}
              onChange={(val) => {
                setPhone(val);
                setError("");
              }}
              placeholder="Enter your mobile number"
              enableSearch
              searchPlaceholder="Search country..."
              preferredCountries={["in", "us", "gb", "ae", "sg"]}
            />
          </div>
        </div>

        {error && (
          <p
            style={{
              fontSize: 12,
              color: RED_TEXT,
              margin: "6px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.5" stroke={RED_TEXT} />
              <path
                d="M6 3.5V6.5M6 8.5V8.6"
                stroke={RED_TEXT}
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            {error}
          </p>
        )}
      </div>

      <p
        style={{
          fontSize: 12,
          color: GRAY_400,
          textAlign: "center",
          margin: "0 0 20px",
          lineHeight: 1.5,
        }}
      >
        We'll send a one-time password to this number for verification.
      </p>

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          border: "none",
          background: loading ? GRAY_400 : BRAND,
          color: WHITE,
          fontSize: 15,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          !loading && (e.currentTarget.style.background = "#142b27")
        }
        onMouseLeave={(e) =>
          !loading && (e.currentTarget.style.background = BRAND)
        }
      >
        {loading ? (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2.5"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Sending OTP…
          </>
        ) : (
          <>
            Send OTP <span style={{ fontSize: 18 }}>→</span>
          </>
        )}
      </button>

      <p
        style={{
          fontSize: 12,
          color: GRAY_400,
          textAlign: "center",
          margin: "20px 0 0",
          lineHeight: 1.6,
        }}
      >
        By continuing, you agree to 1Pass's{" "}
        <span style={{ color: BRAND, fontWeight: 600, cursor: "pointer" }}>
          Terms of Service
        </span>{" "}
        and{" "}
        <span style={{ color: BRAND, fontWeight: 600, cursor: "pointer" }}>
          Privacy Policy
        </span>
        .
      </p>
    </Card>
  );
}

// ─── STEP 2 — OTP Verification ──────────────────────────────────────────────
function OTPStep({ phone, onVerified, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer === 0) return;
    const t = setTimeout(() => setResendTimer((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  function handleChange(i, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError("");
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(""));
      inputRefs.current[5]?.focus();
    }
  }

  function handleVerify() {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setLoading(true);
    // Simulate OTP verify — accepts "123456" or any 6-digit for demo
    setTimeout(() => {
      setLoading(false);
      if (code === "123456" || code.length === 6) {
        setSuccess(true);
        setTimeout(() => onVerified(), 800);
      } else {
        setError("Invalid OTP. Please try again.");
        setShake(true);
        setTimeout(() => setShake(false), 400);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }, 1000);
  }

  return (
    <Card>
      <Logo />
      <h1
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 28,
          fontWeight: 400,
          color: GRAY_800,
          textAlign: "center",
          margin: "0 0 8px",
          letterSpacing: "-0.3px",
        }}
      >
        Verify your number
      </h1>
      <p
        style={{
          fontSize: 14,
          color: GRAY_500,
          textAlign: "center",
          margin: "0 0 6px",
          lineHeight: 1.5,
        }}
      >
        Enter the 6-digit OTP sent to
      </p>
      <p
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: BRAND,
          textAlign: "center",
          margin: "0 0 32px",
          letterSpacing: "0.5px",
        }}
      >
        +91 {phone.slice(0, 5)} {phone.slice(5)}
      </p>

      {/* OTP boxes */}
      <div
        className={shake ? "shake" : ""}
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginBottom: 8,
        }}
        onPaste={handlePaste}
      >
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            style={{
              width: 52,
              height: 58,
              textAlign: "center",
              fontSize: 22,
              fontWeight: 700,
              borderRadius: 10,
              border: `2px solid ${
                success ? "#6ee7b7" : error ? "#fca5a5" : GRAY_200
              }`,
              background: success ? GREEN_BG : error ? RED_BG : WHITE,
              color: success ? GREEN_TEXT : BRAND,
              fontFamily: "system-ui, -apple-system, sans-serif",
              transition: "all 0.15s",
              caretColor: BRAND,
            }}
          />
        ))}
      </div>

      {error && (
        <p
          style={{
            fontSize: 12,
            color: RED_TEXT,
            textAlign: "center",
            margin: "4px 0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" stroke={RED_TEXT} />
            <path
              d="M6 3.5V6.5M6 8.5V8.6"
              stroke={RED_TEXT}
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            fontSize: 13,
            color: GREEN_TEXT,
            fontWeight: 600,
            textAlign: "center",
            margin: "4px 0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="7"
              fill={GREEN_BG}
              stroke="#6ee7b7"
              strokeWidth="1.5"
            />
            <path
              d="M4.5 8.5L6.8 10.8L11.5 5.5"
              stroke={GREEN_TEXT}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Verified! Redirecting…
        </p>
      )}

      {!error && !success && (
        <p
          style={{
            fontSize: 12,
            color: GRAY_400,
            textAlign: "center",
            margin: "4px 0 16px",
          }}
        >
          Enter the OTP to verify your identity
        </p>
      )}

      <button
        onClick={handleVerify}
        disabled={loading || success}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          border: "none",
          background: success ? GREEN_TEXT : loading ? GRAY_400 : BRAND,
          color: WHITE,
          fontSize: 15,
          fontWeight: 600,
          cursor: loading || success ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "background 0.2s",
          marginBottom: 16,
        }}
        onMouseEnter={(e) =>
          !loading && !success && (e.currentTarget.style.background = "#142b27")
        }
        onMouseLeave={(e) =>
          !loading && !success && (e.currentTarget.style.background = BRAND)
        }
      >
        {loading ? (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2.5"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Verifying…
          </>
        ) : success ? (
          "✓ Verified"
        ) : (
          "Verify OTP"
        )}
      </button>

      {/* Resend + Back */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: GRAY_500,
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: 0,
          }}
        >
          <span style={{ fontSize: 16 }}>←</span> Change number
        </button>
        {resendTimer > 0 ? (
          <span style={{ fontSize: 13, color: GRAY_400 }}>
            Resend in{" "}
            <strong style={{ color: GRAY_600 }}>{resendTimer}s</strong>
          </span>
        ) : (
          <button
            onClick={() => setResendTimer(30)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              color: BRAND,
              fontWeight: 600,
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Demo hint */}
      <div
        style={{
          marginTop: 20,
          padding: "10px 14px",
          borderRadius: 8,
          background: GRAY_50,
          border: "1px solid " + GRAY_200,
          fontSize: 12,
          color: GRAY_500,
          textAlign: "center",
        }}
      >
        🔐 Demo: enter any 6-digit OTP to sign in
      </div>
    </Card>
  );
}

// ─── Main App — orchestrates the flow ───────────────────────────────────────
export default function LoginFlow() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");

  if (step === "phone") {
    return (
      <PhoneStep
        onNext={(p) => {
          setPhone(p);
          setStep("otp");
        }}
      />
    );
  }

  if (step === "otp") {
    return (
      <OTPStep
        phone={phone}
        onVerified={() => {
          login(phone);
          navigate("/dashboard");
        }}
        onBack={() => setStep("phone")}
      />
    );
  }

  // Dashboard placeholder — swap this import with your actual Dashboard component
  return (
    <DashboardPlaceholder phone={phone} onLogout={() => setStep("phone")} />
  );
}

// ─── Dashboard placeholder (replace with your real Dashboard) ───────────────
function DashboardPlaceholder({ phone, onLogout }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: GRAY_50,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Topbar */}
      <div
        style={{
          background: WHITE,
          borderBottom: "1px solid " + GRAY_200,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              background: BRAND,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 2L4 8V15C4 22.18 9.12 28.88 16 31C22.88 28.88 28 22.18 28 15V8L16 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 16.5L14.4 19.9L21 12.6"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: BRAND }}>
            1Pass
          </span>
          <span style={{ fontSize: 12, color: GRAY_400, marginLeft: 2 }}>
            Data Principal Dashboard
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, color: GRAY_500 }}>
            +91 {phone.slice(0, 5)} {phone.slice(5)}
          </span>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: BRAND_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: BRAND,
            }}
          >
            U
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "1px solid " + GRAY_200,
              background: WHITE,
              fontSize: 13,
              fontWeight: 600,
              color: GRAY_600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Success banner */}
      <div
        style={{
          maxWidth: 600,
          margin: "80px auto",
          textAlign: "center",
          animation: "fadeUp 0.4s ease both",
        }}
      >
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }`}</style>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: GREEN_BG,
            border: "2px solid #6ee7b7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 32,
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 32,
            fontWeight: 400,
            color: GRAY_800,
            margin: "0 0 12px",
          }}
        >
          You're signed in!
        </h2>
        <p style={{ fontSize: 15, color: GRAY_500, lineHeight: 1.6 }}>
          Your 1Pass Data Principal Dashboard is ready.
          <br />
          Replace this screen with your full dashboard component.
        </p>
        <div
          style={{
            marginTop: 32,
            padding: "16px 24px",
            borderRadius: 12,
            background: WHITE,
            border: "1px solid " + GRAY_200,
            fontSize: 13,
            color: GRAY_600,
            display: "inline-block",
            textAlign: "left",
          }}
        >
          <div style={{ fontWeight: 600, color: GRAY_800, marginBottom: 6 }}>
            🔗 Next step
          </div>
          Import your{" "}
          <code
            style={{
              background: GRAY_100,
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            Dashboard
          </code>{" "}
          component and replace{" "}
          <code
            style={{
              background: GRAY_100,
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            DashboardPlaceholder
          </code>{" "}
          in{" "}
          <code
            style={{
              background: GRAY_100,
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            LoginFlow.jsx
          </code>
          .
        </div>
      </div>
    </div>
  );
}

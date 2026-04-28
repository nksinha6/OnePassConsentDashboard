import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/1pass_logo.jpg";

const BRAND = "#1B3631";
const BRAND_LIGHTER = "#e8f0ee";
const GRAY_50 = "#f7f8f9";
const GRAY_200 = "#e3e5e8";
const GRAY_400 = "#9da2ab";
const GRAY_500 = "#6b7280";
const GRAY_600 = "#4b5563";
const WHITE = "#ffffff";

export default function AppLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: WHITE,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Sticky Header ── */}
      <div
        style={{
          background: WHITE,
          borderBottom: "1px solid " + GRAY_200,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            padding: "14px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={logo}
              alt="1Pass"
              style={{
                width: 32,
                height: 32,
                objectFit: "contain",
                borderRadius: 6,
              }}
            />
            <span style={{ fontSize: 15, fontWeight: 700, color: BRAND }}>
              1Pass
            </span>
            <span
              style={{
                fontSize: 12,
                color: GRAY_400,
                fontWeight: 500,
                marginLeft: 2,
              }}
            >
              Data Principal Dashboard
            </span>
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 13, color: GRAY_500 }}>Ravi Kumar</span>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: BRAND_LIGHTER,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: BRAND,
              }}
            >
              RK
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: "1px solid " + GRAY_200,
                background: WHITE,
                color: GRAY_600,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GRAY_50)}
              onMouseLeave={(e) => (e.currentTarget.style.background = WHITE)}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M11 11l3-3-3-3M14 8H6"
                  stroke={GRAY_600}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div style={{ flex: 1, padding: "0 32px", background: WHITE }}>
        <Outlet />
      </div>
    </div>
  );
}

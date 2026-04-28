import { useState } from "react";

const BRAND = "#1B3631";
const BRAND_LIGHTER = "#e8f0ee";
const GRAY_50 = "#f7f8f9";
const GRAY_100 = "#f0f2f4";
const GRAY_200 = "#e3e5e8";
const GRAY_300 = "#d0d3d8";
const GRAY_400 = "#9da2ab";
const GRAY_500 = "#6b7280";
const GRAY_600 = "#4b5563";
const GRAY_700 = "#374151";
const GRAY_800 = "#1f2937";
const WHITE = "#ffffff";
const GREEN_BG = "#ecfdf5";
const GREEN_TEXT = "#065f46";
const YELLOW_BG = "#fffbeb";
const YELLOW_TEXT = "#92400e";
const RED_BG = "#fef2f2";
const RED_TEXT = "#991b1b";
const ORANGE_BG = "#fff7ed";
const ORANGE_TEXT = "#9a3412";
const BLUE_BG = "#eff6ff";
const BLUE_TEXT = "#1e40af";

const DPO_CONTACT = "dpo@1pass.in";
const DPO_PHONE = "+91-22-6650-1234";
const BOARD_INFO =
  "If your grievance is not resolved by the Data Fiduciary, you may file a complaint with the Data Protection Board of India as established under Section 18 of the DPDP Act, 2023. Complaints can be filed through the Board\u2019s digital office.";
const WITHDRAWAL_HOW =
  "Log in to this dashboard using the phone number or email you provided during check-in. Navigate to Consents, select the purpose you wish to withdraw, and tap Withdraw consent. Withdrawal takes effect immediately per Section 6(6).";
const GRIEVANCE_HOW =
  "Navigate to Grievances and data requests in this dashboard and submit a complaint. You will receive a unique reference number. The Data Fiduciary will respond within the prescribed period. If unresolved, you may escalate to the Data Protection Board of India.";

const CONSENTS = [
  {
    id: "CNS-001",
    purposeId: "PUR-KYC-001",
    purpose: "Identity Verification (KYC)",
    description:
      "Identity verification for check-in as required under applicable law.",
    dataCategories: [
      "Full name",
      "Date of birth",
      "Gender",
      "Nationality",
      "Government ID",
      "Photograph",
      "Phone",
      "Email",
    ],
    status: "Active",
    dateGranted: "2025-03-14",
    lastUpdated: "2025-03-14",
    expiryDate: "2026-03-14",
    processors: [
      {
        name: "Taj Lands End, Mumbai",
        role: "Property-level identity verification",
      },
      {
        name: "1Pass by Authiko",
        role: "Digital identity verification platform",
      },
    ],
    noticeVersion: "v1.1",
    noticeLanguage: "English",
    consentMethod: "Toggle + Confirm button",
    noticeText:
      "We collect your identity documents and personal details solely for KYC verification as mandated by RBI. Data retained for duration of stay plus 5 years.",
    withdrawalConsequences:
      "Withdrawing KYC consent will prevent completion of check-in. If withdrawn during stay, the property may terminate your reservation.",
    erasurePolicy:
      "Data erased 5 years after checkout or upon withdrawal, whichever is later, unless retention is required by law.",
    usedForDecisions: true,
    decisionDisclosure:
      "Used to verify identity and determine eligibility for check-in.",
    sharedWithOtherFiduciaries: false,
    fiduciaryDisclosure: null,
    blockedForMinors: false,
    rightsInfo:
      "You may access, correct, or erase your personal data via this dashboard. You may also file a complaint with the Data Protection Board of India.",
    dpoContact: DPO_CONTACT,
    dpoPhone: DPO_PHONE,
  },
  {
    id: "CNS-002",
    purposeId: "PUR-STAY-001",
    purpose: "Stay and Service Fulfilment",
    description:
      "Managing reservation, room assignment, billing, and in-stay service requests.",
    dataCategories: [
      "Full name",
      "Phone",
      "Email",
      "Stay dates",
      "Room preferences",
    ],
    status: "Active",
    dateGranted: "2025-03-14",
    lastUpdated: "2025-03-14",
    expiryDate: null,
    processors: [
      {
        name: "Taj Lands End, Mumbai",
        role: "Property management and billing",
      },
      { name: "IHCL (Tata Group)", role: "Central reservation system" },
    ],
    noticeVersion: "v1.1",
    noticeLanguage: "English",
    consentMethod: "Toggle + Confirm button",
    noticeText:
      "We use your contact details and preferences to manage your reservation, room assignment, billing, and in-stay service requests.",
    withdrawalConsequences:
      "Withdrawing will prevent the property from managing your reservation and billing. This may result in termination of your stay.",
    erasurePolicy:
      "Data erased 3 years after checkout or upon withdrawal, whichever is earlier, unless required for legal or financial compliance.",
    usedForDecisions: true,
    decisionDisclosure:
      "Used to manage your reservation and provide in-stay services.",
    sharedWithOtherFiduciaries: true,
    fiduciaryDisclosure:
      "Stay data shared with IHCL (Tata Group) for central reservation management.",
    blockedForMinors: false,
    rightsInfo:
      "You may access, correct, or erase your personal data via this dashboard. You may also file a complaint with the Data Protection Board of India.",
    dpoContact: DPO_CONTACT,
    dpoPhone: DPO_PHONE,
  },
  {
    id: "CNS-003",
    purposeId: "PUR-MKT-001",
    purpose: "Marketing Communications",
    description:
      "Promotional emails, SMS, and push notifications about offers and partner deals.",
    dataCategories: ["Full name", "Phone", "Email"],
    status: "Active",
    dateGranted: "2025-03-14",
    lastUpdated: "2025-06-20",
    expiryDate: null,
    processors: [
      { name: "IHCL (Tata Group)", role: "Marketing communications" },
    ],
    noticeVersion: "v1.1",
    noticeLanguage: "English",
    consentMethod: "Toggle + Confirm button",
    noticeText:
      "We may send you offers, loyalty updates, and promotional messages via email, SMS, or push notifications.",
    withdrawalConsequences:
      "You will stop receiving promotional communications. Your stay and account will not be affected.",
    erasurePolicy: "Marketing data erased immediately upon consent withdrawal.",
    usedForDecisions: false,
    decisionDisclosure: null,
    sharedWithOtherFiduciaries: false,
    fiduciaryDisclosure: null,
    blockedForMinors: true,
    rightsInfo:
      "You may access, correct, or erase your personal data via this dashboard. You may also file a complaint with the Data Protection Board of India.",
    dpoContact: DPO_CONTACT,
    dpoPhone: DPO_PHONE,
  },
  {
    id: "CNS-004",
    purposeId: "PUR-LYL-001",
    purpose: "Loyalty Programme",
    description:
      "Processing stay data to assign loyalty tier benefits and personalised rewards.",
    dataCategories: ["Full name", "Email", "Stay history"],
    status: "Withdrawn",
    dateGranted: "2025-03-14",
    lastUpdated: "2025-09-08",
    expiryDate: null,
    withdrawnDate: "2025-09-08",
    processors: [
      { name: "IHCL (Tata Group)", role: "Loyalty programme management" },
    ],
    noticeVersion: "v1.1",
    noticeLanguage: "English",
    consentMethod: "Toggle + Confirm button",
    noticeText:
      "We may enrol you in our loyalty programme and process stay data to assign tier benefits and personalised rewards.",
    withdrawalConsequences:
      "You will not be enrolled in the loyalty programme. Existing points and tier status retained.",
    erasurePolicy:
      "Loyalty data erased upon consent withdrawal or account closure, whichever is earlier.",
    usedForDecisions: true,
    decisionDisclosure:
      "Stay history may be used to determine loyalty tier and personalised offers.",
    sharedWithOtherFiduciaries: false,
    fiduciaryDisclosure: null,
    blockedForMinors: true,
    rightsInfo:
      "You may access, correct, or erase your personal data via this dashboard. You may also file a complaint with the Data Protection Board of India.",
    dpoContact: DPO_CONTACT,
    dpoPhone: DPO_PHONE,
  },
  {
    id: "CNS-005",
    purposeId: "PUR-FRD-001",
    purpose: "Fraud Detection and Prevention",
    description:
      "Real-time monitoring of transactions and device signals to detect fraudulent activity.",
    dataCategories: [
      "Device fingerprint",
      "IP address",
      "Transaction patterns",
      "Login timestamps",
    ],
    status: "Active",
    dateGranted: "2025-03-14",
    lastUpdated: "2026-01-10",
    expiryDate: null,
    processors: [
      { name: "Internal security team", role: "Fraud monitoring" },
      { name: "Bureau.id", role: "Device intelligence" },
    ],
    noticeVersion: "v2.0",
    noticeLanguage: "English",
    consentMethod: "Toggle + Confirm button",
    noticeText:
      "We collect device and network signals alongside transaction patterns to detect and prevent unauthorised access and fraudulent activity.",
    withdrawalConsequences:
      "Security protections may be reduced. Transaction processing may be delayed.",
    erasurePolicy:
      "Fraud detection data erased upon consent withdrawal, subject to any ongoing investigation or legal hold.",
    usedForDecisions: true,
    decisionDisclosure:
      "Used in automated systems to flag and block potentially fraudulent transactions.",
    sharedWithOtherFiduciaries: false,
    fiduciaryDisclosure: null,
    blockedForMinors: false,
    reconsentRequired: true,
    reconsentReason:
      "Notice updated on 10 Jan 2026: new processor (Bureau.id) added. Per DPDP Act Section 5(1), you must review and re-consent.",
    rightsInfo:
      "You may access, correct, or erase your personal data via this dashboard. You may also file a complaint with the Data Protection Board of India.",
    dpoContact: DPO_CONTACT,
    dpoPhone: DPO_PHONE,
  },
];

const AUDIT_LOGS = [
  {
    logId: "LOG-0001",
    purposeId: "PUR-KYC-001",
    actionType: "Consent granted",
    timestamp: "2025-03-14T09:12:33Z",
    consentStatus: "Active",
    initiator: "Data Principal",
    method: "Toggle + Confirm",
  },
  {
    logId: "LOG-0002",
    purposeId: "PUR-STAY-001",
    actionType: "Consent granted",
    timestamp: "2025-03-14T09:12:33Z",
    consentStatus: "Active",
    initiator: "Data Principal",
    method: "Toggle + Confirm",
  },
  {
    logId: "LOG-0003",
    purposeId: "PUR-MKT-001",
    actionType: "Consent granted",
    timestamp: "2025-03-14T09:12:45Z",
    consentStatus: "Active",
    initiator: "Data Principal",
    method: "Toggle + Confirm",
  },
  {
    logId: "LOG-0004",
    purposeId: "PUR-LYL-001",
    actionType: "Consent granted",
    timestamp: "2025-03-14T09:13:02Z",
    consentStatus: "Active",
    initiator: "Data Principal",
    method: "Toggle + Confirm",
  },
  {
    logId: "LOG-0005",
    purposeId: "PUR-FRD-001",
    actionType: "Consent granted",
    timestamp: "2025-03-14T09:13:15Z",
    consentStatus: "Active",
    initiator: "Data Principal",
    method: "Toggle + Confirm",
  },
  {
    logId: "LOG-0006",
    purposeId: "PUR-MKT-001",
    actionType: "Consent updated",
    timestamp: "2025-06-20T14:22:00Z",
    consentStatus: "Active",
    initiator: "Data Principal",
    method: "Dashboard",
  },
  {
    logId: "LOG-0007",
    purposeId: "PUR-LYL-001",
    actionType: "Consent withdrawn",
    timestamp: "2025-09-08T10:45:12Z",
    consentStatus: "Withdrawn",
    initiator: "Data Principal",
    method: "Dashboard",
  },
  {
    logId: "LOG-0008",
    purposeId: "PUR-FRD-001",
    actionType: "Notice updated",
    timestamp: "2026-01-10T16:00:00Z",
    consentStatus: "Re-consent needed",
    initiator: "Data Fiduciary",
    method: "System",
  },
];

const INITIAL_GRIEVANCES = [
  {
    refId: "GRV-2025-0001",
    category: "Data access request",
    description: "Request for summary of all personal data held.",
    status: "Resolved",
    dateSubmitted: "2025-07-12",
    dateResolved: "2025-07-18",
  },
  {
    refId: "GRV-2025-0002",
    category: "Consent violation",
    description: "Received marketing SMS after withdrawing marketing consent.",
    status: "In progress",
    dateSubmitted: "2026-03-02",
    dateResolved: null,
  },
];

const TABS = ["Consents", "Activity log", "Grievances", "Your rights"];
const CONSENT_TABS = ["All", "Active", "Withdrawn", "Re-consent needed"];
const GRIEVANCE_CATEGORIES = [
  "Data access request",
  "Data correction request",
  "Data erasure request",
  "Consent violation",
  "Data breach concern",
  "Complaint to Board",
  "Other",
];

function fmtD(d) {
  if (!d) return "\u2014";
  const x = new Date(d);
  const m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return m[x.getMonth()] + " " + x.getDate() + ", " + x.getFullYear();
}

function fmtDT(d) {
  if (!d) return "\u2014";
  const x = new Date(d);
  const m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const h = x.getUTCHours();
  const mi = String(x.getUTCMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return (
    m[x.getUTCMonth()] +
    " " +
    x.getUTCDate() +
    ", " +
    x.getUTCFullYear() +
    ", " +
    (h % 12 || 12) +
    ":" +
    mi +
    " " +
    ampm +
    " UTC"
  );
}

function StatusBadge({ status, reconsentRequired }) {
  if (reconsentRequired) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 12,
          fontWeight: 500,
          padding: "2px 10px",
          borderRadius: 20,
          background: ORANGE_BG,
          color: ORANGE_TEXT,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: ORANGE_TEXT,
            display: "inline-block",
          }}
        />
        Re-consent needed
      </span>
    );
  }
  if (status === "Active") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 12,
          fontWeight: 500,
          padding: "2px 10px",
          borderRadius: 20,
          background: GREEN_BG,
          color: GREEN_TEXT,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: GREEN_TEXT,
            display: "inline-block",
          }}
        />
        Active
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 500,
        padding: "2px 10px",
        borderRadius: 20,
        background: GRAY_100,
        color: GRAY_500,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: GRAY_400,
          display: "inline-block",
        }}
      />
      Withdrawn
    </span>
  );
}

function GrvBadge({ status }) {
  const styles = {
    Resolved: { bg: GREEN_BG, c: GREEN_TEXT },
    "In progress": { bg: BLUE_BG, c: BLUE_TEXT },
    Submitted: { bg: YELLOW_BG, c: YELLOW_TEXT },
    Escalated: { bg: ORANGE_BG, c: ORANGE_TEXT },
  };
  const s = styles[status] || styles["Submitted"];
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 500,
        padding: "2px 10px",
        borderRadius: 20,
        background: s.bg,
        color: s.c,
      }}
    >
      {status}
    </span>
  );
}

function LogBadge({ action }) {
  let bg = GRAY_100;
  let c = GRAY_600;
  if (action.includes("granted")) {
    bg = GREEN_BG;
    c = GREEN_TEXT;
  } else if (action.includes("withdrawn")) {
    bg = RED_BG;
    c = RED_TEXT;
  } else if (action.includes("updated") || action.includes("re-consent")) {
    bg = YELLOW_BG;
    c = YELLOW_TEXT;
  }
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 500,
        padding: "2px 10px",
        borderRadius: 20,
        background: bg,
        color: c,
      }}
    >
      {action}
    </span>
  );
}

function Sec({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: GRAY_400,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function RightsCard({ icon, title, body, action }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 10,
        background: WHITE,
        border: "1px solid " + GRAY_200,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: GRAY_800,
              marginBottom: 4,
            }}
          >
            {title}
          </div>
          <p
            style={{
              fontSize: 13,
              color: GRAY_600,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {body}
          </p>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              padding: "8px 0 0",
              fontSize: 12,
              color: BRAND,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "system-ui, -apple-system, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {open ? "Hide" : "How to exercise this right"}
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.2s",
              }}
            >
              <path
                d="M1 1L5 5L9 1"
                stroke={BRAND}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {open && (
            <div
              style={{
                marginTop: 8,
                padding: 10,
                borderRadius: 6,
                background: GRAY_50,
                fontSize: 12,
                color: GRAY_600,
                lineHeight: 1.6,
              }}
            >
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ consent, onClose, onWithdraw }) {
  const c = consent;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "relative",
          width: 560,
          maxWidth: "92vw",
          height: "100%",
          background: WHITE,
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          overflowY: "auto",
          animation: "slideIn 0.2s ease-out",
        }}
      >
        <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
        <div
          style={{
            padding: "24px 28px",
            borderBottom: "1px solid " + GRAY_200,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: GRAY_400,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 4,
              }}
            >
              {c.id} - {c.purposeId}
            </div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: GRAY_800,
                margin: 0,
              }}
            >
              {c.purpose}
            </h2>
            <p style={{ fontSize: 13, color: GRAY_500, margin: "6px 0 0" }}>
              {c.description}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: GRAY_400,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div style={{ padding: "20px 28px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {[
              ["Status", null],
              ["Notice version", c.noticeVersion],
              ["Granted", fmtD(c.dateGranted)],
              ["Last updated", fmtD(c.lastUpdated)],
              [
                "Retention / Expiry",
                c.expiryDate ? fmtD(c.expiryDate) : "Until withdrawal",
              ],
              ["Notice language", c.noticeLanguage],
              ["Consent method", c.consentMethod],
              ["DPO contact", c.dpoContact + " - " + c.dpoPhone],
            ].map(function (item, i) {
              return (
                <div key={i}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: GRAY_400,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 4,
                    }}
                  >
                    {item[0]}
                  </div>
                  <div style={{ fontSize: 13, color: GRAY_700 }}>
                    {item[0] === "Status" ? (
                      <StatusBadge
                        status={c.status}
                        reconsentRequired={c.reconsentRequired}
                      />
                    ) : (
                      item[1]
                    )}
                  </div>
                </div>
              );
            })}
            {c.withdrawnDate && (
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: GRAY_400,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                  }}
                >
                  Withdrawn on
                </div>
                <div style={{ fontSize: 13, color: RED_TEXT }}>
                  {fmtD(c.withdrawnDate)}
                </div>
              </div>
            )}
          </div>

          <Sec label="Data categories collected (Section 11(1)(a))">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {c.dataCategories.map(function (cat) {
                return (
                  <span
                    key={cat}
                    style={{
                      fontSize: 12,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: GRAY_100,
                      color: GRAY_700,
                      fontWeight: 500,
                    }}
                  >
                    {cat}
                  </span>
                );
              })}
            </div>
          </Sec>

          <Sec label="Data processors and their roles (Section 11(1)(b))">
            {c.processors.map(function (p) {
              return (
                <div
                  key={p.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    color: GRAY_700,
                    padding: "6px 0",
                    borderBottom: "1px solid " + GRAY_100,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                  <span
                    style={{
                      color: GRAY_500,
                      textAlign: "right",
                      maxWidth: "55%",
                    }}
                  >
                    {p.role}
                  </span>
                </div>
              );
            })}
          </Sec>

          {c.usedForDecisions && (
            <Sec label="Used for decision-making (Section 8(3))">
              <div style={{ fontSize: 13, color: GRAY_600, lineHeight: 1.6 }}>
                {c.decisionDisclosure}
              </div>
            </Sec>
          )}

          {c.sharedWithOtherFiduciaries && (
            <Sec label="Shared with other Data Fiduciaries (Section 8(3))">
              <div style={{ fontSize: 13, color: GRAY_600, lineHeight: 1.6 }}>
                {c.fiduciaryDisclosure}
              </div>
            </Sec>
          )}

          {c.reconsentRequired && (
            <div
              style={{
                padding: 14,
                borderRadius: 8,
                background: ORANGE_BG,
                border: "1px solid #fed7aa",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: ORANGE_TEXT,
                  marginBottom: 4,
                }}
              >
                Re-consent required (Section 5(1))
              </div>
              <div
                style={{ fontSize: 13, color: ORANGE_TEXT, lineHeight: 1.5 }}
              >
                {c.reconsentReason}
              </div>
            </div>
          )}

          {c.blockedForMinors && (
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: YELLOW_BG,
                border: "1px solid #fde68a",
                marginBottom: 20,
              }}
            >
              <div
                style={{ fontSize: 12, fontWeight: 600, color: YELLOW_TEXT }}
              >
                Blocked for guests under 18 (Section 9(3))
              </div>
              <div style={{ fontSize: 12, color: YELLOW_TEXT, marginTop: 4 }}>
                This purpose involves targeted advertising or behavioural
                monitoring and is not available for minor guests.
              </div>
            </div>
          )}

          <Sec label="Consent notice (artifact)">
            <div
              style={{
                padding: 16,
                borderRadius: 8,
                background: GRAY_50,
                border: "1px solid " + GRAY_200,
                fontSize: 13,
                color: GRAY_600,
                lineHeight: 1.65,
              }}
            >
              {c.noticeText}
            </div>
          </Sec>

          <Sec label="Erasure policy (Section 8(7))">
            <div style={{ fontSize: 13, color: GRAY_600, lineHeight: 1.6 }}>
              {c.erasurePolicy}
            </div>
          </Sec>

          <Sec label="Consequences of withdrawal (Section 6(5))">
            <div style={{ fontSize: 13, color: GRAY_600, lineHeight: 1.6 }}>
              {c.withdrawalConsequences}
            </div>
          </Sec>

          <Sec label="Your rights under DPDP Act">
            <div style={{ fontSize: 13, color: GRAY_600, lineHeight: 1.6 }}>
              {c.rightsInfo}
            </div>
          </Sec>

          <div
            style={{
              borderTop: "1px solid " + GRAY_200,
              paddingTop: 20,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {c.status === "Active" && !c.reconsentRequired && (
              <button
                onClick={function () {
                  onWithdraw(c.id);
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: "1px solid #fca5a5",
                  background: RED_BG,
                  color: RED_TEXT,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                Withdraw consent
              </button>
            )}
            {c.reconsentRequired && (
              <>
                <button
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: BRAND,
                    color: WHITE,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Accept updated notice
                </button>
                <button
                  onClick={function () {
                    onWithdraw(c.id);
                  }}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: "1px solid " + GRAY_200,
                    background: WHITE,
                    color: GRAY_600,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Decline and withdraw
                </button>
              </>
            )}
            {c.status === "Withdrawn" && (
              <div
                style={{
                  fontSize: 13,
                  color: GRAY_500,
                  fontStyle: "italic",
                  padding: "10px 0",
                }}
              >
                Consent withdrawn on {fmtD(c.withdrawnDate)}. Processing ceased
                per Section 6(6).
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WithdrawModal({ consent, onConfirm, onCancel }) {
  const c = consent;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
        }}
        onClick={onCancel}
      />
      <div
        style={{
          position: "relative",
          background: WHITE,
          borderRadius: 12,
          padding: 28,
          maxWidth: 440,
          width: "90%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          animation: "fadeUp 0.2s ease-out",
        }}
      >
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: GRAY_800,
            margin: "0 0 12px",
          }}
        >
          Withdraw consent
        </h3>
        <p
          style={{
            fontSize: 14,
            color: GRAY_600,
            lineHeight: 1.6,
            margin: "0 0 12px",
          }}
        >
          You are about to withdraw consent for <strong>{c.purpose}</strong> (
          {c.purposeId}).
        </p>
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: YELLOW_BG,
            border: "1px solid #fde68a",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: YELLOW_TEXT,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Consequences (Section 6(5))
          </div>
          <div style={{ fontSize: 13, color: YELLOW_TEXT, lineHeight: 1.5 }}>
            {c.withdrawalConsequences}
          </div>
        </div>
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: GRAY_50,
            border: "1px solid " + GRAY_200,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: GRAY_400,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Erasure (Section 8(7))
          </div>
          <div style={{ fontSize: 12, color: GRAY_600, lineHeight: 1.5 }}>
            {c.erasurePolicy}
          </div>
        </div>
        <p
          style={{
            fontSize: 13,
            color: GRAY_500,
            lineHeight: 1.6,
            margin: "0 0 20px",
          }}
        >
          Processing stops immediately per Section 6(6). Prior processing
          remains lawful per Section 6(5).
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "9px 18px",
              borderRadius: 8,
              border: "1px solid " + GRAY_200,
              background: WHITE,
              color: GRAY_600,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "9px 18px",
              borderRadius: 8,
              border: "none",
              background: "#dc2626",
              color: WHITE,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Confirm withdrawal
          </button>
        </div>
      </div>
    </div>
  );
}

function GrievanceForm({ onSubmit, onCancel }) {
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
        }}
        onClick={onCancel}
      />
      <div
        style={{
          position: "relative",
          background: WHITE,
          borderRadius: 12,
          padding: 28,
          maxWidth: 480,
          width: "90%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          animation: "fadeUp 0.2s ease-out",
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: GRAY_800,
            margin: "0 0 4px",
          }}
        >
          Raise a grievance or data request
        </h3>
        <p style={{ fontSize: 13, color: GRAY_500, margin: "0 0 6px" }}>
          Per DPDP Act Sections 11, 12 and 13.
        </p>
        <p
          style={{
            fontSize: 12,
            color: BLUE_TEXT,
            background: BLUE_BG,
            padding: "8px 12px",
            borderRadius: 6,
            margin: "0 0 16px",
            lineHeight: 1.5,
          }}
        >
          If unresolved, you may escalate to the Data Protection Board of India
          (Section 13(3)).
        </p>
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: GRAY_600,
              display: "block",
              marginBottom: 6,
            }}
          >
            Category
          </label>
          <select
            value={cat}
            onChange={function (e) {
              setCat(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 8,
              border: "1px solid " + GRAY_200,
              fontSize: 13,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: cat ? GRAY_700 : GRAY_400,
              background: WHITE,
            }}
          >
            <option value="">Select a category</option>
            {GRIEVANCE_CATEGORIES.map(function (c) {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: GRAY_600,
              display: "block",
              marginBottom: 6,
            }}
          >
            Description
          </label>
          <textarea
            value={desc}
            onChange={function (e) {
              setDesc(e.target.value);
            }}
            rows={4}
            placeholder="Describe your complaint or request..."
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 8,
              border: "1px solid " + GRAY_200,
              fontSize: 13,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: GRAY_700,
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "9px 18px",
              borderRadius: 8,
              border: "1px solid " + GRAY_200,
              background: WHITE,
              color: GRAY_600,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            disabled={!cat || !desc.trim()}
            onClick={function () {
              onSubmit(cat, desc.trim());
            }}
            style={{
              padding: "9px 18px",
              borderRadius: 8,
              border: "none",
              background: !cat || !desc.trim() ? GRAY_300 : BRAND,
              color: WHITE,
              fontSize: 13,
              fontWeight: 600,
              cursor: !cat || !desc.trim() ? "not-allowed" : "pointer",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ message, onDismiss }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 300,
        background: BRAND,
        color: WHITE,
        padding: "12px 24px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 8px 30px rgba(27,54,49,0.3)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "toastIn 0.3s ease-out",
      }}
    >
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8.5L6.5 12L13 4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {message}
      <button
        onClick={onDismiss}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
          marginLeft: 4,
          fontSize: 16,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        x
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [consents, setConsents] = useState(CONSENTS);
  const [logs, setLogs] = useState(AUDIT_LOGS);
  const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);
  const [mainTab, setMainTab] = useState("Consents");
  const [consentTab, setConsentTab] = useState("All");
  const [selectedConsent, setSelectedConsent] = useState(null);
  const [withdrawTarget, setWithdrawTarget] = useState(null);
  const [showGrvForm, setShowGrvForm] = useState(false);
  const [toast, setToast] = useState(null);

  const counts = {
    All: consents.length,
    Active: consents.filter(function (c) {
      return c.status === "Active" && !c.reconsentRequired;
    }).length,
    Withdrawn: consents.filter(function (c) {
      return c.status === "Withdrawn";
    }).length,
    "Re-consent needed": consents.filter(function (c) {
      return c.reconsentRequired;
    }).length,
  };

  const filtered = consents.filter(function (c) {
    if (consentTab === "Active")
      return c.status === "Active" && !c.reconsentRequired;
    if (consentTab === "Withdrawn") return c.status === "Withdrawn";
    if (consentTab === "Re-consent needed") return c.reconsentRequired;
    return true;
  });

  function handleWithdraw(id) {
    var now = new Date().toISOString();
    var c = consents.find(function (x) {
      return x.id === id;
    });
    setConsents(function (p) {
      return p.map(function (x) {
        if (x.id === id)
          return Object.assign({}, x, {
            status: "Withdrawn",
            withdrawnDate: now.split("T")[0],
            lastUpdated: now.split("T")[0],
            reconsentRequired: false,
          });
        return x;
      });
    });
    setLogs(function (p) {
      return [
        {
          logId: "LOG-" + String(p.length + 1).padStart(4, "0"),
          purposeId: c.purposeId,
          actionType: "Consent withdrawn",
          timestamp: now,
          consentStatus: "Withdrawn",
          initiator: "Data Principal",
          method: "Dashboard",
        },
      ].concat(p);
    });
    setWithdrawTarget(null);
    setSelectedConsent(null);
    setToast("Consent withdrawn. Processing stopped per Section 6(6).");
    setTimeout(function () {
      setToast(null);
    }, 4000);
  }

  function handleGrv(cat, desc) {
    var refId =
      "GRV-" +
      new Date().getFullYear() +
      "-" +
      String(grievances.length + 1).padStart(4, "0");
    setGrievances(function (p) {
      return [
        {
          refId: refId,
          category: cat,
          description: desc,
          status: "Submitted",
          dateSubmitted: new Date().toISOString().split("T")[0],
          dateResolved: null,
        },
      ].concat(p);
    });
    setShowGrvForm(false);
    setToast("Grievance submitted. Reference: " + refId);
    setTimeout(function () {
      setToast(null);
    }, 5000);
  }

  var selectedConsentObj = selectedConsent
    ? consents.find(function (c) {
        return c.id === selectedConsent;
      })
    : null;
  var withdrawObj = withdrawTarget
    ? consents.find(function (c) {
        return c.id === withdrawTarget;
      })
    : null;

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: WHITE,
        // minHeight: "100vh",
        color: GRAY_800,
      }}
    >
      {/* Tabs */}
      <div style={{ borderBottom: "1px solid " + GRAY_200 }}>
        {/* <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            gap: 0,
          }}
        > */}
        <div
          style={{
            padding: "0px",
            display: "flex",
            gap: 0,
          }}
        >
          {TABS.map(function (t) {
            return (
              <button
                key={t}
                onClick={function () {
                  setMainTab(t);
                }}
                style={{
                  padding: "12px 18px",
                  fontSize: 13,
                  fontWeight: mainTab === t ? 600 : 500,
                  color: mainTab === t ? BRAND : GRAY_500,
                  background: "none",
                  border: "none",
                  borderBottom:
                    mainTab === t
                      ? "2px solid " + BRAND
                      : "2px solid transparent",
                  cursor: "pointer",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  marginBottom: -1,
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 16px" }}> */}
      <div style={{ padding: "28px 0px" }}>
        {/* CONSENTS TAB */}
        {mainTab === "Consents" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: GRAY_800,
                  margin: 0,
                }}
              >
                Consent overview
              </h1>
              <p style={{ fontSize: 13, color: GRAY_500, margin: "4px 0 0" }}>
                View, manage, and withdraw your consents. Every action is
                timestamped per DPDP Act Section 6.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {[
                { l: "Total", v: counts.All, c: GRAY_800 },
                { l: "Active", v: counts.Active, c: GREEN_TEXT },
                { l: "Withdrawn", v: counts.Withdrawn, c: GRAY_500 },
                {
                  l: "Re-consent",
                  v: counts["Re-consent needed"],
                  c: ORANGE_TEXT,
                },
              ].map(function (x) {
                return (
                  <div
                    key={x.l}
                    style={{
                      padding: "16px 18px",
                      borderRadius: 10,
                      border: "1px solid " + GRAY_200,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: GRAY_400,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 6,
                      }}
                    >
                      {x.l}
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: x.c }}>
                      {x.v}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                gap: 0,
                borderBottom: "1px solid " + GRAY_200,
                marginBottom: 16,
              }}
            >
              {CONSENT_TABS.map(function (t) {
                return (
                  <button
                    key={t}
                    onClick={function () {
                      setConsentTab(t);
                    }}
                    style={{
                      padding: "9px 16px",
                      fontSize: 13,
                      fontWeight: consentTab === t ? 600 : 500,
                      color: consentTab === t ? BRAND : GRAY_500,
                      background: "none",
                      border: "none",
                      borderBottom:
                        consentTab === t
                          ? "2px solid " + BRAND
                          : "2px solid transparent",
                      cursor: "pointer",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      marginBottom: -1,
                    }}
                  >
                    {t}
                    <span
                      style={{
                        marginLeft: 6,
                        fontSize: 11,
                        padding: "1px 7px",
                        borderRadius: 10,
                        background: consentTab === t ? BRAND_LIGHTER : GRAY_100,
                        color: consentTab === t ? BRAND : GRAY_500,
                        fontWeight: 600,
                      }}
                    >
                      {counts[t]}
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              style={{
                border: "1px solid " + GRAY_200,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: GRAY_50,
                      borderBottom: "1px solid " + GRAY_200,
                    }}
                  >
                    {[
                      "Purpose",
                      "Status",
                      "Data categories",
                      "Granted",
                      "Last updated",
                      "Expiry",
                      "",
                    ].map(function (h) {
                      return (
                        <th
                          key={h}
                          style={{
                            padding: "10px 14px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 600,
                            color: GRAY_400,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: 40,
                          textAlign: "center",
                          color: GRAY_400,
                        }}
                      >
                        No consents match this filter.
                      </td>
                    </tr>
                  )}
                  {filtered.map(function (c, i) {
                    return (
                      <tr
                        key={c.id}
                        onClick={function () {
                          setSelectedConsent(c.id);
                        }}
                        style={{
                          borderBottom:
                            i < filtered.length - 1
                              ? "1px solid " + GRAY_200
                              : "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={function (e) {
                          e.currentTarget.style.background = GRAY_50;
                        }}
                        onMouseLeave={function (e) {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 14px",
                            fontWeight: 600,
                            color: GRAY_800,
                          }}
                        >
                          {c.purpose}
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 400,
                              color: GRAY_400,
                              marginTop: 2,
                            }}
                          >
                            {c.purposeId}
                          </div>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <StatusBadge
                            status={c.status}
                            reconsentRequired={c.reconsentRequired}
                          />
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 4,
                            }}
                          >
                            {c.dataCategories.slice(0, 2).map(function (cat) {
                              return (
                                <span
                                  key={cat}
                                  style={{
                                    fontSize: 11,
                                    padding: "2px 8px",
                                    borderRadius: 4,
                                    background: GRAY_100,
                                    color: GRAY_600,
                                  }}
                                >
                                  {cat}
                                </span>
                              );
                            })}
                            {c.dataCategories.length > 2 && (
                              <span
                                style={{
                                  fontSize: 11,
                                  padding: "2px 8px",
                                  borderRadius: 4,
                                  background: GRAY_100,
                                  color: GRAY_500,
                                }}
                              >
                                +{c.dataCategories.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: "12px 14px", color: GRAY_600 }}>
                          {fmtD(c.dateGranted)}
                        </td>
                        <td style={{ padding: "12px 14px", color: GRAY_600 }}>
                          {fmtD(c.lastUpdated)}
                        </td>
                        <td style={{ padding: "12px 14px", color: GRAY_600 }}>
                          {c.expiryDate ? fmtD(c.expiryDate) : "\u2014"}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6 12L10 8L6 4"
                              stroke={GRAY_400}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: GRAY_400 }}>
              {filtered.length} {filtered.length === 1 ? "item" : "items"}
            </div>
          </div>
        )}

        {/* ACTIVITY LOG TAB */}
        {mainTab === "Activity log" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: GRAY_800,
                  margin: 0,
                }}
              >
                Activity log
              </h1>
              <p style={{ fontSize: 13, color: GRAY_500, margin: "4px 0 0" }}>
                Immutable audit trail per DPDP Act and NeGD BRD Section 4.7.
              </p>
            </div>
            <div
              style={{
                border: "1px solid " + GRAY_200,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: GRAY_50,
                      borderBottom: "1px solid " + GRAY_200,
                    }}
                  >
                    {[
                      "Log ID",
                      "Purpose ID",
                      "Action",
                      "Status",
                      "Initiated by",
                      "Method",
                      "Timestamp",
                    ].map(function (h) {
                      return (
                        <th
                          key={h}
                          style={{
                            padding: "10px 14px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 600,
                            color: GRAY_400,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {[]
                    .concat(logs)
                    .sort(function (a, b) {
                      return new Date(b.timestamp) - new Date(a.timestamp);
                    })
                    .map(function (l, i) {
                      return (
                        <tr
                          key={l.logId}
                          style={{
                            borderBottom:
                              i < logs.length - 1
                                ? "1px solid " + GRAY_200
                                : "none",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              fontFamily:
                                "system-ui, -apple-system, sans-serif",
                              fontSize: 12,
                              color: GRAY_500,
                            }}
                          >
                            {l.logId}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontFamily:
                                "system-ui, -apple-system, sans-serif",
                              fontSize: 12,
                              color: GRAY_600,
                            }}
                          >
                            {l.purposeId}
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <LogBadge action={l.actionType} />
                          </td>
                          <td style={{ padding: "10px 14px", color: GRAY_600 }}>
                            {l.consentStatus}
                          </td>
                          <td style={{ padding: "10px 14px", color: GRAY_600 }}>
                            {l.initiator}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              color: GRAY_500,
                              fontSize: 12,
                            }}
                          >
                            {l.method}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              color: GRAY_500,
                              fontSize: 12,
                            }}
                          >
                            {fmtDT(l.timestamp)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: GRAY_400 }}>
              {logs.length} events
            </div>
          </div>
        )}

        {/* GRIEVANCES TAB */}
        {mainTab === "Grievances" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 24,
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: GRAY_800,
                    margin: 0,
                  }}
                >
                  Grievances and data requests
                </h1>
                <p style={{ fontSize: 13, color: GRAY_500, margin: "4px 0 0" }}>
                  Per DPDP Act Sections 11, 12 and 13. Unresolved complaints may
                  be escalated to the Data Protection Board (Section 13(3)).
                </p>
              </div>
              <button
                onClick={function () {
                  setShowGrvForm(true);
                }}
                style={{
                  padding: "9px 18px",
                  borderRadius: 8,
                  border: "none",
                  background: BRAND,
                  color: WHITE,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                + New request
              </button>
            </div>
            <div
              style={{
                border: "1px solid " + GRAY_200,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: GRAY_50,
                      borderBottom: "1px solid " + GRAY_200,
                    }}
                  >
                    {[
                      "Reference",
                      "Category",
                      "Description",
                      "Status",
                      "Submitted",
                      "Resolved",
                    ].map(function (h) {
                      return (
                        <th
                          key={h}
                          style={{
                            padding: "10px 14px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 600,
                            color: GRAY_400,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {grievances.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: 40,
                          textAlign: "center",
                          color: GRAY_400,
                        }}
                      >
                        No grievances filed.
                      </td>
                    </tr>
                  )}
                  {grievances.map(function (g, i) {
                    return (
                      <tr
                        key={g.refId}
                        style={{
                          borderBottom:
                            i < grievances.length - 1
                              ? "1px solid " + GRAY_200
                              : "none",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 14px",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            color: BRAND,
                          }}
                        >
                          {g.refId}
                        </td>
                        <td style={{ padding: "12px 14px", color: GRAY_700 }}>
                          {g.category}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            color: GRAY_600,
                            maxWidth: 260,
                          }}
                        >
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {g.description}
                          </div>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <GrvBadge status={g.status} />
                        </td>
                        <td style={{ padding: "12px 14px", color: GRAY_600 }}>
                          {fmtD(g.dateSubmitted)}
                        </td>
                        <td style={{ padding: "12px 14px", color: GRAY_600 }}>
                          {g.dateResolved ? fmtD(g.dateResolved) : "\u2014"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: GRAY_400 }}>
              {grievances.length}{" "}
              {grievances.length === 1 ? "request" : "requests"}
            </div>
          </div>
        )}

        {/* YOUR RIGHTS TAB */}
        {mainTab === "Your rights" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: GRAY_800,
                  margin: 0,
                }}
              >
                Your rights under the DPDP Act
              </h1>
              <p style={{ fontSize: 13, color: GRAY_500, margin: "4px 0 0" }}>
                A summary of your rights as a Data Principal and how to exercise
                them.
              </p>
            </div>
            <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
              <RightsCard
                icon="&#128269;"
                title="Right to access information (Section 11)"
                body="You may obtain a summary of your personal data being processed, the processing activities, and identities of all processors and fiduciaries with whom data has been shared."
                action="View your consents in the Consents tab to see all data categories, processors, and fiduciary sharing."
              />
              <RightsCard
                icon="&#9999;&#65039;"
                title="Right to correction and erasure (Section 12)"
                body="You may request correction of inaccurate data, completion of incomplete data, updating of outdated data, and erasure of data for which consent has been withdrawn or the purpose is no longer served."
                action="Submit a Data correction request or Data erasure request via the Grievances tab."
              />
              <RightsCard
                icon="&#128737;&#65039;"
                title="Right to grievance redressal (Section 13)"
                body="You have the right to readily available means of grievance redressal from the Data Fiduciary. The Data Fiduciary must respond within the prescribed period."
                action={GRIEVANCE_HOW}
              />
              <RightsCard
                icon="&#8617;&#65039;"
                title="Right to withdraw consent (Section 6(4))"
                body="You may withdraw consent at any time, with the ease of doing so being comparable to the ease with which consent was given."
                action={WITHDRAWAL_HOW}
              />
              <RightsCard
                icon="&#128100;"
                title="Right to nominate (Section 14)"
                body="You may nominate another individual who shall, in the event of your death or incapacity, exercise your rights under the DPDP Act on your behalf."
                action="Contact the DPO to register a nominee."
              />
              <div
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: BLUE_BG,
                  border: "1px solid " + BLUE_TEXT + "25",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: BLUE_TEXT,
                    marginBottom: 8,
                  }}
                >
                  Complaint to the Data Protection Board (Section 5(1)(iii))
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: BLUE_TEXT,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {BOARD_INFO}
                </p>
              </div>
              <div
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: WHITE,
                  border: "1px solid " + GRAY_200,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: GRAY_800,
                    marginBottom: 8,
                  }}
                >
                  Contact information
                </div>
                <div style={{ fontSize: 13, color: GRAY_600, lineHeight: 1.8 }}>
                  <div>
                    <strong>Data Protection Officer:</strong> {DPO_CONTACT}
                  </div>
                  <div>
                    <strong>DPO phone:</strong> {DPO_PHONE}
                  </div>
                  <div>
                    <strong>Grievance redressal:</strong> Via this dashboard or
                    by contacting the DPO
                  </div>
                  <div>
                    <strong>Data Protection Board:</strong> Via the Board
                    digital office
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals and overlays */}
      {selectedConsentObj && (
        <DetailPanel
          consent={selectedConsentObj}
          onClose={function () {
            setSelectedConsent(null);
          }}
          onWithdraw={function (id) {
            setSelectedConsent(null);
            setWithdrawTarget(id);
          }}
        />
      )}
      {withdrawObj && (
        <WithdrawModal
          consent={withdrawObj}
          onConfirm={function () {
            handleWithdraw(withdrawTarget);
          }}
          onCancel={function () {
            setWithdrawTarget(null);
          }}
        />
      )}
      {showGrvForm && (
        <GrievanceForm
          onSubmit={handleGrv}
          onCancel={function () {
            setShowGrvForm(false);
          }}
        />
      )}
      {toast && (
        <Toast
          message={toast}
          onDismiss={function () {
            setToast(null);
          }}
        />
      )}
    </div>
  );
}

// // -- Tailwind CSS Based Code --

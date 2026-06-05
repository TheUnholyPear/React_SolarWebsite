import { useState, useRef, useEffect } from 'react';

const ICON_BASE = "/assets/icons/lucide/";
const ICON_ALIAS = {
  tools_installation_kit: "sun", storage: "battery-charging", add_business: "building-2",
  workspaces: "plug-zap", history: "history", savings: "piggy-bank", reviews: "star",
  contacts: "contact", keyboard_arrow_down: "chevron-down", chevron_right: "chevron-right",
  close: "x", menu: "menu", mail: "mail", call: "phone", location_on: "map-pin",
  verified: "badge-check", design_services: "pencil-ruler", approval: "clipboard-check",
  engineering: "wrench", play_circle: "circle-play", check: "check", star: "star-filled",
};
export const iconUrl = (name) => ICON_BASE + (ICON_ALIAS[name] || name) + ".svg";

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 64);
  window.scrollTo(0, target);
}

export function Icon({ name, size = 24, invert = false, accent = false, style = {} }) {
  const cls = ["uksg-i", invert && "uksg-i--invert", accent && "uksg-i--accent"].filter(Boolean).join(" ");
  return <img className={cls} src={iconUrl(name)} alt="" aria-hidden="true"
    style={{ width: size, height: size, ...style }} />;
}

export function Button({ variant = "primary", size = "default", children, iconRight, iconLeft, full, onClick, type = "button", disabled, style = {} }) {
  const cls = ["uksg-btn", `uksg-btn--${variant}`, size === "sm" && "uksg-btn--sm"].filter(Boolean).join(" ");
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}
      style={{ width: full ? "100%" : undefined, ...style }}>
      {iconLeft}{children}{iconRight}
    </button>
  );
}

export function Badge({ children, style = {} }) {
  return <span className="uksg-badge" style={style}>{children}</span>;
}

export function Input(props) {
  return <input className="uksg-input" {...props} />;
}

export function Card({ children, style = {}, className = "" }) {
  return <div className={"uksg-card " + className} style={style}>{children}</div>;
}

export function Logo({ dark = false, height = 44 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img src="/assets/uksg-real-logo.png" alt="UK Solar Generation" style={{ height, display: "block" }} />
      <svg width="152" height="48" viewBox="0 0 152 48" aria-hidden="true">
        <text x="0" y="21.5" fontFamily="Manrope, 'Helvetica Neue', Arial, sans-serif" fontSize="16" fontWeight="800" letterSpacing="1.5" fill={dark ? "#ffffff" : "#191919"}>UK SOLAR</text>
        <text x="0.5" y="37" fontFamily="Manrope, 'Helvetica Neue', Arial, sans-serif" fontSize="9.5" fontWeight="600" letterSpacing="4.3" fill={dark ? "rgba(255,255,255,0.6)" : "#7F7F7F"}>GENERATION</text>
      </svg>
    </div>
  );
}

export function Stars({ n = 5, size = 22, invert = false }) {
  return (
    <span className="kit-stars">
      {Array.from({ length: n }).map((_, i) => <Icon key={i} name="star" size={size} invert={invert} accent />)}
    </span>
  );
}

export function SectionIntro({ eyebrow, title, body, center, max = 768, titleClass = "h2" }) {
  return (
    <div style={{ maxWidth: center ? max : undefined, marginInline: center ? "auto" : undefined, textAlign: center ? "center" : "left" }}>
      {eyebrow && <p className="kit-eyebrow text-regular">{eyebrow}</p>}
      <h2 className={titleClass} style={{ marginBottom: body ? 20 : 0 }}>{title}</h2>
      {body && <p className="text-medium">{body}</p>}
    </div>
  );
}

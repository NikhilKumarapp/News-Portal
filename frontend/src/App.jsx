import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash, FaEdit, FaSearch, FaPlus, FaMapMarkerAlt,
  FaTimes, FaCheck, FaFacebookF, FaInstagram, FaTwitter,
  FaYoutube, FaWhatsapp, FaLock, FaUnlock, FaSignOutAlt,
  FaCamera, FaImage,
} from "react-icons/fa";

const BASE_URL = "https://news-portal-backend-d8q9.onrender.com";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #080c14; --surface: #0d1524; --glass: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08); --border-hi: rgba(255,255,255,0.18);
    --gold: #c9a96e; --red: #f43f5e; --yellow: #fbbf24; --text: #f1f5f9;
    --muted: #64748b; --news-red: #e8192c; --news-blue: #1a6fc4;
  }
  body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); }
  .root-bg { min-height: 100vh; position: relative; overflow-x: hidden; }
  .root-bg::before {
    content: ''; position: fixed; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 10% 0%, rgba(232,25,44,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 100%, rgba(26,111,196,0.07) 0%, transparent 60%);
    pointer-events: none;
  }
  .header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(8,12,20,0.94); backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(232,25,44,0.2);
    padding: 12px 32px; display: flex; align-items: center;
    justify-content: space-between; gap: 16px; flex-wrap: wrap;
  }
  .header-brand { display: flex; align-items: center; gap: 14px; text-decoration: none; }
  .header-logo { height: 52px; width: auto; object-fit: contain; filter: drop-shadow(0 2px 8px rgba(232,25,44,0.4)); flex-shrink: 0; }
  .header-brand-text { display: flex; flex-direction: column; gap: 1px; }
  .header-brand-text h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.1rem,2.5vw,1.5rem); font-weight: 900; color: var(--text); line-height: 1.1; }
  .header-brand-text h1 span.red  { color: var(--news-red); }
  .header-brand-text h1 span.blue { color: var(--news-blue); }
  .header-brand-text small { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
  .header-socials { display: flex; align-items: center; gap: 8px; }
  .social-btn { width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:0.85rem;border:1px solid var(--border);background:var(--glass);color:var(--muted);text-decoration:none;transition:all 0.2s;flex-shrink:0; }
  .social-btn:hover { transform: translateY(-2px); }
  .social-btn.fb:hover { background:#1877f2;border-color:#1877f2;color:#fff; }
  .social-btn.ig:hover { background:linear-gradient(135deg,#f09433,#dc2743);border-color:#e6683c;color:#fff; }
  .social-btn.tw:hover { background:#000;border-color:#555;color:#fff; }
  .social-btn.yt:hover { background:#ff0000;border-color:#ff0000;color:#fff; }
  .social-btn.wa:hover { background:#25d366;border-color:#25d366;color:#fff; }
  .social-divider { width:1px;height:24px;background:var(--border);margin:0 4px; }
  .header-count { background:var(--glass);border:1px solid var(--border);border-radius:100px;padding:5px 16px;font-size:0.76rem;font-weight:700;color:var(--gold);letter-spacing:0.06em;white-space:nowrap; }
  .search-wrap { position:relative;flex:1;max-width:300px;min-width:160px; }
  .search-icon { position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:0.8rem;pointer-events:none; }
  .search-input { width:100%;padding:11px 14px 11px 38px;background:var(--glass);border:1px solid var(--border);border-radius:11px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:0.88rem;outline:none;transition:border-color 0.2s,box-shadow 0.2s; }
  .search-input::placeholder { color:var(--muted); }
  .search-input:focus { border-color:var(--news-red);box-shadow:0 0 0 3px rgba(232,25,44,0.1); }
  .admin-btn { display:flex;align-items:center;gap:8px;padding:9px 16px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.78rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;border:1px solid;cursor:pointer;transition:all 0.2s;white-space:nowrap; }
  .admin-btn.locked { background:rgba(201,169,110,0.08);border-color:rgba(201,169,110,0.3);color:var(--gold); }
  .admin-btn.locked:hover { background:rgba(201,169,110,0.15);border-color:rgba(201,169,110,0.5); }
  .admin-btn.active { background:rgba(232,25,44,0.12);border-color:rgba(232,25,44,0.4);color:#ff6b7a; }
  .ticker-wrap { background:var(--news-red);overflow:hidden;height:32px;display:flex;align-items:center; }
  .ticker-label { background:#a80f1e;color:#fff;font-size:0.7rem;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:0 14px;height:100%;display:flex;align-items:center;white-space:nowrap;flex-shrink:0; }
  .ticker-track { display:flex;animation:ticker 28s linear infinite;white-space:nowrap; }
  .ticker-track span { font-size:0.78rem;font-weight:600;color:#fff;padding:0 32px;letter-spacing:0.03em; }
  .ticker-track span::before { content:'●';margin-right:12px;opacity:0.7;font-size:0.5rem;vertical-align:middle; }
  @keyframes ticker { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }
  .admin-login-overlay { position:fixed;inset:0;z-index:200;background:rgba(8,12,20,0.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px; }
  .admin-login-box { background:var(--surface);border:1px solid rgba(232,25,44,0.3);border-radius:22px;padding:40px 36px;width:100%;max-width:400px;position:relative;box-shadow:0 32px 80px rgba(0,0,0,0.6); }
  .admin-login-box::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--news-red),var(--news-blue));border-radius:22px 22px 0 0; }
  .admin-lock-icon { width:56px;height:56px;border-radius:16px;margin:0 auto 20px;background:rgba(232,25,44,0.12);border:1px solid rgba(232,25,44,0.3);display:flex;align-items:center;justify-content:center;font-size:1.4rem;color:var(--news-red); }
  .admin-login-box h2 { font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;text-align:center;color:var(--text);margin-bottom:6px; }
  .admin-login-box p { font-size:0.8rem;color:var(--muted);text-align:center;margin-bottom:28px; }
  .admin-login-field { margin-bottom:16px; }
  .admin-login-label { display:block;font-size:0.68rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:var(--muted);margin-bottom:8px; }
  .admin-login-input { width:100%;padding:13px 18px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:0.93rem;outline:none;transition:border-color 0.2s,box-shadow 0.2s; }
  .admin-login-input:focus { border-color:var(--news-red);box-shadow:0 0 0 3px rgba(232,25,44,0.1); }
  .admin-login-input.error { border-color:var(--red);box-shadow:0 0 0 3px rgba(244,63,94,0.15); }
  .admin-error-msg { font-size:0.76rem;color:var(--red);margin-top:8px;display:block; }
  .admin-login-submit { width:100%;padding:14px;margin-top:8px;background:linear-gradient(135deg,var(--news-red),#a80f1e);border:none;border-radius:12px;color:#fff;font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:opacity 0.2s,transform 0.15s;box-shadow:0 8px 24px rgba(232,25,44,0.3);display:flex;align-items:center;justify-content:center;gap:8px; }
  .admin-login-submit:hover { opacity:0.9;transform:translateY(-1px); }
  .admin-login-close { position:absolute;top:16px;right:16px;background:none;border:none;color:var(--muted);font-size:1rem;cursor:pointer;padding:4px;transition:color 0.2s; }
  .admin-login-close:hover { color:var(--text); }
  .admin-banner { background:linear-gradient(135deg,rgba(232,25,44,0.08),rgba(26,111,196,0.06));border:1px solid rgba(232,25,44,0.2);border-radius:16px;padding:16px 24px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap; }
  .admin-banner-left { display:flex;align-items:center;gap:12px; }
  .admin-banner-dot { width:8px;height:8px;border-radius:50%;background:#34d399;flex-shrink:0;box-shadow:0 0 8px rgba(52,211,153,0.5); }
  .admin-banner-text strong { font-size:0.88rem;font-weight:700;color:var(--text);display:block; }
  .admin-banner-text span { font-size:0.72rem;color:var(--muted); }
  .admin-logout-btn { display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:9px;background:rgba(244,63,94,0.08);border:1px solid rgba(244,63,94,0.25);color:var(--red);font-family:'DM Sans',sans-serif;font-size:0.76rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;cursor:pointer;transition:all 0.2s; }
  .admin-logout-btn:hover { background:rgba(244,63,94,0.16); }

  /* ── IMAGE UPLOAD FIELD ── */
  .img-upload-area {
    grid-column: 1 / -1;
    display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap;
  }
  .img-preview-box {
    width: 110px; height: 110px; border-radius: 50%; flex-shrink: 0;
    border: 2.5px solid var(--news-red);
    background: rgba(232,25,44,0.06);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; position: relative;
  }
  .img-preview-box img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; }
  .img-preview-placeholder { display:flex;flex-direction:column;align-items:center;gap:6px;color:var(--muted); }
  .img-preview-placeholder svg { font-size:1.6rem;opacity:0.5; }
  .img-preview-placeholder span { font-size:0.65rem;letter-spacing:0.08em;text-transform:uppercase; }
  .img-upload-right { flex:1;min-width:200px;display:flex;flex-direction:column;gap:10px; }
  .img-upload-label-text { font-size:0.68rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:var(--muted);margin-bottom:2px; }
  .img-file-input { display:none; }
  .img-choose-btn {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 12px 20px; border-radius: 11px; cursor: pointer;
    background: rgba(232,25,44,0.08); border: 1px dashed rgba(232,25,44,0.4);
    color: #ff6b7a; font-family:'DM Sans',sans-serif;
    font-size: 0.85rem; font-weight: 600;
    transition: all 0.2s; width: fit-content;
  }
  .img-choose-btn:hover { background:rgba(232,25,44,0.16);border-color:rgba(232,25,44,0.7); }
  .img-file-name {
    font-size: 0.78rem; color: var(--muted);
    background: rgba(255,255,255,0.03); border:1px solid var(--border);
    border-radius: 8px; padding: 8px 12px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px;
  }
  .img-uploading {
    font-size: 0.78rem; color: var(--gold);
    display: flex; align-items: center; gap: 7px;
  }
  .img-upload-spinner {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid rgba(201,169,110,0.3);
    border-top-color: var(--gold);
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .img-upload-success { font-size:0.78rem;color:#34d399;display:flex;align-items:center;gap:6px; }

  .form-card { background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:40px;margin-bottom:56px;box-shadow:0 32px 80px rgba(0,0,0,0.4);position:relative;overflow:hidden; }
  .form-card::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--news-red),var(--news-blue),var(--news-red)); }
  .form-header { display:flex;align-items:center;gap:16px;margin-bottom:32px; }
  .form-icon-wrap { width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,var(--news-red) 0%,#a80f1e 100%);display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#fff;flex-shrink:0;box-shadow:0 8px 24px rgba(232,25,44,0.35); }
  .form-title { font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:700;color:var(--text); }
  .form-subtitle { font-size:0.75rem;color:var(--muted);margin-top:3px;letter-spacing:0.07em;text-transform:uppercase; }
  .form-grid { display:grid;grid-template-columns:1fr 1fr;gap:16px; }
  @media(max-width:640px){ .form-grid{grid-template-columns:1fr;} .img-upload-area{flex-direction:column;align-items:center;} }
  .field-wrap { position:relative; }
  .field-label { display:block;font-size:0.68rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:var(--muted);margin-bottom:8px; }
  .field-input { width:100%;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:13px 18px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:0.93rem;outline:none;transition:border-color 0.2s,background 0.2s,box-shadow 0.2s; }
  .field-input::placeholder { color:rgba(100,116,139,0.55); }
  .field-input:focus { border-color:var(--news-red);background:rgba(232,25,44,0.04);box-shadow:0 0 0 3px rgba(232,25,44,0.1); }
  .form-actions { grid-column:1/-1;display:flex;gap:12px;margin-top:8px; }
  .btn-submit { flex:1;padding:15px 24px;background:linear-gradient(135deg,var(--news-red) 0%,#a80f1e 100%);border:none;border-radius:12px;color:#fff;font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity 0.2s,transform 0.15s,box-shadow 0.2s;box-shadow:0 8px 24px rgba(232,25,44,0.3); }
  .btn-submit:hover { opacity:0.91;transform:translateY(-1px); }
  .btn-submit:disabled { opacity:0.5;cursor:not-allowed;transform:none; }
  .btn-cancel { padding:15px 22px;background:var(--glass);border:1px solid var(--border);border-radius:12px;color:var(--muted);font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all 0.2s; }
  .btn-cancel:hover { border-color:var(--border-hi);color:var(--text); }
  .main { position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:44px 40px 80px; }
  .section-head { display:flex;align-items:center;justify-content:space-between;margin-bottom:28px; }
  .section-title { font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--text);white-space:nowrap;display:flex;align-items:center;gap:10px; }
  .section-title::before { content:'';display:inline-block;width:4px;height:22px;background:linear-gradient(180deg,var(--news-red),var(--news-blue));border-radius:4px; }
  .section-line { flex:1;height:1px;background:var(--border);margin:0 16px; }
  .section-count { font-size:0.72rem;font-weight:700;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap; }
  .cards-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px; }
  .member-card { background:var(--surface);border:1px solid var(--border);border-radius:22px;overflow:visible;box-shadow:0 4px 24px rgba(0,0,0,0.3);transition:border-color 0.3s,box-shadow 0.3s; }
  .member-card:hover { border-color:rgba(232,25,44,0.3);box-shadow:0 16px 48px rgba(0,0,0,0.5),0 0 0 1px rgba(232,25,44,0.1); }
  .card-banner { height:110px;border-radius:22px 22px 0 0;position:relative;background:linear-gradient(135deg,#1a0508 0%,#0d1524 60%,#050d1f 100%);overflow:hidden; }
  .card-banner::after { content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(232,25,44,0.2),rgba(26,111,196,0.15)); }
  .card-banner-pattern { position:absolute;inset:0;opacity:0.06;background-image:repeating-linear-gradient(45deg,#e8192c 0,#e8192c 1px,transparent 0,transparent 50%);background-size:22px 22px; }
  .card-banner-logo { position:absolute;bottom:8px;right:12px;opacity:0.18;z-index:1;height:28px;width:auto;object-fit:contain;filter:grayscale(1) brightness(2); }
  .card-avatar-wrap { display:flex;justify-content:center;margin-top:-54px;position:relative;z-index:10; }
  .card-avatar { width:108px;height:108px;border-radius:50%;object-fit:cover;object-position:center top;border:4px solid var(--surface);box-shadow:0 0 0 2.5px var(--news-red),0 8px 32px rgba(0,0,0,0.55);display:block;background:var(--surface); }
  .card-body { padding:14px 24px 28px;text-align:center; }
  .card-name { font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--text);letter-spacing:-0.01em;margin-top:10px; }
  .card-role { display:inline-block;margin-top:8px;font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#fff;background:linear-gradient(135deg,var(--news-red),#a80f1e);border-radius:100px;padding:4px 14px; }
  .card-city { display:flex;align-items:center;justify-content:center;gap:6px;margin-top:12px;font-size:0.83rem;color:var(--muted); }
  .card-city svg { color:var(--news-blue);font-size:0.75rem; }
  .card-divider { height:1px;background:var(--border);margin:20px 0; }
  .card-actions { display:flex;gap:10px;justify-content:center; }
  .btn-icon { display:flex;align-items:center;gap:7px;padding:10px 20px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.78rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;border:1px solid;cursor:pointer;transition:all 0.2s; }
  .btn-edit { background:rgba(251,191,36,0.08);border-color:rgba(251,191,36,0.28);color:var(--yellow); }
  .btn-edit:hover { background:rgba(251,191,36,0.18);border-color:rgba(251,191,36,0.55);transform:translateY(-1px); }
  .btn-delete { background:rgba(244,63,94,0.08);border-color:rgba(244,63,94,0.28);color:var(--red); }
  .btn-delete:hover { background:rgba(244,63,94,0.18);border-color:rgba(244,63,94,0.55);transform:translateY(-1px); }
  .empty-state { grid-column:1/-1;text-align:center;padding:80px 24px; }
  .empty-icon { font-size:3rem;opacity:0.12;margin-bottom:20px; }
  .empty-text { font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--muted); }
  .empty-sub { font-size:0.83rem;color:rgba(100,116,139,0.55);margin-top:8px; }
  .toast { position:fixed;bottom:32px;right:32px;z-index:300;background:var(--surface);border:1px solid rgba(232,25,44,0.35);border-radius:14px;padding:15px 22px;display:flex;align-items:center;gap:12px;box-shadow:0 16px 40px rgba(0,0,0,0.55);font-size:0.88rem;font-weight:500;color:var(--text); }
  .toast-icon { color:var(--news-red);font-size:1rem;flex-shrink:0; }
  .footer { position:relative;z-index:1;border-top:1px solid var(--border);padding:24px 40px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;background:rgba(8,12,20,0.6); }
  .footer-copy { font-size:0.75rem;color:var(--muted);letter-spacing:0.04em; }
  .footer-copy span { color:var(--news-red);font-weight:700; }
  .footer-socials { display:flex;gap:8px; }
  @media(max-width:768px){ .header{padding:12px 16px;} .main{padding:24px 16px 60px;} .form-card{padding:24px 18px;} .footer{padding:20px 16px;} }
  @media(max-width:520px){ .header-count{display:none;} }
`;

const SOCIALS = [
  { cls:"fb", icon:<FaFacebookF />,  href:"https://www.facebook.com/profile.php?id=100089941361341" },
  { cls:"ig", icon:<FaInstagram />,  href:"https://www.instagram.com/jee_india_news?igsh=MWlnMXAzbWp6YjRj" },
  { cls:"tw", icon:<FaTwitter />,    href:"https://x.com/Jee_indianews" },
  { cls:"yt", icon:<FaYoutube />,    href:"https://youtube.com/@jeeindianews?si=y-DdUblyaBgJPXha" },
  { cls:"wa", icon:<FaWhatsapp />,   href:"https://chat.whatsapp.com/EmfVuYpXk749Y0NUKqVbSw" },
];

const LOGO_URL = "/logo.png";
const TICKER_ITEMS = [
  "JEE इंडिया NEWS — आपका विश्वसनीय समाचार स्रोत",
  "ताज़ा खबरें, सबसे पहले",
  "देश-विदेश की हर खबर अब हिंदी में",
  "JEE India News — Breaking News 24x7",
  "सच दिखाना हमारा धर्म है",
];

// ✅ Password yahan badlo
const ADMIN_PASSWORD = "jee@admin123";

/* ── Toast ── */
function Toast({ message }) {
  return (
    <motion.div className="toast"
      initial={{opacity:0,y:20,scale:0.95}} animate={{opacity:1,y:0,scale:1}}
      exit={{opacity:0,y:12,scale:0.95}} transition={{duration:0.25}}>
      <FaCheck className="toast-icon"/> {message}
    </motion.div>
  );
}

/* ── Ticker ── */
function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-label">BREAKING</div>
      <div style={{overflow:"hidden",flex:1}}>
        <div className="ticker-track">
          {items.map((item,i) => <span key={i}>{item}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ── Admin Login Modal ── */
function AdminLoginModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <motion.div className="admin-login-overlay"
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="admin-login-box"
        initial={{opacity:0,y:32,scale:0.96}} animate={{opacity:1,y:0,scale:1}}
        exit={{opacity:0,y:20,scale:0.96}} transition={{duration:0.3,ease:[0.22,1,0.36,1]}}>
        <button className="admin-login-close" onClick={onClose}><FaTimes/></button>
        <div className="admin-lock-icon"><FaLock/></div>
        <h2>Admin Access</h2>
        <p>Sirf authorized members hi team manage kar sakte hain</p>
        <form onSubmit={handleLogin}>
          <div className="admin-login-field">
            <label className="admin-login-label">Admin Password</label>
            <input className={`admin-login-input${error?" error":""}`}
              type="password" placeholder="Password dalein…"
              value={password} onChange={e=>setPassword(e.target.value)} autoFocus/>
            {error && <span className="admin-error-msg">❌ Galat password. Dobara try karein.</span>}
          </div>
          <button type="submit" className="admin-login-submit">
            <FaUnlock/> Login
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ── Image Upload Field ── */
function ImageUploadField({ preview, onUpload, uploading, uploadDone }) {
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await onUpload(file);
  };

  return (
    <div className="img-upload-area">
      {/* Preview circle */}
      <div className="img-preview-box">
        {preview ? (
          <img src={preview} alt="Preview"/>
        ) : (
          <div className="img-preview-placeholder">
            <FaImage/>
            <span>Photo</span>
          </div>
        )}
      </div>

      {/* Upload controls */}
      <div className="img-upload-right">
        <div className="img-upload-label-text">Profile Photo</div>

        <label className="img-choose-btn" onClick={()=>fileRef.current.click()}>
          <FaCamera/> Photo Select Karo
        </label>
        <input
          ref={fileRef}
          className="img-file-input"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />

        {/* Status */}
        {uploading && (
          <div className="img-uploading">
            <div className="img-upload-spinner"/>
            Upload ho raha hai…
          </div>
        )}
        {!uploading && uploadDone && preview && (
          <div className="img-upload-success">
            <FaCheck/> Image upload ho gayi ✓
          </div>
        )}
        {!uploading && !uploadDone && preview && (
          <div className="img-file-name">Preview ready</div>
        )}
      </div>
    </div>
  );
}

/* ── Member Card ── */
function MemberCard({ member, index, onEdit, onDelete, isAdmin }) {
  return (
    <motion.div className="member-card"
      initial={{opacity:0,y:28}} animate={{opacity:1,y:0}}
      exit={{opacity:0,scale:0.94}}
      transition={{delay:index*0.07,duration:0.38,ease:[0.22,1,0.36,1]}}
      whileHover={{y:-6,transition:{duration:0.2}}}>

      <div className="card-banner">
        <div className="card-banner-pattern"/>
        <img src={LOGO_URL} alt="" className="card-banner-logo"
          onError={e=>{e.target.style.display="none"}}/>
      </div>

      <div className="card-avatar-wrap">
        <img className="card-avatar" src={member.image} alt={member.name}
          onError={e=>{
            e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a0508&color=e8192c&size=200&bold=true`;
          }}/>
      </div>

      <div className="card-body">
        <h2 className="card-name">{member.name}</h2>
        <span className="card-role">{member.designation}</span>
        <div className="card-city"><FaMapMarkerAlt/><span>{member.city}</span></div>
        {isAdmin && (
          <>
            <div className="card-divider"/>
            <div className="card-actions">
              <button className="btn-icon btn-edit" onClick={()=>onEdit(member)}><FaEdit/> Edit</button>
              <button className="btn-icon btn-delete" onClick={()=>onDelete(member._id)}><FaTrash/> Remove</button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main App ── */
export default function App() {
  const [members,        setMembers]        = useState([]);
  const [search,         setSearch]         = useState("");
  const [editId,         setEditId]         = useState(null);
  const [toast,          setToast]          = useState(null);
  const [isAdmin,        setIsAdmin]        = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Form state
  const [formData,    setFormData]    = useState({ name:"", designation:"", city:"" });
  const [imageUrl,    setImageUrl]    = useState("");   // final URL saved to DB
  const [imagePreview, setImagePreview] = useState(""); // shown in UI
  const [uploading,   setUploading]   = useState(false);
  const [uploadDone,  setUploadDone]  = useState(false);

  useEffect(() => { fetchMembers(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 3000); };
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/team`);
      setMembers(res.data);
    } catch(err){ console.error(err); }
  };

  const handleChange = (e) =>
    setFormData(prev=>({...prev,[e.target.name]:e.target.value}));

  // Image upload to backend
  const handleImageUpload = async (file) => {
    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);
    setUploadDone(false);
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await axios.post(`${BASE_URL}/api/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(res.data.url);   // server URL store karo
      setUploadDone(true);
    } catch(err) {
      console.error(err);
      showToast("Image upload fail hui, dobara try karo");
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({name:"",designation:"",city:""});
    setImageUrl("");
    setImagePreview("");
    setUploadDone(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) { showToast("Pehle photo select karein"); return; }
    try {
      const payload = { ...formData, image: imageUrl };
      if (editId) {
        await axios.put(`${BASE_URL}/api/team/${editId}`, payload);
        showToast("Member update ho gaya ✓");
      } else {
        await axios.post(`${BASE_URL}/api/team`, payload);
        showToast("Member add ho gaya ✓");
      }
      resetForm();
      fetchMembers();
    } catch(err){ console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/team/${id}`);
      fetchMembers(); showToast("Member remove ho gaya");
    } catch(err){ console.error(err); }
  };

  const handleEdit = (member) => {
    setEditId(member._id);
    setFormData({name:member.name, designation:member.designation, city:member.city});
    setImageUrl(member.image);
    setImagePreview(member.image);
    setUploadDone(true);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const handleLogout = () => {
    setIsAdmin(false); resetForm(); showToast("Logout ho gaye");
  };

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{css}</style>
      <div className="root-bg">

        {/* HEADER */}
        <header className="header">
          <div className="header-brand">
            <img src={LOGO_URL} alt="Logo" className="header-logo"
              onError={e=>{e.target.style.display="none"}}/>
            <div className="header-brand-text">
              <h1><span className="red">JEE</span> <span className="blue">इंडिया</span> NEWS</h1>
              <small>Management Dashboard</small>
            </div>
          </div>
          <div className="header-socials">
            {SOCIALS.map(s=>(
              <a key={s.cls} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`social-btn ${s.cls}`}>{s.icon}</a>
            ))}
            <div className="social-divider"/>
            <div className="header-count">{members.length} Members</div>
          </div>
          <div className="search-wrap">
            <FaSearch className="search-icon"/>
            <input className="search-input" type="text"
              placeholder="Search by name…" value={search}
              onChange={e=>setSearch(e.target.value)}/>
          </div>
          {isAdmin ? (
            <button className="admin-btn active" onClick={handleLogout}>
              <FaSignOutAlt/> Logout
            </button>
          ) : (
            <button className="admin-btn locked" onClick={()=>setShowLoginModal(true)}>
              <FaLock/> Admin
            </button>
          )}
        </header>

        <Ticker/>

        <main className="main">

          {/* ADMIN PANEL */}
          <AnimatePresence>
            {isAdmin && (
              <motion.div
                initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}}
                exit={{opacity:0,height:0}} transition={{duration:0.4,ease:[0.22,1,0.36,1]}}>

                <div className="admin-banner">
                  <div className="admin-banner-left">
                    <div className="admin-banner-dot"/>
                    <div className="admin-banner-text">
                      <strong>Admin Mode Active</strong>
                      <span>Team members add, edit aur delete kar sakte hain</span>
                    </div>
                  </div>
                  <button className="admin-logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt/> Logout
                  </button>
                </div>

                <motion.div className="form-card"
                  initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
                  transition={{delay:0.1,duration:0.4,ease:[0.22,1,0.36,1]}}>

                  <div className="form-header">
                    <div className="form-icon-wrap">{editId?<FaEdit/>:<FaPlus/>}</div>
                    <div>
                      <div className="form-title">{editId?"Update Member":"Add New Member"}</div>
                      <div className="form-subtitle">{editId?"Editing existing record":"Neeche details bharo"}</div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-grid">

                      {/* ── Image Upload ── */}
                      <ImageUploadField
                        preview={imagePreview}
                        onUpload={handleImageUpload}
                        uploading={uploading}
                        uploadDone={uploadDone}
                      />

                      {/* ── Text Fields ── */}
                      {[
                        {name:"name",        label:"Full Name",    placeholder:"e.g. Aryan Sharma"},
                        {name:"designation", label:"Designation",  placeholder:"e.g. Senior Reporter"},
                        {name:"city",        label:"City",         placeholder:"e.g. Mumbai"},
                      ].map(field=>(
                        <div className="field-wrap" key={field.name}>
                          <label className="field-label">{field.label}</label>
                          <input className="field-input" type="text" name={field.name}
                            placeholder={field.placeholder} value={formData[field.name]}
                            onChange={handleChange} required/>
                        </div>
                      ))}

                      <div className="form-actions">
                        <button type="submit" className="btn-submit" disabled={uploading}>
                          <FaCheck/> {editId?"Save Changes":"Add Member"}
                        </button>
                        {editId && (
                          <button type="button" className="btn-cancel" onClick={resetForm}>
                            <FaTimes/> Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TEAM GRID */}
          <div className="section-head">
            <span className="section-title">Our Team</span>
            <div className="section-line"/>
            <span className="section-count">{filtered.length} shown</span>
          </div>

          <div className="cards-grid">
            <AnimatePresence mode="popLayout">
              {filtered.length===0 ? (
                <motion.div className="empty-state" key="empty"
                  initial={{opacity:0}} animate={{opacity:1}}>
                  <div className="empty-icon">◈</div>
                  <div className="empty-text">
                    {search?"No members match your search":"No team members yet"}
                  </div>
                  <div className="empty-sub">
                    {search?"Try a different name":isAdmin?"Form se add karo":"Admin se contact karein"}
                  </div>
                </motion.div>
              ):(
                filtered.map((member,i)=>(
                  <MemberCard key={member._id} member={member} index={i}
                    onEdit={handleEdit} onDelete={handleDelete} isAdmin={isAdmin}/>
                ))
              )}
            </AnimatePresence>
          </div>
        </main>

        <footer className="footer">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span>JEE इंडिया NEWS</span> — All rights reserved
          </p>
          <div className="footer-socials">
            {SOCIALS.map(s=>(
              <a key={s.cls} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`social-btn ${s.cls}`}>{s.icon}</a>
            ))}
          </div>
        </footer>

        <AnimatePresence>
          {toast && <Toast key="toast" message={toast}/>}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <AdminLoginModal
            onSuccess={()=>{setIsAdmin(true);setShowLoginModal(false);showToast("Admin panel unlock ho gaya ✓");}}
            onClose={()=>setShowLoginModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
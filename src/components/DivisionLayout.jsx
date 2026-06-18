import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .dp-root {
    --accent: #f7c948;
    --accent-soft: rgba(247, 201, 72, 0.14);
    --accent-border: rgba(247, 201, 72, 0.26);
    --bg: #08090d;
    --panel: #111216;
    --ink: #ffffff;
    --muted: #9a9aa3;
    min-height: 100vh;
    overflow-x: hidden;
    background:
      radial-gradient(circle at 12% 10%, var(--accent-soft), transparent 34%),
      radial-gradient(circle at 88% 12%, rgba(255,255,255,0.06), transparent 28%),
      var(--bg);
    color: var(--ink);
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .dp-root *,
  .dp-root *::before,
  .dp-root *::after {
    box-sizing: border-box;
  }
  .dp-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 20px 40px;
    background: color-mix(in srgb, var(--bg) 86%, transparent);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(16px);
  }
  .dp-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .05em;
    text-transform: uppercase;
    transition: .2s;
  }
  .dp-back:hover {
    color: #fff;
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .dp-logo {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .dp-logo span { color: var(--accent); }
  .dp-badge {
    border: 1px solid var(--accent-border);
    background: var(--accent-soft);
    color: var(--accent);
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .12em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .dp-hero {
    max-width: 1300px;
    margin: 0 auto;
    padding: 58px 40px 72px;
    display: grid;
    grid-template-columns: minmax(0, .92fr) minmax(520px, 1.08fr);
    gap: 44px;
    align-items: center;
  }
  .dp-copy { max-width: 660px; }
  .dp-kicker {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--accent-border);
    background: var(--accent-soft);
    color: var(--accent);
    border-radius: 999px;
    padding: 7px 14px;
    margin-bottom: 18px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  .dp-title {
    margin: 0 0 22px;
    font-size: clamp(44px, 5.7vw, 78px);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: .98;
  }
  .dp-title em {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--accent);
  }
  .dp-desc {
    max-width: 590px;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.75;
    font-weight: 400;
  }
  .dp-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  .dp-primary,
  .dp-secondary {
    border-radius: 999px;
    padding: 13px 20px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: .2s;
    border: 1px solid transparent;
    font-family: inherit;
  }
  .dp-primary {
    background: var(--accent);
    color: var(--button-ink, #08090d);
    box-shadow: 0 18px 38px color-mix(in srgb, var(--accent) 24%, transparent);
  }
  .dp-primary:hover { transform: translateY(-2px); }
  .dp-secondary {
    background: rgba(255,255,255,.06);
    color: #fff;
    border-color: rgba(255,255,255,.12);
  }
  .dp-secondary:hover {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .dp-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 12px;
    margin-top: 34px;
  }
  .dp-stat {
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 18px;
    padding: 16px;
  }
  .dp-stat strong {
    display: block;
    color: #fff;
    font-size: 21px;
    letter-spacing: -.03em;
  }
  .dp-stat span {
    display: block;
    margin-top: 4px;
    color: var(--muted);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .dp-showcase {
    height: 680px;
    padding: 14px;
    border-radius: 34px;
    background: linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.04));
    border: 1px solid rgba(255,255,255,.10);
    box-shadow: 0 40px 90px -30px rgba(0,0,0,.65);
  }
  .dp-screen {
    height: 100%;
    display: grid;
    grid-template-columns: 80px 1fr;
    overflow: hidden;
    border-radius: 22px;
    background: #f7f7f8;
    color: #111;
  }
  .dp-side {
    background: #111216;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 24px 0;
  }
  .dp-side-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 13px;
    background: var(--accent);
    color: var(--button-ink, #08090d);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: .04em;
  }
  .dp-side-count {
    margin-top: auto;
    color: var(--accent);
    font-size: 12px;
    font-weight: 900;
  }
  .dp-main {
    min-height: 0;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }
  .dp-main-top {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    margin-bottom: 18px;
  }
  .dp-main-title {
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -.03em;
  }
  .dp-main-meta {
    color: #8a8a91;
    font-size: 12px;
    font-weight: 700;
    text-align: right;
  }
  .dp-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 18px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .dp-tabs::-webkit-scrollbar { display: none; }
  .dp-tab {
    flex: 0 0 auto;
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid #e4e4e7;
    background: #fff;
    color: #63636b;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
  }
  .dp-tab.active {
    background: #111216;
    border-color: #111216;
    color: #fff;
  }
  .dp-grid {
    min-height: 0;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    overflow-y: auto;
    padding-bottom: 18px;
    scrollbar-width: none;
  }
  .dp-grid::-webkit-scrollbar { display: none; }
  .dp-gallery-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border-top: 1px solid #e6e6ea;
    padding-top: 12px;
  }
  .dp-gallery-page {
    color: #8a8a91;
    font-size: 12px;
    font-weight: 800;
  }
  .dp-gallery-actions {
    display: flex;
    gap: 8px;
  }
  .dp-page-btn {
    border: 1px solid #d8d8dd;
    background: #fff;
    color: #111216;
    border-radius: 999px;
    padding: 8px 13px;
    font-size: 11px;
    font-weight: 900;
    font-family: inherit;
    cursor: pointer;
    transition: .2s;
  }
  .dp-page-btn:hover:not(:disabled) {
    border-color: #111216;
    background: #111216;
    color: #fff;
  }
  .dp-page-btn:disabled {
    cursor: not-allowed;
    opacity: .36;
  }
  .dp-card {
    position: relative;
    aspect-ratio: 4/3;
    border-radius: 15px;
    overflow: hidden;
    border: 2px solid transparent;
    background: #e8e8ea;
    cursor: pointer;
    transition: .2s;
  }
  .dp-card:hover {
    transform: scale(.98);
    box-shadow: 0 12px 28px rgba(0,0,0,.14);
  }
  .dp-card.saved {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent);
  }
  .dp-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .dp-card::after {
    content: "View";
    position: absolute;
    right: 10px;
    bottom: 10px;
    border-radius: 999px;
    padding: 6px 11px;
    background: rgba(255,255,255,.9);
    color: #111216;
    font-size: 11px;
    font-weight: 900;
    opacity: 0;
    transform: translateY(6px);
    transition: .2s;
  }
  .dp-card:hover::after {
    opacity: 1;
    transform: translateY(0);
  }
  .dp-empty {
    grid-column: 1 / -1;
    border: 1px dashed #d8d8dd;
    background: #fff;
    border-radius: 18px;
    padding: 92px 24px;
    color: #8a8a91;
    text-align: center;
    font-size: 13px;
  }
  .dp-toast {
    position: fixed;
    top: 32px;
    right: 32px;
    z-index: 100;
    border-radius: 16px;
    padding: 14px 22px;
    background: var(--accent);
    color: var(--button-ink, #08090d);
    box-shadow: 0 18px 42px color-mix(in srgb, var(--accent) 26%, transparent);
    font-size: 13px;
    font-weight: 800;
  }
  .dp-lightbox {
    position: fixed;
    inset: 0;
    z-index: 120;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px;
    background: rgba(3,4,7,.78);
    backdrop-filter: blur(18px);
  }
  .dp-lightbox-panel {
    width: min(1120px, 100%);
    max-height: min(820px, calc(100vh - 56px));
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
    overflow: hidden;
    border-radius: 28px;
    background: #f7f7f8;
    border: 1px solid rgba(255,255,255,.18);
    box-shadow: 0 42px 120px rgba(0,0,0,.5);
  }
  .dp-lightbox-media {
    min-height: 620px;
    background: #07080c;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dp-lightbox-media img {
    width: 100%;
    height: 100%;
    max-height: min(820px, calc(100vh - 56px));
    object-fit: contain;
    display: block;
  }
  .dp-lightbox-info {
    padding: 26px;
    color: #111216;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .dp-lightbox-kicker {
    width: fit-content;
    border-radius: 999px;
    padding: 7px 12px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .dp-lightbox-title {
    margin: 0;
    font-size: 26px;
    line-height: 1.08;
    letter-spacing: -.04em;
  }
  .dp-lightbox-meta {
    color: #696970;
    font-size: 13px;
    line-height: 1.6;
  }
  .dp-lightbox-actions {
    display: grid;
    gap: 10px;
    margin-top: auto;
  }
  .dp-lightbox-btn {
    border: 1px solid #dedee4;
    background: #fff;
    color: #111216;
    border-radius: 14px;
    padding: 12px 14px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: .2s;
  }
  .dp-lightbox-btn:hover {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--accent) 8%, #fff);
  }
  .dp-lightbox-close,
  .dp-lightbox-nav {
    position: absolute;
    border: 1px solid rgba(255,255,255,.22);
    background: rgba(255,255,255,.92);
    color: #111216;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 14px 34px rgba(0,0,0,.20);
  }
  .dp-lightbox-close {
    top: 22px;
    right: 22px;
    width: 42px;
    height: 42px;
    border-radius: 999px;
    font-size: 20px;
  }
  .dp-lightbox-nav {
    top: 50%;
    width: 46px;
    height: 46px;
    border-radius: 999px;
    font-size: 24px;
    transform: translateY(-50%);
  }
  .dp-lightbox-nav.prev { left: 22px; }
  .dp-lightbox-nav.next { right: 22px; }

  @media (max-width: 900px) {
    .dp-nav {
      padding: 14px 16px;
      gap: 12px;
    }
    .dp-back {
      padding: 8px 13px;
      font-size: 10px;
    }
    .dp-logo { font-size: 14px; }
    .dp-badge { display: none; }
    .dp-hero {
      grid-template-columns: 1fr;
      padding: 30px 16px 38px;
      gap: 22px;
    }
    .dp-kicker {
      margin-bottom: 14px;
      font-size: 10px;
    }
    .dp-title {
      font-size: clamp(40px, 13vw, 54px);
      line-height: .96;
      margin-bottom: 16px;
    }
    .dp-desc {
      font-size: 14px;
      line-height: 1.68;
    }
    .dp-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 22px;
    }
    .dp-primary,
    .dp-secondary {
      width: 100%;
      padding: 12px 14px;
      font-size: 12px;
    }
    .dp-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      margin-top: 22px;
    }
    .dp-stat {
      border-radius: 14px;
      padding: 12px 10px;
    }
    .dp-stat strong {
      font-size: 15px;
      line-height: 1.12;
    }
    .dp-stat span {
      font-size: 9px;
    }
    .dp-showcase {
      height: auto;
      min-height: 560px;
      border-radius: 24px;
      padding: 7px;
      box-shadow: 0 28px 70px -34px rgba(0,0,0,.72);
    }
    .dp-screen { grid-template-columns: 1fr; border-radius: 20px; }
    .dp-side { display: none; }
    .dp-main {
      min-height: 546px;
      padding: 15px;
    }
    .dp-main-top {
      align-items: flex-start;
      margin-bottom: 14px;
    }
    .dp-main-title {
      font-size: 20px;
    }
    .dp-main-meta {
      font-size: 11px;
    }
    .dp-tabs {
      margin-bottom: 14px;
      padding-bottom: 2px;
    }
    .dp-tab {
      padding: 8px 14px;
      font-size: 11px;
    }
    .dp-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      padding-bottom: 6px;
    }
    .dp-gallery-footer {
      padding-top: 10px;
    }
    .dp-gallery-page {
      font-size: 11px;
    }
    .dp-page-btn {
      padding: 7px 11px;
      font-size: 10px;
    }
    .dp-card {
      aspect-ratio: 4/3.35;
      border-radius: 13px;
    }
    .dp-lightbox { padding: 14px; }
    .dp-lightbox-panel {
      grid-template-columns: 1fr;
      max-height: calc(100vh - 28px);
      border-radius: 22px;
    }
    .dp-lightbox-media {
      min-height: 0;
      height: min(58vh, 470px);
    }
    .dp-lightbox-media img {
      max-height: min(58vh, 470px);
    }
    .dp-lightbox-info {
      padding: 18px;
      gap: 12px;
    }
    .dp-lightbox-title {
      font-size: 22px;
    }
    .dp-lightbox-actions {
      grid-template-columns: 1fr 1fr;
    }
    .dp-lightbox-close {
      top: 10px;
      right: 10px;
    }
    .dp-lightbox-nav.prev { left: 10px; }
    .dp-lightbox-nav.next { right: 10px; }
  }

  @media (max-width: 520px) {
    .dp-back {
      max-width: 98px;
      overflow: hidden;
      white-space: nowrap;
    }
    .dp-logo {
      font-size: 13px;
      text-align: right;
    }
    .dp-hero {
      padding: 24px 14px 32px;
    }
    .dp-actions {
      grid-template-columns: 1fr;
    }
    .dp-stats {
      grid-template-columns: 1fr;
    }
    .dp-stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .dp-showcase {
      min-height: 520px;
    }
    .dp-main {
      min-height: 506px;
      padding: 13px;
    }
    .dp-main-top {
      display: grid;
      gap: 4px;
    }
    .dp-main-meta {
      text-align: left;
    }
    .dp-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .dp-card {
      aspect-ratio: 16/11;
    }
    .dp-lightbox {
      padding: 10px;
    }
    .dp-lightbox-panel {
      border-radius: 18px;
    }
    .dp-lightbox-media {
      height: 52vh;
    }
    .dp-lightbox-media img {
      max-height: 52vh;
    }
    .dp-lightbox-actions {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 900px) {
    .dp-showcase {
      height: auto;
      min-height: 0;
      padding: 0;
      border-radius: 26px;
      background: rgba(255,255,255,.10);
      box-shadow: 0 28px 80px -40px rgba(0,0,0,.75);
    }
    .dp-screen {
      display: block;
      overflow: visible;
      border-radius: 26px;
      background: #f7f7f8;
    }
    .dp-main {
      height: auto;
      min-height: 0;
      overflow: visible;
      padding: 18px;
    }
    .dp-main-top {
      align-items: center;
      margin-bottom: 16px;
    }
    .dp-tabs {
      margin-bottom: 16px;
    }
    .dp-grid {
      flex: initial;
      overflow: visible;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      padding-bottom: 0;
    }
    .dp-grid .dp-card:first-child {
      grid-column: 1 / -1;
      aspect-ratio: 16/10;
    }
    .dp-card {
      aspect-ratio: 4/3.2;
      border-radius: 16px;
      box-shadow: 0 14px 34px rgba(0,0,0,.10);
    }
    .dp-card::after {
      content: "Open";
      opacity: 1;
      transform: none;
      right: 9px;
      bottom: 9px;
      padding: 6px 10px;
      font-size: 10px;
    }
    .dp-empty {
      padding: 56px 18px;
    }
  }

  @media (max-width: 520px) {
    .dp-showcase {
      border-radius: 22px;
    }
    .dp-screen {
      border-radius: 22px;
    }
    .dp-main {
      padding: 14px;
    }
    .dp-main-top {
      display: grid;
      gap: 4px;
    }
    .dp-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .dp-grid .dp-card:first-child,
    .dp-card {
      aspect-ratio: 16/10.5;
    }
  }

  @media (max-width: 900px) {
    .dp-root {
      background:
        radial-gradient(circle at 18% 0%, var(--accent-soft), transparent 34%),
        linear-gradient(180deg, color-mix(in srgb, var(--bg) 92%, #ffffff 8%) 0%, var(--bg) 58%, #050609 100%);
    }
    .dp-nav {
      background: color-mix(in srgb, var(--bg) 78%, transparent);
    }
    .dp-hero {
      padding-top: 26px;
    }
    .dp-copy {
      max-width: none;
    }
    .dp-kicker {
      box-shadow: 0 10px 28px color-mix(in srgb, var(--accent) 12%, transparent);
    }
    .dp-title {
      max-width: 12.5ch;
      text-wrap: balance;
    }
    .dp-desc {
      max-width: 100%;
      color: color-mix(in srgb, var(--muted) 88%, #ffffff 12%);
    }
    .dp-stats {
      max-width: 100%;
    }
    .dp-stat {
      background: rgba(255,255,255,.075);
      border-color: rgba(255,255,255,.11);
    }
    .dp-showcase {
      border: 1px solid rgba(255,255,255,.14);
      background: linear-gradient(145deg, rgba(255,255,255,.18), rgba(255,255,255,.06));
    }
    .dp-screen {
      background:
        linear-gradient(180deg, #ffffff 0%, #f4f5f7 100%);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.72);
    }
    .dp-main {
      padding: 16px;
    }
    .dp-main-top {
      padding-bottom: 12px;
      border-bottom: 1px solid #e7e8ec;
    }
    .dp-main-title {
      color: #101115;
    }
    .dp-tabs {
      margin-top: 14px;
    }
    .dp-tab.active {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--button-ink, #08090d);
    }
    .dp-card {
      border: 1px solid #e7e8ec;
      background:
        radial-gradient(circle at 50% 35%, #ffffff, #eef0f3);
      box-shadow: 0 16px 36px rgba(12,13,18,.10);
    }
    .dp-card.saved {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent), 0 16px 36px rgba(12,13,18,.10);
    }
  }

  @media (max-width: 520px) {
    .dp-hero {
      padding-top: 22px;
      gap: 20px;
    }
    .dp-title {
      max-width: 100%;
      font-size: clamp(36px, 11.4vw, 48px);
      line-height: 1;
    }
    .dp-actions {
      gap: 9px;
    }
    .dp-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .dp-stat {
      display: block;
      min-height: 76px;
      padding: 11px 8px;
      text-align: left;
    }
    .dp-stat strong {
      font-size: 13px;
      word-break: break-word;
    }
    .dp-stat span {
      margin-top: 6px;
      font-size: 8px;
    }
    .dp-main {
      padding: 12px;
    }
    .dp-main-top {
      padding-bottom: 10px;
    }
    .dp-main-title {
      font-size: 18px;
    }
    .dp-tab {
      border-radius: 999px;
    }
    .dp-grid {
      gap: 10px;
    }
    .dp-grid .dp-card:first-child,
    .dp-card {
      aspect-ratio: 16/10;
      border-radius: 15px;
    }
  }

  @media (max-width: 520px) {
    .dp-workshop .dp-title {
      max-width: 100%;
      font-size: clamp(31px, 9.8vw, 40px);
      letter-spacing: -0.052em;
    }
    .dp-workshop .dp-desc {
      font-size: 13.5px;
      line-height: 1.62;
    }
    .dp-workshop .dp-actions {
      grid-template-columns: 1fr;
    }
    .dp-workshop .dp-stats {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .dp-workshop .dp-stat {
      min-height: 0;
      padding: 13px 12px;
    }
    .dp-workshop .dp-stat strong {
      font-size: 15px;
    }
    .dp-workshop .dp-showcase {
      margin-top: 2px;
    }
    .dp-workshop .dp-main-title {
      font-size: 17px;
    }
    .dp-workshop .dp-main-meta {
      font-size: 10px;
    }
  }

  @media (max-width: 640px) {
    .dp-root {
      width: 100%;
      max-width: 100vw;
    }
    .dp-nav {
      width: 100%;
      min-width: 0;
      padding: 12px 14px;
      gap: 10px;
    }
    .dp-back {
      flex: 0 0 auto;
      max-width: 86px;
      padding: 8px 11px;
      overflow: hidden;
      white-space: nowrap;
    }
    .dp-logo {
      min-width: 0;
      overflow: hidden;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dp-hero {
      width: 100%;
      max-width: 100%;
      padding: 22px 14px 32px;
      gap: 18px;
    }
    .dp-copy,
    .dp-desc,
    .dp-showcase,
    .dp-screen,
    .dp-main {
      min-width: 0;
      width: 100%;
      max-width: 100%;
    }
    .dp-kicker {
      max-width: 100%;
      white-space: normal;
      line-height: 1.25;
    }
    .dp-title {
      max-width: 100%;
      font-size: clamp(32px, 9.8vw, 42px);
      line-height: 1.02;
      overflow-wrap: anywhere;
      text-wrap: balance;
    }
    .dp-title em {
      display: inline;
    }
    .dp-desc {
      font-size: 13.5px;
      line-height: 1.62;
      overflow-wrap: anywhere;
    }
    .dp-actions,
    .dp-stats {
      display: grid;
      grid-template-columns: 1fr;
      width: 100%;
      max-width: 100%;
    }
    .dp-primary,
    .dp-secondary {
      width: 100%;
      min-width: 0;
    }
    .dp-stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 0;
      padding: 13px 12px;
    }
    .dp-stat strong {
      font-size: 15px;
      line-height: 1.15;
    }
    .dp-stat span {
      flex: 0 0 auto;
      margin-top: 0;
      font-size: 8px;
    }
    .dp-showcase {
      margin-top: 0;
      border-radius: 22px;
      overflow: hidden;
    }
    .dp-screen {
      border-radius: 22px;
      overflow: hidden;
    }
    .dp-main {
      padding: 12px;
    }
    .dp-main-top {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3px;
      align-items: start;
    }
    .dp-main-title,
    .dp-main-meta {
      min-width: 0;
      text-align: left;
    }
    .dp-main-title {
      font-size: 17px;
      overflow-wrap: anywhere;
    }
    .dp-tabs {
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      overscroll-behavior-x: contain;
    }
    .dp-grid {
      grid-template-columns: 1fr;
      gap: 10px;
      width: 100%;
      max-width: 100%;
    }
    .dp-grid .dp-card:first-child,
    .dp-card {
      width: 100%;
      max-width: 100%;
      aspect-ratio: 16 / 10;
      border-radius: 15px;
    }
    .dp-empty {
      padding: 42px 14px;
    }
  }

  @media (max-width: 380px) {
    .dp-title {
      font-size: clamp(29px, 9.2vw, 36px);
    }
    .dp-nav {
      padding-inline: 10px;
    }
    .dp-hero {
      padding-inline: 10px;
    }
    .dp-main {
      padding: 10px;
    }
  }
`;

export default function DivisionLayout({ config }) {
  const itemsPerPage = 9;
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState(config.tabs[0]);
  const [galleryPage, setGalleryPage] = useState(0);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchWorks = async () => {
      const { data, error } = await supabase
        .from("works")
        .select("*")
        .eq("category", config.category)
        .order("order_index");

      if (error) {
        console.error(`Error loading ${config.category} works:`, error.message);
        return;
      }

      if (mounted) {
        setWorks(data || []);
        if (data?.[0]) setSaved([{ id: data[0].id }]);
      }
    };

    fetchWorks();
    return () => { mounted = false; };
  }, [config.category]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const filtered = works.filter((item) => {
    if (activeTab === config.tabs[0]) return true;
    return (item.subcategory || "").toLowerCase().trim() === activeTab.toLowerCase().trim();
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(galleryPage, totalPages - 1);
  const pageStart = safePage * itemsPerPage;
  const visibleWorks = filtered.slice(pageStart, pageStart + itemsPerPage);

  useEffect(() => {
    setGalleryPage(0);
    setSelectedIndex(null);
  }, [activeTab]);

  useEffect(() => {
    if (galleryPage > totalPages - 1) {
      setGalleryPage(Math.max(0, totalPages - 1));
      setSelectedIndex(null);
    }
  }, [galleryPage, totalPages]);

  const toggleSaved = (item) => {
    const exists = saved.some((savedItem) => savedItem.id === item.id);
    if (exists) {
      setSaved(saved.filter((savedItem) => savedItem.id !== item.id));
      showToast("Removed from selection");
    } else {
      setSaved([...saved, { id: item.id }]);
      showToast(config.savedMessage);
    }
  };

  const selectedWork = selectedIndex !== null ? visibleWorks[selectedIndex] : null;
  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const showPrev = () => {
    setSelectedIndex((current) => {
      if (current === null || visibleWorks.length === 0) return null;
      return (current - 1 + visibleWorks.length) % visibleWorks.length;
    });
  };
  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null || visibleWorks.length === 0) return null;
      return (current + 1) % visibleWorks.length;
    });
  };

  return (
    <>
      <style>{css}</style>
      <div
        className={`dp-root dp-${config.category}`}
        style={{
          "--accent": config.accent,
          "--accent-soft": config.accentSoft,
          "--accent-border": config.accentBorder,
          "--bg": config.bg,
          "--muted": config.muted,
          "--button-ink": config.buttonInk || "#08090d",
        }}
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              className="dp-toast"
              initial={{ opacity: 0, y: -18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.94 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="dp-nav">
          <button className="dp-back" onClick={() => navigate("/")}>
            &larr; Back
          </button>
          <div className="dp-logo">
            {config.logoText} <span>{config.logoAccent}</span>
            {config.logoSuffix ? ` ${config.logoSuffix}` : ""}
          </div>
          <div className="dp-badge">{config.badge}</div>
        </nav>

        <main className="dp-hero">
          <motion.div
            className="dp-copy"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dp-kicker">{config.kicker}</div>
            <h1 className="dp-title">
              {config.title} <em>{config.titleAccent}</em>
            </h1>
            <p className="dp-desc">{config.description}</p>

            <div className="dp-actions">
              <button
                className="dp-primary"
                onClick={() => {
                  if (config.primaryHref) {
                    window.open(config.primaryHref, "_blank", "noopener,noreferrer");
                    return;
                  }
                  showToast(config.primaryToast);
                }}
              >
                {config.primaryCta}
              </button>
              <button
                className="dp-secondary"
                onClick={() => document.querySelector(".dp-showcase")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Portfolio
              </button>
            </div>

            <div className="dp-stats">
              {config.stats.map((stat) => (
                <div className="dp-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="dp-showcase"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dp-screen">
              <aside className="dp-side">
                <div className="dp-side-mark">{config.mark}</div>
                <div className="dp-side-count">{saved.length}</div>
              </aside>

              <section className="dp-main">
                <div className="dp-main-top">
                  <h2 className="dp-main-title">{config.galleryTitle}</h2>
                  <span className="dp-main-meta">{filtered.length} curated items</span>
                </div>

                <div className="dp-tabs">
                  {config.tabs.map((tab) => (
                    <button
                      className={`dp-tab ${activeTab === tab ? "active" : ""}`}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="dp-grid">
                  {filtered.length > 0 ? (
                    visibleWorks.map((item, index) => {
                      const isSaved = saved.some((savedItem) => savedItem.id === item.id);
                      return (
                        <button
                          type="button"
                          key={item.id}
                          className={`dp-card ${isSaved ? "saved" : ""}`}
                          onClick={() => openLightbox(index)}
                        >
                          <img src={item.image} alt={item.title || `${config.brand} portfolio`} loading="lazy" />
                        </button>
                      );
                    })
                  ) : (
                    <div className="dp-empty">
                      Belum ada portfolio untuk kategori "{activeTab}".
                    </div>
                  )}
                </div>

                {filtered.length > itemsPerPage && (
                  <div className="dp-gallery-footer">
                    <div className="dp-gallery-page">
                      Slide {safePage + 1} / {totalPages} · {filtered.length} items
                    </div>
                    <div className="dp-gallery-actions">
                      <button
                        type="button"
                        className="dp-page-btn"
                        disabled={safePage === 0}
                        onClick={() => {
                          setSelectedIndex(null);
                          setGalleryPage((page) => Math.max(0, page - 1));
                        }}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="dp-page-btn"
                        disabled={safePage >= totalPages - 1}
                        onClick={() => {
                          setSelectedIndex(null);
                          setGalleryPage((page) => Math.min(totalPages - 1, page + 1));
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </motion.div>
        </main>

        <AnimatePresence>
          {selectedWork && (
            <motion.div
              className="dp-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <button className="dp-lightbox-close" onClick={closeLightbox} aria-label="Close image">
                &times;
              </button>
              {visibleWorks.length > 1 && (
                <>
                  <button className="dp-lightbox-nav prev" onClick={(event) => { event.stopPropagation(); showPrev(); }} aria-label="Previous image">
                    &lsaquo;
                  </button>
                  <button className="dp-lightbox-nav next" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next image">
                    &rsaquo;
                  </button>
                </>
              )}
              <motion.div
                className="dp-lightbox-panel"
                initial={{ scale: 0.96, y: 18 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 18 }}
                transition={{ duration: 0.22 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="dp-lightbox-media">
                  <img src={selectedWork.image} alt={selectedWork.title || `${config.brand} portfolio`} />
                </div>
                <div className="dp-lightbox-info">
                  <div className="dp-lightbox-kicker">
                    {selectedWork.subcategory || config.badge}
                  </div>
                  <h2 className="dp-lightbox-title">
                    {selectedWork.title || `${config.brand} Portfolio`}
                  </h2>
                  <p className="dp-lightbox-meta">
                    {selectedWork.meta || `A curated portfolio item from ${config.brand}.`}
                  </p>
                  <div className="dp-lightbox-actions">
                    <button className="dp-lightbox-btn" onClick={() => toggleSaved(selectedWork)}>
                      {saved.some((item) => item.id === selectedWork.id) ? "Remove from selection" : "Save to selection"}
                    </button>
                    <button className="dp-lightbox-btn" onClick={closeLightbox}>
                      Back to gallery
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

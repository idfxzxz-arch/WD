import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .wo-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #fbf7f1;
    color: #211916;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }
  .wo-root::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 12% 8%, rgba(204, 160, 106, 0.20), transparent 34%),
      radial-gradient(circle at 90% 18%, rgba(246, 220, 208, 0.55), transparent 32%),
      linear-gradient(180deg, rgba(255,255,255,0.64), rgba(251,247,241,0));
  }
  .wo-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 20px 40px;
    border-bottom: 1px solid rgba(76,49,37,0.08);
    position: sticky;
    top: 0;
    background: rgba(251,247,241,0.84);
    backdrop-filter: blur(16px);
    z-index: 50;
  }
  .wo-back {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .05em;
    text-transform: uppercase;
    color: #8a7366;
    cursor: pointer;
    padding: 8px 18px;
    border: 1px solid rgba(76,49,37,0.12);
    border-radius: 100px;
    background: rgba(255,255,255,0.56);
    transition: .2s;
  }
  .wo-back:hover {
    color: #211916;
    border-color: #c89f67;
    background: #fff;
  }
  .wo-nav-logo {
    font-weight: 800;
    font-size: 18px;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .wo-nav-logo span { color: #b88446; }
  .wo-nav-badge {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #8a5e2d;
    background: rgba(200,159,103,0.14);
    border: 1px solid rgba(200,159,103,0.22);
    padding: 8px 14px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .wo-hero {
    max-width: 1300px;
    margin: 0 auto;
    padding: 56px 40px 72px;
    display: grid;
    grid-template-columns: minmax(0, .9fr) minmax(520px, 1.1fr);
    gap: 42px;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  .wo-copy { max-width: 640px; }
  .wo-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.68);
    border: 1px solid rgba(200,159,103,0.26);
    padding: 7px 14px;
    color: #9f6b31;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 16px;
    border-radius: 100px;
  }
  .wo-title {
    font-size: clamp(46px, 6vw, 82px);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 0.98;
    margin: 0 0 22px;
  }
  .wo-title em {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    color: #b88446;
  }
  .wo-desc {
    color: #67564d;
    font-size: 16px;
    line-height: 1.75;
    font-weight: 400;
    max-width: 560px;
  }
  .wo-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  .wo-primary,
  .wo-secondary {
    border-radius: 999px;
    padding: 13px 20px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: .02em;
    cursor: pointer;
    transition: .2s;
    border: 1px solid transparent;
  }
  .wo-primary {
    background: #211916;
    color: #fff;
    box-shadow: 0 18px 38px rgba(33,25,22,.18);
  }
  .wo-primary:hover {
    transform: translateY(-2px);
    background: #3a2b25;
  }
  .wo-secondary {
    background: rgba(255,255,255,.6);
    color: #211916;
    border-color: rgba(76,49,37,.14);
  }
  .wo-secondary:hover {
    background: #fff;
    border-color: #c89f67;
  }
  .wo-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 12px;
    margin-top: 34px;
    max-width: 560px;
  }
  .wo-stat {
    background: rgba(255,255,255,.62);
    border: 1px solid rgba(76,49,37,.09);
    border-radius: 18px;
    padding: 16px;
  }
  .wo-stat strong {
    display: block;
    font-size: 22px;
    letter-spacing: -.03em;
    color: #211916;
  }
  .wo-stat span {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    color: #8a7366;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .08em;
  }
  .wo-gallery-frame {
    width: 100%;
    min-height: 680px;
    background:
      linear-gradient(135deg, rgba(255,255,255,.94), rgba(239,228,214,.78)),
      radial-gradient(circle at 78% 12%, rgba(200,159,103,.18), transparent 34%);
    border-radius: 34px;
    padding: 12px;
    border: 1px solid rgba(76,49,37,0.10);
    box-shadow: 0 42px 100px -34px rgba(89,62,45,0.42);
  }
  .wo-gallery-screen {
    background: rgba(255,253,249,.92);
    width: 100%;
    height: 100%;
    min-height: 656px;
    border-radius: 26px;
    color: #1c1c1e;
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
    position: relative;
  }
  .wo-sidebar {
    display: none;
    background: #2a201c;
    border-right: 1px solid rgba(76,49,37,0.08);
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
    gap: 28px;
  }
  .wo-side-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    color: rgba(255,255,255,.58);
    cursor: pointer;
    transition: 0.2s;
  }
  .wo-side-icon.active {
    background: #c89f67;
    color: #211916;
  }
  .wo-main {
    padding: 26px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }
  .wo-main-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 18px;
    margin-bottom: 22px;
  }
  .wo-main-title {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: #211916;
  }
  .wo-main-meta {
    font-size: 12px;
    color: #9b897f;
    font-weight: 700;
    text-align: right;
  }
  .wo-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 22px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .wo-tabs::-webkit-scrollbar { display: none; }
  .wo-tab {
    padding: 10px 18px;
    font-size: 12px;
    font-weight: 800;
    border-radius: 999px;
    background: rgba(255,255,255,.78);
    color: #7a665b;
    border: 1px solid rgba(76,49,37,.12);
    cursor: pointer;
    transition: 0.15s;
    white-space: nowrap;
  }
  .wo-tab.active {
    background: #211916;
    color: #fff;
    border-color: #211916;
  }
  .wo-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-auto-rows: 118px;
    grid-auto-flow: dense;
    gap: 14px;
    overflow-y: auto;
    flex: 1;
    padding: 2px 2px 6px;
    scrollbar-width: none;
  }
  .wo-grid::-webkit-scrollbar { display: none; }
  .wo-card {
    position: relative;
    background: #efe4d6;
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.62);
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    grid-column: span 3;
    grid-row: span 2;
    display: flex;
    box-shadow: 0 18px 44px rgba(89,62,45,.12);
  }
  .wo-card:first-child {
    grid-column: span 6;
    grid-row: span 3;
  }
  .wo-card:nth-child(2),
  .wo-card:nth-child(3) {
    grid-column: span 3;
    grid-row: span 2;
  }
  .wo-card:nth-child(4) {
    grid-column: span 6;
    grid-row: span 2;
  }
  .wo-card:nth-child(5),
  .wo-card:nth-child(6) {
    grid-column: span 3;
    grid-row: span 2;
  }
  .wo-card:nth-child(8n+7) {
    grid-column: span 2;
    grid-row: span 2;
  }
  .wo-card:nth-child(8n+8) {
    grid-column: span 4;
    grid-row: span 2;
  }
  .wo-card:nth-child(8n+9),
  .wo-card:nth-child(8n+10) {
    grid-column: span 3;
    grid-row: span 2;
  }
  .wo-card:nth-child(8n+11) {
    grid-column: span 6;
    grid-row: span 3;
  }
  .wo-card:nth-child(8n+12),
  .wo-card:nth-child(8n+13) {
    grid-column: span 3;
    grid-row: span 2;
  }
  .wo-card:nth-child(8n+14) {
    grid-column: span 6;
    grid-row: span 2;
  }
  .wo-card:hover {
    transform: translateY(-3px);
    border-color: rgba(200,159,103,.7);
    box-shadow: 0 24px 58px rgba(89,62,45,.18);
  }
  .wo-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #eee;
    transition: transform .45s ease;
  }
  .wo-card:hover .wo-card-img {
    transform: scale(1.035);
  }
  .wo-card-info {
    position: absolute;
    inset: auto 0 0;
    z-index: 2;
    padding: 42px 18px 16px;
    color: #fff;
    background: linear-gradient(180deg, transparent, rgba(22,14,10,.78));
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 14px;
  }
  .wo-card-title {
    margin: 0;
    font-size: 14px;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -.02em;
    text-shadow: 0 2px 12px rgba(0,0,0,.28);
  }
  .wo-card-kicker {
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: rgba(255,255,255,.72);
  }
  .wo-card-save {
    flex: none;
    border-radius: 999px;
    padding: 7px 10px;
    background: rgba(255,255,255,.9);
    color: #211916;
    font-size: 10px;
    font-weight: 900;
  }
  .wo-card::after {
    content: "View";
    position: absolute;
    inset: auto 12px 12px auto;
    z-index: 2;
    border-radius: 999px;
    padding: 7px 12px;
    background: rgba(255,255,255,.88);
    color: #211916;
    font-size: 11px;
    font-weight: 800;
    opacity: 0;
    transform: translateY(6px);
    transition: .2s;
    display: none;
  }
  .wo-card:hover::after {
    opacity: 1;
    transform: translateY(0);
  }
  .wo-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 96px 24px;
    color: #9b897f;
    background: #fff;
    border: 1px dashed #e4d6c8;
    border-radius: 18px;
    font-size: 13px;
  }
  .wo-load-more-wrap {
    display: flex;
    justify-content: center;
    padding: 22px 0 4px;
  }
  .wo-load-more {
    border: 1px solid rgba(76,49,37,.14);
    background: #211916;
    color: #fff;
    border-radius: 999px;
    padding: 13px 22px;
    min-width: 190px;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
    box-shadow: 0 18px 38px rgba(33,25,22,.16);
  }
  .wo-load-more:hover {
    transform: translateY(-2px);
    background: #3a2b25;
    box-shadow: 0 24px 50px rgba(33,25,22,.20);
  }
  .wo-load-note {
    display: block;
    margin-top: 8px;
    color: #9b897f;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
  }
  .wo-toast {
    position: fixed;
    top: 32px;
    right: 32px;
    background: #211916;
    color: #fff;
    padding: 14px 24px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 20px 40px rgba(33,25,22,0.2);
    z-index: 100;
  }
  .wo-lightbox {
    position: fixed;
    inset: 0;
    z-index: 120;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px;
    background: rgba(20, 14, 12, .78);
    backdrop-filter: blur(18px);
  }
  .wo-lightbox-panel {
    width: min(1120px, 100%);
    max-height: min(820px, calc(100vh - 56px));
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
    overflow: hidden;
    border-radius: 30px;
    background: #fffdf9;
    border: 1px solid rgba(255,255,255,.35);
    box-shadow: 0 42px 120px rgba(0,0,0,.35);
  }
  .wo-lightbox-media {
    min-height: 620px;
    background: #17110f;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wo-lightbox-media img {
    width: 100%;
    height: 100%;
    max-height: min(820px, calc(100vh - 56px));
    object-fit: contain;
    display: block;
  }
  .wo-lightbox-info {
    padding: 26px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    color: #211916;
  }
  .wo-lightbox-kicker {
    width: fit-content;
    border-radius: 999px;
    padding: 7px 12px;
    background: rgba(200,159,103,.14);
    color: #8a5e2d;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .wo-lightbox-title {
    margin: 0;
    font-size: 26px;
    line-height: 1.08;
    letter-spacing: -.04em;
  }
  .wo-lightbox-meta {
    color: #8a7366;
    font-size: 13px;
    line-height: 1.6;
  }
  .wo-lightbox-actions {
    display: grid;
    gap: 10px;
    margin-top: auto;
  }
  .wo-lightbox-btn {
    border: 1px solid rgba(76,49,37,.12);
    background: #fff;
    color: #211916;
    border-radius: 14px;
    padding: 12px 14px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: .2s;
  }
  .wo-lightbox-btn:hover {
    border-color: #c89f67;
    background: #fbf7f1;
  }
  .wo-lightbox-close,
  .wo-lightbox-nav {
    position: absolute;
    border: 1px solid rgba(255,255,255,.22);
    background: rgba(255,255,255,.90);
    color: #211916;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 14px 34px rgba(0,0,0,.18);
  }
  .wo-lightbox-close {
    top: 22px;
    right: 22px;
    width: 42px;
    height: 42px;
    border-radius: 999px;
    font-size: 20px;
  }
  .wo-lightbox-nav {
    top: 50%;
    width: 46px;
    height: 46px;
    border-radius: 999px;
    font-size: 24px;
    transform: translateY(-50%);
  }
  .wo-lightbox-nav.prev { left: 22px; }
  .wo-lightbox-nav.next { right: 22px; }

  @media (max-width: 900px) {
    .wo-nav {
      padding: 14px 16px;
      gap: 12px;
    }
    .wo-back {
      padding: 8px 13px;
      font-size: 10px;
    }
    .wo-nav-logo { font-size: 14px; }
    .wo-nav-badge { display: none; }
    .wo-hero {
      grid-template-columns: 1fr;
      padding: 30px 16px 38px;
      gap: 22px;
    }
    .wo-tag {
      margin-bottom: 14px;
      font-size: 10px;
    }
    .wo-title {
      font-size: clamp(40px, 13vw, 54px);
      line-height: .96;
      margin-bottom: 16px;
    }
    .wo-desc {
      font-size: 14px;
      line-height: 1.68;
    }
    .wo-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 22px;
    }
    .wo-primary,
    .wo-secondary {
      width: 100%;
      padding: 12px 14px;
      font-size: 12px;
    }
    .wo-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      margin-top: 22px;
    }
    .wo-stat {
      border-radius: 14px;
      padding: 12px 10px;
    }
    .wo-stat strong {
      font-size: 15px;
      line-height: 1.12;
    }
    .wo-stat span {
      font-size: 9px;
    }
    .wo-gallery-frame {
      height: auto;
      min-height: 560px;
      border-radius: 24px;
      padding: 7px;
      box-shadow: 0 28px 70px -34px rgba(89,62,45,0.45);
    }
    .wo-gallery-screen {
      grid-template-columns: 1fr;
      border-radius: 20px;
      min-height: 0;
    }
    .wo-main {
      min-height: 546px;
      padding: 15px;
    }
    .wo-main-header {
      align-items: flex-start;
      margin-bottom: 14px;
    }
    .wo-main-title {
      font-size: 20px;
    }
    .wo-main-meta {
      font-size: 11px;
    }
    .wo-tabs {
      margin-bottom: 14px;
      padding-bottom: 2px;
    }
    .wo-tab {
      padding: 8px 14px;
      font-size: 11px;
    }
    .wo-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-auto-rows: 150px;
      gap: 12px;
      padding-bottom: 6px;
    }
    .wo-card,
    .wo-card:first-child,
    .wo-card:nth-child(2),
    .wo-card:nth-child(3),
    .wo-card:nth-child(4),
    .wo-card:nth-child(5),
    .wo-card:nth-child(6) {
      grid-column: span 1;
      grid-row: span 1;
    }
    .wo-card:first-child {
      grid-column: 1 / -1;
      grid-row: span 2;
    }
    .wo-lightbox { padding: 14px; }
    .wo-lightbox-panel {
      grid-template-columns: 1fr;
      max-height: calc(100vh - 28px);
      border-radius: 22px;
    }
    .wo-lightbox-media {
      min-height: 0;
      height: min(58vh, 470px);
    }
    .wo-lightbox-media img {
      max-height: min(58vh, 470px);
    }
    .wo-lightbox-info {
      padding: 18px;
      gap: 12px;
    }
    .wo-lightbox-title {
      font-size: 22px;
    }
    .wo-lightbox-actions {
      grid-template-columns: 1fr 1fr;
    }
    .wo-lightbox-close {
      top: 10px;
      right: 10px;
    }
    .wo-lightbox-nav.prev { left: 10px; }
    .wo-lightbox-nav.next { right: 10px; }
  }

  @media (max-width: 520px) {
    .wo-nav {
      align-items: center;
    }
    .wo-back {
      max-width: 112px;
      overflow: hidden;
      white-space: nowrap;
    }
    .wo-nav-logo {
      font-size: 13px;
      text-align: right;
    }
    .wo-hero {
      padding: 24px 14px 32px;
    }
    .wo-actions {
      grid-template-columns: 1fr;
    }
    .wo-stats {
      grid-template-columns: 1fr;
    }
    .wo-stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .wo-gallery-frame {
      min-height: 520px;
    }
    .wo-main {
      min-height: 506px;
      padding: 13px;
    }
    .wo-main-header {
      display: grid;
      gap: 4px;
    }
    .wo-main-meta {
      text-align: left;
    }
    .wo-lightbox {
      padding: 10px;
    }
    .wo-lightbox-panel {
      border-radius: 18px;
    }
    .wo-lightbox-media {
      height: 52vh;
    }
    .wo-lightbox-media img {
      max-height: 52vh;
    }
    .wo-lightbox-actions {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 900px) {
    .wo-gallery-frame {
      height: auto;
      min-height: 0;
      padding: 0;
      border-radius: 26px;
      background: rgba(255,255,255,.66);
      box-shadow: 0 28px 80px -42px rgba(89,62,45,.45);
    }
    .wo-gallery-screen {
      display: block;
      overflow: visible;
      border-radius: 26px;
      background: #fffdf9;
    }
    .wo-main {
      height: auto;
      min-height: 0;
      overflow: visible;
      padding: 18px;
    }
    .wo-main-header {
      align-items: center;
      margin-bottom: 16px;
    }
    .wo-tabs {
      margin-bottom: 16px;
    }
    .wo-grid {
      flex: initial;
      overflow: visible;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-auto-rows: 150px;
      gap: 12px;
      padding-bottom: 0;
    }
    .wo-card:first-child {
      grid-column: 1 / -1;
      grid-row: span 2;
    }
    .wo-card {
      border-radius: 16px;
      box-shadow: 0 14px 34px rgba(89,62,45,.12);
    }
    .wo-card::after {
      content: "Open";
      opacity: 1;
      transform: none;
      right: 9px;
      bottom: 9px;
      padding: 6px 10px;
      font-size: 10px;
    }
    .wo-empty {
      padding: 56px 18px;
    }
  }

  @media (max-width: 520px) {
    .wo-gallery-frame {
      border-radius: 22px;
    }
    .wo-gallery-screen {
      border-radius: 22px;
    }
    .wo-main {
      padding: 14px;
    }
    .wo-main-header {
      display: grid;
      gap: 4px;
    }
    .wo-grid {
      grid-template-columns: 1fr;
      grid-auto-rows: 230px;
      gap: 12px;
    }
    .wo-card:first-child,
    .wo-card {
      grid-column: 1 / -1;
      grid-row: span 1;
    }
  }

  @media (max-width: 640px) {
    .wo-root {
      background: #fbf7f1;
    }
    .wo-nav {
      position: sticky;
      top: 0;
      padding: 12px 14px;
      gap: 10px;
    }
    .wo-back {
      width: 42px;
      height: 42px;
      justify-content: center;
      padding: 0;
      border-radius: 999px;
      font-size: 0;
    }
    .wo-back::first-letter {
      font-size: 0;
    }
    .wo-back::before {
      content: "<";
      font-size: 18px;
      line-height: 1;
      color: #211916;
    }
    .wo-nav-logo {
      min-width: 0;
      flex: 1;
      text-align: right;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .wo-hero {
      display: block;
      padding: 24px 14px 34px;
    }
    .wo-copy {
      max-width: none;
    }
    .wo-tag {
      max-width: 100%;
      font-size: 9px;
      letter-spacing: .08em;
      padding: 7px 11px;
      margin-bottom: 13px;
    }
    .wo-title {
      font-size: clamp(38px, 13.4vw, 50px);
      line-height: .98;
      letter-spacing: -.055em;
      margin-bottom: 15px;
    }
    .wo-desc {
      font-size: 14px;
      line-height: 1.7;
      max-width: none;
    }
    .wo-actions {
      grid-template-columns: 1fr;
      margin-top: 22px;
    }
    .wo-primary,
    .wo-secondary {
      min-height: 46px;
    }
    .wo-stats {
      grid-template-columns: 1fr;
      gap: 9px;
      margin: 22px 0 24px;
    }
    .wo-stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 14px;
      border-radius: 16px;
    }
    .wo-gallery-frame {
      width: calc(100vw - 28px);
      margin: 0 auto;
      padding: 0;
      border-radius: 24px;
      background: rgba(255,255,255,.78);
      box-shadow: 0 24px 70px -38px rgba(89,62,45,.52);
    }
    .wo-gallery-screen {
      min-height: 0;
      border-radius: 24px;
      overflow: hidden;
    }
    .wo-main {
      padding: 14px;
    }
    .wo-main-header {
      display: grid;
      gap: 5px;
      align-items: start;
      margin-bottom: 14px;
    }
    .wo-main-title {
      font-size: 22px;
      line-height: 1.1;
    }
    .wo-main-meta {
      text-align: left;
      font-size: 11px;
    }
    .wo-tabs {
      display: flex;
      gap: 8px;
      margin: 0 -14px 14px;
      padding: 0 14px 2px;
      overflow-x: auto;
      scroll-snap-type: x proximity;
    }
    .wo-tab {
      flex: 0 0 auto;
      scroll-snap-align: start;
      padding: 9px 14px;
      font-size: 11px;
    }
    .wo-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      gap: 12px;
      overflow: visible;
      padding: 0;
    }
    .wo-card,
    .wo-card:first-child,
    .wo-card:nth-child(2),
    .wo-card:nth-child(3),
    .wo-card:nth-child(4),
    .wo-card:nth-child(5),
    .wo-card:nth-child(6),
    .wo-card:nth-child(8n+7),
    .wo-card:nth-child(8n+8),
    .wo-card:nth-child(8n+9),
    .wo-card:nth-child(8n+10),
    .wo-card:nth-child(8n+11),
    .wo-card:nth-child(8n+12),
    .wo-card:nth-child(8n+13),
    .wo-card:nth-child(8n+14) {
      grid-column: 1 / -1;
      grid-row: auto;
      min-height: 0;
      aspect-ratio: 4 / 3;
      border-radius: 18px;
    }
    .wo-card:first-child {
      aspect-ratio: 1 / 1.04;
    }
    .wo-card-info {
      padding: 44px 14px 14px;
    }
    .wo-card-title {
      font-size: 13px;
    }
    .wo-load-more-wrap {
      padding-top: 18px;
    }
    .wo-load-more {
      width: 100%;
      min-height: 46px;
    }
    .wo-lightbox {
      align-items: stretch;
      padding: 10px;
    }
    .wo-lightbox-panel {
      width: 100%;
      max-height: calc(100dvh - 20px);
      grid-template-columns: 1fr;
      border-radius: 20px;
    }
    .wo-lightbox-media {
      min-height: 0;
      height: min(58dvh, 430px);
    }
    .wo-lightbox-media img {
      max-height: min(58dvh, 430px);
    }
    .wo-lightbox-info {
      padding: 16px;
      gap: 12px;
    }
    .wo-lightbox-title {
      font-size: 21px;
    }
    .wo-lightbox-actions {
      grid-template-columns: 1fr;
    }
    .wo-lightbox-close {
      top: 12px;
      right: 12px;
      width: 40px;
      height: 40px;
    }
    .wo-lightbox-nav {
      width: 40px;
      height: 40px;
    }
    .wo-toast {
      top: 74px;
      left: 14px;
      right: 14px;
      text-align: center;
      padding: 12px 16px;
    }
  }
`;

const MOMENT_TABS = ["All Moments", "Akad", "Resepsi", "Outdoor"];
const INITIAL_VISIBLE_MOMENTS = 6;
const LOAD_MORE_COUNT = 6;

export default function Wedding() {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState("All Moments");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_MOMENTS);
  const [shortlist, setShortlist] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: worksData } = await supabase
        .from("works")
        .select("*")
        .eq("category", "wedding")
        .order("order_index");

      if (worksData) {
        setWorks(worksData);
      }
    };

    fetchData();
  }, []);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const filteredWorks = works.filter((item) => {
    if (activeTab === "All Moments") return true;
    const sub = item.subcategory?.toLowerCase() || "";
    return sub === activeTab.toLowerCase();
  });
  const visibleWorks = filteredWorks.slice(0, visibleCount);
  const hasMoreWorks = visibleCount < filteredWorks.length;

  const changeTab = (tab) => {
    setActiveTab(tab);
    setVisibleCount(INITIAL_VISIBLE_MOMENTS);
    setSelectedIndex(null);
  };

  const toggleShortlist = (item) => {
    const isExist = shortlist.find((s) => s.id === item.id);
    if (isExist) {
      setShortlist(shortlist.filter((s) => s.id !== item.id));
      triggerToast("Moment removed from selection");
    } else {
      setShortlist([...shortlist, { id: item.id, title: item.title, image: item.image }]);
      triggerToast("Moment saved for inspiration");
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

      <div className="wo-root">
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              className="wo-toast"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
            >
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="wo-nav">
          <button className="wo-back" onClick={() => navigate("/")}>
            &larr; Back to Home
          </button>
          <div className="wo-nav-logo">WD <span>Sky</span> Wedding</div>
          <div className="wo-nav-badge">Wedding Organizer</div>
        </nav>

        <main className="wo-hero">
          <motion.div
            className="wo-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wo-tag">WD Sky Wedding Organizer</div>
            <h1 className="wo-title">
              Elegant wedding, <em>beautifully directed.</em>
            </h1>
            <p className="wo-desc">
              Kami membantu pasangan merancang hari pernikahan yang tenang, rapi,
              dan berkesan. Dari alur acara, koordinasi vendor, hingga detail
              visual, WD Sky Wedding Organizer memastikan setiap momen berjalan
              terarah tanpa menghilangkan rasa personal dari cerita cinta Anda.
            </p>

            <div className="wo-actions">
              <button className="wo-primary" onClick={() => triggerToast("Consultation request noted")}>
                Plan Your Wedding
              </button>
              <button className="wo-secondary" onClick={() => document.querySelector(".wo-gallery-frame")?.scrollIntoView({ behavior: "smooth" })}>
                View Moments
              </button>
            </div>

            <div className="wo-stats">
              <div className="wo-stat">
                <strong>End-to-end</strong>
                <span>Planning</span>
              </div>
              <div className="wo-stat">
                <strong>Vendor</strong>
                <span>Coordination</span>
              </div>
              <div className="wo-stat">
                <strong>Detail</strong>
                <span>Execution</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="wo-gallery-frame"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wo-gallery-screen">
              <div className="wo-sidebar">
                <div className="wo-side-icon active">SKY</div>
                <div className="wo-side-icon" onClick={() => setShortlist([])}>CLR</div>
              </div>

              <div className="wo-main">
                <div className="wo-main-header">
                  <h2 className="wo-main-title">Wedding Moments</h2>
                  <span className="wo-main-meta">
                    Showing {visibleWorks.length} of {filteredWorks.length} photos
                  </span>
                </div>

                <div className="wo-tabs">
                  {MOMENT_TABS.map((tab) => (
                    <button
                      key={tab}
                      className={`wo-tab ${activeTab === tab ? "active" : ""}`}
                      onClick={() => changeTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="wo-grid">
                  {filteredWorks.length > 0 ? (
                    visibleWorks.map((item, index) => {
                      const isSaved = shortlist.some((s) => s.id === item.id);
                      return (
                        <motion.div
                          key={item.id}
                          className="wo-card"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.18) }}
                          onClick={() => openLightbox(index)}
                        >
                          <img
                            src={item.image}
                            className="wo-card-img"
                            alt={item.title || "WD Sky Wedding moment"}
                          />
                          <div className="wo-card-info">
                            <div>
                              <div className="wo-card-kicker">
                                {item.subcategory || "Wedding"}
                              </div>
                              <p className="wo-card-title">
                                {item.title || "WD Sky Wedding Moment"}
                              </p>
                            </div>
                            {isSaved && (
                              <span className="wo-card-save">Saved</span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="wo-empty">
                      Belum ada foto untuk kategori "{activeTab}".
                    </div>
                  )}
                </div>

                {hasMoreWorks && (
                  <div className="wo-load-more-wrap">
                    <div>
                      <button
                        className="wo-load-more"
                        onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
                      >
                        Load More Moments
                      </button>
                      <span className="wo-load-note">
                        {filteredWorks.length - visibleWorks.length} photos remaining
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </main>

        <AnimatePresence>
          {selectedWork && (
            <motion.div
              className="wo-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <button className="wo-lightbox-close" onClick={closeLightbox} aria-label="Close image">
                &times;
              </button>
              {visibleWorks.length > 1 && (
                <>
                  <button className="wo-lightbox-nav prev" onClick={(event) => { event.stopPropagation(); showPrev(); }} aria-label="Previous image">
                    &lsaquo;
                  </button>
                  <button className="wo-lightbox-nav next" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next image">
                    &rsaquo;
                  </button>
                </>
              )}
              <motion.div
                className="wo-lightbox-panel"
                initial={{ scale: 0.96, y: 18 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 18 }}
                transition={{ duration: 0.22 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="wo-lightbox-media">
                  <img src={selectedWork.image} alt={selectedWork.title || "WD Sky Wedding moment"} />
                </div>
                <div className="wo-lightbox-info">
                  <div className="wo-lightbox-kicker">
                    {selectedWork.subcategory || "Wedding Moment"}
                  </div>
                  <h2 className="wo-lightbox-title">
                    {selectedWork.title || "WD Sky Wedding Moment"}
                  </h2>
                  <p className="wo-lightbox-meta">
                    {selectedWork.meta || "A curated wedding moment from WD Sky Wedding Organizer portfolio."}
                  </p>
                  <div className="wo-lightbox-actions">
                    <button className="wo-lightbox-btn" onClick={() => toggleShortlist(selectedWork)}>
                      {shortlist.some((s) => s.id === selectedWork.id) ? "Remove from inspiration" : "Save as inspiration"}
                    </button>
                    <button className="wo-lightbox-btn" onClick={closeLightbox}>
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

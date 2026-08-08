import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, MessageSquare, PenTool, RefreshCw, CheckCircle, X } from "lucide-react";
import { validateName, validateEmail, validatePhoneOptional, validateRequired } from "../../utils/validators";
import startupQuestionImg from "../../assets/design_consultancy/startup_question.png";
import designIdeationImg from "../../assets/design_consultancy/design_ideation.png";
import brandSystemImg from "../../assets/design_consultancy/brand_system.png";

import brandIdentity from "../../assets/design_consultancy/brand_identity_design/Thumbnail.jpg";
import brandManual from "../../assets/design_consultancy/brand_manual_design/Thumbnail.png";
import digitalIllustration from "../../assets/design_consultancy/digital_illustration/Thumbnail.jpg";
import businessCollateral from "../../assets/design_consultancy/Business_collateral_design/Thumbnail.png";
import brandCampaigns from "../../assets/design_consultancy/Brand_Campaigns/Thumbnail.png";
import socialMedia from "../../assets/design_consultancy/Social_Media/Thumbnail.png";
import digitalPainting from "../../assets/design_consultancy/Digital_painting/Thumbnail.jpg";
import websiteUiux from "../../assets/design_consultancy/Website_UiUx_design/Thambnail.png";
import bookMagazine from "../../assets/design_consultancy/Book_magazine_zinedesign/Thumbnail.png";

// Component imports for the modal
import BrandIdentityDesign from "./design_consultancy_pages/BrandIdentityDesign";
import BrandCampaignsDesign from "./design_consultancy_pages/BrandCampaignsDesign";
import BrandManualDesign from "./design_consultancy_pages/BrandManualDesign";
import WebsiteUiUxDesign from "./design_consultancy_pages/WebsiteUiUxDesign";
import BookMagazineZineDesign from "./design_consultancy_pages/BookMagazineZineDesign";
import BusinessCollateralDesign from "./design_consultancy_pages/BusinessCollateralDesign";
import DigitalIllustrationDesign from "./design_consultancy_pages/DigitalIllustrationDesign";
import SocialMediaDesign from "./design_consultancy_pages/SocialMediaDesign";
import DigitalPaintingDesign from "./design_consultancy_pages/DigitalPaintingDesign";
const DesignConsultancy = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [cardsVisible, setCardsVisible] = useState(true);
  const [approachVisible, setApproachVisible] = useState(false);
  const [startupVisible, setStartupVisible] = useState(false);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const approachRef = useRef(null);
  const startupRef = useRef(null);

  /* ── Consult form modal ── */
  const [openConsultForm, setOpenConsultForm] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: "", email: "", phone: "", location: "", message: "" });
  const [consultErrors, setConsultErrors] = useState({});

  /* ── Card expand-on-click (desktop) ── */
  const [expandingCard, setExpandingCard] = useState(null);
  const cardRefs = useRef([]);

  const cards = [
    { title: "BRAND\nIDENTITY\nDESIGN", img: brandIdentity, link: "/design-consultancy/brand-identity-design", component: BrandIdentityDesign },
    { title: "BRAND\nCampaign\nDESIGN", img: brandCampaigns, link: "/design-consultancy/brand-campaigns-design", component: BrandCampaignsDesign },
    { title: "BRAND\nManual\nDESIGN", img: brandManual, link: "/design-consultancy/brand-manual-design", component: BrandManualDesign },
    { title: "Website\nUI/UX\nDESIGN", img: websiteUiux, link: "/design-consultancy/website-uiux-design", component: WebsiteUiUxDesign },
    { title: "Packaging\nDESIGN", img: bookMagazine, link: "/design-consultancy/book-magazine-zine-design", component: BookMagazineZineDesign },
    { title: "Business\nCollateral\nDESIGN", img: businessCollateral, link: "/design-consultancy/business-collateral-design", component: BusinessCollateralDesign },
    { title: "Digital\nIllustrations", img: digitalIllustration, link: "/design-consultancy/digital-illustration-design", component: DigitalIllustrationDesign },
    { title: "Social\nMedia\nDESIGN", img: socialMedia, link: "/design-consultancy/social-media-design", component: SocialMediaDesign },
    { title: "Digital\nPainting", img: digitalPainting, link: "/design-consultancy/digital-painting-design", component: DigitalPaintingDesign },
  ];

  const categories = ["Graphics", "Branding", "Packaging", "Website", "Product"];
  const visibleCards = showAll ? cards : cards.slice(0, 6);

  const approachSteps = [
    {
      icon: MessageSquare,
      title: "Consultation",
      desc: "We listen to your needs, understand your vision, and deliver the best design experience tailored to your goals.",
    },
    {
      icon: PenTool,
      title: "Design & Planning",
      desc: "Our team brainstorms ideas, creates concepts, and crafts custom stylescapes for you to choose from.",
    },
    {
      icon: RefreshCw,
      title: "Design Iterations",
      desc: "Based on your feedback, we refine the design and provide multiple variations until it meets your requirements.",
    },
    {
      icon: CheckCircle,
      title: "Post-Design Support",
      desc: "We deliver all original design files for seamless usability and provide post-delivery support whenever needed.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) setHeaderVisible(true);
            if (entry.target === gridRef.current) setCardsVisible(true);
            if (entry.target === approachRef.current) setApproachVisible(true);
            if (entry.target === startupRef.current) setStartupVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    if (approachRef.current) observer.observe(approachRef.current);
    if (startupRef.current) observer.observe(startupRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Entrance animations ── */
        .dc-header-group {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .dc-header-group.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .dc-header-group.visible .dc-stagger-1 { animation: dc-fadeUp 0.7s 0.1s cubic-bezier(.16,1,.3,1) both; }
        .dc-header-group.visible .dc-stagger-2 { animation: dc-fadeUp 0.7s 0.25s cubic-bezier(.16,1,.3,1) both; }
        .dc-header-group.visible .dc-stagger-3 { animation: dc-fadeUp 0.7s 0.4s cubic-bezier(.16,1,.3,1) both; }
        .dc-header-group.visible .dc-stagger-4 { animation: dc-fadeUp 0.7s 0.55s cubic-bezier(.16,1,.3,1) both; }

        @keyframes dc-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Title box ── */
        .dc-title-box {
          display: inline-block;
          padding: 14px 44px;
        }

        /* ── Shimmer divider ── */
        .dc-divider {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #f47e82, #fca5a5, #f47e82, transparent);
          background-size: 200% 100%;
          border-radius: 999px;
          animation: dc-shimmer 3s ease-in-out infinite;
        }
        @keyframes dc-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Category tag hover ── */
        .dc-cat-tag {
          cursor: default;
          position: relative;
          display: inline-block;
          transition: color 0.25s ease;
        }
        .dc-cat-tag::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #f47e82;
          transition: width 0.3s ease;
        }
        .dc-cat-tag:hover::after {
          width: 100%;
        }
        .dc-cat-tag:hover {
          color: #f47e82 !important;
        }

        /* ── Grid entrance ── */
        .dc-grid-wrapper {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s 0.2s cubic-bezier(.16,1,.3,1), transform 0.9s 0.2s cubic-bezier(.16,1,.3,1);
        }
        .dc-grid-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Simple Modal ── */
        .dc-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .dc-modal-overlay.active {
          opacity: 1;
          pointer-events: all;
        }
        .dc-modal-content {
          position: relative;
          background: #000;
          border-radius: clamp(12px, 2.5vw, 24px);
          overflow-y: auto;
          overflow-x: hidden;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          box-shadow: 0 25px 80px rgba(0,0,0,0.4);
          transform: scale(0.95);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .dc-modal-overlay.active .dc-modal-content {
          transform: scale(1);
        }
        .dc-modal-content img {
          width: 100%;
          height: auto;
          display: block;
        }
        .dc-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          z-index: 50;
        }
        .dc-modal-close:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        /* ── Card styling ── */
        .dc-card {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: clamp(12px, 2.5vw, 24px);
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .dc-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .dc-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.10) 55%, transparent 100%);
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: clamp(10px, 2vw, 24px);
          transition: background 0.4s ease;
        }
        .dc-card:hover .dc-card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%);
        }
        .dc-card-overlay p {
          color: #fff;
          font-weight: 600;
          font-size: clamp(0.5rem, 1.6vw, 1.2rem);
          text-align: left;
          line-height: 1.35;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          white-space: pre-line;
          letter-spacing: 0.5px;
          transition: transform 0.35s cubic-bezier(.16,1,.3,1);
        }
        .dc-card:hover .dc-card-overlay p {
          transform: translateY(-4px);
        }

        /* ── Explore More button ── */
        .dc-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #f47e82;
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: color 0.3s ease;
          position: relative;
        }
        .dc-explore-btn::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f47e82, #fca5a5);
          transition: width 0.35s ease;
          border-radius: 999px;
        }
        .dc-explore-btn:hover::after {
          width: calc(100% - 44px);
        }
        .dc-explore-btn:hover {
          color: #e06468;
        }
        .dc-arrow-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #f47e82;
          transition: transform 0.4s cubic-bezier(.16,1,.3,1), background 0.3s ease, border-color 0.3s ease;
          color: #f47e82;
        }
        .dc-explore-btn:hover .dc-arrow-circle {
          background: #f47e82;
          border-color: #f47e82;
          color: #fff;
        }
        .dc-explore-btn:hover .dc-arrow-circle svg {
          stroke: #fff;
        }

        /* ══ OUR APPROACH — Dynamic Flow ══ */
        .dc-approach-wrap {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1);
        }
        .dc-approach-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dc-approach-bg {
          position: relative;
          padding: clamp(40px, 6vw, 80px) 0;
          overflow: hidden;
        }

        /* Subtle radial gradient background */
        .dc-approach-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(244,126,130,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 30%, rgba(252,165,165,0.03) 0%, transparent 70%),
            linear-gradient(180deg, #ffffff 0%, #ffffff 50%, #ffffff 100%);
          pointer-events: none;
        }

        /* Timeline flow container */
        .dc-flow-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Central vertical line (desktop) */
        .dc-flow-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
        }
        .dc-flow-line-inner {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, #fca5a5 10%, #f47e82 50%, #fca5a5 90%, transparent 100%);
          border-radius: 999px;
        }
        .dc-approach-wrap.visible .dc-flow-line-inner {
          animation: dc-lineGrow 1.2s 0.3s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes dc-lineGrow {
          from { transform: scaleY(0); transform-origin: top; }
          to { transform: scaleY(1); transform-origin: top; }
        }

        /* Animated pulse dots on the line */
        .dc-flow-pulse {
          position: absolute;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f47e82;
          transform: translateX(-50%);
          z-index: 3;
        }
        .dc-flow-pulse::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(244,126,130,0.25);
          animation: dc-pulse 2.5s ease-in-out infinite;
        }
        @keyframes dc-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 0; }
        }

        /* Flow step row */
        .dc-flow-row {
          display: flex;
          align-items: center;
          position: relative;
          margin-bottom: clamp(28px, 4vw, 48px);
        }
        .dc-flow-row:last-child {
          margin-bottom: 0;
        }

        /* Step number circle on the timeline */
        .dc-flow-num {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f47e82, #e8656a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
          z-index: 5;
          box-shadow: 0 0 0 6px rgba(244,126,130,0.15), 0 8px 24px rgba(244,126,130,0.25);
          transition: transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s ease;
        }
        .dc-flow-row:hover .dc-flow-num {
          transform: translateX(-50%) scale(1.12);
          box-shadow: 0 0 0 10px rgba(244,126,130,0.18), 0 12px 32px rgba(244,126,130,0.3);
        }

        /* Card sits on left or right of center */
        .dc-flow-card {
          width: calc(50% - 52px);
          background: #fff;
          border-radius: 20px;
          padding: clamp(24px, 3vw, 36px);
          border: 1px solid rgba(244,126,130,0.08);
          position: relative;
          cursor: default;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(.4,0,.2,1), box-shadow 0.5s ease, border-color 0.4s ease;
        }
        .dc-flow-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f47e82, #fca5a5, #f9b5b7);
          border-radius: 20px 20px 0 0;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .dc-flow-card:hover::before {
          opacity: 1;
        }
        .dc-flow-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(244,126,130,0.12), 0 8px 24px rgba(0,0,0,0.04);
          border-color: rgba(244,126,130,0.2);
        }

        /* Left card */
        .dc-flow-row-left .dc-flow-card {
          margin-right: auto;
        }
        /* Right card */
        .dc-flow-row-right .dc-flow-card {
          margin-left: auto;
        }

        /* Connector arm from card to circle */
        .dc-flow-arm {
          position: absolute;
          top: 50%;
          width: 28px;
          height: 2px;
          background: linear-gradient(90deg, rgba(244,126,130,0.3), #f47e82);
          z-index: 2;
        }
        .dc-flow-row-left .dc-flow-arm {
          right: calc(50% - 26px);
          transform: translateY(-50%);
          background: linear-gradient(90deg, rgba(244,126,130,0.15), #f47e82);
        }
        .dc-flow-row-right .dc-flow-arm {
          left: calc(50% - 26px);
          transform: translateY(-50%);
          background: linear-gradient(270deg, rgba(244,126,130,0.15), #f47e82);
        }

        /* Card icon */
        .dc-flow-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(244,126,130,0.08), rgba(252,165,165,0.12));
          color: #f47e82;
          margin-bottom: 16px;
          transition: background 0.4s ease, color 0.4s ease, transform 0.4s cubic-bezier(.16,1,.3,1);
        }
        .dc-flow-card:hover .dc-flow-icon {
          background: linear-gradient(135deg, #f47e82, #fca5a5);
          color: #fff;
          transform: scale(1.1) rotate(-5deg);
        }

        /* Stagger entrance */
        .dc-approach-wrap.visible .dc-flow-step-0 { animation: dc-flowIn 0.7s 0.3s cubic-bezier(.16,1,.3,1) both; }
        .dc-approach-wrap.visible .dc-flow-step-1 { animation: dc-flowIn 0.7s 0.5s cubic-bezier(.16,1,.3,1) both; }
        .dc-approach-wrap.visible .dc-flow-step-2 { animation: dc-flowIn 0.7s 0.7s cubic-bezier(.16,1,.3,1) both; }
        .dc-approach-wrap.visible .dc-flow-step-3 { animation: dc-flowIn 0.7s 0.9s cubic-bezier(.16,1,.3,1) both; }

        @keyframes dc-flowIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Floating particles */
        .dc-flow-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.25;
        }

        /* ══ STARTUP CTA SECTION ══ */
        .dc-startup-wrap {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1);
        }
        .dc-startup-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dc-startup-title {
          display: inline-block;
          position: relative;
          font-size: clamp(1.6rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #1a1a1a;
        }

        .dc-startup-step-card {
          text-align: center;
          padding: 20px;
          transition: transform 0.4s cubic-bezier(.16,1,.3,1);
        }
        .dc-startup-step-card:hover {
          transform: translateY(-6px);
        }

        .dc-startup-step-card img {
          width: 100%;
          height: auto;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 20px;
          margin: 0 auto 14px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          transition: transform 0.5s cubic-bezier(.4,0,.2,1), box-shadow 0.5s ease;
        }
        .dc-startup-step-card:hover img {
          transform: scale(1.03);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }

        /* ── Startup section responsive grid ── */
        .dc-startup-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 8px; /* Small gap for mobile */
          max-width: 100%;
          margin: 0 auto 48px;
          padding: 0 4px;
        }
        .dc-startup-grid .dc-startup-step-card {
          width: 100%;
          margin: 0;
        }
        @media (min-width: 768px) {
          .dc-startup-grid {
            max-width: 1200px;
            gap: clamp(24px, 3vw, 40px);
            padding: 0;
          }
          .dc-startup-step-card img {
            max-width: 380px;
          }
        }

        .dc-consult-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #f47e82, #e8656a);
          color: #fff;
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 16px 44px;
          border: none;
          border-radius: 60px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease;
          box-shadow: 0 8px 24px rgba(244,126,130,0.3);
        }
        .dc-consult-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .dc-consult-btn:hover::before {
          transform: translateX(100%);
        }
        .dc-consult-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 14px 36px rgba(244,126,130,0.4);
        }
        .dc-consult-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* Stagger entrance for startup steps */
        .dc-startup-wrap.visible .dc-startup-step-0 { animation: dc-fadeUp 0.7s 0.2s cubic-bezier(.16,1,.3,1) both; }
        .dc-startup-wrap.visible .dc-startup-step-1 { animation: dc-fadeUp 0.7s 0.4s cubic-bezier(.16,1,.3,1) both; }
        .dc-startup-wrap.visible .dc-startup-step-2 { animation: dc-fadeUp 0.7s 0.6s cubic-bezier(.16,1,.3,1) both; }

        /* ── Mobile: Stack vertically with left-aligned line ── */
        @media (max-width: 767px) {
          .dc-flow-line {
            left: 26px;
          }
          .dc-flow-pulse {
            left: 26px;
          }
          .dc-flow-num {
            left: 26px;
            width: 44px;
            height: 44px;
            font-size: 0.95rem;
          }
          .dc-flow-row {
            flex-direction: column;
            align-items: flex-start;
            padding-left: 64px;
          }
          .dc-flow-card {
            width: 100%;
            padding: 20px;
          }
          .dc-flow-arm {
            display: none;
          }
          .dc-flow-row-left .dc-flow-card,
          .dc-flow-row-right .dc-flow-card {
            margin-left: 0;
            margin-right: 0;
          }

          /* Bigger card overlay text on mobile */
          .dc-card-overlay p {
            font-size: 0.8rem !important;
            letter-spacing: 0.3px;
          }

          /* Startup step label text — adjusted to fit 3 narrow columns */
          .dc-startup-step-card p {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
            margin-top: 2px;
          }

          /* Startup step card padding — tight for 3 cols */
          .dc-startup-step-card {
            padding: 4px 2px !important;
          }

          /* Consult button sizing */
          .dc-consult-btn {
            padding: 14px 36px;
            font-size: 0.9rem;
          }

          /* Startup title */
          .dc-startup-title {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      <div className="w-full mt-10 mb-28 relative overflow-hidden">

        {/* ── Header Section ── */}
        <div
          ref={headerRef}
          className={`dc-header-group ${headerVisible ? "visible" : ""}`}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="text-center mb-7 dc-stagger-1">
            <div className="dc-title-box">
              <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "0.5px", margin: 0, color: "#1a1a1a" }}>
                Design Consultancy
              </h1>
            </div>
          </div>

          <div className="text-center mb-7 dc-stagger-2">
            <p style={{ color: "#f47e82", fontSize: "clamp(0.8rem, 2vw, 1.05rem)", fontWeight: 500, letterSpacing: "1px", margin: 0 }}>
              {categories.map((cat, i) => (
                <span key={cat}>
                  <span className="dc-cat-tag" style={{ color: "#f47e82" }}>{cat}</span>
                  {i < categories.length - 1 && (
                    <span style={{ margin: "0 10px", opacity: 0.35, fontWeight: 300 }}>|</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          <div className="flex justify-center mb-7 dc-stagger-3">
            <div className="dc-divider" />
          </div>

          <div className="text-center max-w-3xl mx-auto px-6 mb-16 dc-stagger-4">
            <p style={{ color: "#1f2937", fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)", lineHeight: 1.9, fontWeight: 600 }}>
              We are a creative agency focused on custom product development. From products
              packaging and custom product concepts to brand identity, graphic design, websites,
              and digital experiences, we help to create Innovative experiences
            </p>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div
          ref={gridRef}
          className={`dc-grid-wrapper ${cardsVisible ? "visible" : ""} px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32`}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(12px, 2.5vw, 28px)" }} className="md:!grid-cols-3">
            <style>{`.md\:!grid-cols-3 { } @media(min-width:768px){ .md\:!grid-cols-3 { grid-template-columns: repeat(3,1fr) !important; } }`}</style>
            {visibleCards.map((item, i) => (
              <div
                key={i}
                className="dc-card"
                onClick={() => setExpandingCard(item)}
              >
                <img src={item.img} alt={item.title.replace(/\n/g, " ")} />
                <div className="dc-card-overlay">
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Explore More / Show Less ── */}
        <div className="text-center mt-14" style={{ position: "relative", zIndex: 1 }}>
          <button className="dc-explore-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "Explore More"}
            <span className="dc-arrow-circle" style={{ transform: showAll ? "rotate(180deg)" : "rotate(0deg)" }}>
              <ChevronDown size={16} strokeWidth={2.5} />
            </span>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════
            OUR APPROACH — Dynamic Flow Timeline
            ══════════════════════════════════════════════════ */}
        <section
          ref={approachRef}
          className={`dc-approach-wrap ${approachVisible ? "visible" : ""} mt-28 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32`}
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <p style={{
              color: "#f47e82",
              fontSize: "clamp(0.75rem, 1.4vw, 0.9rem)",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}>
              How We Work
            </p>
            <h2 style={{
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              margin: 0,
              position: "relative",
              display: "inline-block",
            }}>
              Our Approach
              <span style={{
                position: "absolute",
                bottom: -14,
                left: "50%",
                transform: "translateX(-50%)",
                width: "70%",
                height: 3,
                background: "linear-gradient(90deg, transparent, #f47e82, #fca5a5, #f47e82, transparent)",
                borderRadius: 999,
              }} />
            </h2>
            <p style={{
              color: "#374151",
              fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
              marginTop: 28,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}>
              A seamless 4-step journey from vision to delivery, crafted with precision and creativity
            </p>
          </div>

          {/* Dynamic Flow Timeline */}
          <div className="dc-approach-bg">
            {/* Floating decorative particles */}
            {[
              { top: "8%", left: "12%", size: 6, color: "rgba(244,126,130,0.2)", delay: "0s" },
              { top: "25%", right: "8%", size: 8, color: "rgba(252,165,165,0.25)", delay: "1s" },
              { top: "55%", left: "6%", size: 5, color: "rgba(244,126,130,0.15)", delay: "2s" },
              { top: "75%", right: "15%", size: 7, color: "rgba(252,165,165,0.2)", delay: "0.5s" },
              { top: "40%", left: "20%", size: 4, color: "rgba(244,126,130,0.12)", delay: "1.5s" },
              { top: "90%", left: "30%", size: 6, color: "rgba(252,165,165,0.18)", delay: "2.5s" },
            ].map((p, i) => (
              <div
                key={i}
                className="dc-flow-particle"
                style={{
                  top: p.top,
                  left: p.left,
                  right: p.right,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  animation: `dc-pulse 3s ${p.delay} ease-in-out infinite`,
                }}
              />
            ))}

            <div className="dc-flow-timeline">
              {/* Central vertical flow line */}
              <div className="dc-flow-line">
                <div className="dc-flow-line-inner" />
              </div>


              {/* Flow Steps */}
              {approachSteps.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`dc-flow-row dc-flow-step-${i} ${isLeft ? "dc-flow-row-left" : "dc-flow-row-right"}`}
                  >
                    {/* Step number on timeline */}
                    <div className="dc-flow-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Connector arm */}
                    <div className="dc-flow-arm" />

                    {/* Card */}
                    <div className="dc-flow-card">
                      <div className="dc-flow-icon">
                        <Icon size={24} strokeWidth={1.8} />
                      </div>
                      <h3 style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                        fontWeight: 700,
                        color: "#1f2937",
                        marginBottom: 10,
                        letterSpacing: "-0.2px",
                      }}>
                        {step.title}
                      </h3>
                      <p style={{
                        color: "#1f2937",
                        fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                        lineHeight: 1.8,
                        margin: 0,
                        fontWeight: 600,
                      }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            ARE YOU A STARTUP? — CTA Section
            ══════════════════════════════════════════════════ */}
        <section
          ref={startupRef}
          className={`dc-startup-wrap ${startupVisible ? "visible" : ""} mt-28 mb-8 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32`}
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="dc-startup-title">Are You a Startup??</h2>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-14">
            <p style={{
              color: "#1f2937",
              fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
              fontWeight: 700,
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto",
            }}>
              We provide affordable, professional design services to help
              {" "}Young startup grow.
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="dc-startup-grid">
            {[
              { img: startupQuestionImg, label: "1. Tell us about your brand" },
              { img: designIdeationImg, label: "2. Ideate Design Directions with Us" },
              { img: brandSystemImg, label: "3. Find Design Systems at seamless value" },
            ].map((item, i) => (
              <div key={i} className={`dc-startup-step-card dc-startup-step-${i}`}>
                <img src={item.img} alt={item.label} />
                <p style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                  fontWeight: 600,
                  color: "#1f2937",
                  lineHeight: 1.6,
                }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* CONSULT NOW Button */}
          <div className="text-center">
            <button
              className="dc-consult-btn"
              onClick={() => setOpenConsultForm(true)}
            >
              CONSULT NOW
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

      </div>

      {/* ═══════════════ CONSULT FORM MODAL ═══════════════ */}
      {openConsultForm && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.5)",
          padding: "0 16px",
        }}>
          <div style={{
            background: "#fff",
            width: "100%",
            maxWidth: 440,
            borderRadius: 16,
            boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
            overflow: "hidden",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Modal header */}
            <div style={{
              background: "linear-gradient(135deg, #f47e82, #fca5a5)",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <h2 style={{ color: "#fff", fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>Design Consultation</h2>
              <button
                onClick={() => { setOpenConsultForm(false); setConsultForm({ name: "", email: "", phone: "", location: "", message: "" }); setConsultErrors({}); }}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: 4 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div style={{ overflowY: "auto", padding: "24px" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const nameResult = validateName(consultForm.name);
                  const emailResult = validateEmail(consultForm.email);
                  const phoneResult = validatePhoneOptional(consultForm.phone);
                  const locationResult = validateRequired(consultForm.location, "Location");

                  const newErrors = {
                    name: nameResult.error,
                    email: emailResult.error,
                    phone: phoneResult.error,
                    location: locationResult.error,
                  };
                  setConsultErrors(newErrors);

                  if (!nameResult.valid || !emailResult.valid || !phoneResult.valid || !locationResult.valid) return;

                  alert("Consultation request submitted successfully!");
                  setConsultForm({ name: "", email: "", phone: "", location: "", message: "" });
                  setConsultErrors({});
                  setOpenConsultForm(false);
                }}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                {/* Full Name */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#6b7280", marginBottom: 4, letterSpacing: 0.5 }}>FULL NAME *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    onBlur={() => { const r = validateName(consultForm.name); setConsultErrors(prev => ({ ...prev, name: r.error })); }}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: `1px solid ${consultErrors.name ? "#ef4444" : "#d1d5db"}`,
                      padding: "12px 16px",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#f47e82"}
                  />
                  {consultErrors.name && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{consultErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#6b7280", marginBottom: 4, letterSpacing: 0.5 }}>EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={consultForm.email}
                    onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    onBlur={() => { const r = validateEmail(consultForm.email); setConsultErrors(prev => ({ ...prev, email: r.error })); }}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: `1px solid ${consultErrors.email ? "#ef4444" : "#d1d5db"}`,
                      padding: "12px 16px",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#f47e82"}
                  />
                  {consultErrors.email && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{consultErrors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#6b7280", marginBottom: 4, letterSpacing: 0.5 }}>PHONE NUMBER (OPTIONAL)</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={consultForm.phone}
                    onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                    onBlur={() => { const r = validatePhoneOptional(consultForm.phone); setConsultErrors(prev => ({ ...prev, phone: r.error })); }}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: `1px solid ${consultErrors.phone ? "#ef4444" : "#d1d5db"}`,
                      padding: "12px 16px",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#f47e82"}
                  />
                  {consultErrors.phone && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{consultErrors.phone}</p>}
                </div>

                {/* Location */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#6b7280", marginBottom: 4, letterSpacing: 0.5 }}>LOCATION *</label>
                  <input
                    type="text"
                    placeholder="City, State, or Company Address"
                    required
                    value={consultForm.location}
                    onChange={(e) => setConsultForm({ ...consultForm, location: e.target.value })}
                    onBlur={() => { const r = validateRequired(consultForm.location, "Location"); setConsultErrors(prev => ({ ...prev, location: r.error })); }}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: `1px solid ${consultErrors.location ? "#ef4444" : "#d1d5db"}`,
                      padding: "12px 16px",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#f47e82"}
                  />
                  {consultErrors.location && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{consultErrors.location}</p>}
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#6b7280", marginBottom: 4, letterSpacing: 0.5 }}>MESSAGE / REQUIREMENTS</label>
                  <textarea
                    placeholder="Tell us about your startup, brand vision, design needs, etc."
                    rows="3"
                    value={consultForm.message}
                    onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: "1px solid #d1d5db",
                      padding: "12px 16px",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      resize: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#f47e82"}
                  />
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
                  <button
                    type="button"
                    onClick={() => { setOpenConsultForm(false); setConsultForm({ name: "", email: "", phone: "", location: "", message: "" }); setConsultErrors({}); }}
                    style={{ fontSize: 14, fontWeight: 500, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 28px",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#fff",
                      background: "linear-gradient(135deg, #f47e82, #fca5a5)",
                      border: "none",
                      cursor: "pointer",
                      transition: "opacity 0.2s, transform 0.15s",
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ CTA Bottom Bar ═══════════════ */}
      <div className="pb-20 sm:pb-32"></div>
      <div className="fixed bottom-0 left-0 w-full z-50 py-1.5 sm:py-3 bg-white/60 backdrop-blur-lg border-t border-gray-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex justify-center gap-2 sm:gap-6 px-3 sm:px-4">
        <button 
          onClick={() => setOpenConsultForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-[8px] sm:text-sm md:text-base px-4 sm:px-10 py-2 sm:py-4 rounded-full shadow-[0_10px_25px_rgba(220,38,38,0.5)] hover:shadow-[0_15px_30px_rgba(220,38,38,0.7)] transition-all duration-300 hover:scale-105 tracking-wide whitespace-nowrap border-2 border-white/20">
          GET A QUOTE
        </button>
        <Link 
          to="/bulkorder"
          className="bg-gray-900 hover:bg-black text-white font-bold text-[8px] sm:text-sm md:text-base px-4 sm:px-10 py-2 sm:py-4 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 tracking-wide whitespace-nowrap border border-white/10">
          BULK ORDER
        </Link>
      </div>
      {/* ═══════════════ Lightbox Modal ═══════════════ */}
      <div 
        className={`dc-modal-overlay ${expandingCard ? 'active' : ''}`}
        onClick={() => setExpandingCard(null)}
      >
        <div 
          className="dc-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="dc-modal-close"
            onClick={() => setExpandingCard(null)}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {expandingCard && (
            <div className="w-full h-full bg-white relative">
              {expandingCard.component ? (
                <expandingCard.component />
              ) : (
                <img src={expandingCard.img} alt={expandingCard.title.replace(/\n/g, ' ')} className="w-full h-auto block" />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DesignConsultancy;

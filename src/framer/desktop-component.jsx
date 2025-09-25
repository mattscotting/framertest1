"use client";

import { useState } from "react";

/**
 * A lightweight tabbed content block that mirrors the structure exported by Framer
 * but is easier to plug into a headless CMS such as Contentful.
 *
 * Pass an array of `topics` where each item contains:
 * - `label`: the text for the tab button.
 * - `headline`: the large heading shown when the tab is active.
 * - `description`: an array of strings (one string per paragraph) or custom React nodes.
 * - `image`: optional object with `src` and `alt`.
 *
 * You can also pass a `cta` with `label`, and either an `href`/`target` pair or an
 * `onClick` handler.
 */

const containerStyle = {
  boxSizing: "border-box",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "stretch",
  gap: "48px",
  padding: "48px",
  borderRadius: "32px",
  width: "100%",
  maxWidth: "1721px",
  margin: "0 auto",
  fontFamily: '"Plus Jakarta Sans", sans-serif',
};

const textColumnStyle = {
  flex: "1 1 320px",
  minWidth: "280px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const tabListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
};

const baseTabStyle = {
  borderRadius: "999px",
  border: "2px solid #081c46",
  padding: "12px 32px",
  fontWeight: 700,
  fontSize: "16px",
  backgroundColor: "rgba(8, 28, 70, 0.1)",
  color: "#081c46",
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease",
};

const activeTabStyle = {
  backgroundColor: "#081c46",
  color: "#ffffff",
};

const headlineStyle = {
  fontSize: "60px",
  fontWeight: 800,
  lineHeight: 1.1,
  color: "#081c46",
  margin: 0,
};

const paragraphGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const paragraphStyle = {
  fontSize: "16px",
  lineHeight: "22px",
  color: "#222222",
  margin: 0,
};

const ctaBaseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 32px",
  borderRadius: "10px",
  fontSize: "20px",
  fontWeight: 700,
  textDecoration: "none",
  backgroundColor: "#0c50ef",
  color: "#ffffff",
  width: "fit-content",
};

const imageWrapperStyle = {
  flex: "0 1 451px",
  width: "100%",
  maxWidth: "451px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  objectFit: "cover",
  borderRadius: "24px",
};

const defaultTopics = [
  {
    id: "topic-1",
    label: "International shipping",
    headline: "Send parcels worldwide with confidence",
    description: [
      "Use our quick quote tool to compare services and find the best courier in minutes.",
      "We automatically supply the customs paperwork you need once a booking is confirmed.",
      "Visit the International Shipping Hub for VAT guidance, restrictions, and destination tips.",
    ],
    image: {
      src: "https://framerusercontent.com/images/uycbSgfOj9XTUUwiXtRdkrIFizE.png?width=1801&height=3000",
      alt: "Person preparing a parcel for international delivery",
    },
  },
  {
    id: "topic-2",
    label: "Business solutions",
    headline: "Keep your operations moving",
    description: [
      "Schedule daily collections, bulk upload orders, and track everything from one dashboard.",
      "Flexible billing options and multi-user access make it simple to collaborate with your team.",
      "Our support team is available 7 days a week if you need help with account setup or dispatch.",
    ],
    image: {
      src: "https://framerusercontent.com/images/GeaoscbEftguzqlOcpJ19aTH8.png?width=1801&height=3000",
      alt: "Stack of parcels ready for courier collection",
    },
  },
  {
    id: "topic-3",
    label: "Small business tips",
    headline: "Grow with smarter shipping",
    description: [
      "Learn how to package items securely so they arrive in perfect condition.",
      "Cut costs with reusable packaging supplies and accurate parcel measurements.",
      "Discover marketing advice, marketplace integrations, and time-saving automations.",
    ],
    image: {
      src: "https://framerusercontent.com/images/D4nB28Dy3ciUbiLTvNmO5fdwHw.png?width=1801&height=3000",
      alt: "Courier holding a box for dispatch",
    },
  },
];

const defaultCta = {
  label: "Get a Quote",
  href: "https://parcel2go.com/quick-quote",
};

function resolveCtaRel(target, rel) {
  if (rel) return rel;
  if (target === "_blank") {
    return "noopener noreferrer";
  }
  return undefined;
}

function DesktopComponent({
  topics = defaultTopics,
  cta = defaultCta,
  backgroundColor = "#e8e8e8",
  className = "",
  style,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeTopics = topics && topics.length > 0 ? topics : defaultTopics;
  const currentIndex = Math.min(activeIndex, safeTopics.length - 1);
  const activeTopic = safeTopics[currentIndex];

  const combinedContainerStyle = {
    ...containerStyle,
    backgroundColor,
    ...(style || {}),
  };

  return (
    <section className={`desktop-component ${className}`.trim()} style={combinedContainerStyle}>
      <div style={textColumnStyle}>
        <div style={tabListStyle} role="tablist" aria-label="Topic selector">
          {safeTopics.map((topic, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={topic.id || index}
                type="button"
                style={{
                  ...baseTabStyle,
                  ...(isActive ? activeTabStyle : null),
                }}
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                role="tab"
                aria-selected={isActive}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
        {activeTopic?.headline ? <h2 style={headlineStyle}>{activeTopic.headline}</h2> : null}
        <div style={paragraphGroupStyle}>
          {(activeTopic?.description || []).map((paragraph, index) =>
            typeof paragraph === "string" ? (
              <p key={index} style={paragraphStyle}>
                {paragraph}
              </p>
            ) : (
              <div key={index} style={paragraphStyle}>
                {paragraph}
              </div>
            )
          )}
        </div>
        {cta?.label ? (
          cta.href ? (
            <a
              href={cta.href}
              target={cta.target}
              rel={resolveCtaRel(cta.target, cta.rel)}
              style={ctaBaseStyle}
            >
              {cta.label}
            </a>
          ) : (
            <button type="button" onClick={cta.onClick} style={{ ...ctaBaseStyle, border: "none" }}>
              {cta.label}
            </button>
          )
        ) : null}
      </div>
      {activeTopic?.image?.src ? (
        <div style={imageWrapperStyle}>
          <img
            src={activeTopic.image.src}
            alt={activeTopic.image.alt || ""}
            style={imageStyle}
            loading="lazy"
          />
        </div>
      ) : null}
    </section>
  );
}

DesktopComponent.Responsive = DesktopComponent;

export default DesktopComponent;

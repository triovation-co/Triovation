import React from "react";
import { Link } from "react-router-dom";

const sitemapData = [
    {
        title: "Main Pages",
        links: [
            { name: "Home", path: "/" },
            { name: "About Us", path: "/About" },
            { name: "Products", path: "/Products" },
            { name: "Consultancy", path: "/Consultancy" },
            // { name: "Education", path: "/Education" }, // Coming Soon
            { name: "Contact Us", path: "/ContactUs" },
        ],
    },
    {
        title: "Design Consultancy",
        links: [
            { name: "All Services", path: "/design-consultancy" },
            { name: "Brand Identity Design", path: "/design-consultancy/brand-identity-design" },
            { name: "Brand Manual Design", path: "/design-consultancy/brand-manual-design" },
            { name: "Digital Illustration", path: "/design-consultancy/digital-illustration-design" },
            { name: "Business Collateral", path: "/design-consultancy/business-collateral-design" },
            { name: "Brand Campaigns", path: "/design-consultancy/brand-campaigns-design" },
            { name: "Social Media Design", path: "/design-consultancy/social-media-design" },
            { name: "Digital Painting", path: "/design-consultancy/digital-painting-design" },
            { name: "Website / UI-UX", path: "/design-consultancy/website-uiux-design" },
            { name: "Book / Magazine / Zine", path: "/design-consultancy/book-magazine-zine-design" },
        ],
    },
    {
        title: "Shopping",
        links: [
            { name: "Cart", path: "/cart" },
            { name: "Checkout", path: "/checkout" },
            { name: "Customize Product", path: "/Customize_product" },
        ],
    },
    {
        title: "Legal & Policies",
        links: [
            { name: "Terms & Conditions", path: "/terms-condition" },
            { name: "Privacy Policy", path: "/privacy-policies" },
            { name: "Shipping & Delivery", path: "/shipping-delivery" },
            { name: "Cancellation & Refund", path: "/cancellation-refund" },
        ],
    },
];

const SiteMap = () => {
    return (
        <div className="container mx-auto px-6 md:px-12 py-16 min-h-screen">
            {/* Header */}
            <div className="text-center mb-14">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-400 bg-clip-text text-transparent mb-3">
                    Site Map
                </h1>
                <p className="text-gray-500 text-lg">
                    Quick access to every page on Triovation
                </p>
            </div>

            {/* Sitemap Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
                {sitemapData.map((section, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
                    >
                        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b-2 border-red-200">
                            {section.title}
                        </h2>
                        <ul className="space-y-3">
                            {section.links.map((link, linkIdx) => (
                                <li key={linkIdx}>
                                    <Link
                                        to={link.path}
                                        className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-300 group-hover:bg-red-500 mr-3 transition-colors duration-200 flex-shrink-0"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SiteMap;

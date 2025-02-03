"use client";
import dynamic from "next/dynamic";

// Dynamically import MarkdownEditor with SSR disabled
const MarkdownEditor = dynamic(() => import("./MarkdownEditor"), {
    ssr: false, // Disables server-side rendering for this component
});

export default function MdPage() {
    return <MarkdownEditor />;
}

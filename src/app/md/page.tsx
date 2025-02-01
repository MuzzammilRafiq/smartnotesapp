"use client"
import { useRef, useState } from 'react';
import type { MDXEditorMethods } from '@mdxeditor/editor';
import InitializedMDXEditor from "./InitializedMDXEditor";

export default function MdPage() {
    return <InitializedMDXEditor />
}
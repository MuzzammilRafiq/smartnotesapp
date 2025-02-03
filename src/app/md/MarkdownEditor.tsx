"use client";

import '@mdxeditor/editor/style.css';
import { useState, useRef, useEffect } from 'react';
import { MDXEditor, MDXEditorMethods } from "@mdxeditor/editor";
import {
    headingsPlugin,
    listsPlugin,
    linkPlugin,
    imagePlugin,
    quotePlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    CodeToggle,
    ListsToggle,
    BlockTypeSelect,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    DiffSourceToggleWrapper,
} from '@mdxeditor/editor';

import { createNote } from '~/actions/createNote'; // Ensure correct path
import { useRouter } from 'next/navigation';

const MarkdownEditor = () => {
    const router = useRouter();
    const editorRef = useRef<MDXEditorMethods>(null);
    const [markdown, setMarkdown] = useState("");


    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const lines = markdown.split('\n');
        const title = lines[0].replace(/^#\s+/, ''); // Fix title extraction
        const body = markdown;

        const result = await createNote({ title, body });
        if (result.error) {
            alert(result.error);
            return;
        }
        router.push('/');
    };

    return (
        <form id="markdown-form" onSubmit={handleSave} className="p-2">
            <div className="flex flex-col">
                <div className="border border-gray-300 rounded-lg overflow-hidden mb-6 flex-1">
                    <MDXEditor
                        ref={editorRef}
                        markdown={markdown}
                        onChange={setMarkdown}
                        className="min-h-[500px] p-4"
                        contentEditableClassName="prose"
                        plugins={[
                            headingsPlugin(),
                            listsPlugin(),
                            linkPlugin(),
                            imagePlugin(),
                            quotePlugin(),
                            codeBlockPlugin(),
                            markdownShortcutPlugin(),
                            codeMirrorPlugin({
                                codeBlockLanguages: {
                                    js: 'JavaScript',
                                    ts: 'TypeScript',
                                    css: 'CSS',
                                    html: 'HTML',
                                    python: 'Python',
                                },
                            }),
                            diffSourcePlugin(),
                            toolbarPlugin({
                                toolbarContents: () => (
                                    <DiffSourceToggleWrapper>
                                        <UndoRedo
                                            //@ts-ignore
                                            undoButtonProps={{ title: 'Undo Ctrl+Z' }}
                                            redoButtonProps={{ title: 'Redo Ctrl+Y' }}
                                        />
                                        <BoldItalicUnderlineToggles />
                                        <CodeToggle />
                                        <ListsToggle />
                                        <BlockTypeSelect />
                                    </DiffSourceToggleWrapper>
                                ),
                            }),
                        ]}
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save Note
                </button>
            </div>
        </form>
    );
};

export default MarkdownEditor;

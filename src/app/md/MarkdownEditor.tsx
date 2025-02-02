'use client';
import '@mdxeditor/editor/style.css';
import { useState, useRef, useEffect } from 'react';
import { MDXEditor, MDXEditorMethods } from "@mdxeditor/editor"
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
    // CreateLink,
    // InsertImage,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    DiffSourceToggleWrapper,
} from '@mdxeditor/editor';

const MarkdownEditor = () => {
    const editorRef = useRef<MDXEditorMethods>(null);
    // Set default value to false for initial render
    const [isMac, setIsMac] = useState<boolean | null>(null); // Default null to avoid mismatch

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }, []);


    const [markdown, setMarkdown] = useState(`# Title of Your Document

This is where you'll write the main content of your document.  You can use Markdown formatting here, like:

*   **Bold text**
*   *Italics*
*   Lists:
    *   Item 1
    *   Item 2
*   And much more!

Remember to replace this placeholder text with your actual content.`);
    return (
        <div className="p-2">
            <div className="flex">
                <div className="border border-gray-300 rounded-lg overflow-hidden mb-6 flex-1">
                    <MDXEditor
                        ref={editorRef}
                        markdown={markdown}
                        onChange={setMarkdown}
                        className="min-h-[500px] p-4"
                        contentEditableClassName="prose"  // add a class to style markdown elements
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
                                        {/* <UndoRedo
                                            undoButtonProps={{ title: `Undo ${isMac ? '⌘Z' : 'Ctrl+Z'}` }}
                                            redoButtonProps={{ title: `Redo ${isMac ? '⌘Y' : 'Ctrl+Y'}` }}
                                        /> */}
                                        <UndoRedo
                                            // @ts-ignore
                                            undoButtonProps={{ title: `Undo ${isMac ? '⌘Z' : 'Ctrl+Z'}` }}
                                            redoButtonProps={{ title: `Redo ${isMac ? '⌘Y' : 'Ctrl+Y'}` }}
                                        />
                                        <BoldItalicUnderlineToggles />
                                        <CodeToggle />
                                        <ListsToggle />
                                        <BlockTypeSelect />
                                        {/* <CreateLink /> */}
                                        {/* <InsertImage /> */}
                                    </DiffSourceToggleWrapper>
                                ),
                            }),
                        ]}
                    />

                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;


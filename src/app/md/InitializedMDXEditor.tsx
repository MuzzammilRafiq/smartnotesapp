import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Copy, Bold, Italic, Code, Link2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nThis is a **bold** text.\n\nThis is *italic* text.\n\n## Lists\n\n- Item 1\n- Item 2\n- Item 3\n\n## Code\n\n```javascript\nconsole.log("Hello World!");\n```');
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
    };

    const insertFormatting = (prefix: string, suffix: string = prefix) => {
        const textArea = document.getElementById('editor');
        // if (textArea === null) return;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedText = markdown.substring(start, end);

        const beforeText = markdown.substring(0, start);
        const afterText = markdown.substring(end);

        const newText = selectedText
            ? `${beforeText}${prefix}${selectedText}${suffix}${afterText}`
            : `${beforeText}${prefix}text${suffix}${afterText}`;

        setMarkdown(newText);

        setTimeout(() => {
            textArea.focus();
            const newCursorPos = selectedText
                ? start + prefix.length + selectedText.length + suffix.length
                : start + prefix.length + 4 + suffix.length;
            textArea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const insertLink = () => {
        const textArea = document.getElementById('editor');
        const start = textArea.selectionStart;
        const linkMarkdown = `[${linkText || 'link text'}](${linkUrl || 'https://example.com'})`;

        const newText = markdown.substring(0, start) + linkMarkdown + markdown.substring(start);
        setMarkdown(newText);
        setDialogOpen(false);
        setLinkText('');
        setLinkUrl('');
    };

    const renderMarkdown = (text: string) => {
        return text
            .split('\n')
            .map((line, index) => {
                // Headers
                if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold my-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold my-3">{line.slice(3)}</h2>;
                }

                // Bold
                line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                // Italic
                line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');

                // Links
                line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>');

                // Lists
                if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4">{line.slice(2)}</li>;
                }

                // Code blocks
                if (line.startsWith('```')) {
                    return <pre key={index} className="bg-black-100 p-4 rounded my-2 font-mono">{line.slice(3)}</pre>;
                }

                // Inline code
                line = line.replace(/`(.*?)`/g, '<code class="bg-black-100 px-1 rounded">$1</code>');

                // Regular paragraph
                return line ? <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: line }} /> : <br key={index} />;
            });
    };

    return (
        <div className="w-screen h-screen bg-black-50 p-4">
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 bg-black p-4 rounded-lg shadow-sm">
                    <div className="font-semibold text-lg">Markdown Editor</div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => insertFormatting('**')}
                            title="Bold"
                        >
                            <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => insertFormatting('*')}
                            title="Italic"
                        >
                            <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => insertFormatting('`')}
                            title="Code"
                        >
                            <Code className="h-4 w-4" />
                        </Button>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="Insert Link"
                                >
                                    <Link2 className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Insert Link</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        placeholder="Link text"
                                        value={linkText}
                                        onChange={(e) => setLinkText(e.target.value)}
                                    />
                                    <Input
                                        placeholder="URL"
                                        value={linkUrl}
                                        onChange={(e) => setLinkUrl(e.target.value)}
                                    />
                                    <Button onClick={insertLink}>Insert</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="icon" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex gap-4">
                    <div className="w-1/2 bg-black rounded-lg shadow-sm p-4">
                        <div className="text-sm font-medium text-gray-500 mb-2">Editor</div>
                        <textarea
                            id="editor"
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className=" bg-black w-full h-[calc(100%-2rem)] p-4 font-mono text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your markdown here..."
                        />
                    </div>

                    <div className="w-1/2 bg-black rounded-lg shadow-sm p-4">
                        <div className="text-sm font-medium text-gray-500 mb-2">Preview</div>
                        <div className="w-full h-[calc(100%-2rem)] overflow-auto prose max-w-none">
                            {renderMarkdown(markdown)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;
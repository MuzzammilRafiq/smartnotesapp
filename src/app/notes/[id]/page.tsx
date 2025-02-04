"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { createClient } from "~/utils/supabase/client"
import { useEffect, useState } from "react"
import { NoteType } from "~/types"
import { MDXEditor } from "@mdxeditor/editor"
import '@mdxeditor/editor/style.css'
import {
    headingsPlugin,
    listsPlugin,
    linkPlugin,
    imagePlugin,
    quotePlugin,
    codeBlockPlugin,
    markdownShortcutPlugin,
    codeMirrorPlugin,
} from '@mdxeditor/editor'

export default function NotePage() {
    const params = useParams()
    const [note, setNote] = useState<NoteType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchNote() {
            const supabase = createClient()
            const { data, error } = await supabase
                .from("notes")
                .select("*")
                .eq("id", params.id)
                .single()

            if (error) {
                console.error("Error fetching note:", error)
                return
            }

            setNote(data)
            setLoading(false)
        }

        fetchNote()
    }, [params.id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!note) {
        return <div>Note not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
                Created on {new Date(note.created_at).toLocaleDateString('en-GB')}
            </p>
            <div className="prose max-w-none border rounded-lg p-4">
                <MDXEditor
                    markdown={note.body}
                    readOnly
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
                    ]}
                />
            </div>
        </div>
    )
}


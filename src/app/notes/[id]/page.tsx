"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}
const mockNotes: Note[] = [
    {
        id: "1",
        title: "Meeting Notes",
        content: "Discussed project timeline and deliverables. Action items: ...",
        createdAt: "2023-04-01T10:00:00Z",
    },
    {
        id: "2",
        title: "Ideas for New Feature",
        content: "Brainstormed ideas for improving user onboarding: 1. Interactive tutorial...",
        createdAt: "2023-04-02T14:30:00Z",
    },
    {
        id: "3",
        title: "Bug Report",
        content: "Found issue with login form on mobile devices. Steps to reproduce: ...",
        createdAt: "2023-04-03T09:15:00Z",
    },
]

export default function NotePage() {
    const params = useParams()
    const note = mockNotes.find((n) => n.id === params.id)

    if (!note) {
        return <div>Note not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
            <p className="text-sm text-gray-500 mb-4">Created on {new Date(note.createdAt).toLocaleDateString('en-GB')}</p>
            <div className="prose max-w-none">
                <p>{note.content}</p>
            </div>
        </div>
    )
}


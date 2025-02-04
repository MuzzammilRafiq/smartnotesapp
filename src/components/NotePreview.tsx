import Link from "next/link"
import { NoteType } from "~/types"

interface NotePreviewProps {
    note: NoteType
}

export function NotePreview({ note }: NotePreviewProps) {
    return (
        <Link href={`/notes/${note.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                <p className="text-gray-600 line-clamp-3">{note.body}</p>
                <div className="text-sm text-gray-500 mt-2">
                    {new Date(note.created_at).toLocaleDateString()}
                </div>
            </div>
        </Link>
    )
}


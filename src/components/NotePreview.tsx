import Link from "next/link"
interface Note {
    id: string
    title: string
    content: string
    createdAt: string
}[]



export function NotePreview({ note }: { note: Note }) {
    return (
        <Link href={`/notes/${note.id}`} className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{note.content.slice(0, 100)}...</p>
            <p className="text-xs text-gray-400">{note.createdAt}</p>
        </Link>
    )
}


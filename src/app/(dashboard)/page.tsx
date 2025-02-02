import { NotePreview } from "~/components/NotePreview"
const mockNotes: {
  id: string
  title: string
  content: string
  createdAt: string
}[] = [
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
export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockNotes.map((note) => (
          <NotePreview key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
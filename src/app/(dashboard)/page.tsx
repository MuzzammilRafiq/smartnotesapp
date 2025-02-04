import { createClient } from "~/utils/supabase/server"
import { NotePreview } from "~/components/NotePreview"
import { Button } from "~/components/ui/button"
import { NoteType } from "~/types"

async function getNotes() {
  const supabase = await createClient()
  
  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching notes:", error)
    return []
  }

  return notes as NoteType[]
}

export default async function DashboardPage() {
  const notes = await getNotes()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NotePreview key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
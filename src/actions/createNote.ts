"use server"
import { revalidatePath } from "next/cache";
import { createClient } from "~/utils/supabase/server";

export const createNote = async ({ title, body }: { title: string, body: string }) => {
    const supabase = await createClient();
    const id = (await supabase.auth.getUser()).data.user?.id;
    if (!id) {
        return { error: "Internal error", status: 500 }
    }
    if (!title || !body) {
        return { error: "check fieds", status: 400 }
    }
    const { data, error } = await supabase.from("notes").insert({
        title,
        body,
        user_id: id
    }).select().single();
    if (error) {
        return { error: error.message, status: 500 }
    }
    revalidatePath('/')
    return { data, error: null, status: 200 }
}
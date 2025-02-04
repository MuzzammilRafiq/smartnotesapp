import { generateEmbeddings } from "~/utils/supabase/embeddings";


export default async function TestPage() {
    // const embeddings: number[][] = await generateEmbeddings(["i am very happy today","hello boys"])
    // console.log(embeddings.length)
    return <div>Test Page</div>;
}
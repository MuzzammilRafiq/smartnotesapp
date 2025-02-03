export type NoteType = {
    id: string;
    title: string;
    body: string;
    group?: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    vector?: number[];
};
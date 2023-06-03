import { createClient } from '@supabase/supabase-js';

const supabaseUrl:string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey:string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);


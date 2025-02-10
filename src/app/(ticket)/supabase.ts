import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dijgblooocqejrsjbsto.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpamdibG9vb2NxZWpyc2pic3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NjM0NDcsImV4cCI6MjA1MzEzOTQ0N30.SR8vijS4wHRY8DsWf51KxI9dhCwvmoQMSUDIoJ45vg4"
);

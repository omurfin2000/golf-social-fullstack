import { createClient } from '@supabase/supabase-js'

/*
const supabase = createClient('https://rxkvlzjmeshnziekeybp.supabase.co'
    , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4a3ZsemptZXNobnppZWtleWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDU5MDAsImV4cCI6MjA2NjQyMTkwMH0.Z1Rjhgz64LNsBZQHU1mYC8_K2Jsz8tOJAARMZmxAfQU'
);
*/

console.log("yep")

const supabaseUrl = 'https://rxkvlzjmeshnziekeybp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4a3ZsemptZXNobnppZWtleWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDU5MDAsImV4cCI6MjA2NjQyMTkwMH0.Z1Rjhgz64LNsBZQHU1mYC8_K2Jsz8tOJAARMZmxAfQU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
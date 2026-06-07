import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// On web: use localStorage (default). On native: use AsyncStorage.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const storage = Platform.OS !== 'web'
  ? require('@react-native-async-storage/async-storage').default
  : undefined;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});

// ─── Auth helpers ────────────────────────────────────────────────────────────

export async function signUp(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ─── Profile helpers ─────────────────────────────────────────────────────────

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function upsertProfile(userId: string, updates: {
  username?: string;
  global_level?: number;
  global_xp?: number;
  global_gold?: number;
}) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// ─── Bestiary helpers ────────────────────────────────────────────────────────

export async function getBestiary(userId: string) {
  const { data, error } = await supabase
    .from('bestiary')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addBestiaryEntry(userId: string, entry: {
  creature_theme: string;
  level: number;
  script_title: string;
}) {
  const { error } = await supabase
    .from('bestiary')
    .insert({ user_id: userId, ...entry, completed_at: new Date().toISOString() });
  if (error) throw error;
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export async function getLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from('profiles')
    .select('username, global_level, global_xp, global_gold')
    .order('global_xp', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

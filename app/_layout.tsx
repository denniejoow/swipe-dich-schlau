import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '../utils/supabase';

export default function RootLayout() {
  useEffect(() => {
    supabase.auth.getSession().catch(console.warn);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/auth');
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="index" />
      <Stack.Screen name="generator" />
      <Stack.Screen name="run/[scriptId]" />
      <Stack.Screen name="run/battle" />
      <Stack.Screen name="leaderboard" />
    </Stack>
  );
}

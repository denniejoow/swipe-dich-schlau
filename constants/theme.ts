export const T = {
  bg: '#140C00', panel: '#2C1800', card: '#3A2200', cardLight: '#4A2E00',
  borderGold: '#C8902A', borderDark: '#6B3D00', borderGreen: '#4A8020',
  btnGreen: '#3D7020', btnGreenHi: '#5A9E30', btnRed: '#8B1A1A', btnRedHi: '#B22222',
  btnGold: '#B8860B', btnGoldHi: '#DAA520',
  textLight: '#FFF5DC', textGold: '#FFD700', textMuted: '#A08050', textGreen: '#7DB84E',
  correct: '#4CAF50', wrong: '#E53935', gold: '#FFD700', shield: '#4FC3F7', leafGreen: '#2E7D32',
};
export const panelShadow = { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 8, elevation: 10 };
export const woodBox = { backgroundColor: '#3A2200' as const, borderWidth: 3, borderColor: '#C8902A' as const, borderRadius: 16, ...panelShadow };

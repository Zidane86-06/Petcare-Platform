export const uid = (prefix = 'id') => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

export const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));

export const formatDate = (value) => {
  if (!value) return 'Not set';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
};

export const badgeClass = (status) => {
  const key = String(status || '').toLowerCase();
  if (['confirmed', 'completed', 'paid', 'active'].includes(key)) return 'badge green';
  if (['cancelled', 'failed', 'inactive'].includes(key)) return 'badge red';
  if (['pending', 'in progress'].includes(key)) return 'badge yellow';
  return 'badge blue';
};

export const petIcon = (species) => {
  const key = String(species || '').toLowerCase();
  if (key.includes('cat')) return 'C';
  if (key.includes('bird')) return 'B';
  if (key.includes('rabbit')) return 'R';
  return 'D';
};

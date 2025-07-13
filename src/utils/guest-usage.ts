export const getGuestSuggestionsCount= () => {
  return parseInt(localStorage.getItem('guestSuggestionsCount') || '0', 10);
};

export const incrementGuestSuggestionsCount = () => {
  const count = getGuestSuggestionsCount() + 1;
  localStorage.setItem('guestSuggestionsCount', count.toString());
  return count;
};

export const resetGuestSuggestionsCount = () => {
  localStorage.setItem('guestSuggestionsCount', '0');
};

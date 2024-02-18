
export const keyboardDefolt = [[{ text: 'Error', callback_data: '/error' }]];

export const keyboardHelp = {
  inline_keyboard: [
    [{ text: 'Зарегиструвати гру', callback_data: '/register' }, { text: 'Нещодавні ігри', callback_data: '/match' }],
    [{ text: 'Рейтинг', callback_data: '/rating' }]
  ]
};

export const keyboardRegisteredType = {
  inline_keyboard: [
    [{ text: '1x1', callback_data: '/1x1' }],
    [{ text: '2x2', callback_data: '/2x2' }]
  ]
};

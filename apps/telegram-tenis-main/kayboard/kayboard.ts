
export const keyboardDefolt = [
    [{text: 'Error', callback_data: '/error'}]
  ]

export const keyboardHelp = {
    inline_keyboard: [
      [
        { text: 'Зарегистрировать игру', callback_data: '/register' },
        { text: 'Недавние матчи', callback_data: '/match' }
      ],
      [
        { text: 'Рейтинг', callback_data: '/rating' }
      ]
    ]
  };

export const keyboardRegisteredType = {
  inline_keyboard: [
    [
      { text: '1x1', callback_data: '/1x1' }
    ],
    [
      { text: '2x2', callback_data: '/2x2' }
    ]
  ]
};

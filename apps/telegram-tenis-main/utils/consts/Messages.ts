export const MESSAGES = {
  HelloMessage: ( name: string | void ) => `Welcome ${name  || 'no name'}, to the telegram bot for recording a tennis match.`,
  RatingMessage: ( value: string | void ) => `Your rating:\n${value || ''}`
}
import PowergateService from '../services/PowergateService';

export default async ({app, store}, inject) => {
  const powergateService = new PowergateService();

  let token = powergateService.getTokenFromStorage();
  if (token === null || token === 'null') {
    // we need to get a token
    token = await powergateService.requestToken();
  }

  console.log('Powergate ffs token', token);

  await powergateService.setToken(token);
  powergateService.setTokenInLocalStorage(token);

  inject('powergateService', powergateService);

  store.dispatch('powergate/updateFfsInfo', {
    status: powergateService.getFfsStatus(),
    balancesList: powergateService.getBalancesList()
  });
}

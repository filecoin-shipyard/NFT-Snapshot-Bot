// client only plugin
export default async ({store}) => {
  // FIXME - We may need to add a fallback provider. In the meantime, check for ethereum in window
  if (window.ethereum) {
    console.log(`bootstrapping web3`);

    await window.ethereum.enable();

    /*global web3*/
    store.dispatch('web3ethers/bootstrap', web3);
  }
}

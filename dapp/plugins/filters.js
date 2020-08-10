import Vue from 'vue';
import {ethers} from 'ethers';

Vue.filter('toEth', val => val && ethers.utils.formatEther(ethers.utils.bigNumberify(val)));

Vue.filter('toDp', val => val && parseFloat(val).toFixed(2));

Vue.filter("shortEth", function (value) {
  if (!value) return value;

  return `
  ${value.substr(0, 4)}
  ...
  ${value.substr(value.length - 4, value.length)}
  `;
});

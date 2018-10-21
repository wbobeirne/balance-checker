import { Contract, Signer } from 'ethers';
import { Provider } from 'ethers/providers';
import { DEFAULT_CONTRACT_ADDRESS, Options, formatAddressBalances } from './common';
import BalanceCheckerABI from './abis/BalanceChecker.abi.json';

function getContract(provider: Provider | Signer, address?: string) {
  return new Contract(
    address || DEFAULT_CONTRACT_ADDRESS,
    BalanceCheckerABI,
    provider
  );
}

export async function getAddressBalances(
  provider: Provider | Signer,
  address: string,
  tokens: string[],
  options: Options = {},
) {
  const contract = getContract(provider, options.contractAddress);
  const balances = await contract.balances([address], tokens);
  return formatAddressBalances(balances, [address], tokens)[address];
}

export async function getAddressesBalances(
  provider: Provider | Signer,
  addresses: string[],
  tokens: string[],
  options: Options = {},
) {
  const contract = getContract(provider, options.contractAddress);
  const balances = await contract.balances(addresses, tokens);
  return formatAddressBalances(balances, addresses, tokens);
}
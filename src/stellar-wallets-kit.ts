import {
  allowAllModules,
  FREIGHTER_ID,
  StellarWalletsKit,
} from "@creit.tech/stellar-wallets-kit";


enum WalletNetwork {
  PUBLIC = "Public Global Stellar Network ; September 2015",
  TESTNET = "Test SDF Network ; September 2015",
}

const SELECTED_WALLET_ID = "selectedWalletId";

function getSelectedWalletId() {
  if (typeof window === "undefined") return null; // Ensure this runs only in the browser
  return localStorage.getItem(SELECTED_WALLET_ID);
}

const kit = new StellarWalletsKit({
  modules: allowAllModules(),
  network: WalletNetwork.TESTNET,
  // network: import.meta.env.PUBLIC_STELLAR_NETWORK_PASSPHRASE,
  // StellarWalletsKit forces you to specify a wallet, even if the user didn't
  // select one yet, so we default to Freighter.
  // We'll work around this later in `getPublicKey`.
  selectedWalletId: getSelectedWalletId() ?? FREIGHTER_ID,
});

export const signTransaction = kit.signTransaction.bind(kit);

export async function getPublicKey() {
  if (!getSelectedWalletId()) return null;
  const { address } = await kit.getAddress();
  return address;
}

export async function setWallet(walletId: string) {
  localStorage.setItem(SELECTED_WALLET_ID, walletId);
  kit.setWallet(walletId);
}

export async function disconnect(callback?: () => Promise<void>) {
  localStorage.removeItem(SELECTED_WALLET_ID);
  kit.disconnect();
  if (callback) await callback();
}

export async function connect(callback?: () => Promise<void>) {
  await kit.openModal({
    onWalletSelected: async (option) => {
      try {
        await setWallet(option.id);
        if (callback) await callback();
      } catch (e) {
        console.error(e);
      }
      return option.id;
    },
  });
}

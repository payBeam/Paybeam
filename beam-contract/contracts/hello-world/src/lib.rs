#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, String, Address, Map, Vec, BytesN};

mod pbtoken {
    soroban_sdk::contractimport!(
            file = "/Users/finisher/Documents/github/gdx-token/target/wasm32-unknown-unknown/release/paybeam_token_contract.wasm"
    );
}

#[contract]
pub struct InvoiceContract;

#[derive(Clone)]
pub struct Invoice {
    creator: Address,
    amount: i128,
    balance: i128,
    payers: Map<Address, i128>,
    completed: bool,
}

#[contractimpl]
impl InvoiceContract {

    pub fn register_user(env: Env, user: Address, role: String) {
        let roles_key = symbol_short!("roles");
        env.storage().persistent().set(&(roles_key.clone(), &user), &role);
        env.events().publish(("register", user.clone()), role);
    }

    pub fn get_user_role(env: Env, user: Address) -> String {
        let roles_key = symbol_short!("roles");
        env.storage().persistent().get(&(roles_key, &user))
            .unwrap_or_else(|| String::from_str(&env, "Unknown"))
    }
    
    pub fn create_invoice(
        env: Env,
        creator: Address,
        amount: i128,
    ) -> Symbol {
        let invoice_id = Symbol::new(&env, "invoice"); // Change logic for unique ID
        let invoice = Invoice {
            creator,
            amount,
            balance: 0,
            payers: Map::new(&env),
            completed: false,
        };
        env.storage().instance().set(&invoice_id, &invoice);
        invoice_id
    }
    
    pub fn pay_invoice(
        env: Env,
        invoice_id: Symbol,
        payer: Address,
        amount: i128,
    ) -> bool {
        let mut invoice: Invoice = env.storage().instance().get(&invoice_id).unwrap();
        if invoice.completed { return false; }
        
        let mut payers = invoice.payers.clone();
        let new_balance = invoice.balance + amount;
        payers.set(payer.clone(), amount);
        invoice.balance = new_balance;
        invoice.payers = payers;
        
        if new_balance >= invoice.amount {
            invoice.completed = true;
        }
        
        env.storage().instance().set(&invoice_id, &invoice);
        true
    }
    
    pub fn get_invoice(env: Env, invoice_id: Symbol) -> Invoice {
        env.storage().instance().get(&invoice_id).unwrap()
    }
}
    mod test;

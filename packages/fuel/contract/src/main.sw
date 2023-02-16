contract;

// This is a sample `Counter` smart contract written in Sway that provides a way to store and
// increment a counter value on the blockchain

// Storage is the way to add persistent state to the smart contract
storage {
    counter: u64 = 0,
}

// The `MyContract` interface defines the methods that can be called by external entities
abi MyContract {
    // A `counter` method returns the current value of the counter and *only reads* from storage.
    #[storage(read)]
    fn counter() -> u64;

    // An `increment` method increments the counter 1
    #[storage(read, write)]
    fn increment() -> u64;
}

// The `impl` section defines the implementation of the `MyContract` interface
impl MyContract for Contract {
    #[storage(read)]
    fn counter() -> u64 {
        // Return the value of the counter from storage
        // note: return storage.counter; is the same as storage.counter
        storage.counter
    }

    #[storage(read, write)]
    fn increment() -> u64 {
        storage.counter += 1;

        // Return the new value of the counter from storage
        storage.counter
    }
}
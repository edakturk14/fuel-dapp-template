contract;

storage {
    counter: u64 = 0,
}

abi Counter {
    #[storage(read, write)]
    fn increment();

    #[storage(read)]
    fn count() -> u64;
}

impl Counter for Contract {
    #[storage(read)]
    fn count() -> u64 {
      return storage.counter;
    }
    #[storage(read, write)]
    fn increment(){
        storage.counter = storage.counter + 1;
    }
}
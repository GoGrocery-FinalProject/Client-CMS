const product = "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]"

const transaction = "[{\"ProductId\": 1, \"quantity\": 2}, {\"ProductId\": 2, \"quantity\": 3}]"

const test = "[{\\\"ProductId\\\":1,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":3500},{\\\"ProductId\\\":2,\\\"stockRecorded\\\":1,\\\"stockReal\\\":1,\\\"price\\\":4321},{\\\"ProductId\\\":3,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":24566},{\\\"ProductId\\\":4,\\\"stockRecorded\\\":5,\\\"stockReal\\\":5,\\\"price\\\":412},{\\\"ProductId\\\":5,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":421412}]"

console.log(JSON.parse(test))
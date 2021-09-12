function buildHash(input: number[], callback?: any) {
  const valueHash = {};
  input.forEach((value, index) => {
    if (!valueHash[value]) {
      valueHash[value] = [];
    }
    if (callback) callback(value, index);
    valueHash[value].push(index);
  });
  return valueHash;
}

function findDistancesBF(input: number[]) {
  const resultList = [];
  /*console.log('Brute force input:');
  console.log(input);*/
  const startTimer = Date.now();
  const valueHash = buildHash(input);
  Object.keys(valueHash).forEach(key => {
    const indexList = valueHash[key];
    indexList.forEach(idxSelf => {
      let result = 0;
      indexList.forEach(idxAnother => {
        result += Math.abs(idxSelf - idxAnother);
      });
      resultList[idxSelf] = result;
    });
  });
  /*console.log('Brute force: ' + (Date.now() - startTimer) + ' ms');
  console.log('Brute force output:');
  console.log(resultList);*/
}

function fastMultiply(amount, times) {
  let result = 0;
  for (let i = 0; i < times; i++) {
    result += amount;
  }
  return result;
}

function findDistances(input: number[]) {
  const resultList = [];
  /*console.log('Optimized input:');
  console.log(input);*/
  const startTimer = Date.now();
  const valueHashSum = {};
  const valueHash = buildHash(input, (value, index) => {
    if (!valueHashSum[value]) valueHashSum[value] = 0;
    valueHashSum[value] += index;
  });
  Object.keys(valueHash).forEach(key => {
    const groupSum = valueHashSum[key];
    const indexList = valueHash[key];
    const indexListSize = indexList.length;
    let previousSum = 0;
    indexList.forEach((idxSelf, index) => {
      resultList[idxSelf] = groupSum - previousSum + previousSum + (index + index - indexListSize) * idxSelf;
      previousSum += idxSelf;
    });
  });
  /*console.log('Optimized: ' + (Date.now() - startTimer) + ' ms');
  console.log('Optimized output:');
  console.log(resultList);*/
}

function randomInput(size: number) {
  // Randomize input value
  const input = [];
  for (let i = 0; i < size; i++) {
    input[i] = Math.floor(Math.random() * size / 2);
  }
  return input;
}

function main() {
  // input size argument
  const inputSize: number = parseInt(process.argv[2]);
  console.log('input size is ' + inputSize);
  if (!inputSize || inputSize < 0 || inputSize > 1000000) {
    return -1;
  }

  const input = randomInput(inputSize);
  const startTimer = Date.now();
  findDistances(input);
  const endOpt = Date.now();
  findDistancesBF(input);
  const endBF = Date.now();
  console.log(`Optimized: ${endOpt - startTimer} ms`);
  console.log(`Brute force: ${endBF - endOpt} ms`);
}

main();

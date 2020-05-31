const minimum = (arr, k) => {

    if (arr.length <= k) return 0;

    // arr.splice((arr.length - k) + 1, k - 1);
    // console.log(arr, (arr.length - k) + 1)

    arr.length = (arr.length - k) + 1;

    let min = arr[0];
    let max = arr[arr.length - 1];
    return (max * max) - (min * min);
}

const arr = [2, 4, 5, 5, 8, 11, 19];
const k = 3;

let output = minimum(arr, k);

console.log(output);
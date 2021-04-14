// 1.

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}
//Array.SIZE_RATIO = 3;


// 2.

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    console.log(arr);
}

// length = 1
// capacity = 3
// memory address = 0

// length = 6
// capacity = 15
// memory address = 3

// 3.

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    arr.pop();
    arr.pop();
    arr.pop();

    console.log(arr);
}

// length = 3
// capacity = 15
// memory address = 3

// 5. URLify a string
// O(n) linear

function urlify(str) {
    let out = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ' ') {
            out += '%20'
        } else {
            out += str[i]
        }
    }
    return out
}

//console.log(urlify('test test'))


// 6. Filtering an array
// O(n) linear

function filter(arr) {
    let out = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 5) {
            out.push(arr[i])
        } 
    }
    return out
}

//console.log(filter([1,3,5,6,7,3]))

// 7. Max sum in the array

function maxSum(arr) {
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 1; i < arr.length; i++) {
        sum2 = arr[i] + arr[i-1]
        if (sum2 > sum1) {
            sum1 = sum2
        } 
    }
    return sum1
}

//console.log(maxSum([4, 6, -3, 5, -2, 1]))

// 8. Merge arrays
// O(n)

function sort(arr1, arr2) {
    let temp = [];
    let length = arr1.length > arr2.length ? arr1.length : arr2.length;

    for (let i = 0; i < length; i++) {
        if (arr1[i] && arr2[i]) {
            if (arr1[i] < arr2[i]) {
                temp.push(arr1[i])
                temp.push(arr2[i])
            } else {
                temp.push(arr2[i])
                temp.push(arr1[i])
            }
        } else {
            if (arr1[i] && arr1[i] > temp[temp.length - 1]) {
                temp.push(arr1[i])
            }
            if (arr1[i] && arr1[i] < temp[temp.length - 1]) {
                let temp2 = temp.pop()
                temp.push(arr1[i])
                temp.push(temp2)
            }

            if (arr2[i] && arr2[i] > temp[temp.length - 1]) {
                temp.push(arr2[i])
            }
            if (arr2[i] && arr2[i] < temp[temp.length - 1]) {
                let temp2 = temp.pop()
                temp.push(arr2[i])
                temp.push(temp2)
            }
        }
    }
    return temp
}
/* // or this:
function sort(arr1, arr2) {
    let new1 = arr1.concat(arr2)
    new1.sort(function(a, b){return a - b})
    return new1
}
*/
//console.log(sort([1, 3, 6, 8, 11],[2, 3, 5, 8, 9, 10]))

// 9. Remove characters
// O(n^2) polynomial (quadratic)

function rem(chars, str) {
    let out = '';
    for (let i = 0; i < str.length; i++) {
        let flag = false;
        for (let j = 0; j < chars.length; j++) {
            if (str[i] == chars[j]) {
                flag = true;
            } 
        }
        if (flag == false) {
            out += str[i]
        }
    }
    return out
}

//console.log(rem('aeiou','Battle of the Vowels: Hawaii vs. Grozny'))


// 10. products
// O(n^2) polynomial (quadratic)

function prod(arr) {
    let out = [];
    for (let i = 0; i < arr.length; i++) {
        let temp = 1;
        for (let j = 0; j < arr.length; j++) {
            if (j != i) {
                temp *= arr[j]
            }
        }
        out.push(temp)
    }
    return out
}

console.log(prod([1, 3, 9, 4]))

// 11. 2D array
// O(n^3) polynomial

function zero(arr) {
    let out = [];
    let width = arr[0].length
    let zInd = [];

    for (let i = 0; i < arr.length; i++) {
        let temp = [];
        let flag = false;
        for (let j = 0; j < width; j++) {
            if (arr[i][j] == 0) {
                flag = true;
                zInd.push(j)
            } 
        }
        if (flag) {
            for (let j = 0; j < width; j++) {
                temp.push(0)
            }
        } else {
            for (let j = 0; j < width; j++) {
                temp.push(1)
            }
        }
        out.push(temp)
    }
    //////////////////////////
    for (let i = 0; i < out.length; i++) {
        for (let j = 0; j < out[i].length; j++) {
            for (let k = 0; k < zInd.length; k++) {
                if (j == zInd[k]) {
                    out[i][j] = 0;
            } 
        }
        }
    }

    return out
}

console.log(zero(
    [[1,0,1,1,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,0,1,1,1],
    [1,1,1,1,1]]
    ));



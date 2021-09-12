# Codehack series - Sum of index distances

Given an array of integer with value range 0 < x < 10^7 and size range 1 < size < 10^7, the task is to find the sum of index distances between the value of index of interest and the other indices in the array with the same value.

## Examples

```
Input n: [2, 1, 2, 3, 2, 3, 1, 3, 6]
Output: [6, 5, 4, 6, 6, 4, 5, 6, 0]
Explanation:
At n[0], the output is 6 = |0 - 2| + |0 - 4|
At n[2], the output is 4 = |2 - 0| + |2 - 4|
```

## Brute force
```
(1*) First, hash all indices of the same value into the same group - O(n) time & space
{
  2: [0, 2, 4],
  1: [1, 6],
  3: [3, 5, 7],
  6: [8]
}
(2*) Second, create another array of the same size as input - O(n) space
(3*) Last, loop through each key in the hash and then do 2 nested for loops to calculate the result of each index per array, e.g. for value of 2, size^2 = 3^2.  This yields the worst case of O(n^2) time 
```

## Bottleneck
```
Obviously the last step is the slowest logic that must be resolved.  How to make the process O(n)?
```


## Yet another better way
```
Given An = Array of size n as the input of this riddle.
And Rn = Array of size n as the out put of this riddle.
Then Rj = Sum of distance of index j to each index within the array of An that has the same value as that of index j;
```

If formula image below does not show up, click [here](https://render.githubusercontent.com/render/math?math=R_{j}=\sum_{i=0}^{m}x_{i}-2\sum_{i=0}^{j-1}x_{i}%2B(2j-m)x_{j})

<a href="https://render.githubusercontent.com/render/math?math=R_{j}=\sum_{i=0}^{m}x_{i}-2\sum_{i=0}^{j-1}x_{i}%2B(2j-m)x_{j}">
<img width="800" height="40" style="font-color: white !important; padding: 10px" src="https://render.githubusercontent.com/render/math?math=R_{j}=\sum_{i=0}^{m}x_{i}-2\sum_{i=0}^{j-1}x_{i}%2B(2j-m)x_{j}"/></a>

```
Where:
  j: Index of interest where 0 <= j <= n
  M: Array of each hash value
  m: Size of array in hash from (1*) where j belongs to
  x: Index value in hash from (1*); for example, referring to 2: [0, 2, 4], x[2] = 4

Procedure:
(1*) Do the same as (1*) from the brute force way; O(n) time & space
(2*) Calculate sum of each M; O(n) time & space
(3*) Loop through each M[i] and perform R[j] calculation; O(n) time & O(1) space
(4*) Note that the second element in R[j] formula can be retrieved from previous round of M[i] processing
```

## Running the program

Compile the program
```
tsc main.ts
```

Executin the program; e.g. below will run with array of size 100000 with random input
```
node main.js 100000
```

## Any improvement or suggestions

I am looking forward to hearing your thoughts cnimmana@gmail.com


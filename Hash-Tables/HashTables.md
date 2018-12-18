## Hash Tables

A `hash table` is a collection of key-value pairs, that provides efficient access.

### Time Complexity

#### Average

| Access | Search | Insertion | Insertion |
| :----: | :----: | :-------: | :-------: |
|   NA   |  O(1)  |   O(1)    |   O(1)    |

`Hashing` is a method commonly used to create unique identifiers for objects contained in a collection. An example may be Identification Card numbers, the ID number itself should be unique, that way its easy to lookup a person when needed. If two people had the same ID number then problems would arise when things corresponding to an individual happen. While these identifiers should be unique, there is the case that it can unintentionally be created more than once, this is called a `collision`.

Lets say we wanted to hash some input data (i.e. Student DOB and Name), we would do this by using a `hashing function`, this is an algorithm that takes an input also called a `key` of any size and returns a string of fixed size. As long as you provide the same input you will always recieve the same output. Now that we have our hash, the input data will be stored in a `hash table` where it can be referenced via the key.

![fig1](/Hash-Tables/images/fig1.png)

### Hash Functions

With respect to hash tables, hash functions are any function that returns an index of fixed size. The requirements for a hash function are as follows:

1. **Easy to compute:** It should be easy to compute and must not become an algorithm in itself.

2. **Uniform distribution:** It should provide a uniform distribution across the hash table and should not result in clustering.

3. **Less collisions:** Collisions occur when pairs of elements are mapped to the same hash value. These should be avoided.

Note: Irrespective of how good a hash function is, collisions are bound to occur. Therefore, to maintain the performance of a hash table, it is important to manage collisions through various collision resolution techniques.

### Collisions

As mentioned collisions will occur, in some algorithms more often than others, this may not necessarily be major problem as long as we have some means of dealing with it. Take for example a hash function that creates an index based on the sum of the individual letter's ASCII values of the characters modulo.

Now take the following strings into consideration {“abcdef”, “bcdefa”, “cdefab” , “defabc” }. Each string has a sum of 599 which results in a character modulo of 2, therefore our index is 2 for each of the strings. As you can imagine we have just created a hash table with four collisions.

![fig2](/Hash-Tables/images/fig2.png)

Although the previous example is not necessarily a bad thing, we can certainly do better considering the time complexity was O(n). For example our hashing function could calculate the index based on the sum of the ASCII values multiplied by their respective order in the string after which it is modulo with 2069.

- abcdef ---> (971 + 982 + 993 + 1004 + 1015 + 1026)%2069 = 38
- bcdefa ---> (981 + 992 + 1003 + 1014 + 1025 + 976)%2069 = 23
- cdefab ---> (991 + 1002 + 1013 + 1024 + 975 + 986)%2069 = 14
- defabc ---> (1001 + 1012 + 1023 + 974 + 985 + 996)%2069 = 11

![fig3](/Hash-Tables/images/fig3.png)

## References

- [Basics of Hash Tables](https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/)

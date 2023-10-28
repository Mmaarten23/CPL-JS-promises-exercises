# Async Functions

In this part we will refactor some of the code we wrote as part of the earlier exercises to make use
of [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

In a nutshell, async functions enable us to write code that deals with asynchronous activities using standard sequential
control flow abstractions (such as `for`-loops, `try-catch` and `return` statements).

Inside an `async` function, instead of calling `.then(cb)`, you can use the `await` keyword in front of an expression
that evaluates to a Promise to suspend execution of the function until the Promise is resolved.

Let's start small by writing the simplest possible `async` functions, as we did with Promises in part 1.

## Exercise 1

Write an `async` function that returns a promise that will resolve with the value 3.

## Exercise 2

Write an `async` function that returns a promise that will reject with the string "Boo!"

## Exercise 3

Refactor your code from part 4 (Chaining Promises), exercise 2 to use an `async` function. Your solution should no
longer call `.then(cb)` anywhere in the code.

As a reminder, you are given a `firstPromise` and should use its value to call a `slowAsyncProcess` with also returns a
Promise. The result of the async function should be the result of the `slowAsyncProcess`.

## Exercise 4

Refactor the code from part 4 (Chaining Promises), exercise 3 to use an `async` function. Your solution should no longer
call `.then(cb)` anywhere in the code.

As a reminder, in this exercise you are asked to fetch a user object from a database based on a `userId`, and then to
fetch additional organization information about the user based on the user's organization id. Then you must combine the
results into a single object. If the user id does not exist, return `undefined`.

## Exercise 5

Refactor the code from part 4 (Chaining Promises), exercise 4 to use an `async` function. Your solution should no longer
call `.then(cb)` anywhere in the code.

As a reminder, this is the exercise where you are given both a `userId` and an `organizationId` and are asked to fetch
both a user object and an organization object simultaneously from the database.

## Exercise 6

Refactor the code from part 4 (Chaining Promises), exercise 5 to use an `async` function. Your solution should no longer
call `.then(cb)` anywhere in the code.

As a reminder, this is the exercise where you are asked to fetch multiple user objects from the database in batch, based
on an array of `userIds`.

**Hint 1:** think carefully about how and where you need to call `await`, and how this will influence what calls will
happen in parallel, and what calls will happen sequentially. If you want the calls to the database to go out in
parallel, do you need to change anything compared to your Promise-based code?

**Hint 2:** if the test framework times out, verify whether you are making the async calls to the database sequentially.
See Hint 1.
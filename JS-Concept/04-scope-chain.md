Q1. What is a scope chain?

The scope chain is the mechanism JavaScript uses to look for variables from the current scope through its outer scopes until the 
variable is found or the global scope is reached.

Q2. How does JavaScript find a variable?

JavaScript first checks the current scope. If the variable is not found, it checks the outer scope and continues until the global scope.

Q3. What happens if a variable is not found in the scope chain?

JavaScript throws a ReferenceError.

how javascript search for a variable?
JavaScript searches from inside to outside.

It does not search from outside to inside. 
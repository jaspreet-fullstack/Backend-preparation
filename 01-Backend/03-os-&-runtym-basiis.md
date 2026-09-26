##OS & Runtime Basics

## 1. Process 
A process is an independent running instance of a program with its own memory space and system resources.

- A process is a program that is running.
- It is the instance of a program that is being executed.
- It has its own memory space, file descriptors, and other resources.
- It can be started, stopped, and restarted.

## 2. Thread

- A thread is a unit of execution inside a process.

- A process can have multiple threads that share the process's memory.
- Threads are cheaper to create and destroy than processes.
- Threads are used to execute the code of a process.

## 3. OS

- The OS is the software that manages the hardware resources and provides services to the processes and threads.
- The OS is the kernel, core, heart, soul, spirit, foundation of the operating system.
- The OS is the foundation of the operating system.

## 4. Concurrency

- Concurrency means handling multiple tasks during the same period by switching between them or progressing them together.

- It doesn't necessarily mean tasks execute at exactly the same time.

Example:
** Task A → waiting for DB
 Task B → processing
** Task A → resumes
** Task C → processing **

Node.js can handle many I/O operations concurrently using the event loop without creating one thread per request.

## 5. Parallelism

- Parallelism means executing multiple tasks at the same time.

Concurrency vs Parallelism
Concurrency
→ Multiple tasks are in progress.

Parallelism
→ Multiple tasks execute at the same time.

## 6. CPU-Bound vs I/O-Bound

- CPU-Bound tasks are tasks that are CPU-intensive and require a lot of CPU time.
- I/O-Bound tasks are tasks that are I/O-intensive and require a lot of I/O time.

Example:
- CPU-Bound:  (mage processing
    Video encoding
    Large calculations
    Complex data processing
    Heavy encryption/compression)

- I/O-Bound: (File I/O
    Database queries
    Network requests
    External API calls
    User input/output)

## 7.Memory 

- Memory is the main resource that a process, thread, or program needs to run.

Process Memory:
- Code
- Data
- Stack
- Heap

Thread Memory:
- Stack:- Stack is a Last In First Out (LIFO) data structure.
    - Local variables
    - Function calls
    - Return addresses
- Heap: Heap is a dynamic memory allocation data structure.
    - Dynamic memory allocation
    - Objects
    - Arrays
    - Strings
    - Functions

Program Memory:
- Code: The code is the instructions that the program needs to execute.
- Data: The data is the data that the program needs to process.
    - Static data: The static data is the data that is declared at the beginning of the program and is not changed during the program's execution.
    - Dynamic data: The dynamic data is the data that is declared during the program's execution and is changed during the program's execution.
- Heap: The heap is a dynamic memory allocation data structure.
    - Dynamic memory allocation
    - Objects
    - Arrays
    - Strings
    - Functions

## 8. File Descriptor

- A file descriptor is a unique identifier for a file or a resource.
- It is used to identify the file or resource and to access it.
- It is used to read from or write to the file or resource.
- It is used to close the file or resource.

## 9. OS Socket

The OS socket is basically the thing that listens for network connections.
- os socket is useful when server wants to listen for incoming connections from clients.
- os socket is useful when server wants to send data to a client.
- os socket is useful when server wants to receive data from a client.
- os socket is useful when server wants to send data to a client.
## Topic: Streams & Buffer

## 1. what is stream?
A stream is a way of processing data in small chunks instead of loading the complete data into memory at once.

Streams are especially useful when working with large files, network data, or large amounts of data because they help keep memory usage under control.

Node.js has four main types of streams:

Readable → used to read data from a source. = READ

Writable → used to write data to a destination. = WRITE

Duplex → can both read and write data. = READ + WRITE

Transform → can both read and write data while also transforming the data. = READ + WRITE + CHANGE DATA.

**Process large/continuous data efficiently without loading everything into memory at once.**

```
Let's Take Stream Example:- 

Suppose you request:- youtube.com


The server sends video data in chunks:

YouTube server
     ↓
video chunk 1
video chunk 2
video chunk 3
     ↓
HTTP Response
     ↓
Client

The client is receiving the chunks, so there is a data flow.
But there doesn't necessarily need to be a Transform stream.

**So when do we need Transform?**
Imagine YouTube wants to compress, encrypt, resize, encode, or otherwise process data before sending it.

Original video chunk
        ↓
Compression / Encoding
        ↓
Processed video chunk
        ↓
Client

The Transform stream is doing actual work on the data.

```

**Simple:**

Readable:- It means this stream produces data that our application can read.A Readable may get data from a file, network socket, HTTP request, etc.

Writable means:Our application can write data into this stream.

Transform means: 
Our application writes data into it, it processes that data, and produces a new output that we can read.


## 2. Backpressure:
Backpressure is a mechanism in Node.js streams that handles situations where the producer is generating data faster than the consumer can process it.

For example, if a server is producing data faster than the network or browser can consume it, the stream's internal buffer starts filling up.

When the buffer reaches the highWaterMark threshold, writable.write() can return false. At that point, the producer should temporarily stop writing and wait for the drain event.

Once the consumer processes the buffered data and the stream is ready again, the drain event is emitted and the producer can continue.
This prevents uncontrolled buffering and excessive memory usage.

In short, backpressure makes a fast producer slow down according to the speed of the consumer.

                 BACKPRESSURE IN NODE.JS

     Fast Producer                         Slow Consumer
       (Readable 100 MB)                           (Writable 10MB)
           │                                    │
           │  write(chunk)                      │
           ├───────────────────────────────────►│
           │                                    │
           │        ┌─────────────────┐         │
           │        │  Internal       │         │
           │        │    Buffer       │         │
           │        │                 │         │
           │        │  DATA DATA      │         │
           │        │  DATA DATA      │         │
           │        └────────┬────────┘         │
           │                 │                  │
           │          highWaterMark             │
           │                 │                  │
           │                 ▼                  │
           │           Buffer is full           │
           │                 │                  │
           │                 ▼                  │
           │          write() → false           │
           │                 │                  │
           │                 ▼                  │
           │        STOP / SLOW DOWN            │
           │                                    │
           │                                    │
           │                         Consumer   │
           │                         processes  │
           │                         data       │
           │                            │       │
           │                            ▼       │
           │                       Buffer drains
           │                            │       │
           │◄────────────── 'drain' ─────┘       │
           │                                    │
           ▼                                    │
       Continue writing                         │

## How does highwaterMark relate to Backpressure? 

`highWaterMark` is a threshold used by Node.js streams to control how much data can be buffered internally.

For example, if a producer is generating data faster than the consumer can process it, the writable stream's internal buffer starts filling up.

When the buffer reaches the appropriate threshold, `write()` can return `false`. This tells the producer to temporarily stop writing. Once the buffer has been processed and space is available again, the stream emits the `drain` event, and the producer can continue.

So, `highWaterMark` is related to the stream's internal buffering and helps Node.js apply backpressure and prevent uncontrolled memory usage.

**Simple:**

highWaterMark = buffering threshold

write() === false = slow down / stop temporarily

drain = buffer has space again, continue

## 3. Buffer 

A Buffer in Node.js is used to handle raw binary data. It represents data as bytes and is commonly used for file processing, network communication, streams, images, videos, Encryption/hashing, and other binary data.

For example, when Node reads a file or receives network data, the data can come as a Buffer. By default, Readable streams emit Buffer objects unless an encoding is set


```

const buffer = Buffer.from("Hello");

console.log(buffer);
console.log(buffer.toString());

"Hello"
   ↓
Buffer
   ↓
[48 65 6c 6c 6f]
   ↓
Raw bytes


```

## 4. Encoding
A computer ultimately stores data as bytes (0s and 1s).
But when we have text like: ("HELLO")
the computer needs a rule that says:

“How should I convert these characters into bytes?” 
That rule is called an encoding.


Encoding in Node.js

| Encoding  | Common use                     |
| --------- | ------------------------------ |
| `utf8`    | Normal text                    |
| `utf16le` | UTF-16 text                    |
| `ascii`   | ASCII text                     |
| `hex`     | Represent bytes as hexadecimal |
| `base64`  | Represent binary data as Base64 characters  |

**Ques: what is default Encoding in Node.js**

By default, Node.js uses UTF-8 encoding for most text-based operations, including reading and writing files (fs module) and handling network streams, unless specified otherwise.

**Ques: Why do we need encoding?**

The computer doesn't directly store the letter "A". It stores bytes.

For example, in UTF-8:

A = 65
So encoding tells the computer:

"A" should be represented by this byte.

**Ques: what are Base64 and Hex?**

```
const buffer = Buffer.from("Hello");

console.log(buffer.toString("hex"));
console.log(buffer.toString("base64"));

```


**Final Answer:**

Encoding is the rule used to convert text characters into bytes and bytes back into text.

For example, UTF-8 is a common character encoding and is Node.js's default encoding for converting between strings and Buffers.

When we convert a string to a Buffer, we encode it. When we convert a Buffer back to a string, we decode it.

```js
const buffer = Buffer.from("Hello", "utf8");

console.log(buffer);              // bytes
console.log(buffer.toString("utf8")); // Hello
```

In simple terms:

String → UTF-8 encoding → Bytes/Buffer

Bytes/Buffer → UTF-8 decoding → String


## 5. Large File Processing

When we work with a large file, such as a video or a large log file, we should avoid loading the entire file into memory because it can consume a lot of memory.

Instead, we can use Node.js Streams to process the file incrementally in smaller chunks.

For example, instead of loading a 5 GB video into memory, we can read it as a stream. The stream provides the data chunk by chunk, and those chunks are commonly represented as Buffers.

We can then process or upload each chunk without keeping the entire file in memory.

So the basic flow is:

Large File → Readable Stream → Chunks/Buffers → Processing → Storage

This approach reduces memory usage and is suitable for large files such as videos, images, backups, and logs.


**Ques: How would you process a 10 GB file?**
If need to process a very large file, such as a 10 GB file, I would avoid using `readFile()` because it attempts to load the entire file into memory.

Instead, I would use `createReadStream()` to read the file in smaller chunks. Each chunk can be processed as a Buffer, and if I need to modify the data, I can use a Transform stream.

I would connect the streams using `pipe()` or `pipeline()`, which also helps handle backpressure between the producer and consumer.

So the flow would be:

Large File → Readable Stream → Transform/Processing → Writable Stream

This allows me to process the file incrementally without keeping the entire 10 GB file in memory.

**pipe() && pipeline()**

pipe() is used to connect a Readable stream to a Writable stream so that data can flow automatically from the source to the destination.

For example, when copying a large file, I can use:

readStream.pipe(writeStream);

Instead of loading the entire file into memory, the data is processed in chunks.

pipe() also works with the stream's backpressure mechanism. If the Writable stream cannot consume data fast enough and its buffer reaches the

**Pipeline():**
pipeline() is basically a more robust way of connecting multiple streams.
It connects the whole chain of streams and gives you centralized completion/error handling.

## So why do we need pipeline()?

Because in real applications, we don't only care about connecting the streams.

We also care about:

Did the whole operation finish?

Did any stream fail?

If one stream fails, what happens to the other streams?

Should the other streams be cleaned up?

How do I know the entire operation succeeded?

This is where pipeline() helps.


**Simple:**

-- pipe(): Think about one connection
-- Pipeline():- Multiple pipe() calls. You can create a chain



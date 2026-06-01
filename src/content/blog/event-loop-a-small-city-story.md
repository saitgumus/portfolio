---
title: "Event Loop: A Small-City Story in JavaScript"
description: My first blog post—explaining the event loop through a city, tasks, and messenger queues.
pubDate: 2026-06-01
tags: [javascript, event-loop, web]
draft: false
---

Picture a city.

Call it JavaScript. At its center runs a single main street: the **call stack**. It’s busy, but narrow. Only one vehicle can pass at a time. Everyone in town knows the rule: once a job has started on the main street, nothing else can enter until it’s finished.

That’s what people mean when they say JavaScript is **single-threaded**: one main road, one flow, one job at a time.

## Work on the Main Street

One morning, three tasks arrive in the town square:

```js
console.log("Brewing coffee");
console.log("Making toast");
console.log("Setting the table");
```

They enter the main street one after another. First car through, then the second, then the third. The city stays calm.

The output is exactly what you’d expect:

```txt
Brewing coffee
Making toast
Setting the table
```

So far, it’s a straight walk down a quiet block. But some jobs in this city don’t finish right away.

## Bread in the Oven

Now a new task shows up:

```js
console.log("Brewing coffee");

setTimeout(() => {
  console.log("Bread is out of the oven");
}, 1000);

console.log("Setting the table");
```

Here, `setTimeout` is like saying: “Put this bread in the oven; tell me when it’s done in a second.” The main street doesn’t wait for the bread to bake. If it did, the whole city would freeze. Coffee gets brewed, the bread goes to the oven, the table gets set.

When the oven job finishes, a messenger arrives and asks:

“Bread’s ready. When can we put this on the main street?”

That’s where the **event loop** comes in.

## What the Event Loop Does

Think of the event loop as the city’s intersection controller. It keeps asking the same question:

“Is the main street empty?”

If the call stack is full, it waits—something is still running on that street. When the call stack clears, it takes the next waiting job and sends it onto the main street.

So the output from the code above looks like this:

```txt
Brewing coffee
Setting the table
Bread is out of the oven
```

`setTimeout` doesn’t run second just because it’s written on the second line. JavaScript finishes the synchronous work on the main street first. When the timer fires, its callback joins a queue and runs once the call stack is free.

## Two Queues: Urgent News and Regular News

The city doesn’t have just one line. Some messages are more urgent than others.

In JavaScript, you can picture two kinds of queues:

- **Macrotask queue**: bigger jobs like `setTimeout`, `setInterval`, and user interactions.
- **Microtask queue**: more urgent work like `Promise.then` and `queueMicrotask`.

Microtasks get checked as soon as the main street clears. Before the controller looks at the regular queue, it asks: “Any urgent news?”

Consider this example:

```js
console.log("The city woke up");

setTimeout(() => {
  console.log("The baker arrived");
}, 0);

Promise.resolve().then(() => {
  console.log("Urgent note read");
});

console.log("Market is set up");
```

The output:

```txt
The city woke up
Market is set up
Urgent note read
The baker arrived
```

`setTimeout(..., 0)` doesn’t mean “run immediately.” It means “put me in the regular queue when you can.” The Promise callback goes into the microtask queue and runs before the macrotask.

## Why It Matters

Understanding the event loop is one of the best answers to “why did this code run in that order?” in JavaScript.

If the UI freezes when you click a button, the main street may have been busy too long. If a `setTimeout` runs later than you expected, other work had to finish first. If a Promise callback runs earlier than you thought, the microtask queue probably had priority.

The event loop isn’t just theory. It sits at the center of how smooth the browser feels, how Node.js performs, and why async code can be so confusing to read.

## Short Summary

In JavaScript city, the call stack is the main street. Synchronous work passes through in order. Long-running work is handed off to the browser or runtime; when it’s done, callbacks join a queue. The event loop picks up the next job from those queues when the main street is empty.

Microtasks are higher priority—so Promise callbacks can run before `setTimeout` callbacks.

Next time you’re guessing the output of async code, ask yourself:

“Is the main street empty right now, or is there more urgent news waiting in line?”

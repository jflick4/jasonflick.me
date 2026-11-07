---
title: The robot arm
summary: A clean Python library for the Dobot Magician, a camera, and a screen. The library is on PyPI. The point is a large world model.
status: active
tags: [Robots, AI, "Open source"]
order: 3
image: /images/projects/large-world-model.png
imageAlt: "The loop — world model → robot arm → world → camera → world model"
links:
  - label: PyPI
    href: https://pypi.org/
---

## The library

It started because the official SDK for the Dobot Magician made me sad. So I wrote a clean one: proper class separation, real exceptions, a CLI, no vendor weirdness. It's published to PyPI.

![Illustrative example of the library's API](/images/projects/dobot.png)

## The rig

Arm, camera, screen. The camera watches the screen, a vision model decides what to do, the arm does it, the camera watches what changed. The smallest loop I could build that actually closes.

## The real goal: a large world model

Large language models learned from text. The interesting question is what a model learns when it has to *act* — see something, do something, see what changed, and try again. That's what the rig is for. The current objective — playing a mobile game on an iPad — is deliberately silly: a cheap, endless source of "did that work?" signals. The goal is the model, not the game.

[Jason: what the LWM actually is — what it's learning, what you've seen, where it's going. And link the real PyPI package.]

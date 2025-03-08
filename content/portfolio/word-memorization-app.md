---
title: "Word Memorization App"
subtitle: "Android app to help you memorize new English words."
excerpt: " When preparing for the GRE and TOEFL English tests, the method of memorizing English words used was developed as an Android app after the test was over."
date: 2022-08-30
author: "Myung Guk Lee"
draft: false
images:
  - /portfolio/assets/tachyons-thumbnail.png
  - /portfolio/assets/tachyons-logo-script-feature.png
series:
  - Getting Started
tags:
  - hugo-site
categories:
  - Theme Features
# layout options: single or single-sidebar
layout: single
---

### [Voca Master](https://github.com/truelinker/vocaMaster)
This is an Android application that I developed in 2011. This is an application that helps you memorize new English words.
> Github : https://github.com/truelinker/vocaMaster

[![alt](/images/blog/VocaMasterDemo.jpg)](https://www.youtube.com/watch?v=5WGz2HGq2gY "Demo Video")

### Click the video demo above. ☝️

### Abstraction
Mobile devices are useful in many respects such as education, entertainment, and so on, because people bring their mobile gadgets all the time. Therefore, apps running on the devices are exposed to users anytime and anywhere.
For the summer personal project, I‟ve developed an education app for the Android platform; the app is for helping people to memorize vocabularies with spending remnant time such as during waiting a bus, waiting a meal, and so on.
### Introduction
The Vocabulary Master has the same concept with flash card to memorize new words. However, it has more features like managing newly memorized word to be remained in users‟ brain, recording when and how words are memorized, Furthermore, it can access an internet-based dictionary and the Google image service to help people easily remind word with the image and the extra meaning of the words.

### Features

#### Overview of the forgetting curve hypothesizes.
The app uses the concept of the forgetting curve of Hermann Ebbinghaus.
The forgetting curve hypothesizes the decline of memory retention in time. A related concept is the strength of memory that refers to the durability that memory traces in the brain. The stronger the memory, the longer period of time that a person is able to recall it. A typical graph of the forgetting curve purports to show that humans tend to halve their memory of newly learned knowledge in a matter of days or weeks unless they consciously review the learned material. This conclusion is not currently supported by evidence since the only studies done by Ebbinghaus are on himself. This does not meet the standards for scientific research.[1]

The app uses an algorithm of the forgetting curve and shows it through a list view indicating when and what words should be re-memorized again. By doing so, these words move from short-term memory to long-term memory according to the forgetting curve hypothesis.

| ![alt](/images/blog/forgettenCurve.jpg) | ![alt](/images/blog/memorizedSteps.jpg) |
| ----------- | ----------- |


As you see [Fig.2], if a user succeeds to memorize a word then it goes down to the next step. And in the right size of each step indicates the day of elapsed and period. Within the period, a user should memorize the words in the steps.

#### Overlook of word card screen.

In the screen [Fig.3], it composes of 5 parts.
In the top of the screen, there are three things are indicated; “Num of Wrong”, “Num of Current”, and “Elapsed time”. The “Num of Wrong” indicates how many times the user fail to remind the meaning of the word. And “Num of Current” is how many times a user succeed to correct meaning of the word. And the last “Elapsed time” is that how long has been elapsed since the user memorized the word.
The next section is meaning and the blue box below the meaning section is for extra meaning section. If you touch the box, then next screen shows to add more extra meaning if you want. [Fig.4] Insert extra meaning

| ![alt](/images/blog/FlashCard.jpg) | ![alt](/images/blog/InsertExtraMean.jpg) |
| ----------- | ----------- |

#### Multiple-choice questions
To enhance memorize vocabularies, I added multiple-choice questions features like [Fig.5]

The screen shows if you consequently make wrong answers few times, then the screen shows up. By doing so, users try to memorize words repeatedly without feel boring, because they may experience different types of questions with the same words.

#### Setting
Users are able to customize the design of screen by changing configuration through a setting screen [Fig.6]

| ![alt](/images/blog/multiQuestion.jpg) |![alt](/images/blog/SettingScreen.jpg) |
| ----------- | ----------- |

As you see in the [Fig.6], you can change a configuration of the app such as whether repeating the word,
enable or disable multiple-choice quiz, timer, whether words show randomly or not, and size, color of the letter of the app.

#### Add and Delete words
For user convenience, the app provides two ways to add and delete word or word lists.

![alt](/images/blog/AddDelWord.jpg)

Users are able to add new word lists with the process described above [Fig.7]. However, users must write
their own word lists with format “cvs” which is a using „,” to separate word and meaning using Excel or any editor. Users are simply add a word individually without adding a new word list [Fig.8]
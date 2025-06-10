<p>justMetrics aims to provide a clean, minimalistic overview of key performance metrics for AWS virtual machines, specifically those provided under the AWS EC2 product.</p>


<img src="./assets/readmeImages/logo_readme.png" height=300/>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/SeeQR)
![Release: 1.0](https://img.shields.io/badge/Release-1.0.0-red)
![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)
![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

[justmetrics.app](https://justmetrics.app/)



## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Built With](#built-with)
- [Interface \& Features](#interface--features)
- [Application Architecture and Logic](#application-architecture-and-logic)
- [Contributing](#contributing)
- [Core Team](#core-team)

## Libraries and Technologies

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/docs)
- [AWS SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [jest](https://jestjs.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)


## Overview

- A virtual machine (VM) refers to a fully independent, virtual version of a computer running on a host system, complete with its own OS kernel and assigned hardware resources. A virtual machine can be used to partition hardware for distinct uses and users, allowing a single physical machine to simultaneously support multiple applications in separate OS runtimes.
- Virtual machine instrumentation refers to the monitoring of virtual machine performance data, with the goal to proactively monitor, analyze, and optimize the virtual machine’s behavior. Metrics commonly used to monitor virtual machine performance can include hardware and internet usage, machine uptime and error frequency (if any) and, if renting a VM from a cloud provider, costs and expenditure. 
- The goal of justMetrics is to provide a clean, minimalistic overview of several of these VM performance metrics for AWS virtual machines, specifically those provided by the AWS EC2 product.

## Application Benefits

- No Setup or Configuration: based on industry research, the justMetrics team has preselected several critical instrumentation metrics (CIMs) to present to developers on their EC2 instances. No need to manually configure and request every metric - individually-just providing AWS credentials is all that’s needed to be ready to go.
- Seamless Regional Instance-by-Instance Comparison: Once a user provides the credentials required, the application will query and save all CIMs across all instances for that region for presentation to the user on their selection of an instance, - reducing the number of fetch requests required for the application to function.
- No Database and Persistent Storage: the application stores sensitive user credentials and CIM data in-memory as opposed to in a persistent data store, as without appropriate security protocols in place this would be security risk. Users can access and analyse their data in the safety that no such data is being persistently stored that could remain accessible to malicious actors.
- Updated Data, All the Time: the lack of persistent data store means all data presented to the user is sourced from queries done in real time as soon as the user provides valid AWS credentials. This guarantees no stale data and full transparency of where the data is being sourced from.
  
## User Guide

1. Log into your AWS root account (or whichever user account can create new users/permissions) and create a new user.
2. Assign this user two permissions: AmazonEC2ReadOnlyAccess and CloudWatchReadOnlyAccess. These are for querying the EC2 Client (for instance metadata) and the Cloudwatch Client (for instance metrics data) via the AWS SDK.
3. For this user, click on create Access Keys in the AWS IAM manager. This should create two keys: Access key and Secret Access key (“AWS credentials”).
4. Once the user has been set up with the appropriate read permissions in AWS and has created AWS credentials for that user, these credentials-in conjunction with the region the user’s instances are in-can be provided to the justMetrics login page.
5. Upon provision of valid credentials, the page will automatically rerender to the Metrics component, where the user may now select an instance ID to visualize metrics for.
6. The user may freely change between the instance IDs in the dropdown menu, with the respective data visualization components automatically updating on instance selection.
7. To logout and select a new instance (or otherwise provide new AWS credentials), users may click on the justMetrics logo and select Log out.

A step-by-step tutorial on the above process can be found [here.](https://scribehow.com/viewer/JustMetrics_Walkthrough__3zVqIDawQ5KZCPyZlC1DgA?referrer=documents&pdfPreview=false)

## Contributing

justMetrics is happy to accept contributions for bug fixes as well as any additional features, extensions or improvements that can further enhance the application. A few areas that we've already identified for further improvement are below.
- Cross-regional dashboard to get information for all regions for a user’s credentials at once.
- Implementing a secure, persistent data store for user credentials as well as user preferences and data as required.
- A persistent data store could also allow the user customization options  on metrics they want to see.
- Expand suite of CIMs to display to the user.
- For current CIMs, expand options on visualization of that data 
- Allow the user to select the timeframe for data to collect metrics for.
- Alert flagging for basic KRIs, such as  stopped/terminated instances or high CPU usage.

We encourage you to try the justMetrics application out for yourself and suggest any improvements that could interest you.

If you encounter any issues, please report them or submit a PR. Thank you for your interest!

## Development Team

[Menachem Malachowski](https://github.com/mendoul) | [Jie Feng](https://github.com/fengjie8791) | [Jiaqi Wang](https://github.com/jiaqiwang1105) | [Carl Matsumoto Plata](https://github.com/carlmatsumotoplata)


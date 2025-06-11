<p>JustMetrics aims to provide a clean, minimalistic overview of key performance metrics for AWS virtual machines, specifically those provided under the AWS EC2 product.</p>


<p align="center">
  <img src="JustMetricsBrand.png" width="400" alt="Logo"/>
</p>

<p align="center">
  <a href="https://github.com/oslabs-beta/SeeQR">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"/>
  </a>
  <img src="https://img.shields.io/badge/Release-1.0.0-red" alt="Release: 1.0"/>
  <img src="https://img.shields.io/badge/License-MIT-orange.svg" alt="License: MIT"/>
  <img src="https://img.shields.io/badge/Contributions-welcome-blue.svg" alt="Contributions Welcome"/>
</p>

<p align="center">
  <a href="https://justmetrics.app/">justmetrics.app</a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#libraries-and-technologies)
- [Built With](#overview)
- [Interface \& Features](#application-benefits)
- [Application Architecture and Logic](#user-guide)
- [Contributing](#contributing)
- [Core Team](#development-team)

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
- Virtual machine instrumentation refers to the monitoring of virtual machine performance data, with the goal to proactively monitor the virtual machine’s behavior. Metrics commonly used to monitor virtual machine performance can include hardware and internet usage, machine uptime, error frequency (if any) and, if renting a VM from a cloud provider, costs and expenditure. 
- The goal of JustMetrics is to provide a clean, minimalistic overview of several of these VM performance metrics for AWS virtual machines, specifically those provided by the AWS EC2 product.

## Application Benefits

- <b>No Setup or Configuration</b>: based on industry research, the JustMetrics team has preselected several critical instrumentation metrics (CIMs) to present to developers on their EC2 instances. No need to manually configure and request every metric - individually-just providing AWS credentials is all that’s needed to be ready to go.
- <b>Seamless Regional Instance-by-Instance Comparison</b>: Once a user provides the credentials required, the application will query and save all CIMs across all instances for that region for presentation to the user on their selection of an instance, - reducing the number of fetch requests required for the application to function.
- <b>No Database and Persistent Storage</b>: the application stores sensitive user credentials and CIM data in-memory as opposed to in a persistent data store, as without appropriate security protocols in place this would be security risk. Users can access and analyse their data in the safety that no such data is being persistently stored that could remain accessible to malicious actors.
- <b>Updated Data, All the Time</b>: the lack of persistent data store means all data presented to the user is sourced from queries done in real time as soon as the user provides valid AWS credentials. This guarantees no stale data and full transparency of where the data is being sourced from.
  
## User Guide
### AWS User Setup
- Log into your AWS root account (or whichever user account can create new users/permissions) and create a new user.
- Assign this user two permissions: <b>AmazonEC2ReadOnlyAccess</b> and <b>CloudWatchReadOnlyAccess</b>. These are for querying the EC2 Client (for instance metadata) and the Cloudwatch Client (for instance metrics data) via the AWS SDK.
- For this user, click on create Access Keys in the AWS IAM manager. This should create two keys: <b>Access key</b> and <b>Secret Access key</b> (“AWS credentials”).

### Product Walkthrough
1. Once the user has valid AWS credentials, these details, alongside the respective region with instances for monitoring, may be provided to the JustMetrics application page found <a href="https://justmetrics.app/">here.</a>
2. Upon provision of valid credentials, the page will automatically rerender to the Metrics component, where the user may now select an instance ID to visualize metrics for.
3. The user may freely change between the instance IDs in the dropdown menu, with the respective data visualization components automatically updating on instance selection.
4. To logout and select a new instance (or otherwise provide new AWS credentials), users may click on the JustMetrics logo and select Log out.

<p align="center">
  <img src="https://github.com/justMetrics/justMetrics/blob/62db52279c1ba203f79746cd2486dc7c60abec39/justmetricstutorial.gif" />
</p>

A step-by-step tutorial on the above process can be found [here.](https://scribehow.com/viewer/JustMetrics_Walkthrough__3zVqIDawQ5KZCPyZlC1DgA?referrer=documents&pdfPreview=false)

## Contributing

JustMetrics is happy to accept contributions for bug fixes as well as any additional features, extensions or improvements that can further enhance the application. A few areas that we've already identified for further improvement are below:
- A cross-regional dashboard, enabling the visualisation for instances across all regions for a user’s credentials at once.
- Secure, persistent storage for user credentials as well as user preferences and data as required.
- Expand suite of CIMs to display to the user.
- For current CIMs, expand options on visualization of that data 
- Allow the user to select the timeframe for data to collect metrics for.
- Alert flagging for basic KRIs, such as  stopped/terminated instances or high CPU usage.

We encourage you to try the JustMetrics application out for yourself and suggest any improvements that could interest you.

If you encounter any issues, please report them or submit a PR. Thank you for your interest!

## Development Team

[Menachem Malachowski](https://github.com/mendoul) | [Jie Feng](https://github.com/fengjie8791) | [Jiaqi Wang](https://github.com/jiaqiwang1105) | [Carl Matsumoto Plata](https://github.com/carlmatsumotoplata)


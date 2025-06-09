<p>justMetrics aims to provide a clean, minimalistic overview of key performance metrics for AWS virtual machines, specifically those provided under the AWS EC2 product.</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Built With](#built-with)
- [Interface \& Features](#interface--features)
- [Application Architecture and Logic](#application-architecture-and-logic)
- [Contributing](#contributing)
- [Core Team](#core-team)
- [License](#license)

## Dev Dependencies and Technologies

React

Nextjs
typescript
AWS SDK
jest
tailwind
Chartjs


- [Electron](https://www.electronjs.org/docs)


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

To get started on contributing and editing databases to this project:

1. Download and install [Postgres](https://www.postgresql.org/download/) to access SeeQR's Postgres features and/or [MySQL](https://dev.mysql.com/downloads/mysql/) to access its MySQL features.
2. Ensure that psql and/or mysql are available in the `$PATH`.
3. Create users with passwords and permissions for both [PostgreSQL](https://phoenixnap.com/kb/postgres-create-user) and [MySQL](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql). Linked are instructions for Mac (Homebrew) and Linux/WSL.
4. Download the latest version of [SeeQR](https://github.com/open-source-labs/seeqr/releases/latest).


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


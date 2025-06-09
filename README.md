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

## Application Architecture and Logic

<b>Cross-Database Comparisons</b><br/>
One of the key features of SeeQR is to compare the efficiency of executing user-inputted queries against different databases. This allows customization of table scale, relationship, type, and the queries themselves within the context of each database. This flexibility affords the user granular adjustments for testing every desired scenario. Please refer to “Interface & Features” for more details on execution.


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

We've released SeeQR because it's a useful tool to help optimize SQL databases. Additional features, extensions, and improvements will continue to be introduced. Please refer to the [DEV_README](https://github.com/open-source-labs/SeeQR/blob/main/DEV_README.md) for a list of improvements we are looking to implement and that are open to contributors.

We are thankful for any contributions from the community and we encourage you to try SeeQR out to make or suggest improvements where you see fit! If you encounter any issues with the application, please report them in the issues tab or submit a PR. Thank you for your interest!

## Core Team

[Zhijiao Li](https://github.com/lovelyjoy1991) | [Ting Li](https://github.com/Tingg-v1) | [Michael Ma](https://github.com/michaelma7) | [Ivan Navarro](https://github.com/navaiva) | [Joseph Cho](https://github.com/jocho5) | [Kevin Chou](https://github.com/choukevin612) |[Zoren Labrador](https://github.com/zorenal) |[Elaine Wong](https://github.com/user-byte123) | [Cathy Luong](https://github.com/cyliang93) | [Derek Koh](https://github.com/derekoko) | [Peter Zepf](https://github.com/peterzepf) | [Tony Gao](https://github.com/tgao17) | [Ching-Yuan Lai (Eric)](https://github.com/paranoidFrappe) | [Jamie Zhang](https://github.com/haemie) | [Julian Macalalag](https://github.com/juzi3) | [Nathan Chong](https://github.com/nathanhchong) | [Junaid Ahmed](https://github.com/junaid-ahmed7) | [Chase Sizemore](https://github.com/ChaseSizemore) | [Oscar Romero](https://github.com/creaturenex) | [Anthony Deng](https://github.com/anthonyadeng) | [Aya Moosa](https://github.com/Hiya-its-Aya) | [Trevor Ferguson](https://github.com/TrevorJFerguson) | [Pauline Nguyen](https://github.com/paulinekpn) | [Utkarsh Uppal](https://github.com/utyvert) | [Fred Jeong](https://github.com/fred-jeong) | [Gabriel Kime](https://github.com/wizardbusiness) | [Chris Fryer](github.com/frynoceros) | [Ian Grepo](https://github.com/RadiantGH) | [Michelle Chang](https://github.com/mkchang168) | [Jake Bradbeer](https://github.com/JBradbeer) | [Bryan Santos](https://github.com/santosb93) | [William Trey Lewis](https://github.com/treyfrog128) | [Brandon Lee](https://github.com/BrandonW-Lee) | [Casey Escovedo](https://github.com/caseyescovedo) | [Casey Walker](https://github.com/cwalker3011) | [Catherine Chiu](https://github.com/catherinechiu) | [Chris Akinrinade](https://github.com/chrisakinrinade) | [Cindy Chau](https://github.com/cindychau) | [Claudio Santos](https://github.com/Claudiohbsantos) | [Eric Han](https://github.com/ericJH92) | [Faraz Akhtar](https://github.com/faraza22) | [Frank Norton](https://github.com/FrankNorton32) | [Harrison Nam](https://github.com/harrynam07) | [James Kolotouros](https://github.com/dkolotouros) | [Jennifer Courtner](https://github.com/jcourtner) | [John Wagner](https://github.com/jwagner988) | [Justin Dury-Agri](https://github.com/justinD-A) | [Justin Hicks](https://github.com/JuiceBawks) | [Katie Klochan](https://github.com/kklochan) | [May Wirapa Boonyasurat](https://github.com/mimiwrp) | [Mercer Stronck](https://github.com/mercerstronck) | [Muhammad Trad](https://github.com/muhammadtrad) | [Richard Guo](https://github.com/richardguoo) | [Richard Lam](https://github.com/rlam108) | [Sam Frakes](https://github.com/frakes413) | [Serena Kuo](https://github.com/serenackuo) | [Timothy Sin](https://github.com/timothysin) | [Vincent Trang](https://github.com/vincentt114)

## License

<p>SeeQR is <a href="./LICENSE">MIT licensed</a>.</p>


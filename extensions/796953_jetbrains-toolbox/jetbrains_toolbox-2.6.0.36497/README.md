This is an open source project which is hosted on GitHub: [https://github.com/JetBrains/toolbox-browser-extension/](https://github.com/JetBrains/toolbox-browser-extension/).

Use the following data as your reference:

Built from:

* Branch: master
* Commit SHA: e8eaad8117bb896b024bcaf3fc828362bd2f0c13
* Commit short SHA: e8eaad8
* Commit author: Maxim Mig
* Commit time: Wed Jan 1 22:14:11 2025 +0100
* Commit message: Fix script

Built on:
* Platform: linux
* Type: Linux
* Release: 5.15.0-1075-aws

Built with:
* Node: 20.18.1
* Yarn: 1.22.22

How to build:

1. `git clone git@github.com:JetBrains/toolbox-browser-extension.git`

   OR  

   `git clone https://github.com/JetBrains/toolbox-browser-extension.git`  
2. `cd 'toolbox-browser-extension'`
3. `git checkout 'master'`
4. `git reset --hard 'e8eaad8117bb896b024bcaf3fc828362bd2f0c13'`
5. `yarn install`
6. `yarn build:firefox`

   The built code is saved in the 'dist/firefox' subdirectory:  

7. `cd 'dist/firefox'`
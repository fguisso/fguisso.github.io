---
title: "<span>Basic Recon</span> Automation Using <span>Github Actions</span>"
description: "Demonstration of how to use Github Actions to automate a Recon"
date: 2022-03-16T00:00:46-03:00
showDate: true
tags: ["owasp", "appsec", "recon", "en", "amass", "naabu", "nuclei"]
categories:
- OWASP
- AppSec
---

Currently, the number of companies using CI (Continuous Integration) and CD (Continuous Deploy) solutions to automate the software lifecycle process (SLD) is growing. The most used tools are Jenkins, Github Actions, Gitlab CI, and so on. These tools bring the ease of automating software testing, code linters, creating releases, and final versions of the software.

In the security world, some companies are also already implementing static security testing (SAST) and compromised software composition testing (SCA). With each addition of code or feature, the software can now be tested before going into production.

The idea of working with security tools in CI/CD goes beyond the fact of automating tasks, but also of bringing the culture of information security to the teams of developers and infrastructure teams, the famous culture of DevSecOps. Very important at the moment we go through where development teams are scaling absurdly and we don't have security experts to accompany these teams.

Link for the projects repository: https://github.com/fguisso/ga-recon

## Use cases beyond static tests (SAST and SCA)

The simplest use case we can address is dynamic security tests scheduled to take place periodically, taking into account that the application is already in production.

Other interesting cases would be the possibility of Red Team teams, taking advantage of the event notifications of a pipeline, to launch automated tests as soon as the development of a new feature begins. I will address this topic in more depth in another article.

What we will explore more in this article is the recognition of applications already in production, where we will point a domain to our CI that will periodically run some recognition tools, which can be used later by security teams for future security analyses.

## Github and Github Actions

We are going to use Github to version and store our project, so go to github.com and create a new repository. Now let's create and edit some files, if you don't know how Github works, you can use the graphical interface.
Github Actions is already an enabled Github service, just put the pipeline configuration files in a folder called `.github/workflows` and all interactions and logs of this pipeline will be visible in the actions tab.

To facilitate the creation of pipelines, Github Actions offers Actions, which are sets of configurations and installations ready for you to use in your pipeline, without you having to worry about it. Some official Actions are available on the Github Marketplace, however, you can directly use any Action that is a repository on Github.

Learn more about Actions [here](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) and the [link](https://github.com/marketplace?type=actions) to the marketplace.

![image](https://user-images.githubusercontent.com/5755568/158624544-226a1e59-fef5-441e-beca-73b66c30dd5d.png)
*Examples of separate workflow files.*

![image](https://user-images.githubusercontent.com/5755568/158624831-2aebfc25-a58b-49b2-91cb-33d17f0f77c2.png)
*Github Actions resource tab with configured workflows.*

### Amass Action

Amass according to its official documentation:

The OWASP Amass project performs attack surface network mapping and external asset discovery using open-source intelligence gathering and active reconnaissance techniques.

Amass is a very powerful tool that provides us with functions for the recognition and also for the management of the collected information. In our case, we are going to use the Amass Action just to enumerate a domain and bring the result in a txt file for later use.

In your repository create a file called `amass.yml` inside the `.github/workflows` folder and add these settings and let's analyze what we are doing line by line:

```yaml
name: 🔎 Recon

on:
    workflow_dispatch:

jobs:
  recon:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-go@v2
        with:
          go-version: 1.17

      - name: Amass - Enumeration
        uses: fguisso/amass-action@main
        with:
          domains: owasp.org
          brute: true
          output: hosts.txt

      - name: GitHub Workflow artifacts
        uses: actions/upload-artifact@v2
        with:
          name: hosts.txt
          path: hosts.txt
```

Note: .yml/.yaml files are heavily indented, so the tabs and spaces within the file must be correct to avoid errors. You can use Github itself to validate your file or use a linter of YAML files.

On the first line `name:` ​​is just an identifier for your pipeline to be easily found within the Actions tab of Github.

After `on:` is where we can automate so that the workflow starts according to some programmed event, which can be triggered by one or more events, at the moment we choose `workflow_dispatch:` so that it is available in the Actions dashboard and we can activate any time. Towards the end, we will see how to trigger this workflow scheduled to run once a week, but you can also trigger it using Git events like trigger whenever there is a Pull Request in the development branch, trigger only when a Merge from the main branch happens.

`jobs:` is where we can separate Actions to run in parallel, as we are using the Free version of Github Actions, we will try to always keep just one job running everything we need. [Job documentation link](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow).

The first `steps` I will summarize as just settings to compile and run the Amass tool which is developed in Golang. Usually, when you are going to use an Action, the necessary settings will be in the documentation, don't worry.

After the initial `steps`, let's call the Amass Action using the Action's Github address, `uses: fguisso/amass-action@main` and pass in some configuration inputs:

`domains:` I will use the domain of owasp.org to be our target, you can use the domain of your application or also pass more than one domain separated by commas.

Let's enable `brute:` to brute force the searches found and finally pass the name of the final file `output: hosts.txt`, where we will store the results.

Well, so far we've done the whole process of using a tool through Github Actions, but due to how an automated pipeline works, every `job` that we run, will upload a new machine and at the end of the process it is turned off and deleted, no holding no information or files created. So, we need to get our final `hosts.txt` file and save it somewhere for later reference. We have several options such as uploading the file to another machine, saving the result in the Git repository, using Github Actions we can also create and interact with Issues or Pull Requests and the most used for CI/CD services is to create an artifact of your `job`, which is what we are going to do.

In the last `step` we start another Action that serves to upload files for the artifacts of your workflow, just passing the name of the current file and the final name that will be available within the artifacts of this workflow.

Now let's run our workflow manually, just go to the Actions tab of your repository, choose the Amass Enum workflow, and click on the Run Workflow button.
![image](https://user-images.githubusercontent.com/5755568/158627084-09f2ab97-6d95-439e-9241-6557a5e72aef.png)


Right after you can see your workflow running and if you want to follow the `steps` and logs, just click on your `job` `recon`.

Once the workflow finishes all the `steps` you will be able to see the results and your artifact will be available for download:

![image](https://user-images.githubusercontent.com/5755568/158697555-07a8c02a-8132-45e8-ab55-4a3d790cf092.png)

### Naabu Action

Naabu is a port scan tool where it will look for the open and active ports of a given host. The creators of the project maintain an official version of a Github Actions to run Naabu, so let's follow their documentation to follow our recon workflow.

Let's add the Naabu Action to port recognition from this list of domains that Amass has given us. As one depends on the result of the other, let's put it in the sequence of `steps` so that it will be executed right away if there is no error in the execution of the previous step.

```yaml
      - name: Naabu - Port Scannner
        uses: projectdiscovery/naabu-action@main
        with:
            list: hosts.txt
            output: urls.txt
```

As we are working with just one `job`, Github Actions goes up a machine with some configurations and at the end of the process, this machine will be turned off and removed, with everything that was generated inside it. Since we haven't finished our `job` yet, so the `hosts.txt` file is still available. In case you want to keep these results, we need to do as before and pass the result files to the artifacts of this `job`.

```yaml
      - name: GitHub Workflow artifacts
        uses: actions/upload-artifact@v2
        with:
          name: hosts.txt
          path: |
            hosts.txt
            urls.txt
```

For simplicity, let's pass the files straight to just one artifact, so Github will create a final .zip file for you with all these files inside.

### Nuclei Action

Nuclei is a template-based vulnerability scanning tool, with the help of the community today there are over 1000 ready-to-use templates that will test your application for known vulnerabilities. Like Naabu, we also have an official Nuclei Action that we will use: https://github.com/marketplace/actions/nuclei-dast-scan

**Attention!** Due to a bug found in the ProjectDiscovery Actions, I will use a fork of my own where I fixed the problem, as soon as the correction is included in the official project, I will update the article and change `fguisso/nuclei- action@inputs` by `projectdiscovery/nuclei-action@main`.

```yaml
      - name: Nuclei - DAST Scan
        uses: fguisso/nuclei-action@inputs
        with:
          urls: urls.txt
          output: nuclei.txt
```

As a previous result, now we have the hosts and their active ports, let's move to the cores to check if all these services are found, we find any vulnerability.

### Running your workflow manually

With everything configured, we can now run our workflow manually. Just access the Actions tab in your repository, select your workflow and click on `Run workflow`.

You can follow the execution of your workflow or just wait until the icon turns green, which means that all the `steps` happened correctly and you can probably download your results in the artifacts field.

Whenever you want, you can update the domain you want to scan and you can also add more than one domain using just commas to separate them. Ex: `owasp.org,github.com`.

### Events to dispatch

As mentioned before, workflows can respond to specific events to be able to run, and here we are just going to create a schedule so that we can run our workflow once a week.

```yaml
on:
    schedule:
        - cron: '0 0 * * 0'
    workflow_dispatch:
```
We can schedule using cron schedule expressions, so our workflow will run once a week, every Sunday at 00:00.

Do not remove the `workflow_dispatch` line unless you are already certain that you will no longer use the manual trigger button.

Here is a list of other events that you can use to run your workflows automatically. Read more about it in the Github Actions documentation https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on.

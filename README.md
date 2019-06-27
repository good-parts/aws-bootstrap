# A GitHub-to-EC2 CI/CD Pipeline in 7 Clicks
This is a simple template for creating a CI/CD pipeline that automatically picks up new commits from GitHub, builds them with AWS CodeBuild, and deploys them to EC2 using AWS CodeDeploy. I've extracted this from [a project I'm working on](https://twitter.com/dvassallo/status/1126925437790081024).

You can try this in your AWS account in about 7 clicks. The final result will be a fully working Node.js demo app that gets built and deployed to an EC2 instance in your account, accessible via HTTPS using a [Let's Encrypt](https://letsencrypt.org) certificate.

### Setup From the Console

1. Fork this repo into your GitHub account, or create a new repo using this one [as a template](https://help.github.com/en/articles/creating-a-repository-from-a-template).

2. Create a new [GitHub Personal Access Token](https://github.com/settings/tokens) to let AWS read your GitHub repos and set up a webhook. Give it full "repo" and "admin:repo_hook" permissions.

![](https://dvassallo.s3-us-west-2.amazonaws.com/github-to-ec2-pipeline/github-permissions.png)

3. Click the button below to start setting up all the AWS resources in your account.

[![Launch Stack](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?#/stacks/new?stackName=MyApp&templateURL=https://dvassallo.s3-us-west-2.amazonaws.com/github-to-ec2-pipeline/infra.yml)

At the end of this setup you will end up with an EC2 instance, an S3 bucket, and a CodePipeline using CodeBuild and CodeDeploy. You will be able to easily tear down all resources by deleting the CloudFormation stack. Only the S3 bucket needs to be deleted manually. You can find the full template here: [deploy/infra.yml](deploy/infra.yml).

4. Fill in all the required parameters.

![](https://dvassallo.s3-us-west-2.amazonaws.com/github-to-ec2-pipeline/cfn-create-stack.png)

4. Wait for the CloudFormation stack to finish and find the output URL.

![](https://dvassallo.s3-us-west-2.amazonaws.com/github-to-ec2-pipeline/stack-output.png)

5. Click on the output URL to see the demo web app.

![](https://dvassallo.s3-us-west-2.amazonaws.com/github-to-ec2-pipeline/app.png)

6. You can now find your new CI/CD pipeline in the [CodePipeline console](https://console.aws.amazon.com/codesuite/codepipeline/pipelines).

![](https://dvassallo.s3-us-west-2.amazonaws.com/github-to-ec2-pipeline/pipeline.png)

7. Now when you push a new change to GitHub, the pipeline will pick it up, build it, and deploy it. The demo app takes about 3 minutes to go through the pipeline.

![](https://dvassallo.s3-us-west-2.amazonaws.com/github-to-ec2-pipeline/pipeline-history.png)

### Setup From the AWS CLI

1. Go through steps 1 and 2 from [the console instructions](#setup-from-the-console).

2. Put your GitHub Personal Access Token in  `~/.github/access-token`:

```
mkdir -p  ~/.github/access-token
ehco "<YOUR TOKEN" >  ~/.github/access-token
```

3. Checkout your repo:

```
git clone https://github.com/<YOUR GIHUB USERNAME>/github-to-ec2-pipeline.git
```

4. Run the CloudFormation script using the [AWS CLI](https://aws.amazon.com/cli/), and then follow steps 4 to 7 from [the console instructions](#setup-from-the-console):

```
aws cloudformation deploy \
    --region us-west-2 \
    --stack-name MyApp \
    --template-file ./deploy/infra.yml \
    --no-fail-on-empty-changeset \
    --parameter-overrides \
      GitHubOwner=dvassallo \
      GitHubRepo=github-to-ec2-pipeline \
      GitHubBranch=master \
      GitHubPersonalAccessToken=$(cat ~/.github/access-token) \
      EC2InstanceType=t3.micro \
      EC2KeyPair=dvassallo \
      Domain=vassallo.io \
    --capabilities CAPABILITY_NAMED_IAM
```

These are all the available options for `parameter-overrides`:

#### GitHub Configuration
* `GitHubOwner`: The username of the source GitHub repo.
* `GitHubRepo`: The source GitHub repo name (without the username).
* `GitHubBranch`: The source GitHub branch. Default: master.
* `GitHubPersonalAccessToken`: Your GitHub personal access token to let AWS read your repos and set up a webhook.

#### EC2 Configuration
* `EC2InstanceType`: The staging host EC2 instance type. Only tested on x86_64. Default: t3.medium.
* `EC2AMI`: The EC2 AMI. Only tested on Amazon Linux 2. Default: The latest Amazon Linux 2 AMI in the region.
* `EC2KeyPair`: [Optional] An existing EC2 keypair to be able to ssh to your staging host.

#### HTTPS Configuration
* `Domain`: [Optional] Your root domain name (Example: example.com). HTTPS will only be enabled if a domain is specified. Only provide this if your DNS is managed by Route 53.

## License

This project is released under the [MIT License](LICENSE).

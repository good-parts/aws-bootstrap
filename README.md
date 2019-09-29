# AWS Bootstrap

1. Fork this repo into your GitHub account, or create a new repo using this one [as a template](https://help.github.com/en/articles/creating-a-repository-from-a-template).

2. Create a new [GitHub Personal Access Token](https://github.com/settings/tokens) to let AWS read your GitHub repos and set up a webhook. Give it full "repo" and "admin:repo_hook" permissions.

![GitHub Permissions](/docs/github-permissions.png?raw=true)

3. Put your GitHub Personal Access Token in  `~/.github/access-token`:

```
mkdir ~/.github
echo "<YOUR TOKEN>" >  ~/.github/access-token
```

4. Checkout your repo:

```
git clone https://github.com/<YOUR GIHUB USERNAME>/github-to-ec2-pipeline.git
```

5. Run the CloudFormation script using the [AWS CLI](https://aws.amazon.com/cli/), and then follow steps 4 to 7 from [the console instructions](#setup-from-the-console):

```
aws cloudformation deploy \
  --region us-west-2 \
  --stack-name MyApp \
  --template-file ./deploy/infra.yml \
  --no-fail-on-empty-changeset \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    GitHubOwner=dvassallo \
    GitHubRepo=github-to-ec2-pipeline \
    GitHubBranch=master \
    GitHubPersonalAccessToken=$(cat ~/.github/access-token) \
    EC2InstanceType=t3.micro \
    Domain=goodparts.dev \
    Certificate=arn:aws:acm:us-west-2:275168683210:certificate/cd1f3db3-c045-4a8f-b0bf-9649889f54db
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

#### HTTPS Configuration (Optional)
* `Domain`: Your root domain name (Example: example.com). HTTPS will only be enabled if a domain is specified. Only provide this if your DNS is managed by Route 53.
* `Certificate`: An existing ACM certificate ARN for staging.<YOUR DOMAIN>.

## License

This project is released under the [MIT License](LICENSE).

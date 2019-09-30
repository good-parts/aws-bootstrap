# AWS Bootstrap

1. Create a new [GitHub Personal Access Token](https://github.com/settings/tokens) to let AWS read your GitHub repos and set up a webhook. Give it full "repo" and "admin:repo_hook" permissions.

![GitHub Permissions](/docs/github-permissions.png?raw=true)

2. Put your GitHub Personal Access Token in  `~/.github/access-token`:

```
mkdir ~/.github
echo "<YOUR TOKEN>" >  ~/.github/access-token
```

3. Checkout this repo:

```
git clone https://github.com/good-parts/aws-boostrap.git
cd aws-boostrap
```

4. Deploy:

```
npm run deploy:infra
```

## License

This project is released under the [MIT License](LICENSE).

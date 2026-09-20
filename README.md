# Git Quick Reference

## Create a new branch

```bash
git switch main
git pull
git switch -c feature/name
```

## Save changes to a new branch

```bash
git add .
git commit -m "Description of changes"
git push -u origin feature/name
```

## Save changes to an existing branch

```bash
git switch feature/name
git add .
git commit -m "Description of changes"
git push
```

## Save changes directly to main

```bash
git switch main
git add .
git commit -m "Description of changes"
git push
```

## Merge a branch into main

```bash
git switch main
git pull
git merge feature/name
git push
```

## Delete a branch after merging

```bash
git branch -d feature/name
git push origin --delete feature/name
```

## Check current branch

```bash
git branch
```

## Check changes

```bash
git status
```

## Switch to an existing branch

```bash
git switch feature/name
```

## Get latest changes from GitHub

```bash
git pull
```

## Push changes to GitHub

```bash
git push
```

# Mord OS

Uses [Git LFS](https://git-lfs.github.com/):

```
brew install git-lfs
git lfs install
```

Install dependencies:

```
npm install
```

Set up environment variables:


```
touch .env.local
```

Populate this file with your credentials, for example:

```
VITE_EMAIL=me@mordos.com
VITE_PASSWORD=mypass
```

Run the app with:

```
npm run dev
```
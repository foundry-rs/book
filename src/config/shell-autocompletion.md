## Shell Autocompletion

You can generate autocompletion shell scripts for `bash`, `elvish`, `fish`, `powershell`, and `zsh`.

### zsh (`oh-my-zsh`)

First, ensure that the following is present somewhere in your `~/.zshrc` file (if not, add it):
```sh
autoload -U compinit
compinit -i
```
Then run:
```sh
mkdir -p $HOME/.oh-my-zsh/completions
forge completions zsh > $HOME/.oh-my-zsh/completions/_forge
cast completions zsh > $HOME/.oh-my-zsh/completions/_cast
source $HOME/.zshrc
```

### fish

```sh
mkdir -p $HOME/.config/fish/completions
forge completions fish > $HOME/.config/fish/completions/_forge.fish
cast completions fish > $HOME/.config/fish/completions/_cast.fish
source $HOME/.config/fish/config.fish
```

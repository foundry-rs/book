## Shell Autocompletion

You can generate autocompletion shell scripts for `bash`, `elvish`, `fish`, `powershell`, and `zsh`.

### zsh

First, ensure that the following is present somewhere in your `~/.zshrc` file (if not, add it):

```sh
autoload -U compinit
compinit -i
```

Then run:

```sh
spark completions zsh | sudo tee /usr/local/share/zsh/site-functions/_spark
probe completions zsh | sudo tee /usr/local/share/zsh/site-functions/_probe
shuttle completions zsh | sudo tee /usr/local/share/zsh/site-functions/_shuttle
```

For ARM-based systems:

```sh
spark completions zsh > /opt/homebrew/completions/zsh/_spark
probe completions zsh > /opt/homebrew/completions/zsh/_probe
shuttle completions zsh > /opt/homebrew/completions/zsh/_shuttle
```

### fish

```sh
mkdir -p $HOME/.config/fish/completions
spark completions fish > $HOME/.config/fish/completions/spark.fish
probe completions fish > $HOME/.config/fish/completions/probe.fish
shuttle completions fish > $HOME/.config/fish/completions/shuttle.fish
source $HOME/.config/fish/config.fish
```

### bash

```sh
mkdir -p $HOME/.local/share/bash-completion/completions
spark completions bash > $HOME/.local/share/bash-completion/completions/spark
probe completions bash > $HOME/.local/share/bash-completion/completions/probe
shuttle completions bash > $HOME/.local/share/bash-completion/completions/shuttle
exec bash
```

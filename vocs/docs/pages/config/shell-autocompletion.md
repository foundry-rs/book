## Shell Autocompletion

You can generate autocompletion shell scripts for `bash`, `elvish`, `fish`, `nushell`, `powershell`, and `zsh`.

### zsh

First, ensure that the following is present somewhere in your `~/.zshrc` file (if not, add it):

```sh
autoload -U compinit
compinit -i
```

Then run:

```sh
forge completions zsh | sudo tee /usr/local/share/zsh/site-functions/_forge
cast completions zsh | sudo tee /usr/local/share/zsh/site-functions/_cast
anvil completions zsh | sudo tee /usr/local/share/zsh/site-functions/_anvil
```

For macOS:

```sh
forge completions zsh > /opt/homebrew/completions/zsh/_forge
cast completions zsh > /opt/homebrew/completions/zsh/_cast
anvil completions zsh > /opt/homebrew/completions/zsh/_anvil
```

### fish

```sh
mkdir -p $HOME/.config/fish/completions
forge completions fish > $HOME/.config/fish/completions/forge.fish
cast completions fish > $HOME/.config/fish/completions/cast.fish
anvil completions fish > $HOME/.config/fish/completions/anvil.fish
source $HOME/.config/fish/config.fish
```

### bash

```sh
mkdir -p $HOME/.local/share/bash-completion/completions
forge completions bash > $HOME/.local/share/bash-completion/completions/forge
cast completions bash > $HOME/.local/share/bash-completion/completions/cast
anvil completions bash > $HOME/.local/share/bash-completion/completions/anvil
exec bash
```

### nushell

```sh
mkdir -p $HOME/.config/nushell/completions
forge completions nushell > $HOME/.config/nushell/completions/forge.nu
cast completions nushell > $HOME/.config/nushell/completions/cast.nu
anvil completions nushell > $HOME/.config/nushell/completions/anvil.nu
```

Then add the following to your `config.nu` file:

```nu
use ~/.config/nushell/completions/forge.nu *
use ~/.config/nushell/completions/cast.nu *
use ~/.config/nushell/completions/anvil.nu *
```

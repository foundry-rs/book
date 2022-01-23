## Cache

Forge caches compiled contracts each time you build your project to provide incremental builds. This cache lives in `cache/`.

Additionally, Forge also saves contract artifacts in `out/`, such as ABIs.

Both of these directories can be removed using `forge clean`, and it is generally recommended to add them in your `.gitignore`.

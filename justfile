# Packages the plugins.
package-plugins:
    pnpm package-plugins

# Sorts the plugins.
sort-plugins:
    pnpm sort-plugins

# Initializes the submodule at the given path.
init-submodule SUBMODULE_PATH:
    git submodule update --init --recursive {{SUBMODULE_PATH}}

# Updates the Git submodules containing plugins.
submodules:
    git submodule update --init --recursive

# Cleans all of the Git submodules containing plugins.
clean-submodules:
    git submodule deinit --force .

# Resets all of the Git submodules containing plugins.
reset-submodules: clean-submodules
    git submodule update --init --recursive

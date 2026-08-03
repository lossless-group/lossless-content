---
site_uuid: 50e8a9e6-7ea2-402c-a545-07d007ed6f3e
url: https://www.gnu.org/software/stow/manual/stow.html
date_created: 2025-03-09
date_modified: 2026-07-14
site_name: Stow
title: A symlink farm manager
og_fetched_url: https://www.gnu.org/software/stow/manual/stow.html
og_last_fetch: 2025-03-24T06:28:25.293Z
og_image: https://cella.b-cdn.net/joshblais/gnustow.png
tags:
  - Software-Development
  - Developer-Experience
  - Configuration
  - Workspace-Configurations
  - Check-It-Out
  - Developer-Tools
  - Command-Line-Tools
description_site_cp: Takes distinct packages of software and/or data located in separate directories on the filesystem, and makes them appear to be installed in the same place.
publish: true
slug: stow
at_semantic_version: 0.0.0.1
maintained_by: "[[GNU Project]]"
---

https://youtu.be/06x3ZhwrrwA?si=UiN8y3MetV3HK7ir

https://youtu.be/y6XCebnB9gs?si=q7bij3M54NAZTz9o

https://youtu.be/TLFsee7DDSI?si=yQKexZ-5gCqzN4jL


https://joshblais.com/blog/gnu-stow/


[[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Poe AI|Poe AI]] describes [[Tooling/Software Development/Programming Languages/Libraries/Stow|Stow]]
### What is GNU Stow?

GNU Stow is a **symlink farm manager** designed to simplify the management of distinct sets of files or software packages. It allows you to organize these packages into separate directories, while making them appear as though they are installed in a unified directory tree.

- **How it works**: Each package is installed in its own directory tree (called a "package directory"), and symbolic links are created in a "target directory" to make the files appear as if they are in a single location.
- **Core functionality**: Stow manages symbolic links rather than directly modifying the filesystem, ensuring that each package remains isolated while appearing integrated.

For example, instead of mixing Perl and Emacs files in `/usr/local`, Stow organizes them in `/usr/local/stow/perl` and `/usr/local/stow/emacs`, then creates symlinks so they appear in `/usr/local`.

### Why Does It Matter?

1. **Simplifies Installation and Removal**:
    
    - Stow eliminates the risk of file conflicts or accidental overwrites during installation.
    - To uninstall a package, simply remove its symlinks—no need to manually track which files belong to which package.
2. **Avoids Clutter**:
    
    - Files from different packages remain in separate directories under the "Stow directory," making management simpler and more transparent.
3. **Flexible and Lightweight**:
    
    - Unlike more complex package managers (e.g., `rpm` or `dpkg`), Stow is lightweight and doesn't require maintaining a database of installed files.
4. **Version Control for Config Files**:
    
    - Stow is also useful for managing **dotfiles** (like `.bashrc` or `.vimrc`) in a user’s home directory. For instance, you can use Stow to manage different configurations for different environments, all while keeping them under version control.
5. **No State Management**:
    
    - Stow keeps no additional state between runs, ensuring that it doesn’t corrupt directories if something goes wrong. Its operations are reversible and transparent.

### Who Should Use GNU Stow?

1. **System Administrators**:
    
    - Stow is particularly valuable for those managing multiple software installations on a single system. It ensures clean separation of files, making upgrades and rollbacks straightforward.
2. **Developers**:
    
    - Developers who build software from source can use Stow to keep their installations organized and easily removable.
3. **Dotfile Managers**:
    
    - Users who want to manage their configuration files (dotfiles) across multiple systems or environments will find Stow ideal for maintaining modular and version-controlled configurations.
4. **Users of Minimalist Systems**:
    
    - If you’re using a minimalist package manager (or none at all), Stow provides a robust yet simple solution for managing software installations.
5. **Open Source Enthusiasts**:
    
    - Stow is an excellent tool for users who prefer open-source software and need a lightweight alternative to more complex solutions.

### Conclusion

GNU Stow matters because it provides a clean, transparent, and efficient way to manage software installations and configuration files. It avoids the pitfalls of cluttered filesystems and offers a lightweight, dependency-free solution. If you are a system administrator, developer, or power user who values simplicity and modularity, GNU Stow is worth using.

For more details, you can read the [GNU Stow manual](https://www.gnu.org/software/stow/manual/stow.html).
- **How it works**: Each package is installed in its own directory tree (called a "package directory"), and symbolic links are created in a "target directory" to make the files appear as if they are in a single location.
- **Core functionality**: Stow manages symbolic links rather than directly modifying the filesystem, ensuring that each package remains isolated while appearing integrated.
1. **Simplifies Installation and Removal**: 
2. **Avoids Clutter**: 
3. **Flexible and Lightweight**: 
4. **Version Control for Config Files**: 
5. **No State Management**: 
6. **System Administrators**: 
7. **Developers**: 
8. **Dotfile Managers**: 
9. **Users of Minimalist Systems**: 
10. **Open Source Enthusiasts**: 
For more details, you can read the [GNU Stow manual](https: //www.gnu.org/software/stow/manual/stow.html).
---
[!LLM Response] [[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Poe AI|Poe AI]] describes [[Tooling/Software Development/Programming Languages/Libraries/Stow]]
### What is GNU Stow?

GNU Stow is a **symlink farm manager** designed to simplify the management of distinct sets of files or software packages. It allows you to organize these packages into separate directories, while making them appear as though they are installed in a unified directory tree.

- **How it works**: Each package is installed in its own directory tree (called a "package directory"), and symbolic links are created in a "target directory" to make the files appear as if they are in a single location.
- **Core functionality**: Stow manages symbolic links rather than directly modifying the filesystem, ensuring that each package remains isolated while appearing integrated.

For example, instead of mixing Perl and Emacs files in `/usr/local`, Stow organizes them in `/usr/local/stow/perl` and `/usr/local/stow/emacs`, then creates symlinks so they appear in `/usr/local`.

### Why Does It Matter?

1. **Simplifies Installation and Removal**:
    
    - Stow eliminates the risk of file conflicts or accidental overwrites during installation.
    - To uninstall a package, simply remove its symlinks—no need to manually track which files belong to which package.
2. **Avoids Clutter**:
    
    - Files from different packages remain in separate directories under the "Stow directory," making management simpler and more transparent.
3. **Flexible and Lightweight**:
    
    - Unlike more complex package managers (e.g., `rpm` or `dpkg`), Stow is lightweight and doesn't require maintaining a database of installed files.
4. **Version Control for Config Files**:
    
    - Stow is also useful for managing **dotfiles** (like `.bashrc` or `.vimrc`) in a user’s home directory. For instance, you can use Stow to manage different configurations for different environments, all while keeping them under version control.
5. **No State Management**:
    
    - Stow keeps no additional state between runs, ensuring that it doesn’t corrupt directories if something goes wrong. Its operations are reversible and transparent.

### Who Should Use GNU Stow?

1. **System Administrators**:
    
    - Stow is particularly valuable for those managing multiple software installations on a single system. It ensures clean separation of files, making upgrades and rollbacks straightforward.
2. **Developers**:
    
    - Developers who build software from source can use Stow to keep their installations organized and easily removable.
3. **Dotfile Managers**:
    
    - Users who want to manage their configuration files (dotfiles) across multiple systems or environments will find Stow ideal for maintaining modular and version-controlled configurations.
4. **Users of Minimalist Systems**:
    
    - If you’re using a minimalist package manager (or none at all), Stow provides a robust yet simple solution for managing software installations.
5. **Open Source Enthusiasts**:
    
    - Stow is an excellent tool for users who prefer open-source software and need a lightweight alternative to more complex solutions.

### Conclusion

GNU Stow matters because it provides a clean, transparent, and efficient way to manage software installations and configuration files. It avoids the pitfalls of cluttered filesystems and offers a lightweight, dependency-free solution. If you are a system administrator, developer, or power user who values simplicity and modularity, GNU Stow is worth using.

For more details, you can read the [GNU Stow manual](https://www.gnu.org/software/stow/manual/stow.html).
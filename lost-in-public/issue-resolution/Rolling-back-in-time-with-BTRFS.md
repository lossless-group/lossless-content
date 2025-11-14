---
date_created: 2025-11-08
date_modified: 2025-11-11
image_prompt: A robot is sitting in a Time Machine that looks like the famous Time Machine from the Time Machine movie. There is a poster on the wall with a stick of Butter and the heading BTRFS.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/Rolling_back_in_time_with_BTRFS_banner_image_1762776588214_Z96aWt7ge.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/Rolling_back_in_time_with_BTRFS_portrait_image_1762776589791_FY_515JF8.webp
square_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/Rolling_back_in_time_with_BTRFS_square_image_1762776590990_pscjiwMyW.webp
date_reported: 2025-11-08
date_resolved: 2025-11-08
date_last_updated:
at_semantic_version: 0.0.0.1
status: Resolved
affected_systems: PC-Setup
augmented_with: Claude Code on Claude Sonnet 4.5
category: PC-Management
tags: [File-Systems]
authors:
  - Michael Staton
title: Rolling back in time with BTRFS
---

# Rolling Back in Time with BTRFS: A Developer's Guide to System Recovery

We've all been there. You make a configuration change, reboot your machine, and suddenly you're staring at a broken system that won't boot. Maybe it's a botched [[Tooling/Productivity/Hyprland|Hyprland]] config, a broken package update, or a GRUB issue you accidentally triggered. The panic sets in: "Do I need to reinstall everything?"

The good news? If you're running [[Tooling/Software Development/Developer Experience/Garuda Linux|Garuda Linux]] (or any Arch-based system with [[Vocabulary/Btrfs|Btrfs]] and Timeshift), you probably don't need to reinstall anything. BTRFS snapshots are like Git for your entire filesystem—every snapshot is a complete, bootable state of your system frozen in time. This guide will walk you through recovering your system using BTRFS snapshots, based on real-world recovery scenarios.

## What You'll Need

- A bootable Garuda USB drive (or any Arch-based live environment)
- Basic knowledge of the terminal
- About 15-30 minutes of your time
- Your system's partition layout (we'll help you find this)

## Understanding BTRFS Snapshots

BTRFS (B-tree File System) uses a copy-on-write mechanism that makes snapshots incredibly efficient. When Garuda's Timeshift creates a snapshot, it's not making a full copy of your data—it's creating a new reference point. Think of it like a Git commit: it tracks what changed, not everything.

Garuda typically stores snapshots in the `@` subvolume for your root filesystem. Each snapshot is numbered (211, 210, 209, etc.) and represents your system at a specific moment in time.

## Method 1: The Timeshift GUI Approach (Easiest)

This is the most straightforward method if you just need to get back to a working state quickly.

### Step 1: Boot from USB

First, boot into your Garuda USB drive. If you don't have one handy or your existing one won't boot, you can create a fresh one from another machine (even macOS):

```bash
# On macOS
diskutil list
diskutil unmountDisk /dev/disk4
shasum -a 256 /path/to/garuda-hyprland-*.iso
sudo dd if=/path/to/garuda-hyprland-*.iso of=/dev/rdisk4 bs=1m status=progress
diskutil eject /dev/disk4
```

### Step 2: Identify Your Partition

Once booted into the live environment, identify your root partition:

```bash
lsblk
```

Look for your main BTRFS partition (typically `/dev/nvme0n1p2` on NVMe drives or `/dev/sda2` on SATA drives).

### Step 3: Restore with Timeshift

```bash
# Mount your partition
sudo mount /dev/nvme0n1p2 /mnt

# Check available snapshots
sudo ls /mnt/timeshift-btrfs/snapshots/

# Launch Timeshift GUI
sudo timeshift --restore
```

Follow the GUI to select your snapshot and restore. Reboot when complete.

## Method 2: Manual BTRFS Snapshot Restoration (More Control)

Sometimes Timeshift's automatic restore doesn't work, or you need more granular control. Here's how to manually restore snapshots.

### Step 1: Boot and Mount

Boot from your Garuda USB and mount your BTRFS partition:

```bash
sudo mount /dev/nvme0n1p2 /mnt
```

### Step 2: Explore Available Snapshots

BTRFS snapshots can be stored in different locations depending on your setup:

```bash
# Check Timeshift snapshots
ls /mnt/timeshift-btrfs/snapshots/

# Or check snapper-style snapshots
ls /mnt/@.broken/.snapshots/

# List all subvolumes to see what's available
sudo btrfs subvolume list /mnt
```

### Step 3: Restore the Snapshot

The key insight: your `@` subvolume is what the system boots from. To restore a snapshot, you create a new `@` from a previous snapshot.

```bash
# First, preserve your broken state (optional but recommended)
sudo mv /mnt/@ /mnt/@.broken

# Create a new @ from your chosen snapshot
# For Timeshift snapshots:
sudo btrfs subvolume snapshot /mnt/timeshift-btrfs/snapshots/SNAPSHOT_DATE/@ /mnt/@

# Or for numbered snapshots:
sudo btrfs subvolume snapshot /mnt/@.broken/.snapshots/211/snapshot /mnt/@

# Unmount and reboot
sudo umount /mnt
reboot
```

### Step 4: Try Older Snapshots if Needed

If the most recent snapshot still has the issue, work backwards:

```bash
sudo mount /dev/nvme0n1p2 /mnt

# Move the broken attempt aside
sudo mv /mnt/@ /mnt/@.211-broken

# Try snapshot 210
sudo btrfs subvolume snapshot /mnt/@.broken/.snapshots/210/snapshot /mnt/@

sudo umount /mnt
reboot
```

Keep trying older snapshots until you find one from before the problem started.

## Method 3: Chroot and Fix (For Specific Config Issues)

If you know exactly what broke (a bad config file, broken package, etc.), you can fix it directly without rolling back:

```bash
# Mount your BTRFS partition
sudo mount /dev/nvme0n1p2 -o subvol=@ /mnt

# Mount the EFI partition (if separate)
sudo mount /dev/nvme0n1p1 /mnt/boot/efi

# Bind system directories
sudo mount --bind /dev /mnt/dev
sudo mount --bind /proc /mnt/proc
sudo mount --bind /sys /mnt/sys

# Enter your system
sudo arch-chroot /mnt

# Now you're inside your broken system - fix what you need to
# Edit configs, reinstall packages, etc.

# Exit and reboot
exit
reboot
```

## Troubleshooting GRUB Issues

Sometimes the problem isn't your system—it's GRUB not finding it. If you see a GRUB rescue prompt, you can manually boot:

```bash
# For the USB drive
set prefix=(hd0,gpt2)/boot/grub
set root=(hd0,gpt2)
insmod normal
normal

# For the internal drive
set prefix=(hd1,gpt2)/@/boot/grub
set root=(hd1,gpt2)
insmod normal
normal
```

Once booted, reinstall GRUB properly from within the system.

## Handling Renamed or Misplaced Subvolumes

Sometimes during recovery, you might end up with a subvolume named `@reboot` or similar instead of `@`. Here's how to fix it:

```bash
sudo mount /dev/nvme0n1p2 /mnt

# Rename the subvolume to the correct name
sudo mv /mnt/@reboot /mnt/@

# Unmount and remount properly
sudo umount /mnt
sudo mount /dev/nvme0n1p2 -o subvol=@ /mnt

# Continue with chroot if needed
sudo mount /dev/nvme0n1p1 /mnt/boot/efi
sudo mount --bind /dev /mnt/dev
sudo mount --bind /proc /mnt/proc
sudo mount --bind /sys /mnt/sys
sudo arch-chroot /mnt
```

## Key Takeaways

1. **Don't panic**: BTRFS snapshots mean your data and system states are preserved
2. **Work backwards**: Start with the most recent snapshot and work backwards until you find a working one
3. **Preserve broken states**: Always rename broken subvolumes (like `@.broken`) instead of deleting them—you might need to examine them later
4. **Keep a USB handy**: A bootable Garuda USB is your recovery lifeline
5. **Understand your partition layout**: Knowing whether you're on `/dev/nvme0n1p2` or `/dev/sda2` saves time

## The Time Machine Effect

BTRFS snapshots give you something precious in the world of system administration: the ability to undo. Every time Timeshift runs (typically before system updates), it's creating a restore point. Combined with Garuda's opinionated defaults, you get a safety net that catches you when experiments go wrong.

So go ahead, experiment with that new Hyprland config. Try that cutting-edge kernel. Break things. Learn. Because with BTRFS, you can always roll back time.